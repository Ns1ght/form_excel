import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PoComboOption, PoDialogService, PoNotification, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import { environment } from 'src/environments/environment'

import { RestService } from './../../../../services/rest.service'

interface IResponseProps {
  statusCode: number
  data: Array<any>
}

interface IMenuItemProps {
  menuOptionKey: string
  menuOptionName: string
  permitAll: boolean
  permitCreate: boolean
  permitDelete: boolean
  permitRestore: boolean
  permitUpdate: boolean
  disabled: boolean
}

interface IMenuOptionProps {
  menuOptionKey: string
  menuOptionName: string
  data: IMenuItemProps[]
}

interface ISubmitDataProps {
  userGroupId: string
  name: string
  disabled: boolean
  menuOptions: IMenuOptionProps[]
}

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"],
})
export class ProfileEditComponent implements OnInit {
  public readonly serviceApiUserGroup = `${environment.baseUrl}/user-groups/select`

  public id: string
  public userProfile: ISubmitDataProps

  public empty: {}
  public userGroupsList: Array<PoComboOption> = []
  public menuOptionsList: Array<any>
  public menuItems = []
  public currentOptionName: string = ""
  public currentOptionKey: string = ""
  public getProfileMenuOptionsList: Array<any> = []
  public getProfileMenuItems = []
  public getProfileCurrentOptionName: string = ""
  public getProfileCurrentOptionKey: string = ""
  public getProfileUserProfile
  public itemFiltered

  public formErrorNotification: PoNotification = {
    message: "Formulário precisa ser preenchido corretamente.",
    duration: 4000,
  }

  public readonly pageActions: Array<PoPageAction> = [
    {
      label: "Salvar",
      action: () => {
        if (this.checkoutForm.valid) {
          this.onSubmit(this.checkoutForm.value)
          this.router.navigate(["profiles"])
        } else {
          this.poNotification.warning(this.formErrorNotification)
        }
      },
    },
    {
      label: "Salvar e novo",
      action: () => {
        if (this.checkoutForm.valid) {
          this.onSubmit(this.checkoutForm.value)
          this.checkoutForm.reset()
          this.router.navigate(["profiles/new"])
        }
      },
    },
    {
      label: "Cancelar",
      action: this.cancel.bind(this),
    },
  ]

  public checkoutForm: FormGroup = this.formBuilder.group({
    userGroupId: ["", Validators.required, ],
    name: ["", Validators.required],
    disabled: false,
    menuOptions: this.formBuilder.array([]),
  })

  constructor(
    private restService: RestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private poDialogService: PoDialogService,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    if (this.id) {
      this.getUserProfile(this.id)
    } else {
      this.getMenuOptionsList()
    }
  }

  getMenuOptionsList() {
    this.restService.post("/menu-options/all", this.empty).subscribe({
      next: (response: IResponseProps) => {
        this.menuOptionsList = response.data

        this.menuOptionsList.map((menuOption) => {
          if (menuOption.moduleName !== this.currentOptionName) {
            if (this.currentOptionName !== "") {
              const newMenuOption = this.formBuilder.group({
                menuOptionName: this.currentOptionName,
                menuOptionKey: this.currentOptionKey,
                data: this.formBuilder.array(this.menuItems),
              })

              this.menuOptions.push(newMenuOption)
            }

            this.menuItems = []
            this.currentOptionName = menuOption.moduleName
            this.currentOptionKey = menuOption.key
          } else {
            if (this.getProfileUserProfile !== undefined) {
              this.itemFiltered = this.getProfileUserProfile.menuOptions.find(
                (item) => item.key === menuOption.key
              )

              const newMenuItem = this.formBuilder.group({
                menuOptionName: menuOption.label,
                menuOptionKey: menuOption.key,
                permitAll: this.itemFiltered.permitAll === null ? false : this.itemFiltered.permitAll,
                permitCreate: this.itemFiltered.permitCreate === null ? false : this.itemFiltered.permitCreate,
                permitDelete: this.itemFiltered.permitDelete === null ? false : this.itemFiltered.permitDelete,
                permitRestore: this.itemFiltered.permitRestore === null ? false : this.itemFiltered.permitRestore,
                permitUpdate: this.itemFiltered.permitUpdate === null ? false : this.itemFiltered.permitUpdate,
                disabled: this.itemFiltered.disabled === null ? false : this.itemFiltered.disabled,
              })

              this.menuItems.push(newMenuItem)
            } else {
              const newMenuItem = this.formBuilder.group({
                menuOptionName: menuOption.label,
                menuOptionKey: menuOption.key,
                permitAll: false,
                permitCreate: false,
                permitDelete: false,
                permitRestore: false,
                permitUpdate: false,
                disabled: false,
              })

              this.menuItems.push(newMenuItem)
            }
          }
        })

        const newMenuOption = this.formBuilder.group({
          menuOptionName: this.currentOptionName,
          menuOptionKey: this.currentOptionKey,
          data: this.formBuilder.array(this.menuItems),
        })

        this.menuOptions.push(newMenuOption)
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

  get menuOptions() {
    return this.checkoutForm.controls["menuOptions"] as FormArray
  }

  getUserProfile(id: string) {
    this.restService
      .get(`/profiles/${id}`)
      .subscribe({
        next: (result) => {
          this.getProfileUserProfile = result
          this.checkoutForm.patchValue({
            userGroupId: result.userGroupId,
            name: result.name,
            disabled: result.disabled,
          })
        },
      })
      .add(() => this.getMenuOptionsList())
  }

  onSubmit(data: ISubmitDataProps) {
    if (this.id) {
      this.restService.put(`/profiles/${this.id}`, data).subscribe({
        next: () => { },
        error: (error) => console.log(error),
      })
    } else {
      this.restService.post("/profiles", data).subscribe({
        next: () => { },
        error: (error) => console.log(error),
      })
    }
  }

  cancel() {
    if (this.checkoutForm && this.checkoutForm.dirty) {
      this.poDialogService.confirm({
        message: "Tem certeza que deseja cancelar esta operação?",
        title: "Cancelar",
        confirm: this.goBack.bind(this),
      })
    } else {
      this.goBack()
    }
  }

  goBack() {
    this.router.navigate(["profiles"])
  }
}
