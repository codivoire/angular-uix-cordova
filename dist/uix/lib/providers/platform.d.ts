export declare class Platform {
    private doc;
    private win;
    navigator: Navigator;
    userAgent: string;
    platformName: string;
    platformVersion: number;
    readyCallbacks: Array<() => void>;
    backButtonActions: any;
    nextId: number;
    windowLoadListenderAttached: boolean;
    platformReadyTimer: number;
    isReady: boolean;
    hasBackButtonHandler: boolean;
    IOS: string;
    ANDROID: string;
    WINDOWS_PHONE: string;
    EDGE: string;
    CROSSWALK: string;
    constructor(doc: any);
    /**
     * Get the userAgent of the platform’s
     *
     * @returns {string} What User Agent is.
     */
    ua(): string;
    /**
     * Return the current device (given by cordova).
     *
     * @returns {object} The device object.
     */
    device(): any;
    /**
     * Return the name of the current platform.
     *
     * @returns {string} The name of the current platform.
     */
    name(): string;
    /**
     * Return the version of the current device platform.
     *
     * @returns {number} The version of the current device platform.
     */
    version(): number;
    /**
     * Gets the height of the platform’s viewport using this.win.innerHeight.
     * Using this method is preferred since the dimension is a cached value,
     * which reduces the chance of multiple and expensive DOM reads.
     *
     * @returns {number}
     */
    height(): number;
    /**
     * Gets the width of the platform’s viewport using this.win.innerWidth.
     * Using this method is preferred since the dimension is a cached value,
     * which reduces the chance of multiple and expensive DOM reads.
     *
     * @returns {number}
     */
    width(): number;
    /**
     * Returns true if the app is in landscape mode.
     *
     * @returns {boolean}
     */
    isLandscape(): boolean;
    /**
     * Returns true if the app is in portait mode.
     *
     * @returns {boolean}
     */
    isPortrait(): boolean;
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
    is(needle: string): any;
    /**
     * Event fires when the platform is ready and native functionality can be called.
     * If the app is running from within a web browser, then the promise will resolve when the DOM is ready.
     * When the app is running from an application engine such as Cordova,
     * then the promise will resolve when Cordova triggers the deviceready event.
     *
     * @param {function} fn
     */
    ready(fn: (e?: Event) => void): void;
    /**
     * Add Cordova event listeners, such as `pause`, `resume`, `volumedownbutton`, `batterylow`, `offline`, etc.
     * More information about available event types can be found in
     * [Cordova's event documentation](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
     *
     * @param {string} type Cordova [event type](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
     * @param {function} fn Called when the Cordova event is fired.
     * @returns {function} Returns a deregistration function to remove the event listener.
     */
    on(type: string, fn: (e?: Event) => void): any;
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
    registerBackButtonAction(fn: (e?: Event) => void, priority: number, actionId?: string): any;
    /**
     * Some platforms have a hardware back button, so this is one way to bind to it.
     *
     * @param {function} callback the callback to trigger when this event occurs
     */
    onHardwareBackButton(fn: (e: Event) => void): void;
    /**
     * Remove an event listener for the backbutton.
     *
     * @param {function} callback The listener function that was originally bound.
     */
    offHardwareBackButton(fn: (e: Event) => void): void;
    /**
     * Close an app on Android or Windows
     *
     * @name Platform#exitApp
     */
    exitApp(): void;
    /**
     * @private
     */
    setPlatform(n: any): void;
    /**
     * @private
     */
    setVersion(v: any): void;
    /**
     * @private
     */
    nextUid(): string;
    /**
     * @private
     */
    detect(): any;
    /**
     * @private
     */
    onWindowLoad(): void;
    /**
     * @private
     */
    onPlatformReady(): void;
    /**
     * @private
     */
    find(needle: string): boolean;
}
