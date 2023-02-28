import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"

@Component({
  selector: "app-estado-edit",
  templateUrl: "./estado-edit.component.html",
  styleUrls: ["./estado-edit.component.scss"],
})
export class EstadoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  estadoForm = this.formBuilder.group({
    nome: '',
    uf: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/estados`

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
      this.subscriptions.add(this.getEstado(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPageType(route: string): string {
    switch (route) {
      case 'estados/new':
        return 'new'
      case 'estados/new/:id':
        return 'new'
      case 'estados/edit':
        return 'edit'
      case 'estados/edit/:id':
        return 'edit'
      case 'estados/view/:id':
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
        action: () => this.save(this.estadoForm.value)
      },
      {
        label: "Salvar e novo",
        action: () => this.save(this.estadoForm.value, true)
      },
      {
        label: "Cancelar",
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getEstado(id: string) {
    this.restService
      .get(`/estados/${id}`)
      .subscribe({
        next: (result) => {
          this.estadoForm.patchValue({
            nome: result.nome,
            uf: result.uf,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.estadoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/estados/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: "Registro salvo com sucesso!",
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.estadoForm.reset()
                  this.router.navigate(["estados/new"])
                } else {
                  this.router.navigate(["estados"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/estados", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: "Registro salvo com sucesso!",
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.estadoForm.reset()
                  this.router.navigate(["estados/new"])
                } else {
                  this.router.navigate(["estados"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      }
    }
  }

  markAsDirty() {
    this.estadoForm.controls.nome.markAsDirty()
    this.estadoForm.controls.uf.markAsDirty()
  }

  goBack() {
    this.router.navigate(["estados"])
  }
}
