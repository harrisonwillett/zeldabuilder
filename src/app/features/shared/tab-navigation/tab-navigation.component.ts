import { Component, OnInit } from "@angular/core";

import { Tab } from "../../../model/tab";

@Component({
  selector: "app-tab-navigation",
  templateUrl: "./tab-navigation.component.html",
  styleUrls: ["./tab-navigation.component.scss"]
})
export class TabNavigationComponent implements OnInit {
  tabNavName: string = "Game Editing";
  tabs: Tab[] = [
    {
      title: "Game",
      routerLink: "/game",
      routerLinkActiveOptions: { exact: true }
    },
    {
      title: "Edit Sprites",
      routerLink: "/sprites",
      routerLinkActiveOptions: { exact: false }
    },
    {
      title: "Edit Music",
      routerLink: "/music-tracks",
      routerLinkActiveOptions: { exact: false }
    }
  ];

  constructor() {}

  ngOnInit() {}
}
