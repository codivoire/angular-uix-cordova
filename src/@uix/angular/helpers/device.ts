type DeviceCheckable =
  | "ios"
  | "android"
  | "cordova"
  | "webview"
  | "desktop"
  | "tablet"
  | "mobile"
  | "windows"
  | "ipad"
  | "iphone"
  | "ipod";

export namespace HelperDevice {
  function detect() {
    const device: any = {};

    device.isWebView = () => {
      return !window["cordova"];
    };

    device.ios = () => {
      return device.iphone() || device.ipod() || device.ipad();
    };

    device.iphone = () => {
      return !device.windows() && find("iphone");
    };

    device.ipod = () => {
      return find("ipod");
    };

    device.ipad = () => {
      return find("ipad");
    };

    device.android = () => {
      return !device.windows() && find("android");
    };

    device.windows = () => {
      return find("windows");
    };

    device.mobile = () => {
      return (
        device.androidPhone() ||
        device.iphone() ||
        device.ipod() ||
        device.windowsPhone()
      );
    };

    device.tablet = () => {
      return device.ipad() || device.androidTablet() || device.windowsTablet();
    };

    device.desktop = () => {
      return !device.tablet() && !device.mobile();
    };

    device.androidPhone = () => {
      return device.android() && find("mobile");
    };

    device.androidTablet = () => {
      return device.android() && !find("mobile");
    };

    device.windowsPhone = () => {
      return device.windows() && find("phone");
    };

    device.windowsTablet = () => {
      return device.windows() && (find("touch") && !device.windowsPhone());
    };

    return device;
  }

  function find(needle: string): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.indexOf(needle.toLowerCase()) !== -1;
  }

  export const IOS = "ios";
  export const ANDROID = "android";
  export const WINDOWS_PHONE = "windowsphone";
  export const EDGE = "edge";
  export const CROSSWALK = "crosswalk";

  export function is(needle: DeviceCheckable) {
    const d: any = detect();

    if (needle === "cordova") {
      return window["cordova"] && typeof window["cordova"] !== "undefined";
    }

    if (needle === "webview") {
      return d.isWebView();
    }

    if (needle === "desktop") {
      return !d.tablet() && !d.mobile();
    }

    if (needle === "tablet") {
      return d.tablet();
    }

    if (needle === "mobile") {
      return d.mobile();
    }

    if (needle === "ios") {
      return d.ios();
    }

    if (needle === "iphone") {
      return d.iphone();
    }

    if (needle === "ipod") {
      return d.ipod();
    }

    if (needle === "ipad") {
      return d.ipad();
    }

    if (needle === "android") {
      return d.android();
    }

    if (needle === "windows") {
      return d.windows();
    }
  }

  export function width() {
    return window.innerWidth;
  }

  export function height() {
    return window.innerHeight;
  }

  /**
   * Detect if landscape mode.
   */
  export function isLandscape(): boolean {
    if (
      screen.orientation &&
      Object.prototype.hasOwnProperty.call(window, "onorientationchange")
    ) {
      return screen.orientation.type.includes("landscape");
    }

    return window.innerHeight / window.innerWidth < 1;
  }

  /**
   * Detect if portrait mode.
   */
  export function isPortrait(): boolean {
    if (
      screen.orientation &&
      Object.prototype.hasOwnProperty.call(window, "onorientationchange")
    ) {
      return screen.orientation.type.includes("portrait");
    }

    return window.innerHeight / window.innerWidth > 1;
  }
}
