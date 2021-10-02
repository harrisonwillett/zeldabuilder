import { colorIndex } from "./sprite-array";
import { Observable } from "rxjs";

export class Sprite {
  id: string;
  name: string;
  access: {
    read: boolean,
    write: boolean
  };
  array?: colorIndex[][];
  canvas?: Observable<HTMLCanvasElement>;
}
