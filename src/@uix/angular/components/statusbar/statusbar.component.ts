import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { Subscription } from "rxjs";

import { StatusbarProvider } from "src/@uix/angular/providers/statusbar";

@Component({
  selector: "uix-statusbar",
  template: `
    <ng-content></ng-content>
  `
})
export class UixStatusbar implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions: Subscription[] = [];

  constructor(
    private element: ElementRef,
    private statusbar: StatusbarProvider
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const sub = this.statusbar
      .backgroundColorChange()
      .subscribe((color: string) => {
        this.element.nativeElement.style.backgroundColor = color;
      });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
