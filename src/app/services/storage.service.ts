import { Injectable, Inject } from "@angular/core";
import {
  LOCAL_STORAGE,
  StorageService as Storage
} from "ngx-webstorage-service";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: Storage) {}

  public get(key: string) {
    const data = this.storage.get(key);
    return data;
  }

  public set(key: string, value: any): Promise<any> {
    this.storage.set(key, value);
    return Promise.resolve(value);
  }

  public remove(key: string): Promise<any> {
    const data = this.storage.get(key);
    this.storage.remove(key);
    return Promise.resolve(data);
  }

  public clear() {
    this.storage.clear();
  }

  public has(key: string) {
    return this.storage.has(key);
  }
}
