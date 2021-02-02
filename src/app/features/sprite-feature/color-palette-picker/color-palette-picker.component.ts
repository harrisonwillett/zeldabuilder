import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { RgbaColor } from "src/app/model/rgba-color";
import { rgbToHsv, hsvToRgb } from "./colorFormulas";
import { Slider } from "./slider";

@Component({
  selector: "app-color-palette-picker",
  templateUrl: "./color-palette-picker.component.html",
  styleUrls: ["./color-palette-picker.component.scss"]
})
export class ColorPalettePickerComponent implements OnInit, AfterViewInit {
  @Input() color: RgbaColor;
  @Input() index: number;
  @ViewChild("canvasHuePicker", { static: true }) canvasHuePicker: ElementRef<HTMLCanvasElement>;
  @ViewChild("canvasColorPicker", { static: true }) canvasColorPicker: ElementRef<HTMLCanvasElement>;
  @ViewChild("canvasAlphaPicker", { static: true }) canvasAlphaPicker: ElementRef<HTMLCanvasElement>;
  cntxtColorPicker: CanvasRenderingContext2D;
  cntxtHuePicker: CanvasRenderingContext2D;
  cntxtAlphaPicker: CanvasRenderingContext2D;
  public hsva = {
    h: undefined,
    s: undefined,
    v: undefined,
    a: undefined
  };

  // Twin Axix Sliders
  @ViewChild("canvasLightenPickerValue", { static: true }) canvasLightenPickerValue: ElementRef<HTMLDivElement>;
  @ViewChild("canvasDarkenPickerValue", { static: true }) canvasDarkenPickerValue: ElementRef<HTMLDivElement>;
  // Single Axix Sliders
  @ViewChild("canvasAlphaPickerValue", { static: true }) canvasAlphaPickerValue: ElementRef<HTMLDivElement>;
  @ViewChild("canvasHuePickerValue", { static: true }) canvasHuePickerValue: ElementRef<HTMLDivElement>;
  alphaSlider: Slider;
  hueSlider: Slider;
  @Output() newColor = new EventEmitter<[number, RgbaColor]>();

  constructor() {}

  ngOnInit() {
    this.initPicker();
    this.cntxtColorPicker = this.canvasColorPicker.nativeElement.getContext("2d");
    this.cntxtHuePicker = this.canvasHuePicker.nativeElement.getContext("2d");
    this.cntxtAlphaPicker = this.canvasAlphaPicker.nativeElement.getContext("2d");
  }

  ngAfterViewInit() {
    this.drawColorPickers();
    this.initSliders();
  }

  initSliders() {
    this.alphaSlider = new Slider(this.canvasAlphaPickerValue);
    this.hueSlider = new Slider(this.canvasHuePickerValue);
    this.alphaSlider.valueNowOut.subscribe(obj => {
      console.log({alphaNow: obj});
      this.newColor.emit([this.index, {
        red: this.color.red,
        green: this.color.green,
        blue: this.color.blue,
        alpha: (obj / 100)
      }]);
    });
    this.hueSlider.valueNowOut.subscribe(obj => {
      console.log({"hueSlider hueNow": obj});
      let hsv = [0, 0, 0];
      hsv = rgbToHsv(this.color.red, this.color.green, this.color.blue);
      console.log({"hueSlider OLD Color": this.color});
      console.log({"old hsv": hsv});
      hsv[0] = obj / 100;
      const newRBG = hsvToRgb(hsv[0], hsv[1], hsv[2]);
      console.log({"hueSlider NEW Color": newRBG});
      this.newColor.emit([this.index, {
        red: newRBG[0],
        green: newRBG[1],
        blue: newRBG[2],
        alpha: this.color.alpha
      }]);
    });
  }

