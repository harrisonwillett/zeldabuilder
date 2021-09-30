import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import {v4 as uuidv4} from 'uuid';

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
      }
    }
  }

  update(sheet: Spritesheet) {
    this.updateSheet.emit(sheet);
  }

  setOptKey(key: string, value: string): void {
    this.sheet.options[key] = parseInt(value, 10);
  }

  create(sheet: Spritesheet) {
    sheet.id = uuidv4();
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
      this.sheets = obj;
    });
  }
}
