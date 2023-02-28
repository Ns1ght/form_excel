import { Component, OnInit } from "@angular/core"

@Component({
  selector: "/cidade-list",
  templateUrl: ".//cidade-list.component.html",
})
export class CidadeListComponent implements OnInit {

  public initialFields = [
    { property: "id", key: true, visible: false },
    { property: 'nome', label: 'Nome' },
    { property: 'estadoUf', label: 'UF' },
  ]

  constructor() { }

  ngOnInit() { }

}
