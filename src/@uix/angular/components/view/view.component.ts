import { Component } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationStart,
  Event as NavigationEvent
} from "@angular/router";
import { filter } from "rxjs/operators";

import { RouterTransition } from "../../utils/router-transition";
import Support from "../../utils/support";

@Component({
  selector: "uix-view",
  template: `
    <section [@routerTransition]="prepareRoute(route)">
      <router-outlet #route="outlet"></router-outlet>
    </section>
  `,
  animations: [RouterTransition]
})
export class UixView {
  private historyQueue: NavigationStart[] = [];
  private animationNumber = 0;
  private lastRoute: NavigationStart;
  private newRoute: NavigationStart;

  constructor(router: Router) {
    // init device support
    Support.init();

    // handle router history
    router.events
      .pipe(
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        this.lastRoute = this.newRoute;
        this.newRoute = event;

        if (this.isBack(this.newRoute)) {
          this.animationNumber--;
          this.historyQueue = this.historyQueue.filter(
            route => route.url !== this.lastRoute.url
          );
        } else {
          this.animationNumber++;
          this.historyQueue = [...this.historyQueue, event];
        }
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return this.animationNumber;
  }

  private isBack(state: NavigationStart) {
    const queue = this.historyQueue;
    const queueFilted = queue.filter(route => route.url !== state.url);

    return this.historyQueue.length !== queueFilted.length;
  }
}
