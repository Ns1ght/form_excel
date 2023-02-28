import { Component, OnInit } from "@angular/core"
import { PoDynamicFormField } from "@po-ui/ng-components"
import { PoPageDynamicEditActions } from "@po-ui/ng-templates"
import { environment } from "src/environments/environment"

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  public readonly serviceApi = `${environment.baseUrl}/users-security`

  public readonly actions: PoPageDynamicEditActions = {
    save: "/users",
    saveNew: "/users",
  }

  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: "userGroupId",
      label: "Grupo de Usuário",
      optionsService: `${environment.baseUrl}/user-groups/select`,
      required: true,
      gridLgColumns: 12,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "name",
      label: "Nome do Usuário",
      required: true,
      maxLength: 60,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "login",
      label: "E-Mail",
      required: true,
      maxLength: 100,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "password",
      label: "Senha",
      required: false,
      secret: true,
      hidePasswordPeek: true,
      maxLength: 20,
      gridLgColumns: 9,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "mustChangePasswordNextLogon",
      label: "Troca senha próximo logon",
      type: 'boolean',
      gridLgColumns: 3,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "avatar",
      label: "Arquivo do avatar",
      required: false,
      maxLength: 255,
      gridLgColumns: 12,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "isBlocked",
      label: "Bloqueado",
      type: 'boolean',
      gridLgColumns: 2,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "blockReasonId",
      label: "Motivo do Bloqueio",
      optionsService: `${environment.baseUrl}/block-reasons/select`,
      required: false,
      gridLgColumns: 10,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "isAdmin",
      label: "Administrador",
      type: 'boolean',
      gridLgColumns: 4,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "isSuperUser",
      label: "Super Usuário",
      type: 'boolean',
      gridLgColumns: 4,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "disabled",
      label: "Inativo",
      type: 'boolean',
      gridLgColumns: 4,
      gridMdColumns: 12,
      gridSmColumns: 12
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
