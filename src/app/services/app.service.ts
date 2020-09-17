import { Injectable } from "@angular/core";

import { PlatformProvider } from "src/@uix/angular/core";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private platform: PlatformProvider) {}

  isAndroid(): boolean {
    return this.platform.is("android");
  }

  isIos(): boolean {
    return this.platform.is("ios");
  }

  isCordova(): boolean {
    return this.platform.is("cordova");
  }

  exit() {
    this.platform.exitApp();
  }
}
