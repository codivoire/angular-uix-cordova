import { Directive, ElementRef, HostListener, Input } from "@angular/core";

import { PanelController } from "../providers/panel-controller";

@Directive({
  selector: "[uix-panel-toggle]"
})
export class PanelToggleDirective {
  constructor(private el: ElementRef, private panel: PanelController) {}

  @Input("uix-panel-toggle") side?: string;
  @Input("uix-panel-toggle") animate = true;

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.panel.toggle();
  }
}
