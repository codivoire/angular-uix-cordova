import Device from "./device";

class Support {
  platformClass: any;
  classNames: Array<string>;
  html: HTMLElement;

  constructor() {
    this.platformClass = {
      material: "uix-md",
      ios: "uix-ios"
    };

    this.classNames = [];
    this.html = document.querySelector("html");

    let pltClassName: string = this.platformClass.material;

    if (Device.android) {
      pltClassName = this.platformClass.material;
    }

    if (Device.ios) {
      pltClassName = this.platformClass.ios;
    }

    this.classNames.push(pltClassName);
  }

  init() {
    if (!this.html) {
      return;
    }

    const metaStatusbar: HTMLMetaElement = document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );

    if (
      Device.standalone &&
      Device.ios &&
      metaStatusbar &&
      metaStatusbar.content === "black-translucent"
    ) {
      this.classNames.push("device-full-viewport");
    }

    // Pixel Ratio
    this.classNames.push(`device-pixel-ratio-${Math.floor(Device.pixelRatio)}`);
    if (Device.pixelRatio >= 2) {
      this.classNames.push("device-retina");
    }

    // OS classes
    if (Device.os) {
      this.classNames.push(
        `device-${Device.os}`,
        `device-${Device.os}-${Device.osVersion.split(".")[0]}`,
        `device-${Device.os}-${Device.osVersion.replace(/\./g, "-")}`
      );
      if (Device.os === "ios") {
        const major = parseInt(Device.osVersion.split(".")[0], 10);
        for (let i = major - 1; i >= 6; i -= 1) {
          this.classNames.push(`device-ios-gt-${i}`);
        }
        if (Device.iphoneX) {
          this.classNames.push("device-iphone-x");
        }
      }
    } else if (Device.desktop) {
      this.classNames.push("device-desktop");

      if (Device.macos) {
        this.classNames.push("device-macos");
      } else if (Device.windows) {
        this.classNames.push("device-windows");
      }
    }

    if (Device.cordova || Device.phonegap) {
      this.classNames.push("device-cordova");
    }

    this.classNames.forEach(className => {
      this.html.classList.add(className);
    });
  }
}

export default new Support();
