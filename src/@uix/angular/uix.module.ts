import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BackDirective } from "./directives/back.directive";
import { PanelToggleDirective } from "./directives/panel-toggle.directive";
import { PanelLeftOpenDirective } from "./directives/panel-left-open.directive";
import { PanelRightOpenDirective } from "./directives/panel-right-open.directive";
import { PanelLeftCloseDirective } from "./directives/panel-left-close.directive";
import { PanelRightCloseDirective } from "./directives/panel-right-close.directive";

import { UixApp } from "./components/app/app.component";
import { UixView } from "./components/view/view.component";
import { UixStatusbar } from "./components/statusbar/statusbar.component";
import { UixPanel } from "./components/panel/panel.component";
import { UixPanelBackdrop } from "./components/panel/panel-backdrop.component";
import { UixPage } from "./components/page/page.component";
import { UixPageContent } from "./components/page/page-content.component";
import { UixNavbar } from "./components/navbar/navbar.component";
import { UixNavbarInner } from "./components/navbar/navbar-inner.component";
import { UixNavbarLeft } from "./components/navbar/navbar-left.component";
import { UixNavbarRight } from "./components/navbar/navbar-right.component";
import { UixNavbarTitle } from "./components/navbar/navbar-title.component";
import { UixRating } from "./components/rating/rating.component";

import { PanelProvider } from "./providers/panel";
import { StatusbarProvider } from "./providers/statusbar";
import { PlatformProvider } from "./providers/platform";

const DIRECTIVES = [
  BackDirective,
  PanelToggleDirective,
  PanelLeftOpenDirective,
  PanelRightOpenDirective,
  PanelLeftCloseDirective,
  PanelRightCloseDirective
];

const PROVIDERS = [PanelProvider, StatusbarProvider, PlatformProvider];

const DECLARATIONS = [
  ...DIRECTIVES,
  UixApp,
  UixView,
  UixStatusbar,
  UixPanel,
  UixPanelBackdrop,
  UixPage,
  UixPageContent,
  UixNavbar,
  UixNavbarInner,
  UixNavbarLeft,
  UixNavbarRight,
  UixNavbarTitle,
  UixRating
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: PROVIDERS
})
export class UixModule {}
