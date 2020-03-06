import { RgbaColor } from "./rgba-color";
import { color } from "./sprite-array";

export class Sprite {
  id: number;
  name: string;
  colors?: RgbaColor[];
  src?: string;
  array?: color[][];
}
