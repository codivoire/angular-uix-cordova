import { Subscriber } from "rxjs";
import axios, { AxiosInstance } from "axios";

import { CONFIG } from "src/config";

axios.defaults.baseURL = CONFIG.API_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export class AxiosSubscriber extends Subscriber<ObjectConstructor> {
  aborted = false;
  source: any;

  constructor(observer) {
    super(observer);

    this.source = axios.CancelToken.source();
    this.aborted = false;
  }

  prepare(initRequest: (ai: AxiosInstance) => void): AxiosSubscriber {
    const instance = axios.create();

    instance.interceptors.request.use(config => {
      config.cancelToken = this.source.token;
      return config;
    });

    initRequest(instance);

    return this;
  }

  unsubscribe() {
    super.unsubscribe();

    if (this.aborted === false) {
      this.source.cancel("Request canceled.");
      this.aborted = true;
    }
  }
}
