import { Directive, HostListener } from "@angular/core";
import { Location } from "@angular/common";

@Directive({
  selector: "[uix-back]"
})
export class BackDirective {
  constructor(private location: Location) {}

  @HostListener("click", ["$event"]) onClick(event: MouseEvent) {
    this.location.back();
  }
}
