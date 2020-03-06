import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";

import { fromEvent, merge } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

import { Sprite } from "../../../model/sprite";

@Component({
  selector: "app-editable-canvas",
  templateUrl: "./editable-canvas.component.html",
  styleUrls: ["./editable-canvas.component.scss"]
})
export class EditableCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild("cwrapper", { static: true }) wrapper: ElementRef;
  @ViewChild("canvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() spriteWidth: number = 1;
  @Input() spriteHeight: number = 1;
  @Input() sprite: Sprite;
  @Input() editable: boolean;
  cntxt: CanvasRenderingContext2D;
  pixelScale: number = 1;
  canvasWidth: number = 1;
  canvasHeight: number = 1;
  spriteColorPalette: Array<string | CanvasGradient | CanvasPattern>;
  @Input() selectedColor: number = 0;
  bindingClientRect;

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
    if (typeof this.sprite.colors !== "undefined") {
      this.sprite.colors.forEach((color, index) => {
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
            //console.log(event);
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
              //this.bindingClientRect = this.canvas.nativeElement.getBoundingClientRect();
              /* Postioning End */
              return [
                Math.floor(
                  ((event as PointerEvent).clientX - this.bindingClientRect.x) /
                    // this.canvas.nativeElement.offsetLeft) /
                    this.pixelScale
                ),
                Math.floor(
                  ((event as PointerEvent).clientY - this.bindingClientRect.y) /
                    // this.canvas.nativeElement.offsetTop) /
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
        .subscribe(val => this.colorPixel(val));
    }
  }

  colorPixel(coords: number[]) {
    console.log({ coords0: coords[0], coords1: coords[1] });
    if (this.cntxt !== undefined) {
      if (coords[0] !== undefined && [coords[1]] !== undefined) {
        this.sprite.array[coords[1]][coords[0]] = this.selectedColor;
      }
      this.cntxt.fillStyle = this.spriteColorPalette[this.selectedColor];
      this.cntxt.fillRect(
        coords[0] * this.pixelScale,
        coords[1] * this.pixelScale,
        1 * this.pixelScale,
        1 * this.pixelScale
      );
      this.cntxt.fill();
    }
  }
}
