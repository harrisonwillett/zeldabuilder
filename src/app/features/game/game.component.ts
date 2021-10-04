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
import { Wall, Door, Decoration } from "./tslib/actors";
import { Sprite } from "src/app/model/sprite";

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
  controller: Controller;
  bindingClientRect: DOMRect;
  topdownEightBitDisplay = new TopdownEightBitDisplay();
  spriteScale: number;
  pixelScale: number;
  canvasRefresh;
  backgroundCache: ImageData = undefined;
  gameScaled;
  spriteSheets: Observable<Spritesheet[]> = of([]);
  playerButtons: Observable<string[]> = of([]);
  currentRoom: Observable<Room>;

  constructor(private spriteService: SpriteService) {
    this.controller = new Controller();
  }

  ngOnInit(): void {
    this.getSpriteSheets();
    this.getCurrentRoom();
    this.gamescreenCnxt = this.canvas.nativeElement.getContext("2d");
  }

  ngAfterViewInit() {
    // Create an observer instance linked to the callback function
    this.gameScaled = new MutationObserver((mutationsList) => {
      this.backgroundCache = undefined;
      for (const mutation of mutationsList) {
          if (mutation.type === "attributes") {
            if (mutation.attributeName === "height" || mutation.attributeName === "width") {
              this.resizeSprites();
            }
          }
      }
    });

    // Start observing the target node for configured mutations
    this.gameScaled.observe(this.canvas.nativeElement, { attributes: true, childList: false, subtree: false });

    this.requestResizeCanvas();

  }

  requestResizeCanvas() {
    Promise.resolve(
      this.gamescreenCnxt &&
      this.getSpriteSheets &&
      this.getCurrentRoom
    ).then(() => {
      this.resizeCanvas();
    });
  }

  getSpriteSheets(): void {
    this.spriteService.getSheets().subscribe(obj => {
      obj.forEach((spriteSheet) => {
        this.sheetDataToCanvas(spriteSheet);
      });
      this.spriteSheets = of(obj);

    });
  }

  getCurrentRoom(): void {
    Promise.resolve(this.controller).then(() => {
      this.currentRoom = of( new Room(1));
    });
  }

  onScroll() {
    this.bindingClientRect = this.canvas.nativeElement.getBoundingClientRect();
  }

  drawActorsToCanvas() {
    // Get Actors
    this.currentRoom.subscribe(room => {
      if (this.backgroundCache !== undefined) {
        this.gamescreenCnxt.putImageData(this.backgroundCache, 0, 0);
      } else {
        this.gamescreenCnxt.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      }
      room.roomItems.getItems().forEach(currentItem => {
        let actSprite: Observable<HTMLCanvasElement>;
        this.spriteSheets.subscribe(sheets => {
          sheets.forEach(sheet => {
            if ( sheet.id === currentItem.spriteSheetId ) {
              sheet.sprites.forEach(sprite => {
                if ( sprite.id === currentItem.spriteNumber ) {
                  actSprite = sprite.canvas;
                }
              });
            }
          });
        });
        Promise.resolve(actSprite && this.drawRoomToCanvas).then(() => {
          if (actSprite !== undefined ) {
            actSprite.subscribe(subSprite => {
              this.gamescreenCnxt.drawImage(
                subSprite,
                Math.floor(
                  currentItem.getPosition()[0] *
                  Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.width) +
                  this.topdownEightBitDisplay.boundingRects.room.natural.left
                ),
                Math.floor(
                  currentItem.getPosition()[1] *
                  Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.height) +
                  this.topdownEightBitDisplay.boundingRects.room.natural.top
                ),
                Math.ceil(subSprite.width),
                Math.ceil(subSprite.height)
              );
            });
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
          room.roomItems.updateItems(this.controller.activeMap);
        });
        this.drawActorsToCanvas();
      }, 120);
  }

  spriteDataToCanvas(sheet: Spritesheet, sprite: Sprite) {
    const pipe = new RgbaStringPipe();
    const newCanvas = document.createElement("canvas");
      newCanvas.height = sheet.options.height * this.topdownEightBitDisplay.boundingRects.pixel.natural.height;
      newCanvas.width = sheet.options.width * this.topdownEightBitDisplay.boundingRects.pixel.natural.width;
      const spriteContext: CanvasRenderingContext2D = newCanvas.getContext("2d");
      Promise.resolve( spriteContext ).then(() => {
        if (spriteContext != null) {
          spriteContext.clearRect(0, 0, newCanvas.width, newCanvas.height);
          sprite.array.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
              spriteContext.fillStyle = pipe.transform( sheet.colors[cell] );
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
        sprite.canvas = of(newCanvas);
      });
  }

  sheetDataToCanvas(data: Spritesheet) {
    data.sprites.forEach((sprite) => {
      this.spriteDataToCanvas(data, sprite);
    });
    Promise.resolve(
      this.gamescreenCnxt &&
      this.getSpriteSheets &&
      this.getCurrentRoom &&
      this.resizeCanvas &&
      this.gameScaled
    ).then(() => {
      this.drawRoomToCanvas();
    });
  }
  resizeSprites() {
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

  backgroundSpriteUpdate(currentItem: (Wall | Door | Decoration)) {
    let actSprite: Observable<HTMLCanvasElement>;
    this.spriteSheets.subscribe(sheets => {
      sheets.forEach(sheet => {
        if ( sheet.id === currentItem.spriteSheetId ) {
          sheet.sprites.forEach(sprite => {
            if ( sprite.id === currentItem.spriteNumber ) {
              actSprite = sprite.canvas;
            }
          });
        }
      });
    });
    Promise.resolve(actSprite).then(() => {
      if (actSprite !== undefined ) {
        actSprite.subscribe(subSprite => {
          this.gamescreenCnxt.drawImage(
            subSprite,
            Math.floor(
              currentItem.getPosition()[0] *
              Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.width) +
              this.topdownEightBitDisplay.boundingRects.room.natural.left
            ),
            Math.floor(
              currentItem.getPosition()[1] *
              Math.floor(this.topdownEightBitDisplay.boundingRects.sprite.natural.height) +
              this.topdownEightBitDisplay.boundingRects.room.natural.top
            ),
            Math.ceil(subSprite.width),
            Math.ceil(subSprite.height)
          );
          this.backgroundCache = this.gamescreenCnxt.getImageData(
            0,
            0,
            this.topdownEightBitDisplay.boundingRects.screen.natural.width,
            this.topdownEightBitDisplay.boundingRects.screen.natural.height
          );
        });
      }
    });
  }

  drawRoomToCanvas() {
    // Get Decorations
    // ("Get Decorations");
    this.currentRoom.subscribe(room => {
      if (this.backgroundCache !== undefined) {
        this.gamescreenCnxt.putImageData(this.backgroundCache, 0, 0);
      } else {
        this.gamescreenCnxt.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      }
      room.roomItems.getDecoration().forEach(currentItem => {
        this.backgroundSpriteUpdate(currentItem);
      });
    });
  }
}
