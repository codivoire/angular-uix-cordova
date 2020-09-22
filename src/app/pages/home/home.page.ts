import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AlertController, LoaderController } from "src/@uix/angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  title = "Hybrid App";

  constructor(
    private alert: AlertController,
    private loader: LoaderController
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  dialog() {
    this.alert.present({ title: this.title, text: "Hello !" });
  }

  preload() {}
}
