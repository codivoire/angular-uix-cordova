import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import {
  AlertController,
  ActionSheetController,
  ToastController,
  LoaderController
} from "src/@uix/angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  title = "Hybrid App";

  constructor(
    private alertCtl: AlertController,
    private toastCtl: ToastController,
    private asCtl: ActionSheetController,
    private loaderCtl: LoaderController
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  dialog() {
    this.alertCtl.fire({ title: this.title, text: "Hello !" });
  }

  toast() {}

  actionsheet() {}

  loader() {}
}
