import { Component } from "@angular/core";

@Component({
  selector: "uix-icon-back",
  template: `
    <a uix-back class="link back">
      <i class="icon-back"> </i>
      <span class="ios-only">
        <ng-content></ng-content>
      </span>
    </a>
  `
})
export class UixIconBack {}
