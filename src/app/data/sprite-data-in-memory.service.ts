import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";

import { Spritesheet } from "../model/spritesheet";
import { EightBit } from "./sprite-modes";
import { RgbaColor } from "../model/rgba-color";

import {
  spriteStairArray,
  spriteBolderArray,
  spriteFloorArray
} from "./sprite-data-overworld.mock";

@Injectable({
  providedIn: "root"
})
export class SpriteDataInMemoryService implements InMemoryDbService {
  createDb() {
    const colffc07a: RgbaColor = {
      red: parseInt("ff", 16),
      green: parseInt("C0", 16),
      blue: parseInt("7a", 16),
      alpha: 1
    };
    const colc03800: RgbaColor = {
      red: parseInt("c0", 16),
      green: parseInt("38", 16),
      blue: parseInt("00", 16),
      alpha: 1
    };
    const col001aff: RgbaColor = {
      red: parseInt("00", 16),
      green: parseInt("1a", 16),
      blue: parseInt("ff", 16),
      alpha: 1
    };
    const col000000: RgbaColor = {
      red: parseInt("00", 16),
      green: parseInt("00", 16),
      blue: parseInt("00", 16),
      alpha: 1
    };
    const overWorldColors1: RgbaColor[] = [
      colffc07a,
      colc03800,
      col001aff,
      col000000
    ];
    const sheets: Spritesheet[] = [
      {
        id: 1,
        name: "Over World",
        src: "assets/img/overworld.png",
        sprites: [
          {
            id: 1,
            name: "Stairs - Brown",
            colors: overWorldColors1,
            array: spriteStairArray
          },
          {
            id: 2,
            name: "Bolder - Brown",
            colors: overWorldColors1,
            array: spriteBolderArray
          },
          {
            id: 3,
            name: "Floor - Brown",
            colors: overWorldColors1,
            array: spriteFloorArray
          },
          {
            id: 4,
            name: "Ladder - Brown",
            colors: overWorldColors1,
            src: null
          },
          {
            id: 5,
            name: "Bush - Brown",
            colors: overWorldColors1,
            src: null
          }
        ],
        options: EightBit
      },
      {
        id: 2,
        name: "Link",
        src: "assets/img/link.png",
        sprites: [],
        options: EightBit
      },
      {
        id: 3,
        name: "Items",
        src: "assets/img/items.png",
        sprites: [],
        options: EightBit
      }
    ];
    return { sheets };
  }

  genId(sheets: Spritesheet[]): number {
    return sheets.length > 0
      ? Math.max(...sheets.map(sheet => sheet.id)) + 1
      : 1;
  }
}
