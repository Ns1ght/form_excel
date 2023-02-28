import { Component, OnInit } from "@angular/core"
import { PoDynamicFormField } from "@po-ui/ng-components"
import { PoPageDynamicEditActions } from "@po-ui/ng-templates"
import { environment } from "src/environments/environment"

@Component({
  selector: "app-navigation-edit",
  templateUrl: "./navigation-edit.component.html",
  styleUrls: ["./navigation-edit.component.scss"],
})
export class NavigationEditComponent implements OnInit {
  public readonly serviceApi = `${environment.baseUrl}/navigations`

  public readonly actions: PoPageDynamicEditActions = {
    save: "/navigations",
    saveNew: "/navigations",
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
      property: "route",
      label: "Rota",
      required: true,
      maxLength: 500,
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
