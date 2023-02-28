import { Component, OnInit } from "@angular/core"
import { PoDynamicFormField } from "@po-ui/ng-components"
import { PoPageDynamicEditActions } from "@po-ui/ng-templates"
import { environment } from "src/environments/environment"

@Component({
  selector: "app-module-edit",
  templateUrl: "./module-edit.component.html",
  styleUrls: ["./module-edit.component.scss"],
})
export class ModuleEditComponent implements OnInit {
  public readonly serviceApi = `${environment.baseUrl}/modules`

  public readonly actions: PoPageDynamicEditActions = {
    save: "/modules",
    saveNew: "/modules",
  }

  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: "name",
      label: "Nome",
      required: true,
      maxLength: 60,
      gridXlColumns: 10,
      gridLgColumns: 10,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "disabled",
      label: "Inativo",
      type: 'boolean',
      gridXlColumns: 2,
      gridLgColumns: 2,
      gridMdColumns: 12,
      gridSmColumns: 12
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
