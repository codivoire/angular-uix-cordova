import { Injectable } from "@angular/core";
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private platform: Platform) {}

  isAndroid(): boolean {
    return this.platform.is("android");
  }

  isIos(): boolean {
    return this.platform.is("ios");
  }

  isCordova(): boolean {
    return this.platform.is("cordova");
  }
}
