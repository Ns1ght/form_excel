import { Component, HostListener, OnInit } from "@angular/core"
import { PoPageDynamicTableActions } from "@po-ui/ng-templates"
import { ActivatedRoute } from '@angular/router'
import { PermService } from 'src/app/services/perm.service'
import { environment } from "src/environments/environment"

interface IPermissionsDTO {
  permitAll: boolean
  permitCreate: boolean
  permitRestore: boolean
  permitUpdate: boolean
  permitDelete: boolean
}

@Component({
  selector: "/module-list",
  templateUrl: ".//module-list.component.html",
})
export class ModuleListComponent implements OnInit {
  readonly serviceApi = `${environment.baseUrl}/modules`
  readonly fields: Array<any> = [
    { property: "id", key: true, visible: false },
    { property: 'name', label: 'Nome' },
  ]
  public permissions: IPermissionsDTO
  public actions: PoPageDynamicTableActions
  public listHeight: number

  constructor(private activatedRoute: ActivatedRoute, private permService: PermService) {}

  ngOnInit() {
    this.permissions = this.permService.getPermissions(this.activatedRoute.snapshot.routeConfig.path)

    let actions = JSON.parse('{}')

    if (this.permissions.permitAll) {
      this.actions = {
        new: "/modules/new",
        edit: "/modules/edit/:id",
        remove: true,
        removeAll: true
      }
    } else {
      if (this.permissions.permitCreate) {
        actions.new = "/modules/new"
      }
      if (this.permissions.permitUpdate) {
        actions.edit = "/modules/edit/:id"
      }
      if (this.permissions.permitDelete) {
        actions.remove = true
        actions.removeAll = true
      }

      this.actions = actions
    }

    this.listHeight = window.innerHeight - 230
  }
  
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.listHeight = window.innerHeight - 230
  }
}
