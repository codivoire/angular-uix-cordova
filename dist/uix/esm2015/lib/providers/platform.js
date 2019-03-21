import { DOCUMENT } from "@angular/common";
import { Injectable, Inject } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Platform {
    constructor(doc) {
        this.doc = doc;
        this.win = doc.defaultView;
        this.navigator = this.win.navigator;
        this.userAgent = this.navigator.userAgent;
        this.platformName = ""; // just the name, like iOS or Android
        this.platformVersion = 0; // a float of the major and minor, like 7.1
        this.readyCallbacks = [];
        this.backButtonActions = {};
        this.nextId = 0;
        this.windowLoadListenderAttached = false;
        this.platformReadyTimer = 2000;
        this.isReady = false;
        this.IOS = "ios";
        this.ANDROID = "android";
        this.WINDOWS_PHONE = "windowsphone";
        this.EDGE = "edge";
        this.CROSSWALK = "crosswalk";
        if (document.readyState === "complete") {
            this.onWindowLoad();
        }
        else {
            this.windowLoadListenderAttached = true;
            this.win.addEventListener("load", () => this.onWindowLoad(), false);
        }
    }
    /**
     * Get the userAgent of the platform’s
     *
     * @returns {string} What User Agent is.
     */
    ua() {
        return this.userAgent;
    }
    /**
     * Return the current device (given by cordova).
     *
     * @returns {object} The device object.
     */
    device() {
        return this.win["device"] || {};
    }
    /**
     * Return the name of the current platform.
     *
     * @returns {string} The name of the current platform.
     */
    name() {
        // singleton to get the platform name
        if (this.platformName === null) {
            this.setPlatform(this.device().platform);
        }
        return this.platformName;
    }
    /**
     * Return the version of the current device platform.
     *
     * @returns {number} The version of the current device platform.
     */
    version() {
        if (this.platformVersion === null) {
            this.setVersion(this.device().version);
        }
        return this.platformVersion;
    }
    /**
     * Gets the height of the platform’s viewport using this.win.innerHeight.
     * Using this method is preferred since the dimension is a cached value,
     * which reduces the chance of multiple and expensive DOM reads.
     *
     * @returns {number}
     */
    height() {
        return this.win.innerHeight;
    }
    /**
     * Gets the width of the platform’s viewport using this.win.innerWidth.
     * Using this method is preferred since the dimension is a cached value,
     * which reduces the chance of multiple and expensive DOM reads.
     *
     * @returns {number}
     */
    width() {
        return this.win.innerWidth;
    }
    /**
     * Returns true if the app is in landscape mode.
     *
     * @returns {boolean}
     */
    isLandscape() {
        return !this.isPortrait();
    }
    /**
     * Returns true if the app is in portait mode.
     *
     * @returns {boolean}
     */
    isPortrait() {
        return (this.win.matchMedia &&
            this.win.matchMedia("(orientation: portrait)").matches);
    }
    /**
     * Depending on the platform the user is on, is(platformName) will return true or false.
     * Note that the same app can return true for more than one platform name.
     * For example, an app running from an iPad would return true for the platform names:
     * mobile, ios, ipad, and tablet. Additionally, if the app was running from Cordova then
     * cordova would be true, and if it was running from a web browser on the iPad then
     * mobileweb would be true.
     *
     * @param {string} needle The platform name
     * @returns {boolean} true/false based on platform.
     */
    is(needle) {
        const detect = this.detect();
        if (needle === "cordova") {
            return typeof this.win["cordova"] !== "undefined";
        }
        if (needle === "webview") {
            return detect.isWebView();
        }
        if (needle === "desktop") {
            return !detect.tablet() && !detect.mobile();
        }
        if (needle === "tablet") {
            return detect.tablet();
        }
        if (needle === "mobile") {
            return detect.mobile();
        }
        if (needle === "ios") {
            return detect.ios();
        }
        if (needle === "iphone") {
            return detect.iphone();
        }
        if (needle === "ipod") {
            return detect.ipod();
        }
        if (needle === "ipad") {
            return detect.ipad();
        }
        if (needle === "android") {
            return detect.android();
        }
        if (needle === "windows") {
            return detect.windows();
        }
    }
    /**
     * Event fires when the platform is ready and native functionality can be called.
     * If the app is running from within a web browser, then the promise will resolve when the DOM is ready.
     * When the app is running from an application engine such as Cordova,
     * then the promise will resolve when Cordova triggers the deviceready event.
     *
     * @param {function} fn
     */
    ready(fn) {
        this.isReady ? fn() : this.readyCallbacks.push(fn);
    }
    /**
     * Add Cordova event listeners, such as `pause`, `resume`, `volumedownbutton`, `batterylow`, `offline`, etc.
     * More information about available event types can be found in
     * [Cordova's event documentation](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
     *
     * @param {string} type Cordova [event type](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
     * @param {function} fn Called when the Cordova event is fired.
     * @returns {function} Returns a deregistration function to remove the event listener.
     */
    on(type, fn) {
        this.ready(() => {
            document.addEventListener(type, fn, false);
        });
        return () => {
            this.ready(() => {
                document.removeEventListener(type, fn);
            });
        };
    }
    /**
     * The back button event is triggered when the user presses the native platform’s back button,
     * also referred to as the “hardware” back button. This event is only used within Cordova apps
     * running on Android and Windows platforms. This event is not fired on iOS since iOS
     * doesn’t come with a hardware back button in the same sense an Android or Windows device does.
     *
     * @param {function} fn Called when the back button is pressed, if this listener is the highest priority.
     * @param {number} priority Only the highest priority will execute.
     * @param {*=} actionId The id to assign this action. Default: a random unique id.
     * @returns {function} A function that, when called, will deregister this backButtonAction.
     */
    registerBackButtonAction(fn, priority, actionId) {
        if (!this.hasBackButtonHandler) {
            this.backButtonActions = {};
            this.onHardwareBackButton((e) => {
                let priorityAction, actionId;
                for (actionId in this.backButtonActions) {
                    if (!priorityAction ||
                        this.backButtonActions[actionId].priority >= priorityAction.priority) {
                        priorityAction = this.backButtonActions[actionId];
                    }
                }
                if (priorityAction) {
                    priorityAction.fn(e);
                    return priorityAction;
                }
            });
            this.hasBackButtonHandler = true;
        }
        const action = {
            id: actionId ? actionId : this.nextUid(),
            priority: priority ? priority : 0,
            fn: fn
        };
        this.backButtonActions[action.id] = action;
        // return a function to de-register this back button action
        return () => {
            delete this.backButtonActions[action.id];
        };
    }
    /**
     * Some platforms have a hardware back button, so this is one way to bind to it.
     *
     * @param {function} callback the callback to trigger when this event occurs
     */
    onHardwareBackButton(fn) {
        this.ready(() => {
            document.addEventListener("backbutton", fn, false);
        });
    }
    /**
     * Remove an event listener for the backbutton.
     *
     * @param {function} callback The listener function that was originally bound.
     */
    offHardwareBackButton(fn) {
        this.ready(() => {
            document.removeEventListener("backbutton", fn);
        });
    }
    /**
     * Close an app on Android or Windows
     *
     * @name Platform#exitApp
     */
    exitApp() {
        this.ready(() => {
            this.navigator["app"] &&
                this.navigator["app"].exitApp &&
                this.navigator["app"].exitApp();
        });
    }
    /**
     * @private
     */
    setPlatform(n) {
        if (typeof n !== "undefined" && n !== null && n.length) {
            this.platformName = n.toLowerCase();
        }
        else if (this.userAgent.indexOf("Edge") > -1) {
            this.platformName = this.EDGE;
        }
        else if (this.userAgent.indexOf("Windows Phone") > -1) {
            this.platformName = this.WINDOWS_PHONE;
        }
        else if (this.userAgent.indexOf("Android") > 0) {
            this.platformName = this.ANDROID;
        }
        else if (/iPhone|iPad|iPod/.test(this.userAgent)) {
            this.platformName = this.IOS;
        }
        else {
            this.platformName =
                (this.navigator.platform &&
                    this.navigator.platform.toLowerCase().split(" ")[0]) ||
                    "";
        }
    }
    /**
     * @private
     */
    setVersion(v) {
        if (typeof v !== "undefined" && v !== null) {
            v = v.split(".");
            v = parseFloat(v[0] + "." + (v.length > 1 ? v[1] : 0));
            if (!isNaN(v)) {
                this.platformVersion = v;
                return;
            }
        }
        this.platformVersion = 0;
        // fallback to user-agent checking
        const pName = this.name();
        const versionMatch = {
            android: /Android (\d+).(\d+)?/,
            ios: /OS (\d+)_(\d+)?/,
            windowsphone: /Windows Phone (\d+).(\d+)?/
        };
        if (versionMatch[pName]) {
            v = this.ua().match(versionMatch[pName]);
            if (v && v.length > 2) {
                this.platformVersion = parseFloat(v[1] + "." + v[2]);
            }
        }
    }
    /**
     * @private
     */
    nextUid() {
        return "f7" + this.nextId++;
    }
    /**
     * @private
     */
    detect() {
        const device = {};
        device.isWebView = () => {
            return !(!this.win["cordova"] &&
                !this.win["PhoneGap"] &&
                !this.win["phonegap"] &&
                this.win["forge"] !== "object");
        };
        device.ios = () => {
            return device.iphone() || device.ipod() || device.ipad();
        };
        device.iphone = () => {
            return !device.windows() && this.find("iphone");
        };
        device.ipod = () => {
            return this.find("ipod");
        };
        device.ipad = () => {
            return this.find("ipad");
        };
        device.android = () => {
            return !device.windows() && this.find("android");
        };
        device.windows = () => {
            return this.find("windows");
        };
        device.mobile = () => {
            return (device.androidPhone() ||
                device.iphone() ||
                device.ipod() ||
                device.windowsPhone());
        };
        device.tablet = () => {
            return device.ipad() || device.androidTablet() || device.windowsTablet();
        };
        device.desktop = () => {
            return !device.tablet() && !device.mobile();
        };
        device.androidPhone = () => {
            return device.android() && this.find("mobile");
        };
        device.androidTablet = () => {
            return device.android() && !this.find("mobile");
        };
        device.windowsPhone = () => {
            return device.windows() && this.find("phone");
        };
        device.windowsTablet = () => {
            return device.windows() && (this.find("touch") && !device.windowsPhone());
        };
        return device;
    }
    /**
     * @private
     */
    onWindowLoad() {
        if (this.is("webview")) {
            // the window and scripts are fully loaded, and a cordova/phonegap
            // object exists then let's listen for the deviceready
            document.addEventListener("deviceready", () => this.onPlatformReady(), false);
        }
        else {
            // the window and scripts are fully loaded, but the window object doesn't have the
            // cordova/phonegap object, so its just a browser, not a webview wrapped w/ cordova
            this.onPlatformReady();
        }
        if (this.windowLoadListenderAttached) {
            this.win.removeEventListener("load", () => this.onWindowLoad(), false);
        }
    }
    /**
     * @private
     */
    onPlatformReady() {
        // the device is all set to go, init our own stuff then fire off our event
        this.isReady = true;
        for (const callback of this.readyCallbacks) {
            // fire off all the callbacks that were added before the platform was ready
            callback();
        }
        this.readyCallbacks = [];
        document.body.classList.add("platform-ready");
    }
    /**
     * @private
     */
    find(needle) {
        const userAgent = this.ua().toLowerCase();
        return userAgent.indexOf(needle) !== -1;
    }
}
Platform.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] }
];
/** @nocollapse */
Platform.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
Platform.ngInjectableDef = i0.defineInjectable({ factory: function Platform_Factory() { return new Platform(i0.inject(i1.DOCUMENT)); }, token: Platform, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aXgvIiwic291cmNlcyI6WyJsaWIvcHJvdmlkZXJzL3BsYXRmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBS25ELE1BQU0sT0FBTyxRQUFRO0lBc0JuQixZQUFzQyxHQUFRO1FBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUM1QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBRTFDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMscUNBQXFDO1FBQzdELElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsMkNBQTJDO1FBQ3JFLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFD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UUFFRCxJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRTtZQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBQ2IsMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQywyRUFBMkU7WUFDM0UsUUFBUSxFQUFFLENBQUM7U0FDWjtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXpCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksQ0FBQyxNQUFjO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7O1lBMWZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs0Q0F1QmMsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgUGxhdGZvcm0ge1xuICBwcml2YXRlIHdpbjogYW55O1xuXG4gIG5hdmlnYXRvcjogTmF2aWdhdG9yO1xuICB1c2VyQWdlbnQ6IHN0cmluZztcblxuICBwbGF0Zm9ybU5hbWU6IHN0cmluZztcbiAgcGxhdGZvcm1WZXJzaW9uOiBudW1iZXI7XG4gIHJlYWR5Q2FsbGJhY2tzOiBBcnJheTwoKSA9PiB2b2lkPjtcbiAgYmFja0J1dHRvbkFjdGlvbnM6IGFueTtcbiAgbmV4dElkOiBudW1iZXI7XG4gIHdpbmRvd0xvYWRMaXN0ZW5kZXJBdHRhY2hlZDogYm9vbGVhbjtcbiAgcGxhdGZvcm1SZWFkeVRpbWVyOiBudW1iZXI7XG4gIGlzUmVhZHk6IGJvb2xlYW47XG4gIGhhc0JhY2tCdXR0b25IYW5kbGVyOiBib29sZWFuO1xuXG4gIElPUzogc3RyaW5nO1xuICBBTkRST0lEOiBzdHJpbmc7XG4gIFdJTkRPV1NfUEhPTkU6IHN0cmluZztcbiAgRURHRTogc3RyaW5nO1xuICBDUk9TU1dBTEs6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55KSB7XG4gICAgdGhpcy53aW4gPSBkb2MuZGVmYXVsdFZpZXc7XG5cbiAgICB0aGlzLm5hdmlnYXRvciA9IHRoaXMud2luLm5hdmlnYXRvcjtcbiAgICB0aGlzLnVzZXJBZ2VudCA9IHRoaXMubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgIHRoaXMucGxhdGZvcm1OYW1lID0gXCJcIjsgLy8ganVzdCB0aGUgbmFtZSwgbGlrZSBpT1Mgb3IgQW5kcm9pZFxuICAgIHRoaXMucGxhdGZvcm1WZXJzaW9uID0gMDsgLy8gYSBmbG9hdCBvZiB0aGUgbWFqb3IgYW5kIG1pbm9yLCBsaWtlIDcuMVxuICAgIHRoaXMucmVhZHlDYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLmJhY2tCdXR0b25BY3Rpb25zID0ge307XG4gICAgdGhpcy5uZXh0SWQgPSAwO1xuICAgIHRoaXMud2luZG93TG9hZExpc3RlbmRlckF0dGFjaGVkID0gZmFsc2U7XG4gICAgdGhpcy5wbGF0Zm9ybVJlYWR5VGltZXIgPSAyMDAwO1xuXG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG5cbiAgICB0aGlzLklPUyA9IFwiaW9zXCI7XG4gICAgdGhpcy5BTkRST0lEID0gXCJhbmRyb2lkXCI7XG4gICAgdGhpcy5XSU5ET1dTX1BIT05FID0gXCJ3aW5kb3dzcGhvbmVcIjtcbiAgICB0aGlzLkVER0UgPSBcImVkZ2VcIjtcbiAgICB0aGlzLkNST1NTV0FMSyA9IFwiY3Jvc3N3YWxrXCI7XG5cbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICB0aGlzLm9uV2luZG93TG9hZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndpbmRvd0xvYWRMaXN0ZW5kZXJBdHRhY2hlZCA9IHRydWU7XG4gICAgICB0aGlzLndpbi5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB0aGlzLm9uV2luZG93TG9hZCgpLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlckFnZW50IG9mIHRoZSBwbGF0Zm9ybeKAmXNcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gV2hhdCBVc2VyIEFnZW50IGlzLlxuICAgKi9cbiAgdWEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQWdlbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGRldmljZSAoZ2l2ZW4gYnkgY29yZG92YSkuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBkZXZpY2Ugb2JqZWN0LlxuICAgKi9cbiAgZGV2aWNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMud2luW1wiZGV2aWNlXCJdIHx8IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgcGxhdGZvcm0uXG4gICAqL1xuICBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gc2luZ2xldG9uIHRvIGdldCB0aGUgcGxhdGZvcm0gbmFtZVxuICAgIGlmICh0aGlzLnBsYXRmb3JtTmFtZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRQbGF0Zm9ybSh0aGlzLmRldmljZSgpLnBsYXRmb3JtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybU5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSB2ZXJzaW9uIG9mIHRoZSBjdXJyZW50IGRldmljZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIHZlcnNpb24gb2YgdGhlIGN1cnJlbnQgZGV2aWNlIHBsYXRmb3JtLlxuICAgKi9cbiAgdmVyc2lvbigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtVmVyc2lvbiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRWZXJzaW9uKHRoaXMuZGV2aWNlKCkudmVyc2lvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGxhdGZvcm1WZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgcGxhdGZvcm3igJlzIHZpZXdwb3J0IHVzaW5nIHRoaXMud2luLmlubmVySGVpZ2h0LlxuICAgKiBVc2luZyB0aGlzIG1ldGhvZCBpcyBwcmVmZXJyZWQgc2luY2UgdGhlIGRpbWVuc2lvbiBpcyBhIGNhY2hlZCB2YWx1ZSxcbiAgICogd2hpY2ggcmVkdWNlcyB0aGUgY2hhbmNlIG9mIG11bHRpcGxlIGFuZCBleHBlbnNpdmUgRE9NIHJlYWRzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMud2luLmlubmVySGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSBwbGF0Zm9ybeKAmXMgdmlld3BvcnQgdXNpbmcgdGhpcy53aW4uaW5uZXJXaWR0aC5cbiAgICogVXNpbmcgdGhpcyBtZXRob2QgaXMgcHJlZmVycmVkIHNpbmNlIHRoZSBkaW1lbnNpb24gaXMgYSBjYWNoZWQgdmFsdWUsXG4gICAqIHdoaWNoIHJlZHVjZXMgdGhlIGNoYW5jZSBvZiBtdWx0aXBsZSBhbmQgZXhwZW5zaXZlIERPTSByZWFkcy5cbiAgICpcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMud2luLmlubmVyV2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhcHAgaXMgaW4gbGFuZHNjYXBlIG1vZGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNMYW5kc2NhcGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzUG9ydHJhaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFwcCBpcyBpbiBwb3J0YWl0IG1vZGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNQb3J0cmFpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy53aW4ubWF0Y2hNZWRpYSAmJlxuICAgICAgdGhpcy53aW4ubWF0Y2hNZWRpYShcIihvcmllbnRhdGlvbjogcG9ydHJhaXQpXCIpLm1hdGNoZXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlcGVuZGluZyBvbiB0aGUgcGxhdGZvcm0gdGhlIHVzZXIgaXMgb24sIGlzKHBsYXRmb3JtTmFtZSkgd2lsbCByZXR1cm4gdHJ1ZSBvciBmYWxzZS5cbiAgICogTm90ZSB0aGF0IHRoZSBzYW1lIGFwcCBjYW4gcmV0dXJuIHRydWUgZm9yIG1vcmUgdGhhbiBvbmUgcGxhdGZvcm0gbmFtZS5cbiAgICogRm9yIGV4YW1wbGUsIGFuIGFwcCBydW5uaW5nIGZyb20gYW4gaVBhZCB3b3VsZCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHBsYXRmb3JtIG5hbWVzOlxuICAgKiBtb2JpbGUsIGlvcywgaXBhZCwgYW5kIHRhYmxldC4gQWRkaXRpb25hbGx5LCBpZiB0aGUgYXBwIHdhcyBydW5uaW5nIGZyb20gQ29yZG92YSB0aGVuXG4gICAqIGNvcmRvdmEgd291bGQgYmUgdHJ1ZSwgYW5kIGlmIGl0IHdhcyBydW5uaW5nIGZyb20gYSB3ZWIgYnJvd3NlciBvbiB0aGUgaVBhZCB0aGVuXG4gICAqIG1vYmlsZXdlYiB3b3VsZCBiZSB0cnVlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlIFRoZSBwbGF0Zm9ybSBuYW1lXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlIGJhc2VkIG9uIHBsYXRmb3JtLlxuICAgKi9cbiAgaXMobmVlZGxlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkZXRlY3Q6IGFueSA9IHRoaXMuZGV0ZWN0KCk7XG5cbiAgICBpZiAobmVlZGxlID09PSBcImNvcmRvdmFcIikge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLndpbltcImNvcmRvdmFcIl0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgfVxuXG4gICAgaWYgKG5lZWRsZSA9PT0gXCJ3ZWJ2aWV3XCIpIHtcbiAgICAgIHJldHVybiBkZXRlY3QuaXNXZWJWaWV3KCk7XG4gICAgfVxuXG4gICAgaWYgKG5lZWRsZSA9PT0gXCJkZXNrdG9wXCIpIHtcbiAgICAgIHJldHVybiAhZGV0ZWN0LnRhYmxldCgpICYmICFkZXRlY3QubW9iaWxlKCk7XG4gICAgfVxuXG4gICAgaWYgKG5lZWRsZSA9PT0gXCJ0YWJsZXRcIikge1xuICAgICAgcmV0dXJuIGRldGVjdC50YWJsZXQoKTtcbiAgICB9XG5cbiAgICBpZiAobmVlZGxlID09PSBcIm1vYmlsZVwiKSB7XG4gICAgICByZXR1cm4gZGV0ZWN0Lm1vYmlsZSgpO1xuICAgIH1cblxuICAgIGlmIChuZWVkbGUgPT09IFwiaW9zXCIpIHtcbiAgICAgIHJldHVybiBkZXRlY3QuaW9zKCk7XG4gICAgfVxuXG4gICAgaWYgKG5lZWRsZSA9PT0gXCJpcGhvbmVcIikge1xuICAgICAgcmV0dXJuIGRldGVjdC5pcGhvbmUoKTtcbiAgICB9XG5cbiAgICBpZiAobmVlZGxlID09PSBcImlwb2RcIikge1xuICAgICAgcmV0dXJuIGRldGVjdC5pcG9kKCk7XG4gICAgfVxuXG4gICAgaWYgKG5lZWRsZSA9PT0gXCJpcGFkXCIpIHtcbiAgICAgIHJldHVybiBkZXRlY3QuaXBhZCgpO1xuICAgIH1cblxuICAgIGlmIChuZWVkbGUgPT09IFwiYW5kcm9pZFwiKSB7XG4gICAgICByZXR1cm4gZGV0ZWN0LmFuZHJvaWQoKTtcbiAgICB9XG5cbiAgICBpZiAobmVlZGxlID09PSBcIndpbmRvd3NcIikge1xuICAgICAgcmV0dXJuIGRldGVjdC53aW5kb3dzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGZpcmVzIHdoZW4gdGhlIHBsYXRmb3JtIGlzIHJlYWR5IGFuZCBuYXRpdmUgZnVuY3Rpb25hbGl0eSBjYW4gYmUgY2FsbGVkLlxuICAgKiBJZiB0aGUgYXBwIGlzIHJ1bm5pbmcgZnJvbSB3aXRoaW4gYSB3ZWIgYnJvd3NlciwgdGhlbiB0aGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgd2hlbiB0aGUgRE9NIGlzIHJlYWR5LlxuICAgKiBXaGVuIHRoZSBhcHAgaXMgcnVubmluZyBmcm9tIGFuIGFwcGxpY2F0aW9uIGVuZ2luZSBzdWNoIGFzIENvcmRvdmEsXG4gICAqIHRoZW4gdGhlIHByb21pc2Ugd2lsbCByZXNvbHZlIHdoZW4gQ29yZG92YSB0cmlnZ2VycyB0aGUgZGV2aWNlcmVhZHkgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gICAqL1xuICByZWFkeShmbjogKGU/OiBFdmVudCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuaXNSZWFkeSA/IGZuKCkgOiB0aGlzLnJlYWR5Q2FsbGJhY2tzLnB1c2goZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBDb3Jkb3ZhIGV2ZW50IGxpc3RlbmVycywgc3VjaCBhcyBgcGF1c2VgLCBgcmVzdW1lYCwgYHZvbHVtZWRvd25idXR0b25gLCBgYmF0dGVyeWxvd2AsIGBvZmZsaW5lYCwgZXRjLlxuICAgKiBNb3JlIGluZm9ybWF0aW9uIGFib3V0IGF2YWlsYWJsZSBldmVudCB0eXBlcyBjYW4gYmUgZm91bmQgaW5cbiAgICogW0NvcmRvdmEncyBldmVudCBkb2N1bWVudGF0aW9uXShodHRwczovL2NvcmRvdmEuYXBhY2hlLm9yZy9kb2NzL2VuL2xhdGVzdC9jb3Jkb3ZhL2V2ZW50cy9ldmVudHMuaHRtbCkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIENvcmRvdmEgW2V2ZW50IHR5cGVdKGh0dHBzOi8vY29yZG92YS5hcGFjaGUub3JnL2RvY3MvZW4vbGF0ZXN0L2NvcmRvdmEvZXZlbnRzL2V2ZW50cy5odG1sKS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gQ2FsbGVkIHdoZW4gdGhlIENvcmRvdmEgZXZlbnQgaXMgZmlyZWQuXG4gICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gUmV0dXJucyBhIGRlcmVnaXN0cmF0aW9uIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIuXG4gICAqL1xuICBvbih0eXBlOiBzdHJpbmcsIGZuOiAoZT86IEV2ZW50KSA9PiB2b2lkKTogYW55IHtcbiAgICB0aGlzLnJlYWR5KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLnJlYWR5KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbik7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYWNrIGJ1dHRvbiBldmVudCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciBwcmVzc2VzIHRoZSBuYXRpdmUgcGxhdGZvcm3igJlzIGJhY2sgYnV0dG9uLFxuICAgKiBhbHNvIHJlZmVycmVkIHRvIGFzIHRoZSDigJxoYXJkd2FyZeKAnSBiYWNrIGJ1dHRvbi4gVGhpcyBldmVudCBpcyBvbmx5IHVzZWQgd2l0aGluIENvcmRvdmEgYXBwc1xuICAgKiBydW5uaW5nIG9uIEFuZHJvaWQgYW5kIFdpbmRvd3MgcGxhdGZvcm1zLiBUaGlzIGV2ZW50IGlzIG5vdCBmaXJlZCBvbiBpT1Mgc2luY2UgaU9TXG4gICAqIGRvZXNu4oCZdCBjb21lIHdpdGggYSBoYXJkd2FyZSBiYWNrIGJ1dHRvbiBpbiB0aGUgc2FtZSBzZW5zZSBhbiBBbmRyb2lkIG9yIFdpbmRvd3MgZGV2aWNlIGRvZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIENhbGxlZCB3aGVuIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLCBpZiB0aGlzIGxpc3RlbmVyIGlzIHRoZSBoaWdoZXN0IHByaW9yaXR5LlxuICAgKiBAcGFyYW0ge251bWJlcn0gcHJpb3JpdHkgT25seSB0aGUgaGlnaGVzdCBwcmlvcml0eSB3aWxsIGV4ZWN1dGUuXG4gICAqIEBwYXJhbSB7Kj19IGFjdGlvbklkIFRoZSBpZCB0byBhc3NpZ24gdGhpcyBhY3Rpb24uIERlZmF1bHQ6IGEgcmFuZG9tIHVuaXF1ZSBpZC5cbiAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLCB3aWxsIGRlcmVnaXN0ZXIgdGhpcyBiYWNrQnV0dG9uQWN0aW9uLlxuICAgKi9cbiAgcmVnaXN0ZXJCYWNrQnV0dG9uQWN0aW9uKFxuICAgIGZuOiAoZT86IEV2ZW50KSA9PiB2b2lkLFxuICAgIHByaW9yaXR5OiBudW1iZXIsXG4gICAgYWN0aW9uSWQ/OiBzdHJpbmdcbiAgKTogYW55IHtcbiAgICBpZiAoIXRoaXMuaGFzQmFja0J1dHRvbkhhbmRsZXIpIHtcbiAgICAgIHRoaXMuYmFja0J1dHRvbkFjdGlvbnMgPSB7fTtcblxuICAgICAgdGhpcy5vbkhhcmR3YXJlQmFja0J1dHRvbigoZTogRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHByaW9yaXR5QWN0aW9uLCBhY3Rpb25JZDtcblxuICAgICAgICBmb3IgKGFjdGlvbklkIGluIHRoaXMuYmFja0J1dHRvbkFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhcHJpb3JpdHlBY3Rpb24gfHxcbiAgICAgICAgICAgIHRoaXMuYmFja0J1dHRvbkFjdGlvbnNbYWN0aW9uSWRdLnByaW9yaXR5ID49IHByaW9yaXR5QWN0aW9uLnByaW9yaXR5XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmlvcml0eUFjdGlvbiA9IHRoaXMuYmFja0J1dHRvbkFjdGlvbnNbYWN0aW9uSWRdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmlvcml0eUFjdGlvbikge1xuICAgICAgICAgIHByaW9yaXR5QWN0aW9uLmZuKGUpO1xuICAgICAgICAgIHJldHVybiBwcmlvcml0eUFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaGFzQmFja0J1dHRvbkhhbmRsZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIGlkOiBhY3Rpb25JZCA/IGFjdGlvbklkIDogdGhpcy5uZXh0VWlkKCksXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHkgPyBwcmlvcml0eSA6IDAsXG4gICAgICBmbjogZm5cbiAgICB9O1xuXG4gICAgdGhpcy5iYWNrQnV0dG9uQWN0aW9uc1thY3Rpb24uaWRdID0gYWN0aW9uO1xuXG4gICAgLy8gcmV0dXJuIGEgZnVuY3Rpb24gdG8gZGUtcmVnaXN0ZXIgdGhpcyBiYWNrIGJ1dHRvbiBhY3Rpb25cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZGVsZXRlIHRoaXMuYmFja0J1dHRvbkFjdGlvbnNbYWN0aW9uLmlkXTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgcGxhdGZvcm1zIGhhdmUgYSBoYXJkd2FyZSBiYWNrIGJ1dHRvbiwgc28gdGhpcyBpcyBvbmUgd2F5IHRvIGJpbmQgdG8gaXQuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRoZSBjYWxsYmFjayB0byB0cmlnZ2VyIHdoZW4gdGhpcyBldmVudCBvY2N1cnNcbiAgICovXG4gIG9uSGFyZHdhcmVCYWNrQnV0dG9uKGZuOiAoZTogRXZlbnQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnJlYWR5KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJiYWNrYnV0dG9uXCIsIGZuLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgYmFja2J1dHRvbi5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgd2FzIG9yaWdpbmFsbHkgYm91bmQuXG4gICAqL1xuICBvZmZIYXJkd2FyZUJhY2tCdXR0b24oZm46IChlOiBFdmVudCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMucmVhZHkoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJhY2tidXR0b25cIiwgZm4pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIGFuIGFwcCBvbiBBbmRyb2lkIG9yIFdpbmRvd3NcbiAgICpcbiAgICogQG5hbWUgUGxhdGZvcm0jZXhpdEFwcFxuICAgKi9cbiAgZXhpdEFwcCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlYWR5KCgpID0+IHtcbiAgICAgIHRoaXMubmF2aWdhdG9yW1wiYXBwXCJdICYmXG4gICAgICAgIHRoaXMubmF2aWdhdG9yW1wiYXBwXCJdLmV4aXRBcHAgJiZcbiAgICAgICAgdGhpcy5uYXZpZ2F0b3JbXCJhcHBcIl0uZXhpdEFwcCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRQbGF0Zm9ybShuOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIG4gIT09IFwidW5kZWZpbmVkXCIgJiYgbiAhPT0gbnVsbCAmJiBuLmxlbmd0aCkge1xuICAgICAgdGhpcy5wbGF0Zm9ybU5hbWUgPSBuLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVzZXJBZ2VudC5pbmRleE9mKFwiRWRnZVwiKSA+IC0xKSB7XG4gICAgICB0aGlzLnBsYXRmb3JtTmFtZSA9IHRoaXMuRURHRTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudXNlckFnZW50LmluZGV4T2YoXCJXaW5kb3dzIFBob25lXCIpID4gLTEpIHtcbiAgICAgIHRoaXMucGxhdGZvcm1OYW1lID0gdGhpcy5XSU5ET1dTX1BIT05FO1xuICAgIH0gZWxzZSBpZiAodGhpcy51c2VyQWdlbnQuaW5kZXhPZihcIkFuZHJvaWRcIikgPiAwKSB7XG4gICAgICB0aGlzLnBsYXRmb3JtTmFtZSA9IHRoaXMuQU5EUk9JRDtcbiAgICB9IGVsc2UgaWYgKC9pUGhvbmV8aVBhZHxpUG9kLy50ZXN0KHRoaXMudXNlckFnZW50KSkge1xuICAgICAgdGhpcy5wbGF0Zm9ybU5hbWUgPSB0aGlzLklPUztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGF0Zm9ybU5hbWUgPVxuICAgICAgICAodGhpcy5uYXZpZ2F0b3IucGxhdGZvcm0gJiZcbiAgICAgICAgICB0aGlzLm5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKVswXSkgfHxcbiAgICAgICAgXCJcIjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldFZlcnNpb24odjogYW55KTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiICYmIHYgIT09IG51bGwpIHtcbiAgICAgIHYgPSB2LnNwbGl0KFwiLlwiKTtcbiAgICAgIHYgPSBwYXJzZUZsb2F0KHZbMF0gKyBcIi5cIiArICh2Lmxlbmd0aCA+IDEgPyB2WzFdIDogMCkpO1xuICAgICAgaWYgKCFpc05hTih2KSkge1xuICAgICAgICB0aGlzLnBsYXRmb3JtVmVyc2lvbiA9IHY7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnBsYXRmb3JtVmVyc2lvbiA9IDA7XG5cbiAgICAvLyBmYWxsYmFjayB0byB1c2VyLWFnZW50IGNoZWNraW5nXG4gICAgY29uc3QgcE5hbWU6IHN0cmluZyA9IHRoaXMubmFtZSgpO1xuICAgIGNvbnN0IHZlcnNpb25NYXRjaDogYW55ID0ge1xuICAgICAgYW5kcm9pZDogL0FuZHJvaWQgKFxcZCspLihcXGQrKT8vLFxuICAgICAgaW9zOiAvT1MgKFxcZCspXyhcXGQrKT8vLFxuICAgICAgd2luZG93c3Bob25lOiAvV2luZG93cyBQaG9uZSAoXFxkKykuKFxcZCspPy9cbiAgICB9O1xuXG4gICAgaWYgKHZlcnNpb25NYXRjaFtwTmFtZV0pIHtcbiAgICAgIHYgPSB0aGlzLnVhKCkubWF0Y2godmVyc2lvbk1hdGNoW3BOYW1lXSk7XG5cbiAgICAgIGlmICh2ICYmIHYubGVuZ3RoID4gMikge1xuICAgICAgICB0aGlzLnBsYXRmb3JtVmVyc2lvbiA9IHBhcnNlRmxvYXQodlsxXSArIFwiLlwiICsgdlsyXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBuZXh0VWlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiZjdcIiArIHRoaXMubmV4dElkKys7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRldGVjdCgpOiBhbnkge1xuICAgIGNvbnN0IGRldmljZTogYW55ID0ge307XG5cbiAgICBkZXZpY2UuaXNXZWJWaWV3ID0gKCkgPT4ge1xuICAgICAgcmV0dXJuICEoXG4gICAgICAgICF0aGlzLndpbltcImNvcmRvdmFcIl0gJiZcbiAgICAgICAgIXRoaXMud2luW1wiUGhvbmVHYXBcIl0gJiZcbiAgICAgICAgIXRoaXMud2luW1wicGhvbmVnYXBcIl0gJiZcbiAgICAgICAgdGhpcy53aW5bXCJmb3JnZVwiXSAhPT0gXCJvYmplY3RcIlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLmlvcyA9ICgpID0+IHtcbiAgICAgIHJldHVybiBkZXZpY2UuaXBob25lKCkgfHwgZGV2aWNlLmlwb2QoKSB8fCBkZXZpY2UuaXBhZCgpO1xuICAgIH07XG5cbiAgICBkZXZpY2UuaXBob25lID0gKCkgPT4ge1xuICAgICAgcmV0dXJuICFkZXZpY2Uud2luZG93cygpICYmIHRoaXMuZmluZChcImlwaG9uZVwiKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLmlwb2QgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5maW5kKFwiaXBvZFwiKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLmlwYWQgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5maW5kKFwiaXBhZFwiKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLmFuZHJvaWQgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gIWRldmljZS53aW5kb3dzKCkgJiYgdGhpcy5maW5kKFwiYW5kcm9pZFwiKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLndpbmRvd3MgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5maW5kKFwid2luZG93c1wiKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLm1vYmlsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGRldmljZS5hbmRyb2lkUGhvbmUoKSB8fFxuICAgICAgICBkZXZpY2UuaXBob25lKCkgfHxcbiAgICAgICAgZGV2aWNlLmlwb2QoKSB8fFxuICAgICAgICBkZXZpY2Uud2luZG93c1Bob25lKClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGRldmljZS50YWJsZXQgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gZGV2aWNlLmlwYWQoKSB8fCBkZXZpY2UuYW5kcm9pZFRhYmxldCgpIHx8IGRldmljZS53aW5kb3dzVGFibGV0KCk7XG4gICAgfTtcblxuICAgIGRldmljZS5kZXNrdG9wID0gKCkgPT4ge1xuICAgICAgcmV0dXJuICFkZXZpY2UudGFibGV0KCkgJiYgIWRldmljZS5tb2JpbGUoKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLmFuZHJvaWRQaG9uZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBkZXZpY2UuYW5kcm9pZCgpICYmIHRoaXMuZmluZChcIm1vYmlsZVwiKTtcbiAgICB9O1xuXG4gICAgZGV2aWNlLmFuZHJvaWRUYWJsZXQgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gZGV2aWNlLmFuZHJvaWQoKSAmJiAhdGhpcy5maW5kKFwibW9iaWxlXCIpO1xuICAgIH07XG5cbiAgICBkZXZpY2Uud2luZG93c1Bob25lID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIGRldmljZS53aW5kb3dzKCkgJiYgdGhpcy5maW5kKFwicGhvbmVcIik7XG4gICAgfTtcblxuICAgIGRldmljZS53aW5kb3dzVGFibGV0ID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIGRldmljZS53aW5kb3dzKCkgJiYgKHRoaXMuZmluZChcInRvdWNoXCIpICYmICFkZXZpY2Uud2luZG93c1Bob25lKCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGV2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvbldpbmRvd0xvYWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXMoXCJ3ZWJ2aWV3XCIpKSB7XG4gICAgICAvLyB0aGUgd2luZG93IGFuZCBzY3JpcHRzIGFyZSBmdWxseSBsb2FkZWQsIGFuZCBhIGNvcmRvdmEvcGhvbmVnYXBcbiAgICAgIC8vIG9iamVjdCBleGlzdHMgdGhlbiBsZXQncyBsaXN0ZW4gZm9yIHRoZSBkZXZpY2VyZWFkeVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJkZXZpY2VyZWFkeVwiLFxuICAgICAgICAoKSA9PiB0aGlzLm9uUGxhdGZvcm1SZWFkeSgpLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhlIHdpbmRvdyBhbmQgc2NyaXB0cyBhcmUgZnVsbHkgbG9hZGVkLCBidXQgdGhlIHdpbmRvdyBvYmplY3QgZG9lc24ndCBoYXZlIHRoZVxuICAgICAgLy8gY29yZG92YS9waG9uZWdhcCBvYmplY3QsIHNvIGl0cyBqdXN0IGEgYnJvd3Nlciwgbm90IGEgd2VidmlldyB3cmFwcGVkIHcvIGNvcmRvdmFcbiAgICAgIHRoaXMub25QbGF0Zm9ybVJlYWR5KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2luZG93TG9hZExpc3RlbmRlckF0dGFjaGVkKSB7XG4gICAgICB0aGlzLndpbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB0aGlzLm9uV2luZG93TG9hZCgpLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvblBsYXRmb3JtUmVhZHkoKTogdm9pZCB7XG4gICAgLy8gdGhlIGRldmljZSBpcyBhbGwgc2V0IHRvIGdvLCBpbml0IG91ciBvd24gc3R1ZmYgdGhlbiBmaXJlIG9mZiBvdXIgZXZlbnRcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLnJlYWR5Q2FsbGJhY2tzKSB7XG4gICAgICAvLyBmaXJlIG9mZiBhbGwgdGhlIGNhbGxiYWNrcyB0aGF0IHdlcmUgYWRkZWQgYmVmb3JlIHRoZSBwbGF0Zm9ybSB3YXMgcmVhZHlcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWFkeUNhbGxiYWNrcyA9IFtdO1xuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwicGxhdGZvcm0tcmVhZHlcIik7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZpbmQobmVlZGxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCB1c2VyQWdlbnQgPSB0aGlzLnVhKCkudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gdXNlckFnZW50LmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG4gIH1cbn1cbiJdfQ==