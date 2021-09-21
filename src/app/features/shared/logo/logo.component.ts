import { Component, OnInit } from "@angular/core";

import { RgbaColor } from "../../../model/rgba-color";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent implements OnInit {
  colorPalette: RgbaColor[] = [
    new RgbaColor(
      parseInt("ef", 16),
      parseInt("9f", 16),
      parseInt("a1", 16)
    ),
    new RgbaColor(
      parseInt("ca", 16),
      parseInt("01", 16),
      parseInt("0c", 16)
    ),
    new RgbaColor(
      parseInt("7d", 16),
      parseInt("06", 16),
      parseInt("09", 16)
    )
  ];

  constructor() { }

  ngOnInit() { }
}
