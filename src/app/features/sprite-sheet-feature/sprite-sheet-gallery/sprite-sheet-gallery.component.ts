import { Component, OnInit } from "@angular/core";
import {v4 as uuidv4} from 'uuid';

import { Spritesheet } from "../../../model/spritesheet";
import { SpriteService } from "../../../service/sprite.service";

@Component({
  selector: "app-sprite-sheet-gallery",
  templateUrl: "./sprite-sheet-gallery.component.html",
  styleUrls: ["./sprite-sheet-gallery.component.scss"]
})
export class SpriteSheetGalleryComponent implements OnInit {
  sheets: Spritesheet[] = [];
  selectedColor = 0;
  constructor(private spriteService: SpriteService) {}

  ngOnInit() {
    this.getSheets();
  }

  getSheets(): void {
    this.spriteService.getSheets().subscribe(obj => {
      this.sheets = obj;
    });
  }

  delete(id: string): void {
    this.sheets = this.sheets.filter(sheet => {
      if (sheet.id !== id) {
        this.spriteService.deleteSheet(sheet).subscribe();
      }
      return sheet.id !== id;
    });
  }

  duplicate(id: string): void {
    this.sheets.filter(sheet => {
      if (sheet.id === id) {
        const dupSheet = { ...sheet };
        dupSheet.name = dupSheet.name + " - Copy";
        dupSheet.access.read = true;
        dupSheet.access.write = true;
        dupSheet.id = uuidv4();
        dupSheet.sprites = [...dupSheet.sprites];
        dupSheet.sprites.forEach((sprite, index) => {
          const dupSprite = { ...sprite };
          dupSprite.id = uuidv4();
          dupSheet.sprites[index] = dupSprite;
        });
        this.spriteService.addSheet(dupSheet as Spritesheet).subscribe(s => {
          console.log({
            dupSheet: s
          });
          this.sheets.push(s);
        });
      }
    });
  }
}
