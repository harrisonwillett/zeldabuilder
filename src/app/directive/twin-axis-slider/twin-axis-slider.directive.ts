import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appTwinAxisSlider]'
})
export class TwinAxisSliderDirective {
    @Input() rail1: HTMLElement;
    @Input() rail2: HTMLElement;
    rail1Left: string | undefined;
    rail1Top: string | undefined;
    rail2Left: string | undefined;
    rail2Top: string | undefined;

    constructor(public el: ElementRef) {}

    ngDoCheck() {
        let isRailPositionChanged = false;
        if(this.rail1 !== undefined) {
            const rail1Left: string | undefined = this.rail1.style.left;
            const rail1Top: string | undefined = this.rail1.style.top;
            const rail2Left: string | undefined = this.rail2.style.left;
            const rail2Top: string | undefined = this.rail2.style.top;
            if(this.rail1Left !== rail1Left) {
                isRailPositionChanged = true;
                this.rail1Left = rail1Left;
            }
            if(this.rail1Top !== rail1Top) {
                isRailPositionChanged = true;
                this.rail1Top = rail1Top;
            }
            if(this.rail2Left !== rail2Left) {
                isRailPositionChanged = true;
                this.rail2Left = rail2Left;
            }
            if(this.rail2Top !== rail2Top) {
                isRailPositionChanged = true;
                this.rail2Top = rail2Top;
            }
        }
        
        if(isRailPositionChanged) {
            this.moveSlider();
        }
    }

    moveSlider() {
        if ( this.rail1.getAttribute("aria-orientation") === "horizontal" ) {
            this.el.nativeElement.style.left = this.rail1Left;
        }
        if ( this.rail1.getAttribute("aria-orientation") === "vertical" ) {
            this.el.nativeElement.style.top = this.rail1Top;
        }
        if ( this.rail2.getAttribute("aria-orientation") === "horizontal" ) {
            this.el.nativeElement.style.left = this.rail2Left;
        }
        if ( this.rail2.getAttribute("aria-orientation") === "vertical" ) {
            this.el.nativeElement.style.top = this.rail2Top;
        }
    }
}
