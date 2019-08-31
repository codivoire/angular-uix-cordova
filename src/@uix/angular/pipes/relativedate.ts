import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "relativedate"
})
export class RelativeDatePipe implements PipeTransform {
  transform(inputDate: string): string {
    const current = new Date().valueOf();
    const input = new Date(Number(inputDate)).valueOf();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - input;

    if (elapsed < msPerMinute) {
      return "il y a " + Math.round(elapsed / 1000) + " secondes";
    } else if (elapsed < msPerHour) {
      return "il y a " + Math.round(elapsed / msPerMinute) + " minutes";
    } else if (elapsed < msPerDay) {
      return "il y a " + Math.round(elapsed / msPerHour) + " heures";
    } else if (elapsed < msPerMonth) {
      return "il y a " + Math.round(elapsed / msPerDay) + " jours";
    } else if (elapsed < msPerYear) {
      return "il y a " + Math.round(elapsed / msPerMonth) + " mois";
    } else {
      return "il y a " + Math.round(elapsed / msPerYear) + " ans";
    }
  }
}
