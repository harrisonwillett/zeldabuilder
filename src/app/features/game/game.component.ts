import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
// import "./tslib/hud";


import { Spritesheet } from "../../model/spritesheet";
import { SpriteService } from "../../service/sprite.service";
import { Controller } from "./tslib/controller";
import { Room } from "./tslib/room";
import { TopdownEightBitDisplay } from "./tslib/eight-bit-display";
import { of, Observable } from "rxjs";
import { RgbaStringPipe } from "src/app/pipe/rgba-string.pipe";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild("gamewrapper", { static: true }) wrapper: ElementRef;
  @ViewChild("gamescreen", { static: true }) canvas: ElementRef<
    HTMLCanvasElement
  >;
  gamescreenCnxt: CanvasRenderingContext2D;
  controllers: Controller[] = [];
  bindingClientRect: DOMRect;
  topdownEightBitDisplay = new TopdownEightBitDisplay();
  spriteScale: number;
  pixelScale: number;
  canvasRefresh;
  imageData: ImageData;
  gameScaled;
  spriteSheets: Observable<Spritesheet[]> = of([]);
  currentRoom: Observable<Room>;

  constructor(private spriteService: SpriteService) {}

  ngOnInit(): void {
    this.getControllers();
    this.getSpriteSheets();
    this.getCurrentRoom();
    this.gamescreenCnxt = this.canvas.nativeElement.getContext("2d");
  }

  ngAfterViewInit() {
    // Create an observer instance linked to the callback function
    this.gameScaled = new MutationObserver((mutationsList) => {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
          if (mutation.type === "attributes") {
            if (mutation.attributeName === "height" || mutation.attributeName === "width") {
              this.resizeSprites();
              Promise.resolve(
                this.getControllers &&
                this.getSpriteSheets &&
                this.getCurrentRoom &&
                this.resizeSprites
              ).then(() => {
                this.drawRoomToCanvas();
              });
            }
          }
      }
    });

    // Start observing the target node for configured mutations
    this.gameScaled.observe(this.canvas.nativeElement, { attributes: true, childList: false, subtree: false });

    Promise.resolve(
      this.gamescreenCnxt &&
      this.getControllers &&
      this.getSpriteSheets &&
      this.getCurrentRoom &&
      this.resizeSprites
    ).then(() => {
      this.resizeCanvas();
    });
  }

  getControllers(): void {
    this.controllers.push(new Controller());
    console.log({
      controllers: this.controllers
    });
  }

  getSpriteSheets(): void {
    this.spriteService.getSheets().subscribe(obj => {
      // console.log({ galleryGetSheets: obj });
      obj.forEach((spriteSheet) => {
        this.sheetDataToCanvas(spriteSheet);
      });
      this.spriteSheets = of(obj);

    });
  }

  getCurrentRoom(): void {
    Promise.resolve(this.getControllers).then(() => {
      this.currentRoom = of( new Room(1, this.controllers) );
    });
  }

  onScroll() {
    this.bindingClientRect = this.canvas.nativeElement.getBoundingClientRect();
  }

  drawActorsToCanvas() {
    if (this.imageData !== undefined) {
      this.gamescreenCnxt.putImageData(this.imageData, 0, 0);
    }

    // Get Actors
    this.currentRoom.subscribe(room => {
      room.roomItems.getItems().forEach(currentItem => {
        let decSprite: HTMLCanvasElement;
        this.spriteSheets.subscribe(sheets => {
          sheets.forEach(sheet => {
            if ( sheet.id === currentItem.spriteSheetId ) {
              sheet.sprites.forEach(sprite => {
                if ( sprite.id === currentItem.spriteNumber ) {
                  decSprite = sprite.canvas;
                }
              });
            }
          });
        });
        Promise.resolve(decSprite).then(() => {
          if (decSprite !== undefined ) {
            this.gamescreenCnxt.drawImage(
              decSprite,
              Math.floor(
                currentItem.positionX *
                Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.width) +
                this.topdownEightBitDisplay.boundingRects.room.natural.left
              ),
              Math.floor(
                currentItem.positionY *
                Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.height) +
                this.topdownEightBitDisplay.boundingRects.room.natural.top
              ),
              Math.ceil(decSprite.width),
              Math.ceil(decSprite.height)
            );
          }
        });
      });
    });
  }
  resizeCanvas() {
    Promise.resolve(this.gamescreenCnxt).then(() => {
      this.spriteScale = Math.min(
        this.wrapper.nativeElement.offsetHeight /
          this.topdownEightBitDisplay.boundingRects.screen.native.height,
        this.wrapper.nativeElement.offsetWidth /
        this.topdownEightBitDisplay.boundingRects.screen.native.width
      );
      Promise.resolve(
          this.spriteScale &&
          this.canvas.nativeElement.width === this.topdownEightBitDisplay.boundingRects.screen.natural.width &&
          this.canvas.nativeElement.height === this.topdownEightBitDisplay.boundingRects.screen.natural.height
        ).then(() => {
        this.topdownEightBitDisplay.setNaturalSize(this.spriteScale);
      });
    });

    clearInterval(this.canvasRefresh);
    this.canvasRefresh = setInterval(() => {
        this.currentRoom.subscribe(room => {
          room.roomItems.updateItems();
        });
        this.drawActorsToCanvas();
      }, 120);
  }
  sheetDataToCanvas(data: Spritesheet) {
    const pipe = new RgbaStringPipe();
    data.sprites.forEach((sprite) => {
      sprite.canvas = document.createElement("canvas");
      sprite.canvas.height = data.options.height * this.topdownEightBitDisplay.boundingRects.pixel.natural.height;
      sprite.canvas.width = data.options.width * this.topdownEightBitDisplay.boundingRects.pixel.natural.width;
      const spriteContext: CanvasRenderingContext2D = sprite.canvas.getContext("2d");
      Promise.resolve( spriteContext ).then(() => {
        if (spriteContext != null) {
          spriteContext.clearRect(0, 0, sprite.canvas.width, sprite.canvas.height);
          sprite.array.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
              spriteContext.fillStyle = pipe.transform( data.colors[cell] );
              spriteContext.fillRect(
                Math.floor((this.topdownEightBitDisplay.boundingRects.pixel.natural.width * columnIndex)),
                Math.floor((this.topdownEightBitDisplay.boundingRects.pixel.natural.height) * rowIndex),
                Math.ceil(this.topdownEightBitDisplay.boundingRects.pixel.natural.width),
                Math.ceil(this.topdownEightBitDisplay.boundingRects.pixel.natural.height)
              );
              spriteContext.fill();
            });
          });
        }
      });
    });
  }
  resizeSprites() {
    console.log("resize the sprites");
    Promise.resolve(this.gamescreenCnxt && this.spriteSheets).then(() => {
      this.spriteScale = Math.min(
        this.wrapper.nativeElement.offsetHeight /
          this.topdownEightBitDisplay.boundingRects.screen.native.height,
        this.wrapper.nativeElement.offsetWidth /
        this.topdownEightBitDisplay.boundingRects.screen.native.width
      );
      this.spriteSheets.subscribe((spritesheets: Spritesheet[]) => {
        spritesheets.forEach(spriteSheet => {
          this.sheetDataToCanvas(spriteSheet);
        });
      });
    });
  }

  drawRoomToCanvas() {
    // console.log("Start Drawing the room");
    if (this.gamescreenCnxt !== undefined) {
      this.gamescreenCnxt.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
      Promise.resolve(
        this.getSpriteSheets &&
        this.getCurrentRoom &&
        this.resizeSprites
      ).then(() => {
        // Get Decorations
        this.currentRoom.subscribe(room => {
          room.roomItems.getDecoration().forEach(decoration => {
            let decSprite: HTMLCanvasElement;
            this.spriteSheets.subscribe(sheets => {
              sheets.forEach(sheet => {
                if ( sheet.id === decoration.spriteSheetId ) {
                  sheet.sprites.forEach(sprite => {
                    if ( sprite.id === decoration.spriteNumber ) {
                      decSprite = sprite.canvas;
                    }
                  });
                }
              });
            });
            Promise.resolve(decSprite).then(() => {
              if (decSprite !== undefined ) {
                this.gamescreenCnxt.drawImage(
                  decSprite,
                  Math.floor(
                    decoration.positionX *
                    Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.width) +
                    this.topdownEightBitDisplay.boundingRects.room.natural.left
                  ),
                  Math.floor(
                    decoration.positionY *
                    Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.height) +
                    this.topdownEightBitDisplay.boundingRects.room.natural.top
                  ),
                  Math.ceil(decSprite.width),
                  Math.ceil(decSprite.height)
                );
              }
              // Save
              this.imageData = this.gamescreenCnxt.getImageData(
                0,
                0,
                this.topdownEightBitDisplay.boundingRects.screen.natural.width,
                this.topdownEightBitDisplay.boundingRects.screen.natural.height
              );
            });
          });
        });
      });
    }
  }
}
