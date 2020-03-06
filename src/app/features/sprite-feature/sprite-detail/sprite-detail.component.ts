import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Sprite } from "../../../model/sprite";
import { Spritesheet } from "../../../model/spritesheet";
import { SpriteService } from "../../../service/sprite.service";

@Component({
  selector: "app-sprite-detail",
  templateUrl: "./sprite-detail.component.html",
  styleUrls: ["./sprite-detail.component.scss"]
})
export class SpriteDetailComponent implements OnInit {
  @Input() sheet: Spritesheet;
  @Input() sprite: Sprite;
  sheetId: number;
  spriteId: number;
  hasEditName = true;
  tabListSelected: boolean[];
  selectedColor: number;

  constructor(
    private route: ActivatedRoute,
    private spriteService: SpriteService
  ) {}

  ngOnInit(): void {
    this.getSpriteSheet();
    // this should be dynamic
    this.tabListSelected = [true, false];
  }

  getSpriteSheet(): void {
    this.spriteService.getSheets().subscribe(obj => {
      const sheets = obj;
      for (const sheet of sheets) {
        if (sheet.id === this.sheetId) {
          this.sheet = sheet;
          this.getSprite();
        }
      }
    });
    this.sheetId = +this.route.snapshot.paramMap.get("sheetId");
  }

  getSprite(): void {
    this.spriteId = +this.route.snapshot.paramMap.get("spriteId");
    if (this.sheet.sprites.length > 0) {
      for (const sprite of this.sheet.sprites) {
        if (sprite.id === this.spriteId) {
          this.sprite = sprite;
          this.hasEditName = false;
          this.selectedColor = this.sprite.colors[0] ? 0 : undefined;
        }
      }
    }
    // console.log({thisSprite: this.sprite});
  }

  editName(): void {
    this.hasEditName = !this.hasEditName;
  }

  activateTab(ev: Event): void {
    // console.log({activateTab: ev});
    const thisTab = ev.target as HTMLButtonElement;
    const thisTabList = thisTab
      .closest('[role="tablist"]')
      .querySelectorAll('[role="tab"]');
    thisTabList.forEach((tab, index) => {
      const tabPanel = document.getElementById(
        tab.getAttribute("aria-controls")
      ) as HTMLElement;
      if (tab === thisTab) {
        this.tabListSelected[index] = true;
        tabPanel.setAttribute("tabindex", "0");
        tabPanel.removeAttribute("hidden");
        // remove hidden
      } else {
        this.tabListSelected[index] = false;
        tabPanel.setAttribute("tabindex", "-1");
        tabPanel.setAttribute("hidden", "hidden");
        // add hidden
      }
    });
  }

  changeSelectedColor(i: number) {
    this.selectedColor = i;
  }
}