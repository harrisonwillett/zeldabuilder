import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";

import { fromEvent, merge } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

import { Sprite } from "../../../model/sprite";
import { RgbaColor } from "src/app/model/rgba-color";

@Component({
  selector: "app-editable-canvas",
  templateUrl: "./editable-canvas.component.html",
  styleUrls: ["./editable-canvas.component.scss"]
})
export class EditableCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild("cwrapper", { static: true }) wrapper: ElementRef;
  @ViewChild("canvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() spriteWidth = 1;
  @Input() spriteHeight = 1;
  @Input() sprite: Sprite;
  @Input() editable: boolean;
  @Input() spriteColors: RgbaColor[];
  cntxt: CanvasRenderingContext2D;
  pixelScale = 1;
  canvasWidth = 1;
  canvasHeight = 1;
  spriteColorPalette: Array<string | CanvasGradient | CanvasPattern>;
  bindingClientRect: DOMRect;
  @Output() newPixel = new EventEmitter<number[]>();

  constructor() {}

  ngOnInit() {
    this.cntxt = this.canvas.nativeElement.getContext("2d");
    this.bindingClientRect = this.canvas.nativeElement.getBoundingClientRect();
    this.resizeCanvas();
  }

  ngAfterViewInit() {
    this.drawSprite();
    this.editSprite();
  }

  onScroll() {
    this.bindingClientRect = this.canvas.nativeElement.getBoundingClientRect();
  }

  resizeCanvas() {
    this.pixelScale = Math.floor(
      this.wrapper.nativeElement.offsetWidth / this.spriteWidth
    );
    this.canvasWidth = this.pixelScale * this.spriteWidth;
    this.canvasHeight = this.pixelScale * this.spriteHeight;
    this.drawSprite();
  }

  setSpriteColorPalette() {
    this.spriteColorPalette = new Array();
    if (typeof this.spriteColors !== "undefined") {
      this.spriteColors.forEach((color, index) => {
        if (color.alpha !== undefined) {
          this.spriteColorPalette.push(
            "rgba(" +
              color.red +
              ", " +
              color.green +
              ", " +
              color.blue +
              ", " +
              color.alpha +
              ")"
          );
        } else {
          {
            this.spriteColorPalette.push(
              "rgba(" +
                color.red +
                ", " +
                color.green +
                ", " +
                color.blue +
                ", " +
                1 +
                ")"
            );
          }
        }
      });
    }
  }

  drawSprite() {
    this.setSpriteColorPalette();
    this.cntxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.sprite.array.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (this.cntxt !== undefined) {
          this.cntxt.fillStyle = this.spriteColorPalette[cell];
          this.cntxt.fillRect(
            j * this.pixelScale,
            i * this.pixelScale,
            1 * this.pixelScale,
            1 * this.pixelScale
          );
          this.cntxt.fill();
        }
      });
    });
  }

  editSprite() {
    this.setSpriteColorPalette();
    if (this.editable) {
      let isDrawing = false;
      const pointerMoveSource = fromEvent(
        this.canvas.nativeElement,
        "pointermove"
      );
      const pointerDownSource = fromEvent(
        this.canvas.nativeElement,
        "pointerdown"
      );
      const pointerUpSource = fromEvent(this.canvas.nativeElement, "pointerup");
      const pointerOutSource = fromEvent(
        this.canvas.nativeElement,
        "pointerout"
      );
      const pointerSource = merge(
        pointerMoveSource,
        pointerDownSource,
        pointerUpSource,
        pointerOutSource
      )
        .pipe(
          map(event => {
            if ((event as PointerEvent).type === "pointerdown") {
              isDrawing = true;
            }
            if (
              (event as PointerEvent).type === "pointerup" ||
              (event as PointerEvent).type === "pointerout"
            ) {
              isDrawing = false;
            }
            if (
              isDrawing &&
              (event as PointerEvent).clientX !== undefined &&
              (event as PointerEvent).clientY !== undefined
            ) {
              return [
                Math.floor(
                  ((event as PointerEvent).clientX - this.bindingClientRect.x) /
                    this.pixelScale
                ),
                Math.floor(
                  ((event as PointerEvent).clientY - this.bindingClientRect.y) /
                    this.pixelScale
                )
              ];
            } else {
              return [undefined, undefined];
            }
          }),
          distinctUntilChanged(
            (prev, curr) => prev[0] === curr[0] && prev[1] === curr[1]
          )
        )
        .subscribe(val => {
          if (val[0] !== undefined && [val[1]] !== undefined) {
            this.newPixel.emit(val);
            this.drawSprite();
          }
        });
    }
  }
}
