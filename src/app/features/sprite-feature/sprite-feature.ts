import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { AppRoutingModule } from "src/app/app-routing.module";
import { SpriteDataInMemoryService } from "src/app/data/sprite-arrays/sprite-data-in-memory.service";

import { SharedModule } from "../shared/shared";

import { SpriteDetailComponent } from "./sprite-detail/sprite-detail.component";

@NgModule({
	declarations: [
        SpriteDetailComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

        SharedModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(SpriteDataInMemoryService, {
            dataEncapsulation: false
        })
    ]
})
export class SpriteModule {}