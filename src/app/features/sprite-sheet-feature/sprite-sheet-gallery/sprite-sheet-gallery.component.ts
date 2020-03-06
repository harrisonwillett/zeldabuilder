import { Component, OnInit } from "@angular/core";

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
      console.log({ galleryGetSheets: obj });
      this.sheets = obj;
    });
  }

  delete(id: number): void {
    this.sheets = this.sheets.filter(sheet => {
      if (sheet.id !== id) {
        console.log("Delete sheet " + sheet.name);
        this.spriteService.deleteSheet(sheet).subscribe();
      }
      return sheet.id !== id;
    });
  }

  duplicate(id: number): void {
    this.sheets.filter(sheet => {
      if (sheet.id !== id) {
        const dupSheet = { ...sheet };
        dupSheet.name = dupSheet.name + " - Copy";
        dupSheet.id =
          this.sheets.length > 0
            ? Math.max(...this.sheets.map(s => s.id)) + 1
            : 1;
        console.log({ duplicate: dupSheet });
        console.log("Duplicate sheet " + dupSheet.name);
        this.spriteService.addSheet(dupSheet as Spritesheet).subscribe(s => {
          this.sheets.push(s);
        });
      }
    });
  }
}
