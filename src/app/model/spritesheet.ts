import { SpriteOptions } from "./sprite-options";
import { Sprite } from "./sprite";
import { RgbaColor } from "./rgba-color";

export class Spritesheet {
  id: string;
  name: string;
  options: SpriteOptions;
  sprites?: Sprite[];
  colors?: RgbaColor[];
}
