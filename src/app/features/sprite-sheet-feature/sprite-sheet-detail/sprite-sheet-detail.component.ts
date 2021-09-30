import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {v4 as uuidv4} from 'uuid';

import { Spritesheet } from "../../../model/spritesheet";
import { SpriteService } from "../../../service/sprite.service";
import { Sprite } from "../../../model/sprite";

@Component({
  selector: "app-sprite-sheet-detail",
  templateUrl: "./sprite-sheet-detail.component.html",
  styleUrls: ["./sprite-sheet-detail.component.scss"]
})
export class SpriteSheetDetailComponent implements OnInit {
  sheets: Spritesheet[];
  sheet: Spritesheet;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private spriteService: SpriteService
  ) {}

  ngOnInit(): void {
    this.getSpriteSheet();
  }

  getSpriteSheet(): void {
    this.spriteService.getSheets().subscribe(obj => {
      this.sheets = obj;
      for (const sheet of this.sheets) {
        if (sheet.id === this.id) {
          this.sheet = sheet;
        }
      }
    });
    this.id = this.route.snapshot.paramMap.get("sheetId");
  }

  getUpdatedSheet(updatedSheet: Spritesheet) {
    this.spriteService.updateSheet(updatedSheet as Spritesheet).subscribe(s => {
      this.sheets.push(s);
    });
  }

  delete(sprite: Sprite): void {
    this.sheet.sprites = this.sheet.sprites.filter(h => h !== sprite); // delete locally
    this.spriteService.updateSheet(this.sheet).subscribe(); // delete from the service
  }

  duplicate(sprite: Sprite): void {
    const dupSprite = { ...sprite };
    dupSprite.name = dupSprite.name + " - Copy";
    dupSprite.id = uuidv4();
    this.sheet.sprites.push(dupSprite);
    this.spriteService.updateSheet(this.sheet).subscribe(); // delete from the service
  }
}