  drawColorPickers() {
    // Hue Gradient
    const hueGradient = this.cntxtHuePicker.createLinearGradient(0, 0, this.canvasHuePicker.nativeElement.width, 0);
    hueGradient.addColorStop(0, "#FF0000");
    hueGradient.addColorStop((1 / 6), "#FFFF00");
    hueGradient.addColorStop((2 / 6), "#00FF00");
    hueGradient.addColorStop((3 / 6), "#00FFFF");
    hueGradient.addColorStop((4 / 6), "#0000FF");
    hueGradient.addColorStop((5 / 6), "#FF00FF");
    hueGradient.addColorStop(1, "#FF0000");
    this.cntxtHuePicker.fillStyle = hueGradient;
    this.cntxtHuePicker.fillRect(0, 0, this.canvasHuePicker.nativeElement.width, this.canvasHuePicker.nativeElement.height);
    this.cntxtHuePicker.fill();

    // Dark and Light Gradient
    const lightGradient = this.cntxtColorPicker.createLinearGradient(0, 0, this.canvasColorPicker.nativeElement.width, 0);
    lightGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    lightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    this.cntxtColorPicker.fillStyle = lightGradient;
    this.cntxtColorPicker.fillRect(0, 0, this.canvasColorPicker.nativeElement.width, this.canvasColorPicker.nativeElement.height);
    this.cntxtColorPicker.fill();
    const darkGradient = this.cntxtColorPicker.createLinearGradient(0, 0, 0, this.canvasColorPicker.nativeElement.height);
    darkGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    darkGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    this.cntxtColorPicker.fillStyle = darkGradient;
    this.cntxtColorPicker.fillRect(0, 0, this.canvasColorPicker.nativeElement.width, this.canvasColorPicker.nativeElement.height);
    this.cntxtColorPicker.fill();

    // Alpha Gradient
    const alphaGradient = this.cntxtAlphaPicker.createLinearGradient(0, 0, 0, this.canvasAlphaPicker.nativeElement.height);
    const alphaStop0 = ("rgba(" + this.color.red + ", " + this.color.green + ", " + this.color.blue + ", 1)");
    const alphaStop1 = ("rgba(" + this.color.red + ", " + this.color.green + ", " + this.color.blue + ", 0)");
    alphaGradient.addColorStop(0, alphaStop0);
    alphaGradient.addColorStop(1, alphaStop1);
    this.cntxtAlphaPicker.fillStyle = alphaGradient;
    this.cntxtAlphaPicker.fillRect(0, 0, this.canvasAlphaPicker.nativeElement.width, this.canvasAlphaPicker.nativeElement.height);
    this.cntxtAlphaPicker.fill();
  }

  initPicker() {
    const hsv = rgbToHsv(this.color.red, this.color.green, this.color.blue);
    this.hsva.h = hsv[0];
    this.hsva.s = hsv[1];
    this.hsva.v = hsv[2];
    this.hsva.a = this.color.alpha ? this.color.alpha : 1;
    console.log( this.rawHueAsHex() );
  }

  hsvToRgb(h, s, v) {
    return hsvToRgb(h, s, v);
  }

  hueValueNow() {
    const hsv = rgbToHsv(this.color.red, this.color.green, this.color.blue);
    console.log({hueValueNow: hsv[0]});
    return (hsv[0] * 100);
  }

  hueToSliderPosition() {
    console.log({huePosition: this.hsva.h});
    return (this.hsva.h * 300) + "px";
  }

  saturationToSliderPosition() {
    return ((1 - this.hsva.v) * 300) + "px";
  }

  luminosityToSliderPosition() {
    return ((1 - this.hsva.s) * 300) + "px";
  }

  alphaToSliderPosition() {
    return ((1 - this.hsva.a) * 300) + "px";
  }

  rawHueAsHex() {
      const rgb = hsvToRgb( this.hsva.h, 1, 1);
      let hexString = "#" + (Math.round(rgb[0]) > 16 ? "" : 0) + Math.round(rgb[0]).toString(16);
      hexString += (Math.round(rgb[1]) > 16 ? "" : 0) + Math.round(rgb[1]).toString(16);
      hexString += (Math.round(rgb[2]) > 16 ? "" : 0) + Math.round(rgb[2]).toString(16);
      return hexString;
  }

}
