import { Component, ViewChild, OnDestroy } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { PoModalPasswordRecoveryComponent } from "@po-ui/ng-templates"
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components'
import { AuthService } from "src/app/services/auth.service"
import { environment } from "src/environments/environment"
interface Props {
  login: string
  password: string
  rememberUser: boolean
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnDestroy {
  @ViewChild(PoModalPasswordRecoveryComponent, { static: true }) passwordRecoveryModal: PoModalPasswordRecoveryComponent
  public urlRecovery = `${environment.baseUrl}/passwords/forgot`
  public isLoading: boolean

  subscriptions: Subscription = new Subscription()

  constructor(
    private authService: AuthService, 
    private poDialogService: PoDialogService,
    private poNotificationService: PoNotificationService,
    private httpClient: HttpClient
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  login(event: Props) {
    event.password = btoa(event.password)

    this.authService.signIn(event)

    if (this.authService.userValue.user.isBlocked) {
      this.poDialogService.alert({
        title: 'Usuário Bloqueado',
        message: `
          <p>
            <b>Motivo de bloqueio:</b> ${this.authService.userValue.user.blockReasonId.description}
          </p>
          <p>
            <b>Instruções de Reset:</b> ${this.authService.userValue.user.blockReasonId.instructionsToSolve || 'Contate um administrador.'}
          </p>`
      })
    }
  }

  passwordRecovery() {
    this.passwordRecoveryModal.open()
  }

  submitPasswordRecovery(event: string) {
    this.isLoading = true
    this.subscriptions.add(
      this.httpClient
        .post(this.urlRecovery, event)
        .subscribe({
          next: () => {
            this.poNotificationService.success({
              message: 'E-Mail de recuperação de senha enviado!',
              duration: environment.poNotificationDuration
            })
            this.isLoading = false
            this.passwordRecoveryModal.completed()
          },
          error: () => this.isLoading = false
        })
    )
  }
}
