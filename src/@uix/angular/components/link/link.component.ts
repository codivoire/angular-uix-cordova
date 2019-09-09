import { Component, Input, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { HelperArray } from "../../helpers/array";

@Component({
  selector: "uix-link",
  template: `
    <a (click)="onClick()" class="link">
      <ng-content></ng-content>
    </a>
  `
})
export class UixLink {
  @Input() href = "#";
  @Input() external = false;
  @Input() params?: any;

  constructor(
    private element: ElementRef,
    private location: Location,
    private router: Router
  ) {
    const link = this.element.nativeElement;
    this.external = HelperArray.inArray("external", link.getAttributeNames());
  }

  onClick() {
    if (this.external) {
      this.location.go(this.href);
    } else {
      this.router.navigate([this.href], this.params);
    }
  }
}
