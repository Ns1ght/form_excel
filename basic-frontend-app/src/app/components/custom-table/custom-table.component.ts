import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PermService } from 'src/app/services/perm.service'
import { IPermissionsDTO } from 'src/app/interfaces/shared/permissions'
import { PoDialogService, PoNotificationService, PoPageAction, PoPageFilter, PoTableComponent } from '@po-ui/ng-components'
import { AuthService } from 'src/app/services/auth.service'
import { Subscription } from 'rxjs'
import { finalize, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { RestService } from 'src/app/services/rest.service'
import { environment } from 'src/environments/environment'

interface ListResponse {
  items: any[]
  hasNext: boolean
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, OnDestroy {
  @ViewChild(PoTableComponent) table: PoTableComponent
  public fields: Array<any> = []
  public items: any = []
  private permissions: IPermissionsDTO
  public pageActions: PoPageAction[] = []
  public tableActions: PoPageAction[] = []
  public listHeight: number = 0
  private hasNext: boolean = false
  private page: number = 1
  private filter: string = ''
  public initialLoading: boolean = false
  public loading: boolean = false
  public readonly filterSettings: PoPageFilter = {
    action: this.search.bind(this),
    placeholder: 'Pesquisar...',
    width: 4
  }
  
  @Input() pageTitle: string
  @Input() route: string
  @Input() pageSize: number = 50
  @Input() initialFields: any[] = []

  private subscriptions = new Subscription()

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private httpClient: HttpClient,
    private permService: PermService,
    private poDialogService: PoDialogService,
    private poNotificationService: PoNotificationService,
    private restService: RestService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.permissions = this.permService.getPermissions(this.activatedRoute.snapshot.routeConfig.path)

    const routerPreferences = this.authService.routeTablePreferences(this.activatedRoute.snapshot.routeConfig.path)
    if (routerPreferences) this.fields = routerPreferences.preferences
    else this.restoreColumn()

    this.subscriptions.add(this.getData())
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getData() {
    this.initialLoading = true
    this.httpClient.get(`${environment.baseUrl}/${this.route}?page=1&pageSize=${this.pageSize}`)
    .pipe(
      tap(() => this.initialLoading = false),
      finalize(() => {
        this.loading = false
        this.getActions()      
    }))
    .subscribe({
      next: (response: ListResponse) => {
        this.items = response.items
        this.hasNext = response.hasNext

        setTimeout(() => {
          this.calculateListHeight(response.items)
        })
      },
      error: (error) => console.log(error)
    })
  }

  getActions() {
    if (this.permissions.permitAll) {
      this.pageActions = [
        { label: 'Novo', action: this.newItem.bind(this), icon: 'fa-solid fa-plus' },
        { label: 'Editar', action: this.editItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-pen' },
        { label: 'Copiar', action: this.copyItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-copy' },
        { label: 'Visualizar', action: this.viewItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-eye' },
        { label: 'Excluir', action: this.excludeItems.bind(this), disabled: this.multipleItemIsSelected.bind(this), icon: 'fa-solid fa-trash' },
        { label: 'Atualizar', action: this.updateItems.bind(this), icon: 'fa-solid fa-arrows-rotate' }
      ]
      this.tableActions = [
        { label: 'Editar', action: this.editItem.bind(this), icon: 'fa-solid fa-pen' },
        { label: 'Copiar', action: this.copyItem.bind(this), icon: 'fa-solid fa-copy' },
        { label: 'Visualizar', action: this.viewItem.bind(this), icon: 'fa-solid fa-eye' },
        { label: 'Excluir', action: this.excludeItem.bind(this), icon: 'fa-solid fa-trash' }
      ]
    } else {
      const pageActions = []
      if (this.permissions.permitCreate) {
        pageActions.push({ label: 'Novo', action: this.newItem.bind(this), icon: 'fa-solid fa-plus' })
        pageActions.push({ label: 'Copiar', action: this.copyItem.bind(this), icon: 'fa-solid fa-copy' })
      }

      if (this.permissions.permitUpdate) {
        pageActions.push({ label: 'Editar', action: this.editItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-pen' })
        this.tableActions.push({ label: 'Editar', action: this.editItem.bind(this), icon: 'fa-solid fa-pen' })
      }

      if (this.permissions.permitRestore) {
        pageActions.push({ label: 'Visualizar', action: this.viewItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-eye' })
        this.tableActions.push({ label: 'Visualizar', action: this.viewItem.bind(this), icon: 'fa-solid fa-eye' })
      }

      if (this.permissions.permitDelete) {
        pageActions.push({ label: 'Excluir', action: this.excludeItems.bind(this), disabled: this.multipleItemIsSelected.bind(this), icon: 'fa-solid fa-trash' })
        this.tableActions.push({ label: 'Excluir', action: this.excludeItem.bind(this), icon: 'fa-solid fa-trash' })
      }

      pageActions.push({ label: 'Atualizar', action: this.updateItems.bind(this), icon: 'fa-solid fa-arrows-rotate' })
      this.pageActions = pageActions
    }
  }

  // Funções básicas da tabela

  search(search: string) {
    this.filter = search
    this.page = 1
    this.loading = true
    this.subscriptions.add(
      this.httpClient
        .get(`${environment.baseUrl}/${this.route}?page=1&pageSize=${this.pageSize}&search=${search}`)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response: ListResponse) => this.items = response.items,
          error: (error) => console.log(error)
        })
    )
  }

  getSelectedItemsKeys() {
    if (this.items.length > 0) {
      const resources = this.items.filter(item => item.$selected)

      if (resources.length === 0) {
        return
      }
      return resources
    }
  }

  singleItemIsSelected() {
    if (this.getSelectedItemsKeys()) {
      return this.getSelectedItemsKeys().length !== 1
    }
    return true
  }

  multipleItemIsSelected() {
    return !this.getSelectedItemsKeys()
  }

  clickDisclaimers(event) {
    this.filter = ''
    if (event.length === 0) this.search('')
  }

  newItem() {
    this.router.navigate([`${this.route}/new`])
  }

  copyItem(item: any) {
    if (item.id) this.router.navigate([`${this.route}/new/${item.id}`])
    else this.router.navigate([`${this.route}/new/${this.getSelectedItemsKeys()[0].id}`])
  }

  editItem(item: any) {
    if (item) this.router.navigate([`${this.route}/edit/${item.id}`])
    else this.router.navigate([`${this.route}/edit/${this.getSelectedItemsKeys()[0].id}`])
  }

  viewItem(item: any) {
    if (item.id) this.router.navigate([`${this.route}/view/${item.id}`])
    else this.router.navigate([`${this.route}/view/${this.getSelectedItemsKeys()[0].id}`])
  }

  excludeItem(item: any) {
    this.poDialogService.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza de que deseja excluir esse registro? Você não poderá desfazer essa ação.',
      confirm: this.removeItem.bind(this, item)
    })
  }

  excludeItems() {
    const ids = this.getSelectedItemsKeys().map(item => item.id)

    if (ids.length > 0) {
      this.poDialogService.confirm({
        title: 'Confirmar exclusão em lote',
        message: 'Tem certeza de que deseja excluir todos esses registros? Você não poderá desfazer essa ação.',
        confirm: this.removeItems.bind(this, ids)
      })
    }
  }

  removeItem(item: any) {
    this.subscriptions.add(
      this.httpClient.delete(`${environment.baseUrl}/${this.route}/${item.id}`)
        .subscribe({
          next: (response: ListResponse) => {
            this.poNotificationService.success({
              message: 'Item excluído com sucesso.',
              duration: environment.poNotificationDuration
            })
            this.items = response.items
          }
        })
    )
  }

  removeItems(ids: any[]) {
    this.subscriptions.add(
      this.restService.deleteAll(`/${this.route}`, ids)
        .subscribe({
          next: (response: ListResponse) => {
            this.poNotificationService.success({
              message: 'Itens excluídos com sucesso.',
              duration: environment.poNotificationDuration
            })
            this.items = response.items
          }
        })
    )
  }

  updateItems() {
    this.page = 1
    this.getData()
  }

  showMoreItems() {
    if (this.hasNext) {
      this.loading = true
      this.subscriptions.add(
        this.httpClient.get(`${environment.baseUrl}/${this.route}?page=${this.page += 1}&pageSize=${this.pageSize}&search=${this.filter}`)
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: (response: ListResponse) => {
              this.items = this.items.concat(response.items)
              this.hasNext = response.hasNext
            },
            error: (error) => console.log(error)
          })
      )
    }
  }

  changeVisibleColumns() {
    this.authService.browseTablePreferences(this.activatedRoute.snapshot.routeConfig.path, this.table.columns)
  }

  restoreColumn() {
    this.fields = this.initialFields
  }

  calculateListHeight(items?: ListResponse[]) {
    let listHeight = 0

    if (this.table) {
      if (items) {
        listHeight = (this.table.itemSize + 1) * (items.length + 1)
      } else {
        listHeight = (this.table.itemSize + 1) * (this.table.items.length + 1)
      }
  
      if (listHeight < window.innerHeight - 230) {
        this.listHeight = 0
      } else {
        this.listHeight = window.innerHeight - 230
      }
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.calculateListHeight()
  }
}
