import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";

import { Spritesheet } from "../../model/spritesheet";
import { EightBit } from "../sprite-modes";
import { RgbaColor } from "../../model/rgba-color";

import {
  room1
} from "./room-data.mock";

@Injectable({
  providedIn: "root"
})
export class RoomDataInMemoryService implements InMemoryDbService {
  createDb() {

    const rooms: any[] = [
      {
        id: 1,
        name: "Over World - Starting Location",
        children: room1
      }
    ];
    return { rooms };
  }

}
