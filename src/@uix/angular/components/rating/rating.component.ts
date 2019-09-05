import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "uix-rating",
  styleUrls: ["./rating.component.scss"],
  template: `
    <ul class="rating">
      <li
        (click)="onRate(star)"
        *ngFor="let star of stars"
        [ngClass]="{ selected: star <= rateValue }"
      >
        <i class="fi-star"></i>
      </li>
    </ul>
  `
})
export class UixRating implements OnInit {
  @Input() rateValue: number;
  @Output() rate = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit() {}

  onRate(star: number) {
    this.rateValue = star;
    this.rate.emit(star);
  }
}
