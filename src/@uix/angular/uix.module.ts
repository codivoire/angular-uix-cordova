import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BackDirective } from "./directives/back.directive";

import { AppComponent } from "./components/app/app.component";
import { ViewComponent } from "./components/view/view.component";
import { StatusbarComponent } from "./components/statusbar/statusbar.component";

import { PageComponent } from "./components/page/page.component";
import { PageContentComponent } from "./components/page/page-content.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NavbarInnerComponent } from "./components/navbar/navbar-inner.component";
import { NavbarLeftComponent } from "./components/navbar/navbar-left.component";
import { NavbarRightComponent } from "./components/navbar/navbar-right.component";
import { NavbarTitleComponent } from "./components/navbar/navbar-title.component";

import { RatingComponent } from "./components/rating/rating.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: UixModule.COMPONENT_LIST,
  exports: UixModule.COMPONENT_LIST
})
export class UixModule {
  static readonly COMPONENT_LIST = [
    BackDirective,
    AppComponent,
    ViewComponent,
    StatusbarComponent,
    PageComponent,
    PageContentComponent,
    NavbarComponent,
    NavbarInnerComponent,
    NavbarLeftComponent,
    NavbarRightComponent,
    NavbarTitleComponent,
    RatingComponent
  ];
}
