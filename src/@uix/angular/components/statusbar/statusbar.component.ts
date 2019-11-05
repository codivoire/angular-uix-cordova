import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { StatusbarController } from "../../providers/statusbar-controller";

@Component({
  selector: "uix-statusbar",
  template: `
    <div class="statusbar" [style.backgroundColor]="backgroundColor"></div>
  `
})
export class UixStatusbar implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  backgroundColor = "transparent";

  constructor(private statusbar: StatusbarController) {}

  ngOnInit() {
    const sub = this.statusbar
      .backgroundColorChange()
      .subscribe((color: string) => {
        this.backgroundColor = color;
      });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
