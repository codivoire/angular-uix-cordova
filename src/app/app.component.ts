import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { StatusbarController } from "src/@uix/angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private statusbarCtrl: StatusbarController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusbarCtrl.init({
        enabled: true,
        overlay: this.platform.is("ios") ? true : false,
        iosOverlaysWebView: true,
        iosBackgroundColor: "#F7F7F8",
        iosTextColor: "#111111"
      });

      if (this.platform.is("cordova")) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }
}
