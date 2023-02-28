import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class PermService {
  private temp: string[] = []

  constructor() { }

  savePermissions(menuItems: IMenuProps[]) {
    this.temp = []
    
    menuItems.map(menuItem => {
      menuItem.subMenuOptions.map(subMenuItem => {
        const permitAll = subMenuItem.permitAll ? '1' : '0'
        const permitCreate = subMenuItem.permitCreate ? '1' : '0'
        const permitRestore = subMenuItem.permitRestore ? '1' : '0'
        const permitUpdate = subMenuItem.permitUpdate ? '1' : '0'
        const permitDelete = subMenuItem.permitDelete ? '1' : '0'

        const permitInHex = String(parseInt(
          permitAll +
          permitCreate +
          permitRestore +
          permitUpdate +
          permitDelete
        , 2)).padStart(2, '0')

        this.temp.push(
          btoa(subMenuItem.route.slice(1)) +
          permitInHex
        )
      })
    })
    
    localStorage.removeItem("@febra:temp")
    localStorage.setItem("@febra:temp", JSON.stringify(this.temp))
  }

  getPermissions(route: string) {
    const permissions = JSON.parse(localStorage.getItem("@febra:temp"))
    const routePermissions = permissions.find((item: string) => item.slice(0, -2) === btoa(route))
    const binaryPermissions = Number(routePermissions.slice(-2)).toString(2).padStart(5, '0')
    const pagePermissions = {
      permitAll: binaryPermissions[0] === '1' ? true : false,
      permitCreate: binaryPermissions[1] === '1' ? true : false,
      permitRestore: binaryPermissions[2] === '1' ? true : false,
      permitUpdate: binaryPermissions[3] === '1' ? true : false,
      permitDelete: binaryPermissions[4] === '1' ? true : false
    }
    return pagePermissions
  }
}
