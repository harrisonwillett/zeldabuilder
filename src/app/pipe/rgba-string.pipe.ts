import { Pipe, PipeTransform } from "@angular/core";
import { RgbaColor } from "../model/rgba-color";

@Pipe({
  name: "rgbaString"
})
export class RgbaStringPipe implements PipeTransform {
  transform(rgbaObj: RgbaColor): string {
    return (
      "rgba(" +
      rgbaObj.red +
      ", " +
      rgbaObj.green +
      ", " +
      rgbaObj.blue +
      ", " +
      (rgbaObj.alpha !== undefined ? rgbaObj.alpha : 1) +
      ")"
    );
  }
}
