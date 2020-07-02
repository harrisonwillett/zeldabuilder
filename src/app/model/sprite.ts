import { colorIndex } from "./sprite-array";
import { Observable } from "rxjs";

export class Sprite {
  id: number;
  name: string;
  array?: colorIndex[][];
  canvas?: Observable<HTMLCanvasElement>;
}
