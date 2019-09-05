import { Directive, ElementRef, HostListener, Input } from "@angular/core";

import { PanelProvider } from "../providers/panel";

@Directive({
  selector: "[uix-panel-toggle]"
})
export class PanelToggleDirective {
  constructor(private el: ElementRef, private panel: PanelProvider) {}

  @Input("uix-panel-toggle") side?: string;
  @Input("uix-panel-toggle") animate = true;

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.panel.toggle();
  }
}
