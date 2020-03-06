import { Component, OnInit } from "@angular/core";

import { RgbaColor } from "src/app/model/rgba-color";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent implements OnInit {
  colorPalette: RgbaColor[] = [
    {
      red: parseInt("ef", 16),
      green: parseInt("9f", 16),
      blue: parseInt("a1", 16)
    },
    {
      red: parseInt("ca", 16),
      green: parseInt("01", 16),
      blue: parseInt("0c", 16)
    },
    {
      red: parseInt("7d", 16),
      green: parseInt("06", 16),
      blue: parseInt("09", 16)
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
