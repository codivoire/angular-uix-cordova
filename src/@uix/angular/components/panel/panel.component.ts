import { Component, OnInit, ElementRef } from "@angular/core";

import { PanelController } from "../../providers/panel-controller";

@Component({
  selector: "uix-panel",
  template: `
    <ng-content></ng-content>
  `
})
export class UixPanel implements OnInit {
  constructor(private element: ElementRef, private panel: PanelController) {}

  ngOnInit() {
    this.panel.init(this.element.nativeElement);
  }
}
