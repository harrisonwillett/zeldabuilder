import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { HsvaColor } from "src/app/model/hsva-color";
import { RgbaColor } from "src/app/model/rgba-color";
import { SliderDirective } from "../slider/slider.directive";
import { rgbaToHsva, hsvaToRgba } from "./colorFormulas";
@Component({
  selector: "app-color-palette-picker",
  templateUrl: "./color-palette-picker.component.html",
  styleUrls: ["./color-palette-picker.component.scss"]
})
export class ColorPalettePickerComponent implements OnInit, AfterViewInit {
  @Input() color: RgbaColor;
  @Output() newColor = new EventEmitter<[number, RgbaColor]>();

  @Input() index: number;

  isModalVisable: boolean = false;

  @ViewChild("canvasHuePicker", { static: true }) canvasHuePicker: ElementRef<HTMLCanvasElement>;
  @ViewChild("canvasColorPicker", { static: true }) canvasColorPicker: ElementRef<HTMLCanvasElement>;
  @ViewChild("canvasAlphaPicker", { static: true }) canvasAlphaPicker: ElementRef<HTMLCanvasElement>;
  cntxtColorPicker: CanvasRenderingContext2D;
  cntxtHuePicker: CanvasRenderingContext2D;
  cntxtAlphaPicker: CanvasRenderingContext2D;

  public hsva: HsvaColor;
  
  constructor() {}

  ngOnInit() {
    this.hsva = rgbaToHsva(this.color);
    console.log({hsva: this.hsva});
    this.cntxtColorPicker = this.canvasColorPicker.nativeElement.getContext("2d");
    this.cntxtHuePicker = this.canvasHuePicker.nativeElement.getContext("2d");
    this.cntxtAlphaPicker = this.canvasAlphaPicker.nativeElement.getContext("2d");
  }

  ngAfterViewInit() {
    this.drawColorPickers();
  }

  closeModal() {
    this.isModalVisable = false;
    const rgba = hsvaToRgba(this.hsva);
    this.newColor.emit([this.index, rgba]);
  }

  updateAlpha($event) {
    if($event !== undefined) {
      this.hsva.alpha = parseFloat($event)/100;
      console.log({alpha: this.hsva.alpha});
    };
  }

  updateHue($event) {
    if($event !== undefined) {
      this.hsva.hue = parseFloat($event)/255;
      this.drawAlphaPicker();
    }
  }

  updateChroma() {
    console.log({
      canvasDarkenPickerValue: "update this thing"
    });
  }

  updateDarken($event) {
    if($event !== undefined) {
      this.hsva.value = $event / 100;
      this.updateChroma();
      this.drawAlphaPicker();
    }
  }

  updateLighten($event) {
    if($event !== undefined) {
      this.hsva.saturation = $event / 100;
      this.updateChroma();
      this.drawAlphaPicker();
    }
  }

  drawHuePicker() {
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
  };

  drawDarkLightPicker() {
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
  };

  drawAlphaPicker() {
    const rgba:RgbaColor = hsvaToRgba(this.hsva);
    // Alpha Gradient
    this.cntxtAlphaPicker.clearRect(0, 0, this.canvasAlphaPicker.nativeElement.width, this.canvasAlphaPicker.nativeElement.height)
    const alphaGradient = this.cntxtAlphaPicker.createLinearGradient(0, 0, 0, this.canvasAlphaPicker.nativeElement.height);
    const alphaStop0 = ("rgba(" + rgba.red + ", " + rgba.green + ", " + rgba.blue + ", 1)");
    const alphaStop1 = ("rgba(" + rgba.red + ", " + rgba.green + ", " + rgba.blue + ", 0)");
    alphaGradient.addColorStop(0, alphaStop0);
    alphaGradient.addColorStop(1, alphaStop1);
    this.cntxtAlphaPicker.fillStyle = alphaGradient;
    this.cntxtAlphaPicker.fillRect(0, 0, this.canvasAlphaPicker.nativeElement.width, this.canvasAlphaPicker.nativeElement.height);
    this.cntxtAlphaPicker.fill();
  };

  drawColorPickers() {
    this.drawHuePicker();
    this.drawDarkLightPicker();
    this.drawAlphaPicker();    
  }

  hsvToRgb(hsva: HsvaColor): RgbaColor {
    return hsvaToRgba(hsva);
  }

  rgbToHsv(rgba: RgbaColor): HsvaColor {
    return rgbaToHsva(rgba);
  }

  hueCssSafe(): string {
    const rgba:RgbaColor = hsvaToRgba(new HsvaColor(this.hsva.hue, 1, 1, 1));
    let cssString = "rgba(" + Math.round(rgba.red).toString() + ", ";
    cssString += Math.round(rgba.green).toString() + ", ";
    cssString += Math.round(rgba.blue).toString() + ", ";
    cssString += rgba.alpha.toString() + ")";
    return cssString;
  }

  rgbaCssSafe(): string {
    const rgba:RgbaColor = hsvaToRgba(this.hsva);
    let cssString = "rgba(" + Math.round(rgba.red).toString() + ", ";
    cssString += Math.round(rgba.green).toString() + ", ";
    cssString += Math.round(rgba.blue).toString() + ", ";
    cssString += rgba.alpha.toString() + ")";
    return cssString;
  }

  rgbCssSafe(): string {
    const rgba:RgbaColor = hsvaToRgba(this.hsva);
    let cssString = "rgba(" + Math.round(rgba.red).toString() + ", ";
    cssString += Math.round(rgba.green).toString() + ", ";
    cssString += Math.round(rgba.blue).toString() + ", ";
    cssString += "1)";
    return cssString;
  }

  rgbCssSafeAlt(): string {
    const rgba:RgbaColor = hsvaToRgba(this.hsva);
    let cssString = "rgb(" + (rgba.red > 127 ? 0 : 255).toString() + ", ";
    cssString += (rgba.green > 127 ? 0 : 255).toString() + ", ";
    cssString += (rgba.blue > 127 ? 0 : 255).toString() + ")";
    return cssString;
  }

}
