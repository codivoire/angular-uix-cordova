import { Directive, ElementRef, HostListener, Input } from "@angular/core";

import { PanelProvider } from "../providers/panel";

@Directive({
  selector: "[uix-panel-left-open]"
})
export class PanelLeftOpenDirective {
  constructor(private el: ElementRef, private panel: PanelProvider) {}

  @Input("uix-panel-left-open") animate = true;

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.panel.open("left");
  }
}
