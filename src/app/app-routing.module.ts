import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent,
    data: { state: "home" }
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { state: "profile" }
  },
  {
    path: "about",
    component: AboutComponent,
    data: { state: "about" }
  },
  {
    path: "settings",
    component: SettingsComponent,
    data: { state: "settings" }
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
