import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { SettingComponent } from "./pages/setting/setting.component";

export const ROUTING_COMPONENTS = [
  HomeComponent,
  AboutComponent,
  SettingComponent
];

export const APP_ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "setting",
    component: SettingComponent
  },
  {
    path: "account",
    loadChildren: "src/app/pages/_account/account.module#AccountModule"
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
