import { Component, OnInit } from "@angular/core"

@Component({
  selector: "/estado-list",
  templateUrl: ".//estado-list.component.html",
})
export class EstadoListComponent implements OnInit {

  public initialFields = [
    { property: "id", key: true, visible: false },
    { property: 'nome', label: 'Nome' },
    { property: 'uf', label: 'UF' }
  ]

  constructor() { }

  ngOnInit() { }

}
