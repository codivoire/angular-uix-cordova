class Device {
  platform: string;
  os: string;
  osVersion: string;
  ua: string;
  ios: RegExpMatchArray | boolean;
  cordova: RegExpMatchArray | boolean;
  androidChrome: boolean;
  phonegap: boolean;
  screenWidth: number;
  screenHeight: number;
  windowsPhone: RegExpMatchArray | boolean;
  android: RegExpMatchArray | boolean;
  ipod: RegExpMatchArray | boolean;
  ipad: RegExpMatchArray | boolean;
  iphone: RegExpMatchArray | boolean;
  iphoneX: RegExpMatchArray | boolean;
  ie: RegExpMatchArray | boolean;
  edge: RegExpMatchArray | boolean;
  firefox: RegExpMatchArray | boolean;
  macos: RegExpMatchArray | boolean;
  windows: RegExpMatchArray | boolean;
  standalone: RegExpMatchArray | boolean;
  webView: RegExpMatchArray | boolean;
  desktop: RegExpMatchArray | boolean;
  minimalUi: RegExpMatchArray | boolean;
  statusbar: RegExpMatchArray | boolean;
  pixelRatio: number;

  constructor() {
    this.platform = window.navigator.platform;
    this.ua = window.navigator.userAgent;

    this.cordova = !!(window["cordova"]);

    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;

    this.windowsPhone = this.ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    this.android = this.ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    this.ipad = this.ua.match(/(iPad).*OS\s([\d_]+)/);
    this.ipod = this.ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    this.iphone = !this.ipad && this.ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    this.iphoneX =
      this.iphone &&
      ((this.screenWidth === 375 && this.screenHeight === 812) || // X/XS
        (this.screenWidth === 414 && this.screenHeight === 896)); // XR / XS Max
    this.ie = this.ua.indexOf("MSIE ") >= 0 || this.ua.indexOf("Trident/") >= 0;
    this.edge = this.ua.indexOf("Edge/") >= 0;
    this.firefox =
      this.ua.indexOf("Gecko/") >= 0 && this.ua.indexOf("Firefox/") >= 0;
    this.macos = this.platform === "MacIntel";
    this.windows = this.platform === "Win32";

    // Windows
    if (this.windowsPhone) {
      this.os = "windows";
      this.osVersion = this.windowsPhone[2];
      this.windowsPhone = true;
    }
    // Android
    if (this.android && !this.windows) {
      this.os = "android";
      this.osVersion = this.android[2];
      this.android = true;
      this.androidChrome = this.ua.toLowerCase().indexOf("chrome") >= 0;
    }
    if (this.ipad || this.iphone || this.ipod) {
      this.os = "ios";
      this.ios = true;
    }
    // iOS
    if (this.iphone && !this.ipod) {
      this.osVersion = this.iphone[2].replace(/_/g, ".");
      this.iphone = true;
      this.iphoneX = this.iphoneX;
    }
    if (this.ipad) {
      this.osVersion = this.ipad[2].replace(/_/g, ".");
      this.ipad = true;
    }
    if (this.ipod) {
      this.osVersion = this.ipod[3] ? this.ipod[3].replace(/_/g, ".") : null;
      this.iphone = true;
    }
    // iOS 8+ changed UA
    if (this.ios && this.osVersion && this.ua.indexOf("Version/") >= 0) {
      if (this.osVersion.split(".")[0] === "10") {
        this.osVersion = this.ua
          .toLowerCase()
          .split("version/")[1]
          .split(" ")[0];
      }
    }

    // Webview
    this.webView =
      !!(
        (this.iphone || this.ipad || this.ipod) &&
        this.ua.match(/.*AppleWebKit(?!.*Safari)/i)
      ) ||
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches);
    this.standalone = this.webView;

    // Desktop
    this.desktop = !(this.os || this.android || this.webView);
    if (this.desktop) {
      this.macos = this.macos;
      this.windows = this.windows;
    }

    // Minimal UI
    if (this.os && this.os === "ios") {
      const osVersionArr: any = this.osVersion.split(".");
      const metaViewport = document.querySelector('meta[name="viewport"]');
      this.minimalUi =
        !this.webView &&
        (this.ipod || this.iphone) &&
        (osVersionArr[0] * 1 === 7
          ? osVersionArr[1] * 1 >= 1
          : osVersionArr[0] * 1 > 7) &&
        metaViewport &&
        metaViewport.getAttribute("content").indexOf("minimal-ui") >= 0;
    }

    this.statusbar = this.needsStatusbarOverlay();

    // Pixel Ratio
    this.pixelRatio = window.devicePixelRatio || 1;
  }

  // Check for status bar and fullscreen app mode
  needsStatusbarOverlay(): boolean {
    // Meta statusbar
    const metaStatusbar: HTMLMetaElement = document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );

    if (
      this.standalone &&
      this.ios &&
      metaStatusbar &&
      metaStatusbar.content === "black-translucent"
    ) {
      return true;
    }
    if (
      (this.webView || (this.android && this.cordova)) &&
      window.innerWidth * window.innerHeight ===
      window.screen.width * window.screen.height
    ) {
      if (this.iphoneX && (window.innerHeight > window.innerWidth)) {
        return false;
      }
      return true;
    }
    return false;
  }
}

export default new Device();
