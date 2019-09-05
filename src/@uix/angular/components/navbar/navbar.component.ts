import { Component } from "@angular/core";

@Component({
  selector: "uix-navbar",
  template: `
    <uix-navbar-inner>
      <ng-content></ng-content>
    </uix-navbar-inner>
  `
})
export class UixNavbar {}
