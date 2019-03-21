import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { RouterTransition } from "../utils/transition";

@Component({
  selector: "app-router-outlet",
  template: `
    <div [@routerTransition]="prepareRoute(route)">
      <router-outlet #route="outlet"></router-outlet>
    </div>
  `,
  animations: [RouterTransition]
})
export class RouterOutletComponent {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData["state"]
    );
  }
}
