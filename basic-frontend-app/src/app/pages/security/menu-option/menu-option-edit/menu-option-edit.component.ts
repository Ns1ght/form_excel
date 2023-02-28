import { Component, OnInit } from "@angular/core"
import { PoDynamicFormField } from "@po-ui/ng-components"
import { PoPageDynamicEditActions } from "@po-ui/ng-templates"
import { environment } from "src/environments/environment"

@Component({
  selector: "app-menu-option-edit",
  templateUrl: "./menu-option-edit.component.html",
  styleUrls: ["./menu-option-edit.component.scss"],
})
export class MenuOptionEditComponent implements OnInit {
  public readonly serviceApi = `${environment.baseUrl}/menu-options`

  public readonly actions: PoPageDynamicEditActions = {
    save: "/menu-options",
    saveNew: "/menu-options",
  }

  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: "moduleId",
      label: "Modulo",
      optionsService: `${environment.baseUrl}/modules/select`,
      required: true,
      gridXlColumns: 8,
      gridLgColumns: 8,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "sequence",
      label: "Sequência",
      required: true,
      maxLength: 20,
      gridXlColumns: 4,
      gridLgColumns: 4,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "label",
      label: "Título",
      required: true,
      maxLength: 60,
      gridXlColumns: 12,
      gridLgColumns: 12,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "route",
      label: "Rota",
      required: false,
      maxLength: 100,
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "icon",
      label: "Ícone",
      required: false,
      maxLength: 20,
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "key",
      label: "Modulo e Rota",
      required: false,
      maxLength: 255,
      gridXlColumns: 8,
      gridLgColumns: 8,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "disabled",
      label: "Inativo",
      type: 'boolean',
      gridXlColumns: 4,
      gridLgColumns: 4,
      gridMdColumns: 12,
      gridSmColumns: 12
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
