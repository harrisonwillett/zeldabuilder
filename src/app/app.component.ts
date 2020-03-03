import { Component } from "@angular/core";
import { RgbaColor } from "./model/rgba-color";

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

  helloWorld() {
    alert("Hello world!");
  }
}
