import { Injectable } from "@angular/core";

declare const FB: any;

export interface FacebookLoginResponse {
  status: string;
  authResponse: {
    session_key: string;
    accessToken: string;
    expiresIn: string;
    sig: string;
    secret: string;
    userID: string;
  };
}

@Injectable({
  providedIn: "root"
})
export class Facebook {
  FacebookLoginResponse: FacebookLoginResponse;
  appId: number;
  appVersion = "v3.3";
  EVENTS: any;

  constructor() {
    this.FacebookLoginResponse = {
      status: "",
      authResponse: {
        session_key: "",
        accessToken: "",
        expiresIn: "",
        sig: "",
        secret: "",
        userID: ""
      }
    };

    this.EVENTS = {
      EVENT_NAME_ACTIVATED_APP: "fb_mobile_activate_app",
      EVENT_NAME_DEACTIVATED_APP: "fb_mobile_deactivate_app",
      EVENT_NAME_SESSION_INTERRUPTIONS: "fb_mobile_app_interruptions",
      EVENT_NAME_TIME_BETWEEN_SESSIONS: "fb_mobile_time_between_sessions",
      EVENT_NAME_COMPLETED_REGISTRATION: "fb_mobile_complete_registration",
      EVENT_NAME_VIEWED_CONTENT: "fb_mobile_content_view",
      EVENT_NAME_SEARCHED: "fb_mobile_search",
      EVENT_NAME_RATED: "fb_mobile_rate",
      EVENT_NAME_COMPLETED_TUTORIAL: "fb_mobile_tutorial_completion",
      EVENT_NAME_PUSH_TOKEN_OBTAINED: "fb_mobile_obtain_push_token",
      EVENT_NAME_ADDED_TO_CART: "fb_mobile_add_to_cart",
      EVENT_NAME_ADDED_TO_WISHLIST: "fb_mobile_add_to_wishlist",
      EVENT_NAME_INITIATED_CHECKOUT: "fb_mobile_initiated_checkout",
      EVENT_NAME_ADDED_PAYMENT_INFO: "fb_mobile_add_payment_info",
      EVENT_NAME_PURCHASED: "fb_mobile_purchase",
      EVENT_NAME_ACHIEVED_LEVEL: "fb_mobile_level_achieved",
      EVENT_NAME_UNLOCKED_ACHIEVEMENT: "fb_mobile_achievement_unlocked",
      EVENT_NAME_SPENT_CREDITS: "fb_mobile_spent_credits",
      EVENT_PARAM_CURRENCY: "fb_currency",
      EVENT_PARAM_REGISTRATION_METHOD: "fb_registration_method",
      EVENT_PARAM_CONTENT_TYPE: "fb_content_type",
      EVENT_PARAM_CONTENT_ID: "fb_content_id",
      EVENT_PARAM_SEARCH_STRING: "fb_search_string",
      EVENT_PARAM_SUCCESS: "fb_success",
      EVENT_PARAM_MAX_RATING_VALUE: "fb_max_rating_value",
      EVENT_PARAM_PAYMENT_INFO_AVAILABLE: "fb_payment_info_available",
      EVENT_PARAM_NUM_ITEMS: "fb_num_items",
      EVENT_PARAM_LEVEL: "fb_level",
      EVENT_PARAM_DESCRIPTION: "fb_description",
      EVENT_PARAM_SOURCE_APPLICATION: "fb_mobile_launch_source",
      EVENT_PARAM_VALUE_YES: "1",
      EVENT_PARAM_VALUE_NO: "0"
    };

    if (window.location.protocol === "file:") {
      console.warn(
        "Facebook JS SDK is not supported when using file:// protocol"
      );
    } else {
      (window as any).fbAsyncInit = () => {
        FB.init({
          appId: this.appId,
          xfbml: true,
          cookie: true,
          version: this.appVersion
        });
        FB.AppEvents.logPageView();
      };

      ((d, s, id) => {
        let js;
        const fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
          return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }

  config(appId: number, appVersion?: string) {
    this.appId = appId;
    this.appVersion = appVersion ? appVersion : this.appVersion;
  }

  browserInit(appId: number, version: string) {
    return new Promise(resolve => {
      if (!version) {
        version = this.appVersion;
      }

      FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: version
      });

      ((d, s, id) => {
        let js;
        const fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
          return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      resolve();
    });
  }

  getLoginStatus(): Promise<FacebookLoginResponse> {
    return new Promise(resolve => {
      FB.getLoginStatus((response: FacebookLoginResponse) => {
        resolve(response);
      });
    });
  }

  getAccessToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      const response = FB.getAccessToken();

      if (!response) {
        reject("NO_TOKEN");
      } else {
        resolve(response);
      }
    });
  }

  login(permissions: string[]): Promise<FacebookLoginResponse> {
    return new Promise((resolve, reject) => {
      const permissionObj: any = {};

      if (permissions && permissions.length > 0) {
        permissionObj.scope = permissions.toString();
      }

      FB.login(response => {
        if (response.authResponse) {
          resolve(response);
        } else {
          reject(response.status);
        }
      }, permissionObj);
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        FB.logout(response => {
          resolve(response);
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  showDialog(options): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!options.name) {
        options.name = "";
      }
      if (!options.message) {
        options.message = "";
      }
      if (!options.caption) {
        options.caption = "";
      }
      if (!options.description) {
        options.description = "";
      }
      if (!options.href) {
        options.href = "";
      }
      if (!options.picture) {
        options.picture = "";
      }

      try {
        FB.ui(options, response => {
          if (response && (response.request || !response.error_code)) {
            resolve(response);
          } else {
            reject(response);
          }
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  api(graphPath: string, permissions?: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        FB.api(graphPath, response => {
          if (response.error) {
            reject(response);
          } else {
            resolve(response);
          }
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  logEvent(name: string, params?, valueToSum?): Promise<any> {
    return new Promise(resolve => {
      resolve();
    });
  }

  logPurchase(): Promise<any> {
    return new Promise(resolve => {
      resolve();
    });
  }

  appInvite(): Promise<any> {
    return new Promise(resolve => {
      resolve();
    });
  }
}
