import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate"
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number): string {
    const dots = value.length > length ? "..." : "";
    return value.substring(0, length) + dots;
  }
}
