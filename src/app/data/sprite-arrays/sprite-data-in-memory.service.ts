import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";

import { Spritesheet } from "../../model/spritesheet";
import { EightBitX2 } from "../sprite-modes";
import { RgbaColor } from "../../model/rgba-color";

import {
  spriteStairArray,
  spriteBolderArray,
  spriteFloorArray,
  spriteLadderArray,
  spriteBushArray,
  spriteStatueArray,
  spriteRockArrayTopLeft,
  spriteRockArrayTopMid,
  spriteRockArrayTopRight,
  spriteRockArrayBottomLeft,
  spriteRockArrayBottomMid,
  spriteRockArrayBottomRight,
  spriteTreeArrayTopLeft,
  spriteTreeArrayTopMid,
  spriteTreeArrayTopRight,
  spriteTreeArrayBottomLeft,
  spriteTreeArrayBottomMid,
  spriteTreeArrayBottomRight,
  spriteDungeonLeftTopArray,
  spriteDungeonMiddleTopArray,
  spriteDungeonRightTopArray,
  spriteDungeon1LeftTopArray,
  spriteDungeon1MiddleTopArray,
  spriteDungeonLeftBottomArray,
  spriteDesertArray,
  spriteDungeonRightBottomArray,
  spriteDeckArray,
  spriteWaterfallArray,
  spriteLakeLeftTopArray,
  spriteLakeMiddleTopArray,
  spriteLakeRightTopArray,
  spriteLakeLeftMiddleArray,
  spriteLakeMiddleMiddleArray,
  spriteLakeRightMiddleArray,
  spriteLakeLeftBottomArray,
  spriteLakeMiddleBottomArray,
  spriteLakeRightBottomArray,
  spriteDryLakeLeftTopArray,
  spriteDryLakeMiddleTopArray,
  spriteDryLakeRightTopArray,
  spriteDryLakeLeftMiddleArray,
  spriteDryLakeMiddleMiddleArray,
  spriteDryLakeRightMiddleArray,
  spriteDryLakeLeftBottomArray,
  spriteDryLakeMiddleBottomArray,
  spriteDryLakeRightBottomArray,
  spriteLakeInvertLeftTopArray,
  spriteLakeInvertRightTopArray,
  spriteLakeInvertLeftBottomArray,
  spriteLakeInvertRightBottomArray
} from "./sprite-data-overworld.mock";
import {
  spriteLinkBottom1Array,
  spriteLinkBottom2Array,
  spriteLinkTop1Array,
  spriteLinkTop2Array,
  spriteLinkLeft1Array,
  spriteLinkLeft2Array,
  spriteLinkRight1Array,
  spriteLinkRight2Array,
  spriteLinkBottomAttackArray,
  spriteLinkTopAttackArray,
  spriteLinkLeftAttackArray,
  spriteLinkRightAttackArray,
  spriteLinkFanfare1Array,
  spriteLinkFanfare2Array
} from "./sprite-data-link.mock";
import {
  spriteSwordDownArray,
  spriteSwordUpArray,
  spriteSwordLeftArray,
  spriteBombArray,
  spriteRupeeArray,
  spritePotionArray
} from "./sprite-data-items.mock";

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
    const col009c00: RgbaColor = {
      red: parseInt("00", 16),
      green: parseInt("9c", 16),
      blue: parseInt("00", 16),
      alpha: 1
    };
    const col7a7a7a: RgbaColor = {
      red: parseInt("7a", 16),
      green: parseInt("7a", 16),
      blue: parseInt("7a", 16),
      alpha: 1
    };
    const colffffff: RgbaColor = {
      red: parseInt("ff", 16),
      green: parseInt("ff", 16),
      blue: parseInt("ff", 16),
      alpha: 1
    };

    const colda8811: RgbaColor = {
      red: parseInt("da", 16),
      green: parseInt("88", 16),
      blue: parseInt("11", 16),
      alpha: 1
    };
    const col703500: RgbaColor = {
      red: parseInt("70", 16),
      green: parseInt("35", 16),
      blue: parseInt("00", 16),
      alpha: 1
    };
    const col7ac000: RgbaColor = {
      red: parseInt("7a", 16),
      green: parseInt("c0", 16),
      blue: parseInt("00", 16),
      alpha: 1
    };
    const coltransparent: RgbaColor = {
      red: parseInt("ff", 16),
      green: parseInt("ff", 16),
      blue: parseInt("ff", 16),
      alpha: 0
    };
    const col6888ff: RgbaColor = {
      red: parseInt("68", 16),
      green: parseInt("88", 16),
      blue: parseInt("ff", 16),
      alpha: 1
    };
    const col0000bc: RgbaColor = {
      red: parseInt("00", 16),
      green: parseInt("00", 16),
      blue: parseInt("bc", 16),
      alpha: 1
    };
    const cole45c0f: RgbaColor = {
      red: parseInt("e4", 16),
      green: parseInt("5c", 16),
      blue: parseInt("0f", 16),
      alpha: 1
    };
    const colb8f818: RgbaColor = {
      red: parseInt("b8", 16),
      green: parseInt("f8", 16),
      blue: parseInt("18", 16),
      alpha: 1
    };
    const colffa044: RgbaColor = {
      red: parseInt("ff", 16),
      green: parseInt("a0", 16),
      blue: parseInt("44", 16),
      alpha: 1
    };

    const overWorldColors1: RgbaColor[] = [
      colffc07a,
      colc03800,
      col001aff,
      col000000
    ];
    const overWorldColors2: RgbaColor[] = [
      colffc07a,
      col009c00,
      col001aff,
      col000000
    ];
    const overWorldColors3: RgbaColor[] = [
      col7a7a7a,
      colffffff,
      col001aff,
      col000000
    ];

    const linkColors1: RgbaColor[] = [
      colda8811,
      col703500,
      col7ac000,
      coltransparent
    ];

    const itemsColors1: RgbaColor[] = [
      cole45c0f,
      colb8f818,
      colffa044,
      coltransparent
    ];

    const itemsColors2: RgbaColor[] = [
      colffffff,
      col6888ff,
      col0000bc,
      coltransparent
    ];

    const sheets: Spritesheet[] = [
      {
        id: 1,
        name: "Over World - Brown",
        colors: overWorldColors1,
        sprites: [
          {
            id: 1,
            name: "Stairs",
            array: spriteStairArray
          },
          {
            id: 2,
            name: "Bolder",
            array: spriteBolderArray
          },
          {
            id: 3,
            name: "Floor",
            array: spriteFloorArray
          },
          {
            id: 4,
            name: "Ladder",
            array: spriteLadderArray
          },
          {
            id: 5,
            name: "Bush",
            array: spriteBushArray
          },
          {
            id: 6,
            name: "Statue",
            array: spriteStatueArray
          },
          {
            id: 7,
            name: "Rock Top Left",
            array: spriteRockArrayTopLeft
          },
          {
            id: 8,
            name: "Rock Top",
            array: spriteRockArrayTopMid
          },
          {
            id: 9,
            name: "Rock Top Right",
            array: spriteRockArrayTopRight
          },
          {
            id: 10,
            name: "Rock Bottom Left",
            array: spriteRockArrayBottomLeft
          },
          {
            id: 11,
            name: "Rock Bottom",
            array: spriteRockArrayBottomMid
          },
          {
            id: 12,
            name: "Rock Bottom Right",
            array: spriteRockArrayBottomRight
          },
          {
            id: 13,
            name: "Tree Top Left",
            array: spriteTreeArrayTopLeft
          },
          {
            id: 14,
            name: "Tree Top",
            array: spriteTreeArrayTopMid
          },
          {
            id: 15,
            name: "Tree Top Right",
            array: spriteTreeArrayTopRight
          },
          {
            id: 16,
            name: "Tree Bottom Left",
            array: spriteTreeArrayBottomLeft
          },
          {
            id: 17,
            name: "Tree Bottom",
            array: spriteTreeArrayBottomMid
          },
          {
            id: 18,
            name: "Tree Bottom Right",
            array: spriteTreeArrayBottomRight
          },

          {
            id: 19,
            name: "Dungeon Top Left",
            array: spriteDungeonLeftTopArray
          },
          {
            id: 20,
            name: "Dungeon Top",
            array: spriteDungeonMiddleTopArray
          },
          {
            id: 21,
            name: "Dungeon Top Right",
            array: spriteDungeonRightTopArray
          },
          {
            id: 22,
            name: "Dungeon Top Left - Alternate",
            array: spriteDungeon1LeftTopArray
          },
          {
            id: 23,
            name: "Dungeon Top - Alternate",
            array: spriteDungeon1MiddleTopArray
          },
          {
            id: 24,
            name: "Dungeon Bottom Left",
            array: spriteDungeonLeftBottomArray
          },
          {
            id: 25,
            name: "Desert",
            array: spriteDesertArray
          },
          {
            id: 26,
            name: "Dungeon Bottom Right",
            array: spriteDungeonRightBottomArray
          },
          {
            id: 27,
            name: "Deck",
            array: spriteDeckArray
          },
          {
            id: 28,
            name: "Waterfall",
            array: spriteWaterfallArray
          },
          {
            id: 29,
            name: "Lake Top Left",
            array: spriteLakeLeftTopArray
          },
          {
            id: 30,
            name: "Lake Top",
            array: spriteLakeMiddleTopArray
          },
          {
            id: 31,
            name: "Lake Top Right",
            array: spriteLakeRightTopArray
          },
          {
            id: 32,
            name: "Lake Left",
            array: spriteLakeLeftMiddleArray
          },
          {
            id: 33,
            name: "Lake Center",
            array: spriteLakeMiddleMiddleArray
          },
          {
            id: 34,
            name: "Lake Right",
            array: spriteLakeRightMiddleArray
          },
          {
            id: 35,
            name: "Lake Bottom Left",
            array: spriteLakeLeftBottomArray
          },
          {
            id: 36,
            name: "Lake Bottom",
            array: spriteLakeMiddleBottomArray
          },
          {
            id: 37,
            name: "Lake Bottom Right",
            array: spriteLakeRightBottomArray
          },
          {
            id: 38,
            name: "Dry Lake Top Left",
            array: spriteDryLakeLeftTopArray
          },
          {
            id: 39,
            name: "Dry Lake Top",
            array: spriteDryLakeMiddleTopArray
          },
          {
            id: 40,
            name: "Dry Lake Top Right",
            array: spriteDryLakeRightTopArray
          },
          {
            id: 41,
            name: "Dry Lake Left",
            array: spriteDryLakeLeftMiddleArray
          },
          {
            id: 42,
            name: "Dry Lake Center",
            array: spriteDryLakeMiddleMiddleArray
          },
          {
            id: 43,
            name: "Dry Lake Right",
            array: spriteDryLakeRightMiddleArray
          },
          {
            id: 44,
            name: "Dry Lake Bottom Left",
            array: spriteDryLakeLeftBottomArray
          },
          {
            id: 45,
            name: "Dry Lake Bottom",
            array: spriteDryLakeMiddleBottomArray
          },
          {
            id: 46,
            name: "Dry Lake Bottom Right",
            array: spriteDryLakeRightBottomArray
          },
          {
            id: 47,
            name: "Lake Inverted Top Left",
            array: spriteLakeInvertLeftTopArray
          },
          {
            id: 48,
            name: "Lake Inverted Top Right",
            array: spriteLakeInvertRightTopArray
          },
          {
            id: 49,
            name: "Lake Inverted Bottom Left",
            array: spriteLakeInvertLeftBottomArray
          },
          {
            id: 50,
            name: "Lake Inverted Bottom Right",
            array: spriteLakeInvertRightBottomArray
          }
        ],
        options: EightBitX2
      },
      {
        id: 2,
        name: "Over World - Green",
        colors: overWorldColors2,
        sprites: [
          {
            id: 1,
            name: "Stairs",
            array: spriteStairArray
          },
          {
            id: 2,
            name: "Bolder",
            array: spriteBolderArray
          },
          {
            id: 3,
            name: "Floor",
            array: spriteFloorArray
          },
          {
            id: 4,
            name: "Ladder",
            array: spriteLadderArray
          },
          {
            id: 5,
            name: "Bush",
            array: spriteBushArray
          },
          {
            id: 6,
            name: "Statue",
            array: spriteStatueArray
          },
          {
            id: 7,
            name: "Rock Top Left",
            array: spriteRockArrayTopLeft
          },
          {
            id: 8,
            name: "Rock Top",
            array: spriteRockArrayTopMid
          },
          {
            id: 9,
            name: "Rock Top Right",
            array: spriteRockArrayTopRight
          },
          {
            id: 10,
            name: "Rock Bottom Left",
            array: spriteRockArrayBottomLeft
          },
          {
            id: 11,
            name: "Rock Bottom",
            array: spriteRockArrayBottomMid
          },
          {
            id: 12,
            name: "Rock Bottom Right",
            array: spriteRockArrayBottomRight
          },
          {
            id: 13,
            name: "Tree Top Left",
            array: spriteTreeArrayTopLeft
          },
          {
            id: 14,
            name: "Tree Top",
            array: spriteTreeArrayTopMid
          },
          {
            id: 15,
            name: "Tree Top Right",
            array: spriteTreeArrayTopRight
          },
          {
            id: 16,
            name: "Tree Bottom Left",
            array: spriteTreeArrayBottomLeft
          },
          {
            id: 17,
            name: "Tree Bottom",
            array: spriteTreeArrayBottomMid
          },
          {
            id: 18,
            name: "Tree Bottom Right",
            array: spriteTreeArrayBottomRight
          },

          {
            id: 19,
            name: "Dungeon Top Left",
            array: spriteDungeonLeftTopArray
          },
          {
            id: 20,
            name: "Dungeon Top",
            array: spriteDungeonMiddleTopArray
          },
          {
            id: 21,
            name: "Dungeon Top Right",
            array: spriteDungeonRightTopArray
          },
          {
            id: 22,
            name: "Dungeon Top Left - Alternate",
            array: spriteDungeon1LeftTopArray
          },
          {
            id: 23,
            name: "Dungeon Top - Alternate",
            array: spriteDungeon1MiddleTopArray
          },
          {
            id: 24,
            name: "Dungeon Bottom Left",
            array: spriteDungeonLeftBottomArray
          },
          {
            id: 25,
            name: "Desert",
            array: spriteDesertArray
          },
          {
            id: 26,
            name: "Dungeon Bottom Right",
            array: spriteDungeonRightBottomArray
          },
          {
            id: 27,
            name: "Deck",
            array: spriteDeckArray
          },
          {
            id: 28,
            name: "Waterfall",
            array: spriteWaterfallArray
          },
          {
            id: 29,
            name: "Lake Top Left",
            array: spriteLakeLeftTopArray
          },
          {
            id: 30,
            name: "Lake Top",
            array: spriteLakeMiddleTopArray
          },
          {
            id: 31,
            name: "Lake Top Right",
            array: spriteLakeRightTopArray
          },
          {
            id: 32,
            name: "Lake Left",
            array: spriteLakeLeftMiddleArray
          },
          {
            id: 33,
            name: "Lake Center",
            array: spriteLakeMiddleMiddleArray
          },
          {
            id: 34,
            name: "Lake Right",
            array: spriteLakeRightMiddleArray
          },
          {
            id: 35,
            name: "Lake Bottom Left",
            array: spriteLakeLeftBottomArray
          },
          {
            id: 36,
            name: "Lake Bottom",
            array: spriteLakeMiddleBottomArray
          },
          {
            id: 37,
            name: "Lake Bottom Right",
            array: spriteLakeRightBottomArray
          },
          {
            id: 38,
            name: "Dry Lake Top Left",
            array: spriteDryLakeLeftTopArray
          },
          {
            id: 39,
            name: "Dry Lake Top",
            array: spriteDryLakeMiddleTopArray
          },
          {
            id: 40,
            name: "Dry Lake Top Right",
            array: spriteDryLakeRightTopArray
          },
          {
            id: 41,
            name: "Dry Lake Left",
            array: spriteDryLakeLeftMiddleArray
          },
          {
            id: 42,
            name: "Dry Lake Center",
            array: spriteDryLakeMiddleMiddleArray
          },
          {
            id: 43,
            name: "Dry Lake Right",
            array: spriteDryLakeRightMiddleArray
          },
          {
            id: 44,
            name: "Dry Lake Bottom Left",
            array: spriteDryLakeLeftBottomArray
          },
          {
            id: 45,
            name: "Dry Lake Bottom",
            array: spriteDryLakeMiddleBottomArray
          },
          {
            id: 46,
            name: "Dry Lake Bottom Right",
            array: spriteDryLakeRightBottomArray
          },
          {
            id: 47,
            name: "Lake Inverted Top Left",
            array: spriteLakeInvertLeftTopArray
          },
          {
            id: 48,
            name: "Lake Inverted Top Right",
            array: spriteLakeInvertRightTopArray
          },
          {
            id: 49,
            name: "Lake Inverted Bottom Left",
            array: spriteLakeInvertLeftBottomArray
          },
          {
            id: 50,
            name: "Lake Inverted Bottom Right",
            array: spriteLakeInvertRightBottomArray
          }
        ],
        options: EightBitX2
      },
      {
        id: 3,
        name: "Over World - Gray",
        colors: overWorldColors3,
        sprites: [
          {
            id: 1,
            name: "Stairs",
            array: spriteStairArray
          },
          {
            id: 2,
            name: "Bolder",
            array: spriteBolderArray
          },
          {
            id: 3,
            name: "Floor",
            array: spriteFloorArray
          },
          {
            id: 4,
            name: "Ladder",
            array: spriteLadderArray
          },
          {
            id: 5,
            name: "Bush",
            array: spriteBushArray
          },
          {
            id: 6,
            name: "Statue",
            array: spriteStatueArray
          },
          {
            id: 7,
            name: "Rock Top Left",
            array: spriteRockArrayTopLeft
          },
          {
            id: 8,
            name: "Rock Top",
            array: spriteRockArrayTopMid
          },
          {
            id: 9,
            name: "Rock Top Right",
            array: spriteRockArrayTopRight
          },
          {
            id: 10,
            name: "Rock Bottom Left",
            array: spriteRockArrayBottomLeft
          },
          {
            id: 11,
            name: "Rock Bottom",
            array: spriteRockArrayBottomMid
          },
          {
            id: 12,
            name: "Rock Bottom Right",
            array: spriteRockArrayBottomRight
          },
          {
            id: 13,
            name: "Tree Top Left",
            array: spriteTreeArrayTopLeft
          },
          {
            id: 14,
            name: "Tree Top",
            array: spriteTreeArrayTopMid
          },
          {
            id: 15,
            name: "Tree Top Right",
            array: spriteTreeArrayTopRight
          },
          {
            id: 16,
            name: "Tree Bottom Left",
            array: spriteTreeArrayBottomLeft
          },
          {
            id: 17,
            name: "Tree Bottom",
            array: spriteTreeArrayBottomMid
          },
          {
            id: 18,
            name: "Tree Bottom Right",
            array: spriteTreeArrayBottomRight
          },

          {
            id: 19,
            name: "Dungeon Top Left",
            array: spriteDungeonLeftTopArray
          },
          {
            id: 20,
            name: "Dungeon Top",
            array: spriteDungeonMiddleTopArray
          },
          {
            id: 21,
            name: "Dungeon Top Right",
            array: spriteDungeonRightTopArray
          },
          {
            id: 22,
            name: "Dungeon Top Left - Alternate",
            array: spriteDungeon1LeftTopArray
          },
          {
            id: 23,
            name: "Dungeon Top - Alternate",
            array: spriteDungeon1MiddleTopArray
          },
          {
            id: 24,
            name: "Dungeon Bottom Left",
            array: spriteDungeonLeftBottomArray
          },
          {
            id: 25,
            name: "Desert",
            array: spriteDesertArray
          },
          {
            id: 26,
            name: "Dungeon Bottom Right",
            array: spriteDungeonRightBottomArray
          },
          {
            id: 27,
            name: "Deck",
            array: spriteDeckArray
          },
          {
            id: 28,
            name: "Waterfall",
            array: spriteWaterfallArray
          },
          {
            id: 29,
            name: "Lake Top Left",
            array: spriteLakeLeftTopArray
          },
          {
            id: 30,
            name: "Lake Top",
            array: spriteLakeMiddleTopArray
          },
          {
            id: 31,
            name: "Lake Top Right",
            array: spriteLakeRightTopArray
          },
          {
            id: 32,
            name: "Lake Left",
            array: spriteLakeLeftMiddleArray
          },
          {
            id: 33,
            name: "Lake Center",
            array: spriteLakeMiddleMiddleArray
          },
          {
            id: 34,
            name: "Lake Right",
            array: spriteLakeRightMiddleArray
          },
          {
            id: 35,
            name: "Lake Bottom Left",
            array: spriteLakeLeftBottomArray
          },
          {
            id: 36,
            name: "Lake Bottom",
            array: spriteLakeMiddleBottomArray
          },
          {
            id: 37,
            name: "Lake Bottom Right",
            array: spriteLakeRightBottomArray
          },
          {
            id: 38,
            name: "Dry Lake Top Left",
            array: spriteDryLakeLeftTopArray
          },
          {
            id: 39,
            name: "Dry Lake Top",
            array: spriteDryLakeMiddleTopArray
          },
          {
            id: 40,
            name: "Dry Lake Top Right",
            array: spriteDryLakeRightTopArray
          },
          {
            id: 41,
            name: "Dry Lake Left",
            array: spriteDryLakeLeftMiddleArray
          },
          {
            id: 42,
            name: "Dry Lake Center",
            array: spriteDryLakeMiddleMiddleArray
          },
          {
            id: 43,
            name: "Dry Lake Right",
            array: spriteDryLakeRightMiddleArray
          },
          {
            id: 44,
            name: "Dry Lake Bottom Left",
            array: spriteDryLakeLeftBottomArray
          },
          {
            id: 45,
            name: "Dry Lake Bottom",
            array: spriteDryLakeMiddleBottomArray
          },
          {
            id: 46,
            name: "Dry Lake Bottom Right",
            array: spriteDryLakeRightBottomArray
          },
          {
            id: 47,
            name: "Lake Inverted Top Left",
            array: spriteLakeInvertLeftTopArray
          },
          {
            id: 48,
            name: "Lake Inverted Top Right",
            array: spriteLakeInvertRightTopArray
          },
          {
            id: 49,
            name: "Lake Inverted Bottom Left",
            array: spriteLakeInvertLeftBottomArray
          },
          {
            id: 50,
            name: "Lake Inverted Bottom Right",
            array: spriteLakeInvertRightBottomArray
          }
        ],
        options: EightBitX2
      },
      {
        id: 4,
        name: "Link - Green",
        colors: linkColors1,
        sprites: [
          {
            id: 1,
            name: "Link Bottom",
            array: spriteLinkBottom1Array
          },
          {
            id: 2,
            name: "Link Bottom - Alternate",
            array: spriteLinkBottom2Array
          },
          {
            id: 3,
            name: "Link Top",
            array: spriteLinkTop1Array
          },
          {
            id: 4,
            name: "Link Top - Alternate",
            array: spriteLinkTop2Array
          },
          {
            id: 5,
            name: "Link Left",
            array: spriteLinkLeft1Array
          },
          {
            id: 6,
            name: "Link Left - Alternate",
            array: spriteLinkLeft2Array
          },
          {
            id: 7,
            name: "Link Right",
            array: spriteLinkRight1Array
          },
          {
            id: 8,
            name: "Link Right - Alternate",
            array: spriteLinkRight2Array
          },
          {
            id: 9,
            name: "Link Bottom - Alternate",
            array: spriteLinkBottomAttackArray
          },
          {
            id: 10,
            name: "Link Top",
            array: spriteLinkTopAttackArray
          },
          {
            id: 11,
            name: "Link Top - Alternate",
            array: spriteLinkLeftAttackArray
          },
          {
            id: 12,
            name: "Link Left",
            array: spriteLinkRightAttackArray
          },
          {
            id: 13,
            name: "Link Left - Alternate",
            array: spriteLinkFanfare1Array
          },
          {
            id: 14,
            name: "Link Right",
            array: spriteLinkFanfare2Array
          }
        ],
        options: EightBitX2
      },
      {
        id: 7,
        name: "Items -  Green",
        colors: itemsColors1,
        sprites: [
          {
            id: 1,
            name: "Sword Down",
            array: spriteSwordDownArray
          },
          {
            id: 2,
            name: "Sword Up",
            array: spriteSwordUpArray
          },
          {
            id: 3,
            name: "Sword Left",
            array: spriteSwordLeftArray
          }
        ],
        options: EightBitX2
      },
      {
        id: 8,
        name: "Items - Blue",
        colors: itemsColors2,
        sprites: [
          {
            id: 5,
            name: "Bomb",
            array: spriteBombArray
          },
          {
            id: 6,
            name: "Rupee",
            array: spriteRupeeArray
          },
          {
            id: 7,
            name: "Potion",
            array: spritePotionArray
          }

        ],
        options: EightBitX2
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
