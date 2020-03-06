import { Component, OnInit, Input } from "@angular/core";

import { Spritesheet } from "../../../model/spritesheet";
import { BitPresets } from "../../../data/sprite-modes";
import { SpriteService } from "../../../service/sprite.service";

@Component({
  selector: "app-sprite-sheet-create",
  templateUrl: "./sprite-sheet-create.component.html",
  styleUrls: ["./sprite-sheet-create.component.scss"]
})
export class SpriteSheetCreateComponent implements OnInit {
  @Input() submit = "Create Sprite Sheet";
  @Input() sheet: Spritesheet = {
    id: null,
    name: null,
    sprites: [],
    options: {
      height: null,
      width: null,
      colorChannels: null
    }
  };
  @Input() funcType = "create";

  presetOptions = BitPresets;
  // sheetHasClass: boolean;

  sheets: Spritesheet[] = [];

  constructor(private spriteService: SpriteService) {}

  updateModeDetails(s) {
    for (const pO of this.presetOptions) {
      if (pO.name === s) {
        if (pO.class !== undefined) {
          this.sheet.options = { ...pO.class };
        }
        console.log({ pO });
      }
    }
  }

  update(sheet: Spritesheet) {
    console.log({ update: sheet });
    console.log("Update sheet " + sheet.name);
    this.spriteService.updateSheet(sheet as Spritesheet).subscribe(s => {
      this.sheets.push(s);
    });
  }

  setOptKey(key: string, value: string): void {
    this.sheet.options[key] = parseInt(value, 10);
  }

  create(sheet: Spritesheet) {
    console.log({ create: sheet });
    sheet.id =
      this.sheets.length > 0 ? Math.max(...this.sheets.map(s => s.id)) + 1 : 1;
    console.log("Create sheet " + sheet.name);
    this.spriteService.addSheet(sheet as Spritesheet).subscribe(s => {
      this.sheets.push(s);
    });
  }

  processSheet(sheet: Spritesheet, funcType: string): void {
    if (funcType === "create") {
      this.create(sheet);
    }
    if (funcType === "update") {
      this.update(sheet);
    }
  }

  ngOnInit() {
    /*
    this.setMode();
    */
    this.getSheets();
  }

  getSheets(): void {
    this.spriteService.getSheets().subscribe(obj => {
      console.log({ galleryGetSheets: obj });
      this.sheets = obj;
    });
  }
}
