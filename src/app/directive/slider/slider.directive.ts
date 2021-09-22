import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective implements AfterViewInit, OnInit {
  railDomNode;
  valueDomNode = false;
  valueMin = 0;
  valueMax = 100;
  valueNow: number;
  @Output() valueNowOut = new EventEmitter<string>();
  orientation: string;
  @Input() rail: HTMLElement;
  railLength: undefined | number;
  @Input() thumbLength;

  constructor(public el: ElementRef) {}

  ngOnInit() {
    this.rail.addEventListener("click", (event: MouseEvent) => {
      if(this.orientation === "horizontal") {
        
        this.valueNow = (event.offsetX * (this.valueMax - this.valueMin)) / (this.railLength - (this.thumbLength / 2));
      }
      if(this.orientation === "vertical") {
        event.offsetY
      }
      this.moveSliderTo(this.valueNow);
    });
  }

  ngAfterViewInit() {
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
      if(this.valueNow) {
        this.moveSliderTo(this.valueNow);
      }
    }
  }

  ngDoCheck() {
    let hasRailLenthChanged = false;
        if(this.rail !== undefined && this.orientation !== undefined) {
            const railLength: number | undefined = this.rail.offsetWidth;
            if(this.railLength !== railLength) {
                hasRailLenthChanged = true;
                this.railLength = railLength;
            }
        }
        
        if(hasRailLenthChanged) {
          this.moveSliderTo(this.valueNow);
        }
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
    this.el.nativeElement.ariaValueNow = value.toString();

    let railLength: number;
    if ( this.orientation === "horizontal" ) {
      railLength = this.rail.offsetWidth;
    }
    if ( this.orientation === "vertical" ) {
      railLength = this.rail.offsetHeight;
    }

    const pos = (this.valueNow / (this.valueMax - this.valueMin)) * (railLength - (this.thumbLength / 2));

    if ( this.orientation === "horizontal" ) {
      this.el.nativeElement.style.left = pos + "px";
    }
    if ( this.orientation === "vertical" ) {
      this.el.nativeElement.style.top = (railLength - this.thumbLength - pos) + "px";
    }
    this.valueNowOut.emit(value.toString());
  }

  @HostListener('mousemove', ['$event']) handleMouseMove(event: MouseEvent) {
    /*
    var diffX = event.pageX - self.railDomNode.offsetLeft;
    self.valueNow = parseInt(((self.valueMax - self.valueMin) * diffX) / self.railWidth);
    self.moveSliderTo(self.valueNow);

    event.preventDefault();
    event.stopPropagation();
    */
  };

  @HostListener('mouseup', ['$event']) handleMouseUp(event: MouseEvent) {
    /*
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    */
  };

  @HostListener('mousedown', ['$event']) handleMouseDown(event: MouseEvent) {
  
    /*
    // bind a mousemove event handler to move pointer
    document.addEventListener('mousemove', handleMouseMove);
  
    // bind a mouseup event handler to stop tracking mouse movements
    document.addEventListener('mouseup', handleMouseUp);
  
    event.preventDefault();
    event.stopPropagation();
  
    // Set focus to the clicked handle
    this.domNode.focus();
    */
  
  };

}
