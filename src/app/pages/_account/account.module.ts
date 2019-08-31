import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { UixModule } from "src/@uix/angular/core";
import { CoreModule } from "src/app/core/core.module";

import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";

export const routeList: Routes = [
  {
    path: "",
    component: ProfileComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeList),
    ReactiveFormsModule,
    CoreModule,
    UixModule
  ],
  providers: [],
  exports: AccountModule.COMPONENT_LIST,
  declarations: AccountModule.COMPONENT_LIST
})
export class AccountModule {
  static readonly COMPONENT_LIST = [LoginComponent, ProfileComponent];
}
