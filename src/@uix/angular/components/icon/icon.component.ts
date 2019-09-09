import { Component, Input, OnInit } from "@angular/core";
import { HelperDevice } from "../../helpers/device";

@Component({
  selector: "uix-icon",
  template: `
    <i class="icon-{{ plt }}-{{ name }}" *ngIf="!ios && !md"></i>
    <i class="icon-ios-{{ ios }} ios-only" *ngIf="ios"></i>
    <i class="icon-md-{{ md }} md-only" *ngIf="md"></i>
  `
})
export class UixIcon implements OnInit {
  @Input() name: string;
  @Input() ios?: string;
  @Input() md?: string;
  @Input() size?: number;

  plt = "md";

  constructor() {}

  ngOnInit() {
    this.plt = HelperDevice.is("ios") ? "ios" : "md";
  }
}
