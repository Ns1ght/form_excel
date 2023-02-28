import { Component, OnInit } from "@angular/core"
import { PoDynamicFormField } from "@po-ui/ng-components"
import { PoPageDynamicEditActions } from "@po-ui/ng-templates"
import { environment } from "src/environments/environment"

@Component({
  selector: "app-user-group-edit",
  templateUrl: "./user-group-edit.component.html",
  styleUrls: ["./user-group-edit.component.scss"],
})
export class UserGroupEditComponent implements OnInit {
  public readonly serviceApi = `${environment.baseUrl}/user-groups`

  public readonly actions: PoPageDynamicEditActions = {
    save: "/user-groups",
    saveNew: "/user-groups",
  }

  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: "name",
      label: "Nome",
      required: true,
      maxLength: 60,
      gridXlColumns: 12,
      gridLgColumns: 12,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "disabled",
      label: "Inativo",
      type: 'boolean',
      gridXlColumns: 12,
      gridLgColumns: 12,
      gridMdColumns: 12,
      gridSmColumns: 12
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
