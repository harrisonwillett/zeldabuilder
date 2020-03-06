import { Component, OnInit, Input } from "@angular/core";
import { Tab } from "../../../model/tab";

@Component({
  selector: "app-tab-navigation-item",
  templateUrl: "./tab-navigation-item.component.html",
  styleUrls: ["./tab-navigation-item.component.scss"]
})
export class TabNavigationItemComponent implements OnInit {
  @Input() tab: Tab;

  constructor() {}

  ngOnInit() {}
}
