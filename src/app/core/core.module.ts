import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoaderComponent } from "./loader/loader.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: CoreModule.COMPONENT_LIST,
  exports: CoreModule.COMPONENT_LIST
})
export class CoreModule {
  static readonly COMPONENT_LIST = [LoaderComponent];
}
