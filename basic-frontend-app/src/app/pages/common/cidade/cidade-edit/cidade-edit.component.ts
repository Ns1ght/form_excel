import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"

@Component({
  selector: "app-cidade-edit",
  templateUrl: "./cidade-edit.component.html",
  styleUrls: ["./cidade-edit.component.scss"],
})
export class CidadeEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  cidadeForm = this.formBuilder.group({
    nome: '',
    estadoId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/cidades`
  public estadoIdService = `${environment.baseUrl}/estados/select`

  subscriptions = new Subscription()

  public formErrorNotification: PoNotification = {
    message: "Formulário precisa ser preenchido corretamente.",
    duration: 4000,
  }

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getCidade(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPageType(route: string): string {
    switch (route) {
      case 'cidades/new':
        return 'new'
      case 'cidades/new/:id':
        return 'new'
      case 'cidades/edit':
        return 'edit'
      case 'cidades/edit/:id':
        return 'edit'
      case 'cidades/view/:id':
        return 'view'
    }
  }

  pageButtonsBuilder(pageType: string): null {
    if (pageType === 'view') {
      this.readonly = true

      this.pageActions.push(
        {
          label: "Fechar",
          action: this.goBack.bind(this),
        }
      )
      return
    }

    this.pageActions.push(
      {
        label: "Salvar",
        action: () => this.save(this.cidadeForm.value)
      },
      {
        label: "Salvar e novo",
        action: () => this.save(this.cidadeForm.value, true)
      },
      {
        label: "Cancelar",
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getCidade(id: string) {
    this.restService
      .get(`/cidades/${id}`)
      .subscribe({
        next: (result) => {
          this.cidadeForm.patchValue({
            nome: result.nome,
            estadoId: result.estadoId,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.cidadeForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/cidades/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: "Registro salvo com sucesso!",
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.cidadeForm.reset()
                  this.router.navigate(["cidades/new"])
                } else {
                  this.router.navigate(["cidades"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/cidades", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: "Registro salvo com sucesso!",
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.cidadeForm.reset()
                  this.router.navigate(["cidades/new"])
                } else {
                  this.router.navigate(["cidades"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      }
    }
  }

  markAsDirty() {
    this.cidadeForm.controls.nome.markAsDirty()
    this.cidadeForm.controls.estadoId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["cidades"])
  }
}
