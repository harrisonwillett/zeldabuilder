import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DxButtonModule } from "devextreme-angular";

import { RgbaStringPipe } from "./pipe/rgba-string.pipe";

@NgModule({
  declarations: [AppComponent, RgbaStringPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //DevExterme Imports
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
