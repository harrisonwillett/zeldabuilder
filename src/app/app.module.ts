import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DxButtonModule } from "devextreme-angular";

import { RgbaStringPipe } from "./pipe/rgba-string.pipe";

import { SpriteDataInMemoryService } from "./data/sprite-data-in-memory.service";

import { LogoComponent } from "./features/shared/logo/logo.component";
import { TabNavigationComponent } from "./features/shared/tab-navigation/tab-navigation.component";
import { TabNavigationItemComponent } from "./features/shared/tab-navigation-item/tab-navigation-item.component";

import { GameComponent } from "./features/game/game.component";

import { SpriteSheetGalleryComponent } from "./features/sprite-sheet-feature/sprite-sheet-gallery/sprite-sheet-gallery.component";
import { SpriteSheetDetailComponent } from "./features/sprite-sheet-feature/sprite-sheet-detail/sprite-sheet-detail.component";
import { SpriteSheetCreateComponent } from "./features/sprite-sheet-feature/sprite-sheet-create/sprite-sheet-create.component";

import { SpriteDetailComponent } from "./features/sprite-feature/sprite-detail/sprite-detail.component";
import { ColorPalettePickerComponent } from "./features/sprite-feature/color-palette-picker/color-palette-picker.component";
import { EditableCanvasComponent } from "./features/sprite-feature/editable-canvas/editable-canvas.component";

@NgModule({
  declarations: [
    AppComponent,
    RgbaStringPipe,
    EditableCanvasComponent,
    LogoComponent,
    TabNavigationComponent,
    TabNavigationItemComponent,
    GameComponent,
    SpriteSheetGalleryComponent,
    SpriteSheetDetailComponent,
    SpriteSheetCreateComponent,
    ColorPalettePickerComponent,
    SpriteDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    //DevExterme Imports
    DxButtonModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(SpriteDataInMemoryService, {
      dataEncapsulation: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
