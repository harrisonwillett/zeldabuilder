import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  gameWidth: number = 1280;
  gameHeight: number = 578;
  constructor() {}

  ngOnInit(): void {}
}
