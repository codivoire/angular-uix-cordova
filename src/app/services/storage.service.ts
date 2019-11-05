import { Injectable, Inject } from "@angular/core";
import {
  LOCAL_STORAGE,
  StorageService as Storage
} from "ngx-webstorage-service";

import { PlatformProvider } from "src/@uix/angular/core";
import { CONFIG } from "src/config";

const JsStorages = require("../providers/js-storage");

@Injectable({
  providedIn: "root"
})
export class StorageService {
  engine: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: Storage,
    private plt: PlatformProvider
  ) {
    this.engine = JsStorages.initNamespaceStorage(CONFIG.APP.ID).localStorage;
  }

  public get(key: string) {
    let data: any;

    if (this.plt.is("cordova")) {
      data = this.engine.get(key);
    } else {
      data = this.storage.get(key);
    }

    return data;
  }

  public set(key: string, value: any): Promise<any> {
    if (this.plt.is("cordova")) {
      this.engine.set(key, value);
    } else {
      this.storage.set(key, value);
    }

    return Promise.resolve(value);
  }

  public remove(key: string): Promise<any> {
    const data = this.storage.get(key);

    if (this.plt.is("cordova")) {
      this.engine.remove(key);
    } else {
      this.storage.remove(key);
    }

    return Promise.resolve(data);
  }

  public clear() {
    if (this.plt.is("cordova")) {
      this.engine.removeAll();
    } else {
      this.storage.clear();
    }

    return Promise.resolve();
  }

  public has(key: string) {
    let exist: boolean;

    if (this.plt.is("cordova")) {
      exist = this.engine.isSet(key);
    } else {
      exist = this.storage.has(key);
    }

    return exist;
  }
}
