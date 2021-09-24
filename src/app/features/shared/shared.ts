import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { AppRoutingModule } from "src/app/app-routing.module";
import { SpriteDataInMemoryService } from "src/app/data/sprite-arrays/sprite-data-in-memory.service";


import { SliderDirective } from "src/app/directive/slider/slider.directive";
import { TwinAxisSliderDirective } from "src/app/directive/twin-axis-slider/twin-axis-slider.directive";

import { RgbaStringPipe } from "src/app/pipe/rgba-string.pipe";
import { ColorPalettePickerComponent } from "./color-palette-picker/color-palette-picker.component";
import { EditableCanvasComponent } from "./editable-canvas/editable-canvas.component";

import { LogoComponent } from "./logo/logo.component";
import { MessagesComponent } from "./messages/messages.component";
import { TabNavigationItemComponent } from "./tab-navigation-item/tab-navigation-item.component";
import { TabNavigationComponent } from "./tab-navigation/tab-navigation.component";

@NgModule({
	declarations: [
        RgbaStringPipe,
        SliderDirective,
        TwinAxisSliderDirective,
        EditableCanvasComponent, 
        LogoComponent, 
        MessagesComponent,
        TabNavigationItemComponent,
        TabNavigationComponent,
        ColorPalettePickerComponent
    ],
    exports: [
        RgbaStringPipe,
        SliderDirective,
        TwinAxisSliderDirective,
        EditableCanvasComponent, 
        LogoComponent, 
        MessagesComponent, 
        TabNavigationComponent,
        TabNavigationItemComponent,
        ColorPalettePickerComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(SpriteDataInMemoryService, {
            dataEncapsulation: false
        })
    ]
})
export class SharedModule {}