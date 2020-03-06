import { Component } from "@angular/core";
import { RgbaColor } from "./model/rgba-color";
import { Sprite } from "./model/sprite";
import { sixteenBitSpriteAry } from "./model/sprite-array";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  red: RgbaColor = {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1
  };

  colffc07a: RgbaColor = {
    red: parseInt("ff", 16),
    green: parseInt("C0", 16),
    blue: parseInt("7a", 16),
    alpha: 1
  };
  colc03800: RgbaColor = {
    red: parseInt("c0", 16),
    green: parseInt("38", 16),
    blue: parseInt("00", 16),
    alpha: 1
  };
  col001aff: RgbaColor = {
    red: parseInt("00", 16),
    green: parseInt("1a", 16),
    blue: parseInt("ff", 16),
    alpha: 1
  };
  col000000: RgbaColor = {
    red: parseInt("00", 16),
    green: parseInt("00", 16),
    blue: parseInt("00", 16),
    alpha: 1
  };

  overWorldColors1: RgbaColor[] = [
    this.colffc07a,
    this.colc03800,
    this.col001aff,
    this.col000000
  ];

  spriteStairArray: sixteenBitSpriteAry = [
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

  sprite: Sprite = {
    id: 1,
    name: "Stairs - Brown",
    colors: this.overWorldColors1,
    array: this.spriteStairArray
  };
  selectedColor = 1;
  options = {
    height: 16,
    width: 16
  };
}
