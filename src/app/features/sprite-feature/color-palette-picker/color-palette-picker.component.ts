import { Component, OnInit, Input } from "@angular/core";
import { RgbaColor } from "src/app/model/rgba-color";

@Component({
  selector: "app-color-palette-picker",
  templateUrl: "./color-palette-picker.component.html",
  styleUrls: ["./color-palette-picker.component.scss"]
})
export class ColorPalettePickerComponent implements OnInit {
  @Input() color: RgbaColor;
  @Input() index: number;

  constructor() {}

  ngOnInit() {}
}
