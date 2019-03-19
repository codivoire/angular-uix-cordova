import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { routerTransition } from "./shared/router.animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [routerTransition]
})
export class AppComponent {
  title = "Hybrid App";

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
