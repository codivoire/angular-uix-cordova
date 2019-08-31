import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { SettingsComponent } from "./pages/settings/settings.component";

export const ROUTING_COMPONENTS = [
  HomeComponent,
  AboutComponent,
  SettingsComponent
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
    path: "settings",
    component: SettingsComponent
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
