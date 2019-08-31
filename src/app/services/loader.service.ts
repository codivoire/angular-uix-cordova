import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  private loader = false;
  loaderStatus: Subject<any>;
  loaderMessage = "Chargement..";

  constructor() {
    this.loaderStatus = new Subject();
  }

  get loading(): boolean {
    return this.loader;
  }

  set loading(value) {
    this.loader = value;
    this.loaderStatus.next(value);
  }

  getMessage(): string {
    return this.loaderMessage;
  }

  setMessage(message: string): void {
    this.loaderMessage = message;
  }

  show(message?: string): void {
    this.loaderMessage = message ? message : this.loaderMessage;
    this.loading = true;
  }

  hide(): void {
    this.loading = false;
  }
}
