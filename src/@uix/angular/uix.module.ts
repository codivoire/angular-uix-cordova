import { NgModule, InjectionToken } from "@angular/core";
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
import { UixIcon } from "./components/icon/icon.component";
import { UixIconBack } from "./components/icon/icon-black.component";
import { UixLink } from "./components/link/link.component";
import { UixBlock } from "./components/block/block.component";
import { UixBlockTitle } from "./components/block/block-title.component";
import { UixBlockHeader } from "./components/block/block-header.component";
import { UixBlockFooter } from "./components/block/block-footer.component";
import { UixContainer } from "./components/app/container.component";
import { UixScaffoldCenter } from "./components/scaffold/scaffold-center.component";

import { UixRating } from "./components/rating/rating.component";

import { PlatformProvider } from "./providers/platform";
import { PanelController } from "./providers/panel-controller";
import { StatusbarController } from "./providers/statusbar-controller";
import { AlertController } from "./providers/alert-controller";
import { PopoverController } from "./providers/popover-controller";

import { RelativeDatePipe } from "./pipes/relativedate.pipe";
import { CapitalizePipe } from "./pipes/capitalize.pipe";
import { TruncatePipe } from "./pipes/truncate.pipe";
import { HumanTimePipe } from "./pipes/human-time.pipe";
import { ToastController } from "./providers/toast-controller";
import { LoaderController } from "./providers/loader-controller";
import { ActionSheetController } from "./providers/action-sheet-controller";

export interface UixOptions {
  [key: string]: any;
}

export const UIX_OPTIONS = new InjectionToken<UixOptions>('uix.options');

const DIRECTIVES = [
  BackDirective,
  PanelToggleDirective,
  PanelLeftOpenDirective,
  PanelRightOpenDirective,
  PanelLeftCloseDirective,
  PanelRightCloseDirective
];

const PROVIDERS = [
  PlatformProvider,
  StatusbarController,
  AlertController,
  PanelController,
  PopoverController,
  ToastController,
  ActionSheetController,
  LoaderController
];

const DECLARATIONS = [
  ...DIRECTIVES,
  UixRating,
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
  UixBlock,
  UixBlockTitle,
  UixBlockHeader,
  UixBlockFooter,
  UixLink,
  UixIcon,
  UixIconBack,
  UixScaffoldCenter,
  UixContainer,

  // Pipes
  RelativeDatePipe,
  CapitalizePipe,
  TruncatePipe,
  HumanTimePipe
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: PROVIDERS
})
export class UixModule {
  static initialize(options: UixOptions = {}) {
    return {
      ngModule: UixModule,
      providers: [
        { provide: UIX_OPTIONS, useValue: options }
      ]
    };
  }
}
