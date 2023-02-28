import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { DefaultComponent } from "./_layouts/default/default.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { ProfileComponent } from './pages/authentication/profile/profile.component'
import { LoginComponent } from "./pages/authentication/login/login.component"
import { ResetPasswordComponent } from "./pages/authentication/reset-password/reset-password.component"
import { BlockReasonEditComponent } from "./pages/security/block-reason/block-reason-edit/block-reason-edit.component"
import { BlockReasonListComponent } from "./pages/security/block-reason/block-reason-list/block-reason-list.component"
import { UserGroupEditComponent } from "./pages/security/user-group/user-group-edit/user-group-edit.component"
import { UserGroupListComponent } from "./pages/security/user-group/user-group-list/user-group-list.component"
import { UserEditComponent } from "./pages/security/user/user-edit/user-edit.component"
import { UserListComponent } from "./pages/security/user/user-list/user-list.component"
import { ModuleEditComponent } from "./pages/security/module/module-edit/module-edit.component"
import { ModuleListComponent } from "./pages/security/module/module-list/module-list.component"
import { MenuOptionEditComponent } from "./pages/security/menu-option/menu-option-edit/menu-option-edit.component"
import { MenuOptionListComponent } from "./pages/security/menu-option/menu-option-list/menu-option-list.component"
import { ProfileEditComponent } from "./pages/security/profile/profile-edit/profile-edit.component"
import { ProfileListComponent } from "./pages/security/profile/profile-list/profile-list.component"
import { ProfileOptionEditComponent } from "./pages/security/profile-option/profile-option-edit/profile-option-edit.component"
import { ProfileOptionListComponent } from "./pages/security/profile-option/profile-option-list/profile-option-list.component"
import { UserProfileEditComponent } from "./pages/security/user-profile/user-profile-edit/user-profile-edit.component"
import { UserProfileListComponent } from "./pages/security/user-profile/user-profile-list/user-profile-list.component"
import { NavigationEditComponent } from "./pages/security/navigation/navigation-edit/navigation-edit.component"
import { NavigationListComponent } from "./pages/security/navigation/navigation-list/navigation-list.component"
import { EstadoEditComponent } from "./pages/common/estado/estado-edit/estado-edit.component"
import { EstadoListComponent } from "./pages/common/estado/estado-list/estado-list.component"
import { CidadeEditComponent } from "./pages/common/cidade/cidade-edit/cidade-edit.component"
import { CidadeListComponent } from "./pages/common/cidade/cidade-list/cidade-list.component"
import { NotAuthorizedComponent } from "./pages/security/not-authorized/not-authorized.component"
import { AuthGuard } from "./services/auth.guard"

// Componentes
const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "block-reasons",
        component: BlockReasonListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "block-reasons/new",
        component: BlockReasonEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "block-reasons/edit/:id",
        component: BlockReasonEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user-groups",
        component: UserGroupListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user-groups/new",
        component: UserGroupEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user-groups/edit/:id",
        component: UserGroupEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users",
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/new",
        component: UserEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/edit/:id",
        component: UserEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "modules",
        component: ModuleListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "modules/new",
        component: ModuleEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "modules/edit/:id",
        component: ModuleEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "menu-options",
        component: MenuOptionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "menu-options/new",
        component: MenuOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "menu-options/edit/:id",
        component: MenuOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profiles",
        component: ProfileListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profiles/new",
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profiles/edit/:id",
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile-options",
        component: ProfileOptionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile-options/new",
        component: ProfileOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile-options/edit/:id",
        component: ProfileOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users-profiles",
        component: UserProfileListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users-profiles/new",
        component: UserProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users-profiles/edit/:id",
        component: UserProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "navigations",
        component: NavigationListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "navigations/new",
        component: NavigationEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "navigations/edit/:id",
        component: NavigationEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados",
        component: EstadoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados/new",
        component: EstadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados/new/:id",
        component: EstadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados/edit/:id",
        component: EstadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados/view/:id",
        component: EstadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades",
        component: CidadeListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades/new",
        component: CidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades/new/:id",
        component: CidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades/edit/:id",
        component: CidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades/view/:id",
        component: CidadeEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "reset/:id",
    component: ResetPasswordComponent,
  },
  {
    path: "not-authorized",
    component: NotAuthorizedComponent
  },

  { path: "**", redirectTo: "/login" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
