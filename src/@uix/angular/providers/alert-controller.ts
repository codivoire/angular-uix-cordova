import { Injectable } from "@angular/core";
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class AlertController {
  constructor() {
    const options = {
      showClass: {
        popup: "animated fadeInDown faster"
      },
      hideClass: {
        popup: "animated fadeOutUp faster"
      }
    };
  }

  fire(opts: SweetAlertOptions | string): Promise<SweetAlertResult> {
    let settings: SweetAlertOptions;
    settings = typeof opts === "string" ? { text: opts } : opts;
    // settings.heightAuto = false;

    const alert = Swal.fire(settings);

    return alert;
  }
}
