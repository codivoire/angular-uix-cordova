import { Directive, ElementRef, HostListener, Input } from "@angular/core";

import { PanelController } from "../providers/panel-controller";

@Directive({
  selector: "[uix-panel-right-close]"
})
export class PanelRightCloseDirective {
  constructor(private el: ElementRef, private panel: PanelController) {}

  @Input("uix-panel-right-close") animate = true;

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.panel.close("right");
  }
}
