import { Injectable } from "@angular/core";
import Swal, { SweetAlertOptions } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class AlertController {
  constructor() {}

  async present(opts: SweetAlertOptions | string) {
    let settings: SweetAlertOptions;
    settings = typeof opts === "string" ? { text: opts } : opts;
    settings.heightAuto = false;

    return await Swal.fire(settings);
  }
}
