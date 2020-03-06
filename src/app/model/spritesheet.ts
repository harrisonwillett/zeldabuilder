import { Sprite } from "./sprite";
import { SpriteOptions } from "./sprite-options";

export class Spritesheet {
  id: number;
  name: string;
  src?: string;
  sprites?: Sprite[];
  options: SpriteOptions;
}
