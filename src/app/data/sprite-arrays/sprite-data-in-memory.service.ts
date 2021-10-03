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
  spritePotionArray,
  spriteFireArray,
  spriteHeartContainerArray
} from "./sprite-data-items.mock";
import { spriteOctorok2Array, spriteOctorokArray } from "./sprite-data-monsters-overworld.mock";

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
    const coleca01e: RgbaColor = {
      red: parseInt("ec", 16),
      green: parseInt("a0", 16),
      blue: parseInt("1e", 16),
      alpha: 1
    };
    const colb62e1a: RgbaColor = {
      red: parseInt("b6", 16),
      green: parseInt("2e", 16),
      blue: parseInt("1a", 16),
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

    const itemsColors3: RgbaColor[] = [
      colffffff,
      coleca01e,
      colb62e1a,
      coltransparent
    ];

    const noReadOrWrite: Spritesheet["access"] = {
      read: false,
      write: false
    }
    
    const readOnly: Spritesheet["access"] = {
      read: true,
      write: false
    }

    const readWrite = {
      read: true,
      write: true
    }

    const sheets: Spritesheet[] = [
      {
        id: "0b9bcda2-c278-4539-83d0-7b92a413847d",
        name: "Over World - Brown",
        access: readOnly,
        colors: overWorldColors1,
        sprites: [
          {
            id: "9d24af31-a3c9-4a7c-9d5a-e37f2689d47d",
            name: "Stairs",
            access: readWrite,
            array: spriteStairArray
          },
          {
            id: "502d9d27-1cc9-4000-839a-6401a80c392d",
            name: "Bolder",
            access: readWrite,
            array: spriteBolderArray
          },
          {
            id: "3f5aa626-0b6b-49a3-b492-52a0b0bdbde0",
            name: "Floor",
            access: readWrite,
            array: spriteFloorArray
          },
          {
            id: "67f3b809-b39e-4dd8-a032-c664e0ae358b4",
            name: "Ladder",
            access: readWrite,
            array: spriteLadderArray
          },
          {
            id: "21e8dbc6-9c11-4817-b4f6-5f9fa667e9fc5",
            name: "Bush",
            access: readWrite,
            array: spriteBushArray
          },
          {
            id: "4e45e270-54f9-4319-92d9-b00a7e3641b0",
            name: "Statue",
            access: readWrite,
            array: spriteStatueArray
          },
          {
            id: "44ebe904-8ae7-4dc6-bcfa-a1d4480f1244",
            name: "Rock Top Left",
            access: readWrite,
            array: spriteRockArrayTopLeft
          },
          {
            id: "c0d8469c-b49c-4dde-b774-ca550845bc20",
            name: "Rock Top",
            access: readWrite,
            array: spriteRockArrayTopMid
          },
          {
            id: "05d4d9bb-1eff-4555-84c7-45ff19fba8e2",
            name: "Rock Top Right",
            access: readWrite,
            array: spriteRockArrayTopRight
          },
          {
            id: "2d5dada5-550a-4a93-9aad-f19ca5ccaade",
            name: "Rock Bottom Left",
            access: readWrite,
            array: spriteRockArrayBottomLeft
          },
          {
            id: "9db8c14b-fa65-4717-b50a-f002bf954fe9",
            name: "Rock Bottom",
            access: readWrite,
            array: spriteRockArrayBottomMid
          },
          {
            id: "994cccd7-f010-4ef0-bd25-7c1e466428ca",
            name: "Rock Bottom Right",
            access: readWrite,
            array: spriteRockArrayBottomRight
          },
          {
            id: "43983cdf-9e5c-4791-a9c3-a7be80193652",
            name: "Tree Top Left",
            access: readWrite,
            array: spriteTreeArrayTopLeft
          },
          {
            id: "703226d1-3483-43eb-88ec-a522fdc21115",
            name: "Tree Top",
            access: readWrite,
            array: spriteTreeArrayTopMid
          },
          {
            id: "d369710a-75d8-4c81-9b6e-a2ff78a50a99",
            name: "Tree Top Right",
            access: readWrite,
            array: spriteTreeArrayTopRight
          },
          {
            id: "cc1e56e9-d42b-4e75-b71e-c7db174d8bbc",
            name: "Tree Bottom Left",
            access: readWrite,
            array: spriteTreeArrayBottomLeft
          },
          {
            id: "c9245ced-6e62-4f6e-a158-12822d47b99e",
            name: "Tree Bottom",
            access: readWrite,
            array: spriteTreeArrayBottomMid
          },
          {
            id: "0e691655-72d4-415b-856e-3668a25d74fa",
            name: "Tree Bottom Right",
            access: readWrite,
            array: spriteTreeArrayBottomRight
          },

          {
            id: "3f0d0a4c-d531-41be-8fd0-f44b46a5dd3d",
            name: "Dungeon Top Left",
            access: readWrite,
            array: spriteDungeonLeftTopArray
          },
          {
            id: "e7184011-132a-4fdc-bda7-3185b14a0837",
            name: "Dungeon Top",
            access: readWrite,
            array: spriteDungeonMiddleTopArray
          },
          {
            id: "46019756-0cd3-420d-ba37-fca3d3e57e21",
            name: "Dungeon Top Right",
            access: readWrite,
            array: spriteDungeonRightTopArray
          },
          {
            id: "b8620c83-eea0-47f8-9be2-6c384cff0b43",
            name: "Dungeon Top Left - Alternate",
            access: readWrite,
            array: spriteDungeon1LeftTopArray
          },
          {
            id: "826ebba9-c786-42e4-8edf-456bcd4a5a6f",
            name: "Dungeon Top - Alternate",
            access: readWrite,
            array: spriteDungeon1MiddleTopArray
          },
          {
            id: "7d6b3d65-6b51-4861-8580-d766046fc39e",
            name: "Dungeon Bottom Left",
            access: readWrite,
            array: spriteDungeonLeftBottomArray
          },
          {
            id: "a2ad51ef-8906-4c3a-94e1-9f21122629f5",
            name: "Desert",
            access: readWrite,
            array: spriteDesertArray
          },
          {
            id: "46e19f90-2520-4f1f-9e68-fa5871c527ad",
            name: "Dungeon Bottom Right",
            access: readWrite,
            array: spriteDungeonRightBottomArray
          },
          {
            id: "734d55ef-49e1-4d33-ad07-0e4fa7bae580",
            name: "Deck",
            access: readWrite,
            array: spriteDeckArray
          },
          {
            id: "aee5a91e-195c-487b-9c88-166ad7a1c8dc",
            name: "Waterfall",
            access: readWrite,
            array: spriteWaterfallArray
          },
          {
            id: "754d3162-6a83-4509-83db-5639a8bb5e17",
            name: "Lake Top Left",
            access: readWrite,
            array: spriteLakeLeftTopArray
          },
          {
            id: "5e04fdc0-53e8-4049-90f5-d0cf11a09f23",
            name: "Lake Top",
            access: readWrite,
            array: spriteLakeMiddleTopArray
          },
          {
            id: "0203f49a-c40d-41ea-ac9e-f4e559c48cfb",
            name: "Lake Top Right",
            access: readWrite,
            array: spriteLakeRightTopArray
          },
          {
            id: "dd38ad99-2d01-44aa-a125-78da51dc7708",
            name: "Lake Left",
            access: readWrite,
            array: spriteLakeLeftMiddleArray
          },
          {
            id: "dc765edf-fa62-45b5-a34c-0fb1e3f56c7e",
            name: "Lake Center",
            access: readWrite,
            array: spriteLakeMiddleMiddleArray
          },
          {
            id: "91a9105c-53d4-4548-8a7f-0e373cd40241",
            name: "Lake Right",
            access: readWrite,
            array: spriteLakeRightMiddleArray
          },
          {
            id: "8d26ad47-ff6e-4020-a7ce-0ef1449fe46d",
            name: "Lake Bottom Left",
            access: readWrite,
            array: spriteLakeLeftBottomArray
          },
          {
            id: "e8b5edd4-a1cb-4bdd-83f6-35a2472e99d9",
            name: "Lake Bottom",
            access: readWrite,
            array: spriteLakeMiddleBottomArray
          },
          {
            id: "33a45395-3938-4965-8e1b-3cdf651b9bbf",
            name: "Lake Bottom Right",
            access: readWrite,
            array: spriteLakeRightBottomArray
          },
          {
            id: "5261f0c8-bdb8-4758-95cb-a5a5b760c7c6",
            name: "Dry Lake Top Left",
            access: readWrite,
            array: spriteDryLakeLeftTopArray
          },
          {
            id: "5e24fa7e-ecbd-47eb-b058-8408217b80a8",
            name: "Dry Lake Top",
            access: readWrite,
            array: spriteDryLakeMiddleTopArray
          },
          {
            id: "9bd58e1b-a050-4535-9713-8e4bb7537594",
            name: "Dry Lake Top Right",
            access: readWrite,
            array: spriteDryLakeRightTopArray
          },
          {
            id: "a5be4beb-d416-4b6e-979e-cba89135c7b9",
            name: "Dry Lake Left",
            access: readWrite,
            array: spriteDryLakeLeftMiddleArray
          },
          {
            id: "30b594e9-4c42-41fd-bd41-1cbe0bff8cc0",
            name: "Dry Lake Center",
            access: readWrite,
            array: spriteDryLakeMiddleMiddleArray
          },
          {
            id: "39c2ca60-9753-481c-ba32-412232d86fde",
            name: "Dry Lake Right",
            access: readWrite,
            array: spriteDryLakeRightMiddleArray
          },
          {
            id: "17504ede-cc2c-4fc2-b409-f47df4f90d1f",
            name: "Dry Lake Bottom Left",
            access: readWrite,
            array: spriteDryLakeLeftBottomArray
          },
          {
            id: "34a214be-e537-47e4-9c1a-dc6c55181787",
            name: "Dry Lake Bottom",
            access: readWrite,
            array: spriteDryLakeMiddleBottomArray
          },
          {
            id: "1cf08620-2104-4a52-9423-2f2def2d5024",
            name: "Dry Lake Bottom Right",
            access: readWrite,
            array: spriteDryLakeRightBottomArray
          },
          {
            id: "cff18f5a-3ff5-45d5-8a49-e6ea97751fad",
            name: "Lake Inverted Top Left",
            access: readWrite,
            array: spriteLakeInvertLeftTopArray
          },
          {
            id: "4aee4cc0-0d83-4d8e-8a58-fcbe96fe2233",
            name: "Lake Inverted Top Right",
            access: readWrite,
            array: spriteLakeInvertRightTopArray
          },
          {
            id: "06d602ee-cdc5-4e50-8f32-63f00c1f7c97",
            name: "Lake Inverted Bottom Left",
            access: readWrite,
            array: spriteLakeInvertLeftBottomArray
          },
          {
            id: "bcaf0d57-2bca-4fed-a981-0af72add50dc",
            name: "Lake Inverted Bottom Right",
            access: readWrite,
            array: spriteLakeInvertRightBottomArray
          }
        ],
        options: EightBitX2
      },
      {
        id: "0b8edc27-79d6-4f10-8272-b09f339dc20f",
        name: "Over World - Green",
        access: readOnly,
        colors: overWorldColors2,
        sprites: [
          {
            id: "f8f314a7-92d2-4b48-bea9-5785570d6e29",
            name: "Stairs",
            access: readWrite,
            array: spriteStairArray
          },
          {
            id: "338b1d5f-4f2f-4e0f-9d75-f1369f2dd57d",
            name: "Bolder",
            access: readWrite,
            array: spriteBolderArray
          },
          {
            id: "5686112a-e447-4f21-96db-76b9f61f8934",
            name: "Floor",
            access: readWrite,
            array: spriteFloorArray
          },
          {
            id: "f7505e7c-7285-4ccc-8205-c0084f8933fa",
            name: "Ladder",
            access: readWrite,
            array: spriteLadderArray
          },
          {
            id: "5de261bd-798a-438d-ad46-602480873158",
            name: "Bush",
            access: readWrite,
            array: spriteBushArray
          },
          {
            id: "d4da32ea-10f2-460c-8723-45cfdace9e73",
            name: "Statue",
            access: readWrite,
            array: spriteStatueArray
          },
          {
            id: "adc71ed4-d2f2-4939-9ec1-0ad5ff7191a8",
            name: "Rock Top Left",
            access: readWrite,
            array: spriteRockArrayTopLeft
          },
          {
            id: "a3964e80-3d72-408e-9300-5ad9300e582b",
            name: "Rock Top",
            access: readWrite,
            array: spriteRockArrayTopMid
          },
          {
            id: "f8e2c2e2-db88-4920-8395-ca1c98509dee",
            name: "Rock Top Right",
            access: readWrite,
            array: spriteRockArrayTopRight
          },
          {
            id: "5c5e217f-bc27-4017-92e0-ee94f514b464",
            name: "Rock Bottom Left",
            access: readWrite,
            array: spriteRockArrayBottomLeft
          },
          {
            id: "cb5d0dc4-4e5c-45cc-bd5f-f7409f1365f6",
            name: "Rock Bottom",
            access: readWrite,
            array: spriteRockArrayBottomMid
          },
          {
            id: "7a0850c7-423b-443d-bfc8-e3996181d9bc",
            name: "Rock Bottom Right",
            access: readWrite,
            array: spriteRockArrayBottomRight
          },
          {
            id: "a51b67c5-4571-4b8b-9ca4-ca0101ad8b54",
            name: "Tree Top Left",
            access: readWrite,
            array: spriteTreeArrayTopLeft
          },
          {
            id: "83c18f7a-2c85-4be0-9bea-a5bd9d5fe212",
            name: "Tree Top",
            access: readWrite,
            array: spriteTreeArrayTopMid
          },
          {
            id: "12d6bf09-0a93-4927-a937-6868613a4613",
            name: "Tree Top Right",
            access: readWrite,
            array: spriteTreeArrayTopRight
          },
          {
            id: "80fcc3a3-0834-465b-9cb1-fe427a927524",
            name: "Tree Bottom Left",
            access: readWrite,
            array: spriteTreeArrayBottomLeft
          },
          {
            id: "1af32c5e-c458-4b06-a953-a758e8c8bf75",
            name: "Tree Bottom",
            access: readWrite,
            array: spriteTreeArrayBottomMid
          },
          {
            id: "94d7f1d8-400f-4856-b38b-fb720487206a",
            name: "Tree Bottom Right",
            access: readWrite,
            array: spriteTreeArrayBottomRight
          },

          {
            id: "29bb3cd4-68db-43ca-b87d-e03ca04320f1",
            name: "Dungeon Top Left",
            access: readWrite,
            array: spriteDungeonLeftTopArray
          },
          {
            id: "53796f1b-d3c3-47d1-902a-e78a6dedb601",
            name: "Dungeon Top",
            access: readWrite,
            array: spriteDungeonMiddleTopArray
          },
          {
            id: "09130a71-e665-45bf-b186-d02c4af1bcf7",
            name: "Dungeon Top Right",
            access: readWrite,
            array: spriteDungeonRightTopArray
          },
          {
            id: "bda82474-b691-4e4f-a5b5-358e05e59316",
            name: "Dungeon Top Left - Alternate",
            access: readWrite,
            array: spriteDungeon1LeftTopArray
          },
          {
            id: "d5dcdbbb-7ab9-4244-bb4a-64957148ba68",
            name: "Dungeon Top - Alternate",
            access: readWrite,
            array: spriteDungeon1MiddleTopArray
          },
          {
            id: "aaf58747-fa42-4b0d-a5d5-f499330c5095",
            name: "Dungeon Bottom Left",
            access: readWrite,
            array: spriteDungeonLeftBottomArray
          },
          {
            id: "432edd72-c502-43ee-b8e9-515cce3f93ea",
            name: "Desert",
            access: readWrite,
            array: spriteDesertArray
          },
          {
            id: "097ec1e0-2a7c-4ada-8cfb-3d7b7b144f83",
            name: "Dungeon Bottom Right",
            access: readWrite,
            array: spriteDungeonRightBottomArray
          },
          {
            id: "e01d52e4-aeba-4607-b1f4-3cdaab7971ed",
            name: "Deck",
            access: readWrite,
            array: spriteDeckArray
          },
          {
            id: "294a26d5-b932-4007-b19c-be2933149705",
            name: "Waterfall",
            access: readWrite,
            array: spriteWaterfallArray
          },
          {
            id: "532e35df-2f37-4aff-87dd-41bd20ab29c2",
            name: "Lake Top Left",
            access: readWrite,
            array: spriteLakeLeftTopArray
          },
          {
            id: "e7c8be2f-cde9-4c5c-8646-76df1000586a",
            name: "Lake Top",
            access: readWrite,
            array: spriteLakeMiddleTopArray
          },
          {
            id: "11b102f9-9cb1-4097-947c-dbcf5122c008",
            name: "Lake Top Right",
            access: readWrite,
            array: spriteLakeRightTopArray
          },
          {
            id: "e59ae953-069c-41cb-9bce-92a3de90d45e",
            name: "Lake Left",
            access: readWrite,
            array: spriteLakeLeftMiddleArray
          },
          {
            id: "2803d86f-18fb-433a-a3c6-5224a4bf0f62",
            name: "Lake Center",
            access: readWrite,
            array: spriteLakeMiddleMiddleArray
          },
          {
            id: "a990c32a-1e45-49c6-88e8-21f2c907b59e",
            name: "Lake Right",
            access: readWrite,
            array: spriteLakeRightMiddleArray
          },
          {
            id: "2e41b5d7-2580-4357-ba8f-fffa4e0628b6",
            name: "Lake Bottom Left",
            access: readWrite,
            array: spriteLakeLeftBottomArray
          },
          {
            id: "65ce4e02-dcbd-4467-af52-216b6552d831",
            name: "Lake Bottom",
            access: readWrite,
            array: spriteLakeMiddleBottomArray
          },
          {
            id: "ec160db4-838d-44fe-9348-d9f5f2aeaf08",
            name: "Lake Bottom Right",
            access: readWrite,
            array: spriteLakeRightBottomArray
          },
          {
            id: "ebf9b489-3645-47ff-9ae4-d8021f75165b",
            name: "Dry Lake Top Left",
            access: readWrite,
            array: spriteDryLakeLeftTopArray
          },
          {
            id: "05acf038-126c-42dc-af83-0244944884ab",
            name: "Dry Lake Top",
            access: readWrite,
            array: spriteDryLakeMiddleTopArray
          },
          {
            id: "f088b2b4-835c-44aa-8666-90381900effd",
            name: "Dry Lake Top Right",
            access: readWrite,
            array: spriteDryLakeRightTopArray
          },
          {
            id: "574ea6fc-200d-4f2b-a587-ba12a811c01e",
            name: "Dry Lake Left",
            access: readWrite,
            array: spriteDryLakeLeftMiddleArray
          },
          {
            id: "b59aeb74-7935-4a8b-bedf-c009b44a8e4a",
            name: "Dry Lake Center",
            access: readWrite,
            array: spriteDryLakeMiddleMiddleArray
          },
          {
            id: "36d63f7a-ce49-4103-b376-4f0449c17dd6",
            name: "Dry Lake Right",
            access: readWrite,
            array: spriteDryLakeRightMiddleArray
          },
          {
            id: "0880d034-ba25-4268-b6aa-5a5fb593388f",
            name: "Dry Lake Bottom Left",
            access: readWrite,
            array: spriteDryLakeLeftBottomArray
          },
          {
            id: "352a42d3-aacc-46b1-8b82-8acc26a30bd9",
            name: "Dry Lake Bottom",
            access: readWrite,
            array: spriteDryLakeMiddleBottomArray
          },
          {
            id: "26716b88-259f-42a8-b1a0-8aa15a039fb6",
            name: "Dry Lake Bottom Right",
            access: readWrite,
            array: spriteDryLakeRightBottomArray
          },
          {
            id: "c26a1a02-ed17-4964-8904-548791c2c5f6",
            name: "Lake Inverted Top Left",
            access: readWrite,
            array: spriteLakeInvertLeftTopArray
          },
          {
            id: "d6f0f46d-b979-473d-b208-74337d0b4176",
            name: "Lake Inverted Top Right",
            access: readWrite,
            array: spriteLakeInvertRightTopArray
          },
          {
            id: "94447287-2b9a-445c-ae5d-ca03ddd3eb8f",
            name: "Lake Inverted Bottom Left",
            access: readWrite,
            array: spriteLakeInvertLeftBottomArray
          },
          {
            id: "c2af9680-e152-4ff3-9619-f4d9b47aefce",
            name: "Lake Inverted Bottom Right",
            access: readWrite,
            array: spriteLakeInvertRightBottomArray
          }
        ],
        options: EightBitX2
      },
      {
        id: "0c595db0-e6ab-4999-a3f3-a1a60b8cede5",
        name: "Over World - Gray",
        access: readOnly,
        colors: overWorldColors3,
        sprites: [
          {
            id: "560a03df-83e8-49b8-95be-e16e74586044",
            name: "Stairs",
            access: readWrite,
            array: spriteStairArray
          },
          {
            id: "2e8827de-d224-4642-949f-6dbd611413ef",
            name: "Bolder",
            access: readWrite,
            array: spriteBolderArray
          },
          {
            id: "f17b2c5a-2507-4143-ac23-2bc1aaa12ec8",
            name: "Floor",
            access: readWrite,
            array: spriteFloorArray
          },
          {
            id: "5dfdc10d-cdd2-437b-9dcd-771cd0cb35ac",
            name: "Ladder",
            access: readWrite,
            array: spriteLadderArray
          },
          {
            id: "6013ca12-2cb6-46a2-986e-ce35dc46c7e6",
            name: "Bush",
            access: readWrite,
            array: spriteBushArray
          },
          {
            id: "6c1d6ffd-3886-4c37-97db-50dd7ba5f9f1",
            name: "Statue",
            access: readWrite,
            array: spriteStatueArray
          },
          {
            id: "b243c9ea-9d85-42e9-b657-ac1362b260e0",
            name: "Rock Top Left",
            access: readWrite,
            array: spriteRockArrayTopLeft
          },
          {
            id: "31b0c62a-1ca7-4f98-beb2-00be67e5ceb1",
            name: "Rock Top",
            access: readWrite,
            array: spriteRockArrayTopMid
          },
          {
            id: "6727e07d-1450-4d28-a3bc-b4f11e17d642",
            name: "Rock Top Right",
            access: readWrite,
            array: spriteRockArrayTopRight
          },
          {
            id: "145e9b9e-82b8-4498-9a12-bc91aedc25f8",
            name: "Rock Bottom Left",
            access: readWrite,
            array: spriteRockArrayBottomLeft
          },
          {
            id: "ead6a468-2299-4c34-926e-4b744e6ec616",
            name: "Rock Bottom",
            access: readWrite,
            array: spriteRockArrayBottomMid
          },
          {
            id: "876658eb-d763-43b8-bb93-0b03c9d8d8dd",
            name: "Rock Bottom Right",
            access: readWrite,
            array: spriteRockArrayBottomRight
          },
          {
            id: "43d8e1c8-5f4c-4f92-9ca5-7db5387ef8ad",
            name: "Tree Top Left",
            access: readWrite,
            array: spriteTreeArrayTopLeft
          },
          {
            id: "cd824f91-03f5-4d7e-b484-15365c8402c9",
            name: "Tree Top",
            access: readWrite,
            array: spriteTreeArrayTopMid
          },
          {
            id: "06569cb0-b36e-4665-9264-b323e7880d65",
            name: "Tree Top Right",
            access: readWrite,
            array: spriteTreeArrayTopRight
          },
          {
            id: "0faa11bf-4aac-4151-9a64-0c362b2ed064",
            name: "Tree Bottom Left",
            access: readWrite,
            array: spriteTreeArrayBottomLeft
          },
          {
            id: "5eb9cc7e-31bd-447c-98a3-960a0d6fff23",
            name: "Tree Bottom",
            access: readWrite,
            array: spriteTreeArrayBottomMid
          },
          {
            id: "c55dfe4c-44a7-4eef-bde0-dcc330988ae0",
            name: "Tree Bottom Right",
            access: readWrite,
            array: spriteTreeArrayBottomRight
          },

          {
            id: "7ba08c24-8487-412c-a37c-689ce80fb747",
            name: "Dungeon Top Left",
            access: readWrite,
            array: spriteDungeonLeftTopArray
          },
          {
            id: "46a73fa2-731f-45e2-97ae-fc379de39417",
            name: "Dungeon Top",
            access: readWrite,
            array: spriteDungeonMiddleTopArray
          },
          {
            id: "23e55b10-9190-49d3-b0dc-756c41fa0e76",
            name: "Dungeon Top Right",
            access: readWrite,
            array: spriteDungeonRightTopArray
          },
          {
            id: "2bb17c73-9772-48ab-bd84-039b491917d8",
            name: "Dungeon Top Left - Alternate",
            access: readWrite,
            array: spriteDungeon1LeftTopArray
          },
          {
            id: "f5f72790-9e61-46f6-8f4d-622f7421db44",
            name: "Dungeon Top - Alternate",
            access: readWrite,
            array: spriteDungeon1MiddleTopArray
          },
          {
            id: "a8c79d4e-cc91-414e-9156-de7a7f7ee6dc",
            name: "Dungeon Bottom Left",
            access: readWrite,
            array: spriteDungeonLeftBottomArray
          },
          {
            id: "9dfe14be-30b2-4bfc-8804-a440db73da25",
            name: "Desert",
            access: readWrite,
            array: spriteDesertArray
          },
          {
            id: "28f655f1-5828-43c5-911a-7cf683cfd0e7",
            name: "Dungeon Bottom Right",
            access: readWrite,
            array: spriteDungeonRightBottomArray
          },
          {
            id: "e59b0320-ee5e-48f0-83ab-ec16d0a89260",
            name: "Deck",
            access: readWrite,
            array: spriteDeckArray
          },
          {
            id: "0681fa24-de3b-4341-b1e1-d01bf9728fe3",
            name: "Waterfall",
            access: readWrite,
            array: spriteWaterfallArray
          },
          {
            id: "55ca3a17-f19b-4975-b28a-44712cfe4a47",
            name: "Lake Top Left",
            access: readWrite,
            array: spriteLakeLeftTopArray
          },
          {
            id: "7b268647-4805-4fea-96d5-616a73e69fb8",
            name: "Lake Top",
            access: readWrite,
            array: spriteLakeMiddleTopArray
          },
          {
            id: "94f7820e-1ced-48e4-adb0-4026611cb4d3",
            name: "Lake Top Right",
            access: readWrite,
            array: spriteLakeRightTopArray
          },
          {
            id: "69a302b9-f603-4001-912d-2203f5d2088f",
            name: "Lake Left",
            access: readWrite,
            array: spriteLakeLeftMiddleArray
          },
          {
            id: "6d4109b0-6bb5-435c-828f-1b039d7eb5a1",
            name: "Lake Center",
            access: readWrite,
            array: spriteLakeMiddleMiddleArray
          },
          {
            id: "1f701b97-e108-470f-b6f3-f9acda70fc11",
            name: "Lake Right",
            access: readWrite,
            array: spriteLakeRightMiddleArray
          },
          {
            id: "7ae10372-e847-4ec0-a3b7-8819a53e37d5",
            name: "Lake Bottom Left",
            access: readWrite,
            array: spriteLakeLeftBottomArray
          },
          {
            id: "853830bc-518d-4d6e-92c5-9b8e962d1c65",
            name: "Lake Bottom",
            access: readWrite,
            array: spriteLakeMiddleBottomArray
          },
          {
            id: "5d7303d1-dd60-4ec7-a274-0a5d167aae7e",
            name: "Lake Bottom Right",
            access: readWrite,
            array: spriteLakeRightBottomArray
          },
          {
            id: "eb9c510e-a202-40c3-b7cf-d6990aa65b88",
            name: "Dry Lake Top Left",
            access: readWrite,
            array: spriteDryLakeLeftTopArray
          },
          {
            id: "10cc107f-4ca2-41b9-8c94-48aaac213892",
            name: "Dry Lake Top",
            access: readWrite,
            array: spriteDryLakeMiddleTopArray
          },
          {
            id: "dca2cce8-5413-4263-a2e9-438040105da9",
            name: "Dry Lake Top Right",
            access: readWrite,
            array: spriteDryLakeRightTopArray
          },
          {
            id: "658c786c-afd2-4ffb-b263-03f3dbfa63d6",
            name: "Dry Lake Left",
            access: readWrite,
            array: spriteDryLakeLeftMiddleArray
          },
          {
            id: "e18cb3ce-6a45-40bb-84d5-62163593cdc1",
            name: "Dry Lake Center",
            access: readWrite,
            array: spriteDryLakeMiddleMiddleArray
          },
          {
            id: "63507be9-af87-4fa1-b153-16040cf3397e",
            name: "Dry Lake Right",
            access: readWrite,
            array: spriteDryLakeRightMiddleArray
          },
          {
            id: "4920cbe3-13a6-485c-a88e-dd605c6c92f8",
            name: "Dry Lake Bottom Left",
            access: readWrite,
            array: spriteDryLakeLeftBottomArray
          },
          {
            id: "89e79820-5afe-43e5-ac1f-300cc73f926e",
            name: "Dry Lake Bottom",
            access: readWrite,
            array: spriteDryLakeMiddleBottomArray
          },
          {
            id: "36f41f95-78dc-4bef-9c9b-c74eec82565f",
            name: "Dry Lake Bottom Right",
            access: readWrite,
            array: spriteDryLakeRightBottomArray
          },
          {
            id: "ff54f0f3-774e-4902-92bf-d42ee4234eee",
            name: "Lake Inverted Top Left",
            access: readWrite,
            array: spriteLakeInvertLeftTopArray
          },
          {
            id: "f167e8a8-a1b8-420a-9e71-8a90978bea66",
            name: "Lake Inverted Top Right",
            access: readWrite,
            array: spriteLakeInvertRightTopArray
          },
          {
            id: "307270dc-c750-4083-a2e9-591e09568e85",
            name: "Lake Inverted Bottom Left",
            access: readWrite,
            array: spriteLakeInvertLeftBottomArray
          },
          {
            id: "6776e681-5b0e-457f-a29b-b3d3e27bb7a0",
            name: "Lake Inverted Bottom Right",
            access: readWrite,
            array: spriteLakeInvertRightBottomArray
          }
        ],
        options: EightBitX2
      },
      {
        id: "5e24b4c7-eb38-4bb0-8fe4-3ae79cf91005",
        name: "Link - Green",
        access: readOnly,
        colors: linkColors1,
        sprites: [
          {
            id: "f0e03da5-f4cf-4ffe-9662-3c0e989686d3",
            name: "Link Bottom",
            access: readWrite,
            array: spriteLinkBottom1Array
          },
          {
            id: "c9781df1-56f7-476e-a17e-911862a1df90",
            name: "Link Bottom - Alternate",
            access: readWrite,
            array: spriteLinkBottom2Array
          },
          {
            id: "c13fa6a5-6894-42d6-ae52-46ca62c8ff4f",
            name: "Link Top",
            access: readWrite,
            array: spriteLinkTop1Array
          },
          {
            id: "69b48164-00c4-4f95-b1fe-b1d3758927fb",
            name: "Link Top - Alternate",
            access: readWrite,
            array: spriteLinkTop2Array
          },
          {
            id: "fc85babb-3665-4760-abca-53497c96a42d",
            name: "Link Left",
            access: readWrite,
            array: spriteLinkLeft1Array
          },
          {
            id: "24dc4df7-60bd-47ab-8627-1adc2df55535",
            name: "Link Left - Alternate",
            access: readWrite,
            array: spriteLinkLeft2Array
          },
          {
            id: "4e76f2e8-bf00-4a64-ad2a-9a213fc0f12b",
            name: "Link Right",
            access: readWrite,
            array: spriteLinkRight1Array
          },
          {
            id: "3b152b28-b99f-4f0a-8608-140187f7ff77",
            name: "Link Right - Alternate",
            access: readWrite,
            array: spriteLinkRight2Array
          },
          {
            id: "d80b2145-eb9e-4419-bca8-04181d3baa2b",
            name: "Link Bottom - Alternate",
            access: readWrite,
            array: spriteLinkBottomAttackArray
          },
          {
            id: "4e36a492-5d7e-4132-98cc-de4a6fdd1b6c",
            name: "Link Top",
            access: readWrite,
            array: spriteLinkTopAttackArray
          },
          {
            id: "73857caf-0dd4-4524-b6ae-edbc8fe5f95e",
            name: "Link Top - Alternate",
            access: readWrite,
            array: spriteLinkLeftAttackArray
          },
          {
            id: "48e34731-a0c4-46c4-ae3f-9a47c4671243",
            name: "Link Left",
            access: readWrite,
            array: spriteLinkRightAttackArray
          },
          {
            id: "2c05ef1d-cb9b-47e0-a170-96e86cb6bcab",
            name: "Link Left - Alternate",
            access: readWrite,
            array: spriteLinkFanfare1Array
          },
          {
            id: "c5f0806d-d428-456c-b36a-e821b06a24ef",
            name: "Link Right",
            access: readWrite,
            array: spriteLinkFanfare2Array
          }
        ],
        options: EightBitX2
      },
      {
        id: "f475af10-d131-4490-a41c-1c9cd068e3e6",
        name: "Items -  Green",
        access: readWrite,
        colors: itemsColors1,
        sprites: [
          {
            id: "7eb68029-cfc3-42c0-84e8-8bcd2801a022",
            name: "Sword Down",
            access: readWrite,
            array: spriteSwordDownArray
          },
          {
            id: "7c77af69-3ff8-43b9-84a3-f67d4c63ea84",
            name: "Sword Up",
            access: readWrite,
            array: spriteSwordUpArray
          },
          {
            id: "197fd0af-fbd3-4654-b5b7-1ceb2a6f747f",
            name: "Sword Left",
            access: readWrite,
            array: spriteSwordLeftArray
          }
        ],
        options: EightBitX2
      },
      {
        id: "973a6b3a-550f-463d-9951-89c4c3738c4b",
        name: "Items - Blue",
        access: noReadOrWrite,
        colors: itemsColors2,
        sprites: [
          {
            id: "b76b8d76-e9f9-4936-91f5-5e52f8bb9c4b",
            name: "Bomb",
            access: readWrite,
            array: spriteBombArray
          },
          {
            id: "b7bd6b98-16df-44c4-9c9b-05144c7a4c92",
            name: "Rupee",
            access: readWrite,
            array: spriteRupeeArray
          },
          {
            id: "9c4a053e-879e-4788-b662-96c1f1b267b5",
            name: "Potion",
            access: readWrite,
            array: spritePotionArray
          }
        ],
        options: EightBitX2
      },
      {
        id: "517eefa1-9594-445e-9430-66ddf0a6ef28",
        name: "Items - Red",
        access: readWrite,
        colors: itemsColors3,
        sprites: [
          {
            id: "e4ebe490-dddc-451b-bf6f-1360d28c7abf",
            name: "Bomb",
            access: readWrite,
            array: spriteBombArray
          },
          {
            id: "3700d7c9-e69b-4267-b671-414f3f581217",
            name: "Rupee",
            access: readWrite,
            array: spriteRupeeArray
          },
          {
            id: "b586fb70-6464-483b-a149-7e2f71e65d2b",
            name: "Potion",
            access: readWrite,
            array: spritePotionArray
          },
          {
            id: "94ddc97a-57f9-434a-ba71-c1631c5b8816",
            name: "Fire",
            access: readWrite,
            array: spriteFireArray
          },
          {
            id: "aa344c37-569b-4edd-a5c3-2b73ff88414f",
            name: "Heart Container",
            access: readWrite,
            array: spriteHeartContainerArray
          }
        ],
        options: EightBitX2
      },
      {
        id: "917319e7-9381-4830-89e5-c84d42c8eecd",
        name: "Overworld Monsters - Blue",
        access: readWrite,
        colors: itemsColors2,
        sprites: [
          {
            id: "77caa5ef-8162-4d20-9f6c-53283c64cd84",
            name: "Octorok",
            access: readWrite,
            array: spriteOctorokArray
          },
          {
            id: "f38bcbd6-f01b-4ad8-8d03-9b399cf5dbef",
            name: "Octorok - Alternate",
            access: readWrite,
            array: spriteOctorok2Array
          }
        ],
        options: EightBitX2
      }
    ];
    return { sheets };
  }
}
