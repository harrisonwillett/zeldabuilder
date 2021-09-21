import { Pipe, PipeTransform } from "@angular/core";
import { RgbaColor } from "../model/rgba-color";

@Pipe({
  name: "rgbaString"
})
export class RgbaStringPipe implements PipeTransform {
  transform(rgbaObj: RgbaColor): string {
    if (rgbaObj !== undefined) {
      return (
        "rgba(" +
        Math.round(rgbaObj.red) +
        ", " +
        Math.round(rgbaObj.green) +
        ", " +
        Math.round(rgbaObj.blue) +
        ", " +
        (rgbaObj.alpha !== undefined ? rgbaObj.alpha : 1) +
        ")"
      );
    } else {
      return "";
    }
  }
}
