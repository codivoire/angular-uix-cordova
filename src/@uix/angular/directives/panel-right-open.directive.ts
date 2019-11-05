import { Directive, ElementRef, HostListener, Input } from "@angular/core";

import { PanelController } from "../providers/panel-controller";

@Directive({
  selector: "[uix-panel-right-open]"
})
export class PanelRightOpenDirective {
  constructor(private el: ElementRef, private panel: PanelController) {}

  @Input("uix-panel-right-open") animate = true;

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.panel.open("right");
  }
}
