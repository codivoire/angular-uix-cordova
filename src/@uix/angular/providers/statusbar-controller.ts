import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import Device from "../utils/device";

declare let window: any;

export class StatusbarOptions {
  enabled = false;
  overlay?: string | boolean = "auto";

  iosOverlaysWebView? = false;
  iosTextColor? = "black";
  iosBackgroundColor? = "white";

  androidOverlaysWebView? = false;
  androidTextColor? = "black";
  androidBackgroundColor? = "white";
}

@Injectable({
  providedIn: "root"
})
export class StatusbarController {
  private params: StatusbarOptions;
  private backgroundColorState: Subject<string>;

  constructor() {
    this.params = new StatusbarOptions();
    this.backgroundColorState = new Subject();
  }

  hide() {
    document.querySelector("html").classList.remove("with-statusbar");
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
  }

  show() {
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.show();

      if (Device.needsStatusbarOverlay()) {
        document.querySelector("html").classList.add("with-statusbar");
      }

      return;
    }

    document.querySelector("html").classList.add("with-statusbar");
  }

  setTextColor(color: string) {
    if (Device.cordova && window.StatusBar) {
      if (color === "white") {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  }

  setIosTextColor(color: string) {
    if (!Device.ios) {
      return;
    }

    this.setTextColor(color);
  }

  setBackgroundColor(color: string) {
    this.backgroundColorState.next(color);

    if (Device.cordova && window.StatusBar) {
      window.StatusBar.backgroundColorByHexString(color);
    }
  }

  isVisible() {
    if (Device.cordova && window.StatusBar) {
      return window.StatusBar.isVisible;
    }
    return false;
  }

  overlaysWebView(overlays = true) {
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.overlaysWebView(overlays);

      if (overlays) {
        document.querySelector("html").classList.add("with-statusbar");
      } else {
        document.querySelector("html").classList.remove("with-statusbar");
      }
    }
  }

  checkOverlay() {
    if (Device.needsStatusbarOverlay()) {
      document.querySelector("html").classList.add("with-statusbar");
    } else {
      document.querySelector("html").classList.remove("with-statusbar");
    }
  }

  init(params: StatusbarOptions) {
    params = Object.assign({}, this.params, params);

    if (!params.enabled) {
      return;
    }

    if (params.overlay === "auto") {
      if (Device.needsStatusbarOverlay()) {
        document.querySelector("html").classList.add("with-statusbar");
      } else {
        document.querySelector("html").classList.remove("with-statusbar");
      }

      console.log(Device.needsStatusbarOverlay());

      if (Device.ios && (Device.cordova || Device.webView)) {
        window.addEventListener(
          "orientationchange",
          () => {
            this.checkOverlay();
          },
          false
        );
      }
    } else if (params.overlay === true) {
      document.querySelector("html").classList.add("with-statusbar");
    } else if (params.overlay === false) {
      document.querySelector("html").classList.remove("with-statusbar");
    }

    if (Device.cordova && window.StatusBar) {
      if (Device.ios) {
        if (params.iosOverlaysWebView) {
          window.StatusBar.overlaysWebView(true);
        } else {
          window.StatusBar.overlaysWebView(false);
        }

        if (params.iosTextColor === "white") {
          window.StatusBar.styleLightContent();
        } else {
          window.StatusBar.styleDefault();
        }
      }

      if (Device.android) {
        if (params.androidOverlaysWebView) {
          window.StatusBar.overlaysWebView(true);
        } else {
          window.StatusBar.overlaysWebView(false);
        }

        if (params.androidTextColor === "white") {
          window.StatusBar.styleLightContent();
        } else {
          window.StatusBar.styleDefault();
        }
      }
    }

    if (params.iosBackgroundColor && Device.ios) {
      this.setBackgroundColor(params.iosBackgroundColor);
    }

    if (params.androidBackgroundColor && Device.android) {
      this.setBackgroundColor(params.androidBackgroundColor);
    }
  }

  backgroundColorChange() {
    return this.backgroundColorState.asObservable();
  }
}
