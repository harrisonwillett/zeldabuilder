import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

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
  @Output() updateSheet = new EventEmitter<Spritesheet>();
  presetOptions = BitPresets;
  sheets: Spritesheet[] = [];
  colorRemoval = false;

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
    this.updateSheet.emit(sheet);
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

  checkColors(): void {
    console.log({
      colorChannels: this.sheet.options.colorChannels,
      colors: this.sheet.colors.length
    });
    if (this.sheet.options.colorChannels > this.sheet.colors.length ) {
      const colorDelta = this.sheet.options.colorChannels - this.sheet.colors.length;
      for (let i = 0; i < colorDelta; i++) {
        this.sheet.colors.push({
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
          alpha: Math.floor(Math.random() * 100) / 100
        });
      }
    }
    if (this.sheet.options.colorChannels < this.sheet.colors.length ) {
      this.colorRemoval = true;
    } else {
      this.colorRemoval = false;
    }
  }

  updateColor(event) {
    console.log({"create sheet update color": event});
    this.sheet.colors[event[0]] = event[1];
  }

  removeColorChannel(index: number) {
    this.sheet.colors.splice(index, 1);
    this.checkColors();
  }

  ngOnInit() {
    this.getSheets();
  }

  getSheets(): void {
    this.spriteService.getSheets().subscribe(obj => {
      console.log({ galleryGetSheets: obj });
      this.sheets = obj;
    });
  }
}
