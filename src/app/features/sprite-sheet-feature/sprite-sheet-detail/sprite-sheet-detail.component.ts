import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Spritesheet } from "../../../model/spritesheet";
import { SpriteService } from "../../../service/sprite.service";
import { Sprite } from "../../../model/sprite";

@Component({
  selector: "app-sprite-sheet-detail",
  templateUrl: "./sprite-sheet-detail.component.html",
  styleUrls: ["./sprite-sheet-detail.component.scss"]
})
export class SpriteSheetDetailComponent implements OnInit {
  sheet: Spritesheet;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private spriteService: SpriteService
  ) {}

  ngOnInit(): void {
    this.getSpriteSheet();
  }

  getSpriteSheet(): void {
    this.spriteService.getSheets().subscribe(obj => {
      console.log({ sheetDetailGetSheet: obj });
      const sheets = obj;
      for (const sheet of sheets) {
        if (sheet.id === this.id) {
          this.sheet = sheet;
        }
      }
    });
    this.id = +this.route.snapshot.paramMap.get("sheetId");
  }

  delete(sprite: Sprite): void {
    console.log("Delete sprite " + sprite.name);
    this.sheet.sprites = this.sheet.sprites.filter(h => h !== sprite); // delete locally
    this.spriteService.updateSheet(this.sheet).subscribe(); // delete from the service
  }

  duplicate(sprite: Sprite): void {
    const dupSprite = { ...sprite };
    dupSprite.name = dupSprite.name + " - Copy";
    dupSprite.id =
      this.sheet.sprites.length > 0
        ? Math.max(...this.sheet.sprites.map(s => s.id)) + 1
        : 1;
    console.log("Duplicate sprite " + dupSprite.name);
    this.sheet.sprites.push(dupSprite);
    this.spriteService.updateSheet(this.sheet).subscribe(); // delete from the service
  }
}
