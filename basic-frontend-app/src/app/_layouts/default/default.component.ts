import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PoMenuItem, PoToolbarAction } from '@po-ui/ng-components'
import { AppFunctionService } from 'src/app/services/app-function.service'
import { AuthService } from 'src/app/services/auth.service'
import { RestService } from 'src/app/services/rest.service'
import { PermService } from 'src/app/services/perm.service'

interface ISubMenuProps {
  id: string
  icon: string
  text: string
  route: string
  permitAll: boolean
  permitCreate: boolean
  permitRestore: boolean
  permitUpdate: boolean
  permitDelete: boolean
}

interface IMenuProps {
  id: string
  icon: string
  route: string
  text: string
  subMenuOptions?: ISubMenuProps[]
}

interface IPostMenuResponse {
  statusCode: number
  data: IMenuProps[]
}

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  public menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      shortLabel: 'Home',
      icon: 'fa-solid fa-house-chimney',
      action: () => this.router.navigate(['home'])
    }
  ]

  public actions: Array<PoToolbarAction> = [
    {
      label: "Perfil",
      icon: "fa-solid fa-user",
      disabled: true,
      action: () => this.router.navigate(['profile'])
    },
    {
      label: "Sair",
      icon: "fa-solid fa-door-open",
      action: () => this.authService.signOut(),
    }
  ]

  constructor(
    public appFunc: AppFunctionService,
    public router: Router,
    private authService: AuthService,
    private restService: RestService,
    private permService: PermService
  ) { }

  ngOnInit(): void {
    this.restService.post('/users-security/get-menu', {}).subscribe({
      next: (response: IPostMenuResponse) => {
        this.permService.savePermissions(response.data)
        this.renderMenu(response.data)
      },
      error: (error) => console.log(error)
    })
  }

  renderMenu(menuList: IMenuProps[]) {
    menuList.map(menu => {
      if (menu.route === "") {
        this.menus.push({
          label: menu.text,
          shortLabel: menu.text,
          icon: menu.icon,
          subItems: this.renderSubMenu(menu.subMenuOptions)
        })
      } else {
        this.menus.push({
          label: menu.text,
          shortLabel: menu.text,
          icon: menu.icon,
          action: () => this.router.navigate([`${menu.route}`])
        })
      }
    })
  }

  renderSubMenu(subMenuList: ISubMenuProps[]): PoMenuItem[] {
    const subMenus = []

    subMenuList.map(subMenu => {
      if (
        subMenu.permitAll ||
        subMenu.permitCreate ||
        subMenu.permitRestore ||
        subMenu.permitUpdate ||
        subMenu.permitDelete
      ) {
        subMenus.push({
          label: subMenu.text,
          icon: subMenu.icon,
          action: () => this.router.navigate([`${subMenu.route}`])
        })
      }      
    })

    return subMenus
  }
}
