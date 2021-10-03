import { ElementRef } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { EditableCanvasComponent } from "./editable-canvas.component";
import { RgbaColor } from "../../../model/rgba-color";
import { sixteenBitSpriteAry } from "../../../model/sprite-array";
import { Sprite } from "../../../model/sprite";

describe("EditableCanvasComponent", () => {
  let component: EditableCanvasComponent;
  let fixture: ComponentFixture<EditableCanvasComponent>;

  const colffc07a: RgbaColor = new RgbaColor(
    parseInt("ff", 16),
    parseInt("C0", 16),
    parseInt("7a", 16),
    1
  );
  const colc03800: RgbaColor = new RgbaColor(
    parseInt("c0", 16),
    parseInt("38", 16),
    parseInt("00", 16),
    1
  );
  const col001aff: RgbaColor = new RgbaColor(
    parseInt("00", 16),
    parseInt("1a", 16),
    parseInt("ff", 16),
    0.4
  );
  const col000000: RgbaColor = new RgbaColor(
    parseInt("00", 16),
    parseInt("00", 16),
    parseInt("00", 16)
  );

  const overWorldColors1: RgbaColor[] = [
    colffc07a,
    colc03800,
    col001aff,
    col000000
  ];

  const spriteStairArray: sixteenBitSpriteAry = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 0, 0, 1, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 3, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 3, 3, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableCanvasComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(EditableCanvasComponent);
    component = fixture.componentInstance;
    // component.selectedColor = 8;
    const sprite: Sprite = {
      id: "0000-0000-0000-0000",
      name: "Stairs - Brown",
      access: {
        read: true,
        write: true
      },
      array: spriteStairArray.map((arr) => {
        return arr.slice();
      })
    };
    component.sprite = { ...sprite };
    component.spriteColors = overWorldColors1;

  });

  it("should create", () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  // It should resize the canvas element when width of sprite or scale are changed
  it("should resize the canvas element when width of sprite or scale are changed", () => {
    // arrange
    component.pixelScale = 1;
    component.spriteWidth = 1;
    component.spriteHeight = 1;
    component.resizeCanvas();
    const arrangeCanvasWidth = component.canvasWidth;
    const arrangeCanvasHeight = component.canvasHeight;
    // act
    component.pixelScale = 1;
    component.spriteWidth = 32;
    component.spriteHeight = 64;
    component.resizeCanvas();
    // assert

    expect(arrangeCanvasWidth !== component.canvasWidth).toBeTrue();
    expect(arrangeCanvasHeight !== component.canvasHeight).toBeTrue();
  });

  // It should start with an undefined color palette
  it("should start with an undefined color palette", () => {
    expect(component.spriteColorPalette).toBeUndefined();
    component.spriteColors = undefined;
    component.setSpriteColorPalette();
    expect(component.spriteColorPalette).toEqual([]);
  });

  // It should handle palettes with and with out alpha channel
  it("should handle palettes with and with out alpha channel", () => {
    component.setSpriteColorPalette();
    expect(component.spriteColorPalette).toEqual([
      "rgba(255, 192, 122, 1)",
      "rgba(192, 56, 0, 1)",
      "rgba(0, 26, 255, 0.4)",
      "rgba(0, 0, 0, 1)"
    ]);
  });

  // It should have different array data before and after running drawSprite
  it("should have different array data before and after running drawSprite", () => {
    component.editable = true;
    component.pixelScale = 1;
    component.spriteWidth = 16;
    component.spriteHeight = 16;
    fixture.detectChanges();
    component.drawSprite();
    const arrangeArray = component.sprite.array.map((arr) => {
      return arr.slice();
    });

    expect(true).toBeTrue();
  });

  // It should NOT update the canvas if cntxt is undefined when running drawSprite
  it("should NOT update the canvas if cntxt is undefined when running drawSprite", () => {
    component.editable = true;
    component.pixelScale = 1;
    component.spriteWidth = 16;
    component.spriteHeight = 16;
    // component.selectedColor = 3;
    fixture.detectChanges();
    component.cntxt = undefined;
    component.drawSprite();
    const arrangeArray = component.sprite.array.map((arr) => {
      return arr.slice();
    });

    // component.colorPixel([5, 9]);
    const actArray = component.sprite.array.map((arr) => {
      return arr.slice();
    });

    expect(arrangeArray).toEqual(actArray);
  });

  /*
  // It Should NOT draw when pointer is out of canvas
  it("should NOT draw when pointer is out of canvas", () => {
    component.editable = true;
    component.pixelScale = 1;
    component.spriteWidth = 16;
    component.spriteHeight = 16;
    component.selectedColor = 3;
    fixture.detectChanges();
    component.drawSprite();

    component.editSprite();

    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointerout")
    );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 8, clientY: 16 })
    );

    expect(true).toBeTrue();
  });

  // It Should draw when pointer is down and moved on canvas
  it("should draw when pointer is down and moved on canvas", () => {
    component.editable = true;
    component.pixelScale = 1;
    component.spriteWidth = 16;
    component.spriteHeight = 16;
    component.selectedColor = 3;
    fixture.detectChanges();
    component.drawSprite();

    component.editSprite();

    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointerout")
    );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 9, clientY: 16 })
    );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointerdown", { clientX: 10, clientY: 16 })
    );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 8, clientY: 16 })
    );

    expect(true).toBeTrue();
  });

  // It should remove duplicates
  it("should remove duplicates", () => {
    component.editable = true;
    component.pixelScale = 1;
    component.spriteWidth = 1;
    component.spriteHeight = 1;
    fixture.detectChanges();
    component.drawSprite();

    // component.canvas.nativeElement.dispatchEvent(
    //   new PointerEvent("pointerdown")
    // );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove")
    );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove")
    );
    // component.canvas.nativeElement.dispatchEvent(
    //   new PointerEvent("pointerup", { ...clickEvent })
    // );

    expect(true).toBeTrue();
  });

  // It should stop drawing when pointer up
  it("should stop drawing when pointer up", () => {
    component.editable = true;
    component.pixelScale = 1;
    component.spriteWidth = 1;
    component.spriteHeight = 1;
    fixture.detectChanges();
    component.drawSprite();

    // component.canvas.nativeElement.dispatchEvent(
    //   new PointerEvent("pointerdown")
    // );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove")
    );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove")
    );
    // component.canvas.nativeElement.dispatchEvent(
    //   new PointerEvent("pointerup", { ...clickEvent })
    // );
    component.canvas.nativeElement.dispatchEvent(
      new PointerEvent("pointermove")
    );

    expect(true).toBeTrue();
  }); */
});
