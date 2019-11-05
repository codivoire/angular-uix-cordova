import { Pipe, PipeTransform } from "@angular/core";

/*
 * Decorate time string to minutes:seconds
 * Usage:
 *   timeValue | humanTime
 * Example:
 *   {{ 30000 |  humanTime}}
 *   formats to: 00:30
 */
@Pipe({ name: "humanTime" })
export class HumanTimePipe implements PipeTransform {
  transform(value: number): string {
    const min = (value / 1000 / 60) << 0;
    const sec = Math.round((value / 1000) % 60);

    return this.pad(min) + ":" + this.pad(sec);
  }

  /**
   * Pads string with zeros if less than 10
   */
  private pad(d: number): string {
    return d < 10 ? "0" + d.toString() : d.toString();
  }
}
