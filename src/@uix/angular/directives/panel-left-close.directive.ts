import { Directive, ElementRef, HostListener, Input } from "@angular/core";

import { PanelController } from "../providers/panel-controller";

@Directive({
  selector: "[uix-panel-left-close]"
})
export class PanelLeftCloseDirective {
  constructor(private el: ElementRef, private panel: PanelController) {}

  @Input("uix-panel-left-close") animate = true;

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.panel.close("left");
  }
}
