import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AxiosRequestConfig, AxiosInstance } from "axios";

import { AxiosSubscriber } from "../providers/axios.subscriber";
import { LoaderService } from "./loader.service";
import { NetworkService } from "./network.service";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private loader: LoaderService, private network: NetworkService) {}

  get(
    url: string,
    config?: AxiosRequestConfig,
    customLoader = false
  ): Observable<any> {
    const req = new Observable(observer => {
      if (this.network.isOffline()) {
        this.network.emitGuard(true);
        observer.complete();
      } else {
        this.network.emitGuard(false);
        customLoader ? null : this.loader.show();

        return new AxiosSubscriber(observer).prepare((ai: AxiosInstance) => {
          ai.get(url, config)
            .then(response => {
              observer.next(response.data);
              observer.complete();
              customLoader ? null : this.loader.hide();
            })
            .catch(error => {
              observer.error(error);
              observer.complete();
              customLoader ? null : this.loader.hide();
            });
        });
      }
    });

    return req;
  }

  post(
    url: string,
    params?,
    config?: AxiosRequestConfig,
    customLoader = false
  ): Observable<any> {
    const req = new Observable(observer => {
      if (this.network.isOffline()) {
        this.network.emitGuard(true);
        observer.complete();
      } else {
        this.network.emitGuard(false);
        customLoader ? null : this.loader.show();
        params = params ? this.getFormData(params) : {};

        return new AxiosSubscriber(observer).prepare((ai: AxiosInstance) => {
          ai.post(url, params, config)
            .then(response => {
              observer.next(response.data);
              observer.complete();
              customLoader ? null : this.loader.hide();
            })
            .catch(error => {
              observer.error(error);
              observer.complete();
              customLoader ? null : this.loader.hide();
            });
        });
      }
    });

    return req;
  }

  private getFormData(object): FormData {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));

    return formData;
  }
}
