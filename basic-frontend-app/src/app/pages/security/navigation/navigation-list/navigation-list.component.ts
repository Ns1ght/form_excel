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
  selector: "/navigation-list",
  templateUrl: ".//navigation-list.component.html",
})
export class NavigationListComponent implements OnInit {
  readonly serviceApi = `${environment.baseUrl}/navigations`
  readonly fields: Array<any> = [
    { property: "id", key: true, visible: false },
    { property: 'userName', label: 'Usuário' },
    { property: 'navigationDate', label: 'Data' },
    { property: 'route', label: 'Rota' },
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
        new: "/navigations/new",
        edit: "/navigations/edit/:id",
        remove: true,
        removeAll: true
      }
    } else {
      if (this.permissions.permitCreate) {
        actions.new = "/navigations/new"
      }
      if (this.permissions.permitUpdate) {
        actions.edit = "/navigations/edit/:id"
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
