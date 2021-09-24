import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SharedModule } from "./features/shared/shared";
import { GameComponent } from "./features/game/game.component";
import { SpriteModule } from "./features/sprite-feature/sprite-feature";
import { SpriteSheetModule } from "./features/sprite-sheet-feature/sprite-sheet-feature";
import { SpriteDataInMemoryService } from "./data/sprite-arrays/sprite-data-in-memory.service";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    SharedModule,
    SpriteModule,
    SpriteSheetModule,
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
