import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpriteSheetGalleryComponent } from "./features/sprite-sheet-feature/sprite-sheet-gallery/sprite-sheet-gallery.component";
import { GameComponent } from "./features/game/game.component";
import { SpriteSheetCreateComponent } from "./features/sprite-sheet-feature/sprite-sheet-create/sprite-sheet-create.component";
import { SpriteSheetDetailComponent } from "./features/sprite-sheet-feature/sprite-sheet-detail/sprite-sheet-detail.component";
import { SpriteDetailComponent } from "./features/sprite-feature/sprite-detail/sprite-detail.component";

const routes: Routes = [
  { path: "game", component: GameComponent },
  //Sheet Feature
  { path: "sprites", component: SpriteSheetGalleryComponent },
  {
    path: "sprites/create-sprite-sheet",
    component: SpriteSheetCreateComponent
  },
  {
    path: "sprites/:sheetId",
    component: SpriteSheetDetailComponent
  },
  //Sprite Feature
  {
    path: "sprites/:sheetId/:spriteId",
    component: SpriteDetailComponent
  },
  //Music Feature
  { path: "music-tracks", component: SpriteSheetGalleryComponent },
  { path: "", redirectTo: "/game", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
