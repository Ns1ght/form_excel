import { Component, OnInit } from "@angular/core"
import { PoDynamicFormField } from "@po-ui/ng-components"
import { PoPageDynamicEditActions } from "@po-ui/ng-templates"
import { environment } from "src/environments/environment"

@Component({
  selector: "app-user-profile-edit",
  templateUrl: "./user-profile-edit.component.html",
  styleUrls: ["./user-profile-edit.component.scss"],
})
export class UserProfileEditComponent implements OnInit {
  public readonly serviceApi = `${environment.baseUrl}/users-profiles`

  public readonly actions: PoPageDynamicEditActions = {
    save: "/users-profiles",
    saveNew: "/users-profiles",
  }

  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: "userId",
      label: "Usuário",
      optionsService: `${environment.baseUrl}/users-security/select`,
      required: true,
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "profileId",
      label: "Perfil",
      optionsService: `${environment.baseUrl}/profiles/select`,
      required: true,
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
