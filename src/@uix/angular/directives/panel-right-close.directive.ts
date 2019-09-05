import { Directive, ElementRef, HostListener, Input } from "@angular/core";

import { PanelProvider } from "../providers/panel";

@Directive({
  selector: "[uix-panel-right-close]"
})
export class PanelRightCloseDirective {
  constructor(private el: ElementRef, private panel: PanelProvider) {}

  @Input("uix-panel-right-close") animate = true;

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.panel.close("right");
  }
}
