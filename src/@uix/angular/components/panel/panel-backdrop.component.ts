import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "uix-panel-backdrop",
  template: `
    <span>ok!</span>
    <ng-content></ng-content>
  `
})
export class UixPanelBackdrop implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit() {}
}
