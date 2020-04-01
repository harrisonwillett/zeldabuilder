import { SpriteOptions } from "./sprite-options";
import { Sprite } from "./sprite";
import { RgbaColor } from "./rgba-color";

export class Spritesheet {
  id: number;
  name: string;
  options: SpriteOptions;
  sprites?: Sprite[];
  colors?: RgbaColor[];
}
