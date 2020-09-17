import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-loader",
  template: `
    <div class="app-loader" *ngIf="loader">
      <div class="app-loader-content">
        <div class="loader-spinner"></div>
        <div class="loader-message">{{ loaderMessage }}</div>
      </div>
    </div>
  `
})
export class LoaderComponent implements OnInit, OnDestroy {
  loader = false;
  loaderMessage: string;
  loaderSubscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.loaderMessage = this.loaderService.getMessage();
  }

  ngOnInit() {
    this.loaderSubscription = this.loaderService.loaderStatus.subscribe(
      value => {
        this.loaderMessage = this.loaderService.getMessage();
        this.loader = value;
      }
    );
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
}
