import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone
} from "@angular/core";
import { Controller } from "src/app/model/game/controller/controller";
import { LoadRoom } from "src/app/model/game/game-display/load-room";
import { TopdownAction8bit } from "src/app/model/game/game-display/topdown-action-8bit";
import { EightBitSheetAryToCanvas } from "src/app/model/game/sprites/eight-bit-sheet-ary-to-canvas";
import { CanvasSheetToSprite } from "src/app/model/game/sprites/canvas-sheet-to-sprite";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  @ViewChild("gamewrapper", { static: true }) wrapper: ElementRef;
  @ViewChild("gamescreen", { static: true }) canvas: ElementRef<
    HTMLCanvasElement
  >;
  gamescreenCnxt;
  controller1 = new Controller();
  bindingClientRect: DOMRect;
  topdownAction8Bit = new TopdownAction8bit();
  pixelScale: number;
  scaledGameWidth: number;
  scaledGameHeight: number;
  canvasRefresh;
  currentRoom: LoadRoom;
  imageData;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.currentRoom = new LoadRoom(1);
    this.gamescreenCnxt = this.canvas.nativeElement.getContext("2d");
    this.resizeCanvas();
  }

  onScroll() {
    this.bindingClientRect = this.canvas.nativeElement.getBoundingClientRect();
  }

  drawActorsToCanvas() {
    this.gamescreenCnxt.putImageData(this.imageData, 0, 0);

    //Get Actors
    for (let i = 0; i < this.currentRoom.roomItems.itemsSet.length; i++) {
      if (typeof this.currentRoom.roomItems.itemsSet[i].design === "string") {
        this.gamescreenCnxt.fillStyle = this.currentRoom.roomItems.itemsSet[
          i
        ].design;
        this.gamescreenCnxt.fillRect(
          Math.floor(
            this.currentRoom.roomItems.itemsSet[i].positionX *
              this.topdownAction8Bit.sprite.natural.width +
              this.topdownAction8Bit.room.natural.left
          ),
          Math.floor(
            this.currentRoom.roomItems.itemsSet[i].positionY *
              this.topdownAction8Bit.sprite.natural.height +
              this.topdownAction8Bit.room.natural.top
          ),
          Math.ceil(this.topdownAction8Bit.sprite.natural.width),
          Math.ceil(this.topdownAction8Bit.sprite.natural.height)
        );
        this.gamescreenCnxt.fill();
      } else {
        this.gamescreenCnxt.drawImage(
          CanvasSheetToSprite(
            this.currentRoom.roomItems.itemsSet[i].sprite,
            this.topdownAction8Bit.sprite.natural,
            this.currentRoom.roomItems.itemsSet[i].spriteNumber
          ),
          //this.currentRoom.roomItems.itemsSet[i].getDesign(),
          Math.floor(
            this.currentRoom.roomItems.itemsSet[i].positionX *
              Math.floor(this.topdownAction8Bit.sprite.natural.width) +
              Math.floor(this.topdownAction8Bit.room.natural.left)
          ),
          Math.floor(
            this.currentRoom.roomItems.itemsSet[i].positionY *
              Math.floor(this.topdownAction8Bit.sprite.natural.height) +
              Math.floor(this.topdownAction8Bit.room.natural.top)
          ),
          Math.floor(this.topdownAction8Bit.sprite.natural.width),
          Math.floor(this.topdownAction8Bit.sprite.natural.height)
        );
      }
    }
  }

  resizeCanvas() {
    this.pixelScale = Math.min(
      this.wrapper.nativeElement.offsetHeight /
        this.topdownAction8Bit.game.native.height,
      this.wrapper.nativeElement.offsetWidth /
        this.topdownAction8Bit.game.native.width
    );
    this.scaledGameWidth =
      this.pixelScale * this.topdownAction8Bit.game.native.width;
    this.scaledGameHeight =
      this.pixelScale * this.topdownAction8Bit.game.native.height;
    this.topdownAction8Bit.scaleRect(this.pixelScale);
    this.resizeSprites();
    /***
     *
     *
     * ***/
    this.ngZone.runOutsideAngular(() => this.drawRoomToCanvas());
    this.ngZone.runOutsideAngular(() => this.drawActorsToCanvas());
    this.drawRoomToCanvas();
    clearInterval(this.canvasRefresh);
    this.canvasRefresh = setInterval(function() {
      if (this.currentRoom !== undefined) {
        if (this.currentRoom.roomItems !== undefined) {
          this.currentRoom.roomItems.updateItems();
        }
      }
      // this.drawActorsToCanvas();
    }, 120);
  }

  resizeSprites() {
    // console.log("resize the sprites");
    this.currentRoom.roomItems.decorationSet.forEach((decoration: any) => {
      decoration.sprite = EightBitSheetAryToCanvas(
        decoration.spriteSheet,
        this.pixelScale
      );
    });
    // console.log(this.currentRoom.roomItems.decorationSet);
  }

  drawRoomToCanvas() {
    console.log("Start Drawing the room");
    this.gamescreenCnxt.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.gamescreenCnxt.fillStyle = "#000000";
    this.gamescreenCnxt.fillRect(
      this.topdownAction8Bit.room.natural.left,
      this.topdownAction8Bit.room.natural.top,
      this.topdownAction8Bit.room.natural.width,
      this.topdownAction8Bit.room.natural.height
    );
    this.gamescreenCnxt.fill();

    //Get Decorations
    for (let i = 0; i < this.currentRoom.roomItems.decorationSet.length; i++) {
      /*
      console.log({
        type: typeof this.currentRoom.roomItems.decorationSet[i],
        spriteNumber: this.currentRoom.roomItems.decorationSet[i].spriteNumber
      });
      console.log(
        this.currentRoom.roomItems.decorationSet[i].sprite.toDataURL()
      );
      */
      /*
      if (
        typeof this.currentRoom.roomItems.decorationSet[i].design === "string"
      ) {
        this.gamescreenCnxt.fillStyle = this.currentRoom.roomItems.decorationSet[
          i
        ].design;
        this.gamescreenCnxt.fillRect(
          Math.floor(
            this.currentRoom.roomItems.decorationSet[i].positionX *
              this.topdownAction8Bit.sprite.natural.width +
              this.topdownAction8Bit.room.natural.left
          ),
          Math.floor(
            this.currentRoom.roomItems.decorationSet[i].positionY *
              this.topdownAction8Bit.sprite.natural.height +
              this.topdownAction8Bit.room.natural.top
          ),
          Math.ceil(this.topdownAction8Bit.sprite.natural.width),
          Math.ceil(this.topdownAction8Bit.sprite.natural.height)
        );
        this.gamescreenCnxt.fill();
      } else {
        */
      this.gamescreenCnxt.drawImage(
        this.currentRoom.roomItems.decorationSet[i].sprite,
        Math.floor(
          this.currentRoom.roomItems.decorationSet[i].positionX *
            Math.floor(this.topdownAction8Bit.sprite.natural.width) +
            Math.floor(this.topdownAction8Bit.room.natural.left)
        ),
        Math.floor(
          this.currentRoom.roomItems.decorationSet[i].positionY *
            this.topdownAction8Bit.sprite.natural.height +
            this.topdownAction8Bit.room.natural.top
        ),
        Math.ceil(this.topdownAction8Bit.sprite.natural.width),
        Math.ceil(this.topdownAction8Bit.sprite.natural.height)
      );
      console.log("Line 205");
      console.log(
        this.currentRoom.roomItems.decorationSet[i].sprite,
        Math.floor(
          this.currentRoom.roomItems.decorationSet[i].positionX *
            Math.floor(this.topdownAction8Bit.sprite.natural.width) +
            Math.floor(this.topdownAction8Bit.room.natural.left)
        ),
        Math.floor(
          this.currentRoom.roomItems.decorationSet[i].positionY *
            this.topdownAction8Bit.sprite.natural.height +
            this.topdownAction8Bit.room.natural.top
        ),
        Math.ceil(this.topdownAction8Bit.sprite.natural.width),
        Math.ceil(this.topdownAction8Bit.sprite.natural.height)
      );
      console.log("Line 221");
      // }
    }

    //Save
    this.imageData = this.gamescreenCnxt.getImageData(
      0,
      0,
      this.topdownAction8Bit.game.natural.width,
      this.topdownAction8Bit.game.natural.height
    );
  }
}
