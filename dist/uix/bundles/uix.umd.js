(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('uix', ['exports', '@angular/animations', '@angular/common', '@angular/core'], factory) :
    (factory((global.uix = {}),global.ng.animations,global.ng.common,global.ng.core));
}(this, (function (exports,animations,i1,i0) { 'use strict';

    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.prototype.get = function (key, fallback) {
            var c = getConfig();
            if (c) {
                return c.get(key, fallback);
            }
            return null;
        };
        Config.prototype.getBoolean = function (key, fallback) {
            var c = getConfig();
            if (c) {
                return c.getBoolean(key, fallback);
            }
            return false;
        };
        Config.prototype.getNumber = function (key, fallback) {
            var c = getConfig();
            if (c) {
                return c.getNumber(key, fallback);
            }
            return 0;
        };
        Config.prototype.set = function (key, value) {
            var c = getConfig();
            if (c) {
                c.set(key, value);
            }
        };
        Config.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: "root"
                    },] }
        ];
        Config.ngInjectableDef = i0.defineInjectable({ factory: function Config_Factory() { return new Config(); }, token: Config, providedIn: "root" });
        return Config;
    }());
    var ConfigToken = new i0.InjectionToken("USERCONFIG");
    function getConfig() {
        if (typeof window !== "undefined") {
            var UIX = window.UIX;
            if (UIX && UIX.config) {
                return UIX.config;
            }
        }
        return null;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    var Platform = /** @class */ (function () {
        function Platform(doc) {
            var _this = this;
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
                this.win.addEventListener("load", function () { return _this.onWindowLoad(); }, false);
            }
        }
        /**
         * Get the userAgent of the platform’s
         *
         * @returns {string} What User Agent is.
         */
        Platform.prototype.ua = function () {
            return this.userAgent;
        };
        /**
         * Return the current device (given by cordova).
         *
         * @returns {object} The device object.
         */
        Platform.prototype.device = function () {
            return this.win["device"] || {};
        };
        /**
         * Return the name of the current platform.
         *
         * @returns {string} The name of the current platform.
         */
        Platform.prototype.name = function () {
            // singleton to get the platform name
            if (this.platformName === null) {
                this.setPlatform(this.device().platform);
            }
            return this.platformName;
        };
        /**
         * Return the version of the current device platform.
         *
         * @returns {number} The version of the current device platform.
         */
        Platform.prototype.version = function () {
            if (this.platformVersion === null) {
                this.setVersion(this.device().version);
            }
            return this.platformVersion;
        };
        /**
         * Gets the height of the platform’s viewport using this.win.innerHeight.
         * Using this method is preferred since the dimension is a cached value,
         * which reduces the chance of multiple and expensive DOM reads.
         *
         * @returns {number}
         */
        Platform.prototype.height = function () {
            return this.win.innerHeight;
        };
        /**
         * Gets the width of the platform’s viewport using this.win.innerWidth.
         * Using this method is preferred since the dimension is a cached value,
         * which reduces the chance of multiple and expensive DOM reads.
         *
         * @returns {number}
         */
        Platform.prototype.width = function () {
            return this.win.innerWidth;
        };
        /**
         * Returns true if the app is in landscape mode.
         *
         * @returns {boolean}
         */
        Platform.prototype.isLandscape = function () {
            return !this.isPortrait();
        };
        /**
         * Returns true if the app is in portait mode.
         *
         * @returns {boolean}
         */
        Platform.prototype.isPortrait = function () {
            return (this.win.matchMedia &&
                this.win.matchMedia("(orientation: portrait)").matches);
        };
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
        Platform.prototype.is = function (needle) {
            var detect = this.detect();
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
        };
        /**
         * Event fires when the platform is ready and native functionality can be called.
         * If the app is running from within a web browser, then the promise will resolve when the DOM is ready.
         * When the app is running from an application engine such as Cordova,
         * then the promise will resolve when Cordova triggers the deviceready event.
         *
         * @param {function} fn
         */
        Platform.prototype.ready = function (fn) {
            this.isReady ? fn() : this.readyCallbacks.push(fn);
        };
        /**
         * Add Cordova event listeners, such as `pause`, `resume`, `volumedownbutton`, `batterylow`, `offline`, etc.
         * More information about available event types can be found in
         * [Cordova's event documentation](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
         *
         * @param {string} type Cordova [event type](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
         * @param {function} fn Called when the Cordova event is fired.
         * @returns {function} Returns a deregistration function to remove the event listener.
         */
        Platform.prototype.on = function (type, fn) {
            var _this = this;
            this.ready(function () {
                document.addEventListener(type, fn, false);
            });
            return function () {
                _this.ready(function () {
                    document.removeEventListener(type, fn);
                });
            };
        };
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
        Platform.prototype.registerBackButtonAction = function (fn, priority, actionId) {
            var _this = this;
            if (!this.hasBackButtonHandler) {
                this.backButtonActions = {};
                this.onHardwareBackButton(function (e) {
                    var priorityAction, actionId;
                    for (actionId in _this.backButtonActions) {
                        if (!priorityAction ||
                            _this.backButtonActions[actionId].priority >= priorityAction.priority) {
                            priorityAction = _this.backButtonActions[actionId];
                        }
                    }
                    if (priorityAction) {
                        priorityAction.fn(e);
                        return priorityAction;
                    }
                });
                this.hasBackButtonHandler = true;
            }
            var action = {
                id: actionId ? actionId : this.nextUid(),
                priority: priority ? priority : 0,
                fn: fn
            };
            this.backButtonActions[action.id] = action;
            // return a function to de-register this back button action
            return function () {
                delete _this.backButtonActions[action.id];
            };
        };
        /**
         * Some platforms have a hardware back button, so this is one way to bind to it.
         *
         * @param {function} callback the callback to trigger when this event occurs
         */
        Platform.prototype.onHardwareBackButton = function (fn) {
            this.ready(function () {
                document.addEventListener("backbutton", fn, false);
            });
        };
        /**
         * Remove an event listener for the backbutton.
         *
         * @param {function} callback The listener function that was originally bound.
         */
        Platform.prototype.offHardwareBackButton = function (fn) {
            this.ready(function () {
                document.removeEventListener("backbutton", fn);
            });
        };
        /**
         * Close an app on Android or Windows
         *
         * @name Platform#exitApp
         */
        Platform.prototype.exitApp = function () {
            var _this = this;
            this.ready(function () {
                _this.navigator["app"] &&
                    _this.navigator["app"].exitApp &&
                    _this.navigator["app"].exitApp();
            });
        };
        /**
         * @private
         */
        Platform.prototype.setPlatform = function (n) {
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
        };
        /**
         * @private
         */
        Platform.prototype.setVersion = function (v) {
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
            var pName = this.name();
            var versionMatch = {
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
        };
        /**
         * @private
         */
        Platform.prototype.nextUid = function () {
            return "f7" + this.nextId++;
        };
        /**
         * @private
         */
        Platform.prototype.detect = function () {
            var _this = this;
            var device = {};
            device.isWebView = function () {
                return !(!_this.win["cordova"] &&
                    !_this.win["PhoneGap"] &&
                    !_this.win["phonegap"] &&
                    _this.win["forge"] !== "object");
            };
            device.ios = function () {
                return device.iphone() || device.ipod() || device.ipad();
            };
            device.iphone = function () {
                return !device.windows() && _this.find("iphone");
            };
            device.ipod = function () {
                return _this.find("ipod");
            };
            device.ipad = function () {
                return _this.find("ipad");
            };
            device.android = function () {
                return !device.windows() && _this.find("android");
            };
            device.windows = function () {
                return _this.find("windows");
            };
            device.mobile = function () {
                return (device.androidPhone() ||
                    device.iphone() ||
                    device.ipod() ||
                    device.windowsPhone());
            };
            device.tablet = function () {
                return device.ipad() || device.androidTablet() || device.windowsTablet();
            };
            device.desktop = function () {
                return !device.tablet() && !device.mobile();
            };
            device.androidPhone = function () {
                return device.android() && _this.find("mobile");
            };
            device.androidTablet = function () {
                return device.android() && !_this.find("mobile");
            };
            device.windowsPhone = function () {
                return device.windows() && _this.find("phone");
            };
            device.windowsTablet = function () {
                return device.windows() && (_this.find("touch") && !device.windowsPhone());
            };
            return device;
        };
        /**
         * @private
         */
        Platform.prototype.onWindowLoad = function () {
            var _this = this;
            if (this.is("webview")) {
                // the window and scripts are fully loaded, and a cordova/phonegap
                // object exists then let's listen for the deviceready
                document.addEventListener("deviceready", function () { return _this.onPlatformReady(); }, false);
            }
            else {
                // the window and scripts are fully loaded, but the window object doesn't have the
                // cordova/phonegap object, so its just a browser, not a webview wrapped w/ cordova
                this.onPlatformReady();
            }
            if (this.windowLoadListenderAttached) {
                this.win.removeEventListener("load", function () { return _this.onWindowLoad(); }, false);
            }
        };
        /**
         * @private
         */
        Platform.prototype.onPlatformReady = function () {
            var e_1, _a;
            // the device is all set to go, init our own stuff then fire off our event
            this.isReady = true;
            try {
                for (var _b = __values(this.readyCallbacks), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var callback = _c.value;
                    // fire off all the callbacks that were added before the platform was ready
                    callback();
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            this.readyCallbacks = [];
            document.body.classList.add("platform-ready");
        };
        /**
         * @private
         */
        Platform.prototype.find = function (needle) {
            var userAgent = this.ua().toLowerCase();
            return userAgent.indexOf(needle) !== -1;
        };
        Platform.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: "root"
                    },] }
        ];
        /** @nocollapse */
        Platform.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
            ];
        };
        Platform.ngInjectableDef = i0.defineInjectable({ factory: function Platform_Factory() { return new Platform(i0.inject(i1.DOCUMENT)); }, token: Platform, providedIn: "root" });
        return Platform;
    }());

    var plt = new Platform(i1.DOCUMENT);
    var EASING = "cubic-bezier(0.36,0.66,0.04,1)";
    var ios = {
        duration: "500ms",
        backwardDuration: "500ms",
        timingFunction: EASING
    };
    var md = {
        duration: "250ms",
        backwardDuration: "400ms",
        timingFunction: "ease-out"
    };
    var vars = plt.is("ios") ? ios : md;
    var MaterialTranstion = {
        forward: [
            animations.transition("* <=> *", [
                animations.style({ transform: "translateX(0)" }),
                animations.query(":enter", [animations.style({ transform: "translateX(100%)" })]),
                animations.query(":leave", [animations.style({ transform: "translateX(0)" })]),
                animations.group([
                    animations.query(":enter", [
                        animations.animate(vars.duration + " " + vars.timingFunction, animations.style({ transform: "translateX(0)" }))
                    ]),
                    animations.query(":leave", [
                        animations.animate(vars.duration + " " + vars.timingFunction, animations.style({ transform: "translateX(-20%)" }))
                    ])
                ])
            ])
        ],
        back: [
            animations.transition("* <=> *", [
                animations.style({ transform: "translateX(0)" }),
                animations.query(":enter", [animations.style({ transform: "translateX(100%)" })]),
                animations.query(":leave", [animations.style({ transform: "translateX(0)" })]),
                animations.group([
                    animations.query(":enter", [
                        animations.animate(vars.duration + " " + vars.timingFunction, animations.style({ transform: "translateX(0)" }))
                    ]),
                    animations.query(":leave", [
                        animations.animate(vars.duration + " " + vars.timingFunction, animations.style({ transform: "translateX(-20%)" }))
                    ])
                ])
            ])
        ]
    };
    var IosTranstion = {
        forward: [
            animations.transition("HomeComponent <=> AboutComponent", [
                animations.query(":enter", [animations.style({ transform: "translateX(100%)" })]),
                animations.query(":leave", [animations.style({ transform: "translateX(0)" })]),
                animations.group([
                    animations.query(":leave", [
                        animations.animate("400ms ease-out", animations.style({ transform: "translateX(0)" }))
                    ]),
                    animations.query(":enter", [
                        animations.animate("400ms ease-out", animations.style({ transform: "translateX(-20%)" }))
                    ])
                ])
            ])
        ],
        back: [
            animations.transition("* <=> *", [
                animations.style({ transform: "translateX(0)" }),
                animations.query(":enter", [animations.style({ transform: "translateX(100%)" })]),
                animations.query(":leave", [animations.style({ transform: "translateX(0)" })]),
                animations.group([
                    animations.query(":enter", [
                        animations.animate(vars.duration + " " + vars.timingFunction, animations.style({ transform: "translateX(0)" }))
                    ]),
                    animations.query(":leave", [
                        animations.animate(vars.duration + " " + vars.timingFunction, animations.style({ transform: "translateX(-20%)" }))
                    ])
                ])
            ])
        ]
    };
    var direction = "forward";
    var transitions = plt.is("ios") ? IosTranstion : MaterialTranstion;
    var RouterTransition = animations.trigger("routerTransition", transitions[direction]);

    var DECLARATIONS = [];
    var UixModule = /** @class */ (function () {
        function UixModule() {
        }
        UixModule.forRoot = function (config) {
            return {
                ngModule: UixModule,
                providers: [
                    {
                        provide: ConfigToken,
                        useValue: config
                    }
                ]
            };
        };
        UixModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1.CommonModule],
                        declarations: DECLARATIONS,
                        exports: DECLARATIONS
                    },] }
        ];
        return UixModule;
    }());

    /*
     * Public API Surface of uix
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Config = Config;
    exports.ConfigToken = ConfigToken;
    exports.Platform = Platform;
    exports.RouterTransition = RouterTransition;
    exports.UixModule = UixModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=uix.umd.js.map