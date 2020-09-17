import { Component, OnInit } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationStart,
  Event as NavigationEvent
} from "@angular/router";
import { trigger } from "@angular/animations";
import { filter } from "rxjs/operators";

import { UIX_PAGE } from "../../utils/constants";
import Support from "../../utils/support";

@Component({
  selector: "uix-view",
  animations: [trigger("pageTransition", UIX_PAGE.TRANSITION)],
  template: `
    <section [@pageTransition]="animate(route)">
      <router-outlet #route="outlet"></router-outlet>
    </section>
  `,
})
export class UixView implements OnInit {
  private historyQueue: NavigationStart[] = [];
  private animationNumber = 0;
  private lastRoute: NavigationStart;
  private newRoute: NavigationStart;

  constructor(private router: Router) {
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

  ngOnInit() {}

  animate(outlet: RouterOutlet) {
    return this.animationNumber;
  }

  private isBack(state: NavigationStart) {
    const queue = this.historyQueue;
    const queueFilted = queue.filter(route => route.url !== state.url);

    return this.historyQueue.length !== queueFilted.length;
  }
}
