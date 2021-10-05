import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";


import { Spritesheet } from "../../model/spritesheet";
import { SpriteService } from "../../service/sprite.service";
import { Room } from "./tslib/room";
import { TopdownEightBitDisplay } from "./tslib/eight-bit-display";
import { of, Observable, forkJoin } from "rxjs";
import { RgbaStringPipe } from "src/app/pipe/rgba-string.pipe";
import { Wall, Door, Decoration } from "./tslib/actors";
import { Sprite } from "src/app/model/sprite";
import { map } from "rxjs/operators";

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
  gamescreenCnxt: Observable<CanvasRenderingContext2D>;
  bindingClientRect: DOMRect;
  topdownEightBitDisplay = new TopdownEightBitDisplay();
  spriteScale: Observable<number> = of();
  pixelScale: Observable<number> = of();
  canvasRefresh: ReturnType<typeof setInterval>;
  backgroundCache: ImageData = undefined;
  spriteSheets: Observable<Spritesheet[]> = of([]);
  playerButtons: Observable<string[]> = of([]);
  currentRoom: Observable<Room>;
  controllerRequests: string[] = [];

  constructor(private spriteService: SpriteService) {}

  ngOnInit(): void {
    this.getSpriteSheets();
    this.getCurrentRoom();
    this.gamescreenCnxt = of(this.canvas.nativeElement.getContext("2d"));
    this.gamescreenCnxt.subscribe(context => {
      this.requestResizeCanvas();
    });
  }

  requestResizeCanvas() {
    forkJoin([this.spriteSheets, this.currentRoom]).subscribe(() => {
      this.resizeCanvas()
    });
  }

  getSpriteSheets(): void {
    this.spriteService.getSheets().subscribe(obj => {
      this.spriteSheets = of(obj);
      obj.forEach((spriteSheet) => {
        this.sheetDataToCanvas(spriteSheet);
      });
    });
  }

  getCurrentRoom(): void {
      this.currentRoom = of( new Room(1));
  }

  onScroll() {
    this.bindingClientRect = this.canvas.nativeElement.getBoundingClientRect();
  }

  drawActorsToCanvas() {
    // Get Actors
    this.currentRoom.subscribe(room => {
      this.gamescreenCnxt.subscribe(cnxt => {
        if (this.backgroundCache !== undefined) {
          cnxt.putImageData(this.backgroundCache, 0, 0);
        } else {
          cnxt.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
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
          if (actSprite !== undefined ) {
            actSprite.subscribe(subSprite => {
              cnxt.drawImage(
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

  updateControllerRequests($event) {
    if($event !== undefined) {
      this.controllerRequests = $event;
    }
  }

  resizeCanvas() {
    const scale = Math.min(
      this.wrapper.nativeElement.offsetHeight /
      this.topdownEightBitDisplay.boundingRects.screen.native.height,
      this.wrapper.nativeElement.offsetWidth /
      this.topdownEightBitDisplay.boundingRects.screen.native.width
    );
    this.spriteScale = of(scale);
    this.topdownEightBitDisplay.setNaturalSize(scale);

    this.resizeSprites();

    clearInterval(this.canvasRefresh);
    this.canvasRefresh = setInterval(() => {
        this.currentRoom.subscribe(room => {
          room.roomItems.updateItems(this.controllerRequests);
        });
        this.drawActorsToCanvas();
      }, 120);
  }

  spriteDataToCanvas(sheet: Spritesheet, sprite: Sprite) {
    const pipe = new RgbaStringPipe();
    const newCanvas = document.createElement("canvas");
      newCanvas.height = sheet.options.height * this.topdownEightBitDisplay.boundingRects.pixel.natural.height;
      newCanvas.width = sheet.options.width * this.topdownEightBitDisplay.boundingRects.pixel.natural.width;
      const spriteContext: Observable<CanvasRenderingContext2D> = of(newCanvas.getContext("2d"));
      spriteContext.subscribe((context) => {
        if (context != null) {
          context.clearRect(0, 0, newCanvas.width, newCanvas.height);
          sprite.array.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
              context.fillStyle = pipe.transform( sheet.colors[cell] );
              context.fillRect(
                Math.floor((this.topdownEightBitDisplay.boundingRects.pixel.natural.width * columnIndex)),
                Math.floor((this.topdownEightBitDisplay.boundingRects.pixel.natural.height) * rowIndex),
                Math.ceil(this.topdownEightBitDisplay.boundingRects.pixel.natural.width),
                Math.ceil(this.topdownEightBitDisplay.boundingRects.pixel.natural.height)
              );
              context.fill();
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
    this.drawRoomToCanvas();
  }

  resizeSprites() {
    this.spriteSheets.subscribe((spritesheets: Spritesheet[]) => {
      spritesheets.forEach(spriteSheet => {
        this.sheetDataToCanvas(spriteSheet);
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
    if (actSprite) {
      actSprite.subscribe(subSprite => {
        this.gamescreenCnxt.subscribe(cnxt => {
          cnxt.drawImage(
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
          this.backgroundCache = cnxt.getImageData(
            0,
            0,
            this.topdownEightBitDisplay.boundingRects.screen.natural.width,
            this.topdownEightBitDisplay.boundingRects.screen.natural.height
          );
        });
      });
    }
  }

  drawRoomToCanvas() {
    this.currentRoom.subscribe(room => {
      this.gamescreenCnxt.subscribe(cnxt => {
        cnxt.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        room.roomItems.getDecoration().forEach(currentItem => {
          this.backgroundSpriteUpdate(currentItem);
        });
      });
      
    });
  }
}
