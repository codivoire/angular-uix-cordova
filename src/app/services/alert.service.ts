import { Injectable } from "@angular/core";
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor() {}

  fire(settings: SweetAlertOptions): Promise<SweetAlertResult> {
    settings.onOpen = () => this.onOpen();
    const alert = Swal.fire(settings);

    return alert;
  }

  private onOpen() {
    document.querySelector("body").classList.remove("swal2-height-auto");
  }
}
