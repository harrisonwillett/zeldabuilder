import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective {
  railDomNode;
  valueDomNode = false;
  valueMin = 0;
  valueMax = 100;
  valueNow: number;
  @Output() valueNowOut = new EventEmitter<string>();
  orientation: string;
  railLength = 0;
  thumbLength  = 10;

  constructor(public el: ElementRef) {
    if(this.el.nativeElement) {
      if (this.el.nativeElement.ariaValueMin) {
          this.valueMin = parseInt(this.el.nativeElement.ariaValueMin, 10);
      }
      if (this.el.nativeElement.ariaValueMax) {
          this.valueMax = parseInt(this.el.nativeElement.ariaValueMax, 10);
      }
      if (this.el.nativeElement.ariaValueNow) {
          this.valueNow = parseInt(this.el.nativeElement.ariaValueNow, 10);
      }
      if (this.el.nativeElement.ariaOrientation) {
        this.orientation = this.el.nativeElement.ariaOrientation;
      }
    }
    this.railLength = 300;
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const valueNow = parseInt(this.el.nativeElement.ariaValueNow);
    const valueMin = parseInt(this.el.nativeElement.ariaValueMin);
    const valueMax = parseInt(this.el.nativeElement.ariaValueMax);
    let flag = false;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        this.moveSliderTo(valueNow - 1);
        flag = true;
        break;

        case "ArrowRight":
        case "ArrowUp":
        this.moveSliderTo(valueNow + 1);
        flag = true;
        break;

      case "PageDown":
        this.moveSliderTo(valueNow - 10);
        flag = true;
        break;

      case "PageUp":
        this.moveSliderTo(valueNow + 10);
        flag = true;
        break;

      case "Home":
        this.moveSliderTo(valueMin);
        flag = true;
        break;

      case "End":
        this.moveSliderTo(valueMax);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }

  };

  moveSliderTo( value: number ) {

    if (value > this.valueMax) {
      value = this.valueMax;
    }

    if (value < this.valueMin) {
      value = this.valueMin;
    }

    this.valueNow = value;
    this.valueNowOut.emit(value.toString());
    this.el.nativeElement.ariaValueNow = value.toString();
    // console.log({value: value});

    const pos = Math.round(
      (this.valueNow * (this.railLength - this.thumbLength)) / (this.valueMax - this.valueMin)
    ); // - (this.thumbWidth / 2);

    if ( this.orientation === "horizontal" ) {
      this.el.nativeElement.style.left = pos + "px";
    }
    if ( this.orientation === "vertical" ) {
      this.el.nativeElement.style.top = (this.railLength - this.thumbLength - pos) + "px";
    }
  }

  @HostListener('mousedown', ['$event']) handleMouseDown(event: MouseEvent) {
    // console.log({handleMouseDown: event});
  };

  @HostListener('click', ['$event']) handleClick(event: MouseEvent) {
    // console.log({handleClick: event});
  };

}
