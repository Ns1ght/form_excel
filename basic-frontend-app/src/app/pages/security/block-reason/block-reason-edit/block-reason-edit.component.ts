import { Component, OnInit } from "@angular/core"
import { PoDynamicFormField } from "@po-ui/ng-components"
import { PoPageDynamicEditActions } from "@po-ui/ng-templates"
import { environment } from "src/environments/environment"

@Component({
  selector: "app-block-reason-edit",
  templateUrl: "./block-reason-edit.component.html",
  styleUrls: ["./block-reason-edit.component.scss"],
})
export class BlockReasonEditComponent implements OnInit {
  public readonly serviceApi = `${environment.baseUrl}/block-reasons`

  public readonly actions: PoPageDynamicEditActions = {
    save: "/block-reasons",
    saveNew: "/block-reasons",
  }

  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: "code",
      label: "Código",
      required: true,
      maxLength: 3,
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "description",
      label: "Descrição",
      required: true,
      maxLength: 60,
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "instructionsToSolve",
      label: "Instruções de Reset",
      required: false,
      maxLength: 255,
      gridXlColumns: 12,
      gridLgColumns: 12,
      gridMdColumns: 12,
      gridSmColumns: 12
    },
    {
      property: "isSolvedByPasswordReset",
      label: "Reset de Senha",
      type: 'boolean',
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 6,
      gridSmColumns: 6
    },
    {
      property: "disabled",
      label: "Inativo",
      type: 'boolean',
      gridXlColumns: 6,
      gridLgColumns: 6,
      gridMdColumns: 6,
      gridSmColumns: 6
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
