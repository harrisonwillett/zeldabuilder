import { ElementRef, EventEmitter, Output } from "@angular/core";

export class Slider {

  domNode: ElementRef<HTMLElement>;
  railDomNode;
  valueDomNode = false;
  valueMin = 0;
  valueMax = 100;
  valueNow: number;
  @Output() valueNowOut = new EventEmitter<number>();
  orientation: string;
  railLength = 0;
  thumbLength  = 10;

  keyCode = Object.freeze({
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36
  });

  constructor( nativeElement: ElementRef<HTMLElement> ) {
    console.log({"Bound Slider Class to": nativeElement});
    this.domNode = nativeElement;
    if (this.domNode.nativeElement.getAttribute("aria-valuemin")) {
        this.valueMin = parseInt(this.domNode.nativeElement.getAttribute("aria-valuemin"), 10);
        console.log({valueMin: this.valueMin});
    }
    if (this.domNode.nativeElement.getAttribute("aria-valuemax")) {
        this.valueMax = parseInt(this.domNode.nativeElement.getAttribute("aria-valuemax"), 10);
        console.log({valueMax: this.valueMax});
    }
    if (this.domNode.nativeElement.getAttribute("aria-valuenow")) {
        this.valueNow = parseInt(this.domNode.nativeElement.getAttribute("aria-valuenow"), 10);
        console.log({valueNow: this.valueNow});
    }
    if (this.domNode.nativeElement.getAttribute("aria-orientation")) {
      this.orientation = this.domNode.nativeElement.getAttribute("aria-orientation");
    }
    this.railLength = 300;
        /*
        this.railDomNode = this.domNode.parentNode;

        if (this.domNode.getAttribute("aria-valuemin")) {
            this.valueMin = parseInt(this.domNode.getAttribute("aria-valuemin"), 10);
        }
        if (this.domNode.getAttribute("aria-valuemax")) {
            this.valueMax = parseInt(this.domNode.getAttribute("aria-valuemax"), 10);
        }
        if (this.domNode.getAttribute("aria-valuenow")) {
            this.valueNow = parseInt(this.domNode.getAttribute("aria-valuenow"), 10);
        }
        this.railWidth = parseInt(this.railDomNode.style.width.slice(0, -2), 10);
        this.valueDomNode = this.railDomNode.nextElementSibling;
        if (this.valueDomNode) {
            this.valueDomNode.innerHTML = "0";
            this.valueDomNode.style.left = (this.railDomNode.offsetLeft + this.railWidth + 10) + "px";
          this.valueDomNode.style.top = (this.railDomNode.offsetTop - 8) + "px";
        }

        if (this.domNode.tabIndex !== 0) {
            this.domNode.tabIndex = 0;
        }

        this.domNode.style.width = this.thumbWidth + "px";
        this.domNode.style.height = this.thumbHeight + "px";
        this.domNode.style.top = (this.thumbHeight / -2) + "px";

        this.domNode.addEventListener("keydown", this.handleKeyDown.bind(this));
        // add onmousedown, move, and onmouseup
        this.domNode.addEventListener("mousedown", this.handleMouseDown.bind(this));

        this.domNode.addEventListener("focus", this.handleFocus.bind(this));
        this.domNode.addEventListener("blur", this.handleBlur.bind(this));
        this.railDomNode.addEventListener("click", this.handleClick.bind(this));
        this.moveSliderTo(this.valueNow);
        */
  }

  handleKeyDown = function(event) {
    let flag = false;
    switch (event.keyCode) {
      case this.keyCode.left:
      case this.keyCode.down:
        this.moveSliderTo(this.valueNow - 1);
        flag = true;
        break;

      case this.keyCode.right:
      case this.keyCode.up:
        this.moveSliderTo(this.valueNow + 1);
        flag = true;
        break;

      case this.keyCode.pageDown:
        this.moveSliderTo(this.valueNow - 10);
        flag = true;
        break;

      case this.keyCode.pageUp:
        this.moveSliderTo(this.valueNow + 10);
        flag = true;
        break;

      case this.keyCode.home:
        this.moveSliderTo(this.valueMin);
        flag = true;
        break;

      case this.keyCode.end:
        this.moveSliderTo(this.valueMax);
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
    this.valueNowOut.emit(value);

    const pos = Math.round(
      (this.valueNow * (this.railLength - this.thumbLength)) / (this.valueMax - this.valueMin)
    ); // - (this.thumbWidth / 2);

    if ( this.orientation === "horizontal" ) {
      this.domNode.nativeElement.style.left = pos + "px";
    }
    if ( this.orientation === "vertical" ) {
      this.domNode.nativeElement.style.top = (this.railLength - this.thumbLength - pos) + "px";
    }
  }

    /*
    moveSliderTo( value ) {

        if (value > this.valueMax) {
          value = this.valueMax;
        }

        if (value < this.valueMin) {
          value = this.valueMin;
        }

        this.valueNow = value;

        this.domNode.setAttribute("aria-valuenow", this.valueNow);

        const pos = Math.round(
          (this.valueNow * this.railWidth) / (this.valueMax - this.valueMin)
        ) - (this.thumbWidth / 2);

        this.domNode.style.left = pos + "px";

        if (this.valueDomNode) {
          this.valueDomNode.innerHTML = this.valueNow.toString();
        }

        // updateColorBox();

    };

    handleKeyDown = function(event) {

        let flag = false;

        switch (event.keyCode) {
          case this.keyCode.left:
          case this.keyCode.down:
            this.moveSliderTo(this.valueNow - 1);
            flag = true;
            break;

          case this.keyCode.right:
          case this.keyCode.up:
            this.moveSliderTo(this.valueNow + 1);
            flag = true;
            break;

          case this.keyCode.pageDown:
            this.moveSliderTo(this.valueNow - 10);
            flag = true;
            break;

          case this.keyCode.pageUp:
            this.moveSliderTo(this.valueNow + 10);
            flag = true;
            break;

          case this.keyCode.home:
            this.moveSliderTo(this.valueMin);
            flag = true;
            break;

          case this.keyCode.end:
            this.moveSliderTo(this.valueMax);
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

    handleFocus(event) {
        this.domNode.classList.add("focus");
        this.railDomNode.classList.add("focus");
    };

    handleBlur(event) {
        this.domNode.classList.remove("focus");
        this.railDomNode.classList.remove("focus");
    };

        // Initialise Sliders on the page
        window.addEventListener('load', function () {

        const sliders = document.querySelectorAll("[role=slider]");;

        for (const slider of sliders) {
            const s = new Slider(slider);
            s.init();
        }

      });

      handleMouseDown(event) {

        var self = this;
        var handleMouseMove = function (event) {

            var diffX = event.pageX - self.railDomNode.offsetLeft;
            self.valueNow = parseInt(((self.valueMax - self.valueMin) * diffX) / self.railWidth);
            self.moveSliderTo(self.valueNow);

            event.preventDefault();
            event.stopPropagation();
        };

        let handleMouseUp = function (event) {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // bind a mousemove event handler to move pointer
        document.addEventListener("mousemove", handleMouseMove);

        // bind a mouseup event handler to stop tracking mouse movements
        document.addEventListener("mouseup", handleMouseUp);

        event.preventDefault();
        event.stopPropagation();

        // Set focus to the clicked handle
        this.domNode.focus();

    };

    // handleMouseMove has the same functionality as we need for handleMouseClick on the rail
    handleClick(event) {

        var diffX = event.pageX - this.railDomNode.offsetLeft;
        this.valueNow = parseInt(((this.valueMax - this.valueMin) * diffX) / this.railWidth);
        this.moveSliderTo(this.valueNow);

        event.preventDefault();
        event.stopPropagation();

    };
    */

}
/*
  // Create Slider that contains value, valuemin, valuemax, and valuenow
  var Slider = function (domNode)  {

    this.domNode = domNode;
    this.railDomNode = domNode.parentNode;

    this.valueDomNode = false;

    this.valueMin = 0;
    this.valueMax = 100;
    this.valueNow = 50;

    this.railWidth = 0;

    this.thumbWidth  = 8;
    this.thumbHeight = 28;

    this.keyCode = Object.freeze({
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
      'pageUp': 33,
      'pageDown': 34,
      'end': 35,
      'home': 36
    });
  };

  // Initialize slider
  Slider.prototype.init = function () {

    if (this.domNode.getAttribute('aria-valuemin')) {
      this.valueMin = parseInt((this.domNode.getAttribute('aria-valuemin')));
    }
    if (this.domNode.getAttribute('aria-valuemax')) {
      this.valueMax = parseInt((this.domNode.getAttribute('aria-valuemax')));
    }
    if (this.domNode.getAttribute('aria-valuenow')) {
      this.valueNow = parseInt((this.domNode.getAttribute('aria-valuenow')));
    }

    this.railWidth = parseInt(this.railDomNode.style.width.slice(0, -2));

    this.valueDomNode = this.railDomNode.nextElementSibling;

    if (this.valueDomNode) {

      this.valueDomNode.innerHTML = '0';
      this.valueDomNode.style.left = (this.railDomNode.offsetLeft + this.railWidth + 10) + 'px';
      this.valueDomNode.style.top = (this.railDomNode.offsetTop - 8) + 'px';
    }

    if (this.domNode.tabIndex != 0) {
      this.domNode.tabIndex = 0;
    }

    this.domNode.style.width = this.thumbWidth + 'px';
    this.domNode.style.height = this.thumbHeight + 'px';
    this.domNode.style.top = (this.thumbHeight / -2) + 'px';

    this.domNode.addEventListener('keydown',    this.handleKeyDown.bind(this));
    // add onmousedown, move, and onmouseup
    this.domNode.addEventListener('mousedown', this.handleMouseDown.bind(this));

    this.domNode.addEventListener('focus',      this.handleFocus.bind(this));
    this.domNode.addEventListener('blur',       this.handleBlur.bind(this));

    this.railDomNode.addEventListener('click', this.handleClick.bind(this));

    this.moveSliderTo(this.valueNow);

  };

  Slider.prototype.moveSliderTo = function (value) {

    if (value > this.valueMax) {
      value = this.valueMax;
    }

    if (value < this.valueMin) {
      value = this.valueMin;
    }

    this.valueNow = value;

    this.domNode.setAttribute('aria-valuenow', this.valueNow);

    var pos = Math.round(
      (this.valueNow * this.railWidth) / (this.valueMax - this.valueMin)
    ) - (this.thumbWidth / 2);

    this.domNode.style.left = pos + 'px';

    if (this.valueDomNode) {
      this.valueDomNode.innerHTML = this.valueNow.toString();
    }

    updateColorBox();

  };

  Slider.prototype.handleKeyDown = function (event) {

    var flag = false;

    switch (event.keyCode) {
      case this.keyCode.left:
      case this.keyCode.down:
        this.moveSliderTo(this.valueNow - 1);
        flag = true;
        break;

      case this.keyCode.right:
      case this.keyCode.up:
        this.moveSliderTo(this.valueNow + 1);
        flag = true;
        break;

      case this.keyCode.pageDown:
        this.moveSliderTo(this.valueNow - 10);
        flag = true;
        break;

      case this.keyCode.pageUp:
        this.moveSliderTo(this.valueNow + 10);
        flag = true;
        break;

      case this.keyCode.home:
        this.moveSliderTo(this.valueMin);
        flag = true;
        break;

      case this.keyCode.end:
        this.moveSliderTo(this.valueMax);
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

  Slider.prototype.handleFocus = function (event) {
    this.domNode.classList.add('focus');
    this.railDomNode.classList.add('focus');
  };

  Slider.prototype.handleBlur = function (event) {
    this.domNode.classList.remove('focus');
    this.railDomNode.classList.remove('focus');
  };

  // Initialise Sliders on the page
  window.addEventListener('load', function () {

    var sliders = document.querySelectorAll('[role=slider]');;

    for (var i = 0; i < sliders.length; i++) {
      var s = new Slider(sliders[i]);
      s.init();
    }

  });

  Slider.prototype.handleMouseDown = function (event) {

    var self = this;

    var handleMouseMove = function (event) {

      var diffX = event.pageX - self.railDomNode.offsetLeft;
      self.valueNow = parseInt(((self.valueMax - self.valueMin) * diffX) / self.railWidth);
      self.moveSliderTo(self.valueNow);

      event.preventDefault();
      event.stopPropagation();
    };

    var handleMouseUp = function (event) {

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

    };

      // bind a mousemove event handler to move pointer
    document.addEventListener('mousemove', handleMouseMove);

    // bind a mouseup event handler to stop tracking mouse movements
    document.addEventListener('mouseup', handleMouseUp);

    event.preventDefault();
    event.stopPropagation();

    // Set focus to the clicked handle
    this.domNode.focus();

  };

  // handleMouseMove has the same functionality as we need for handleMouseClick on the rail
  Slider.prototype.handleClick = function (event) {

    var diffX = event.pageX - this.railDomNode.offsetLeft;
    this.valueNow = parseInt(((this.valueMax - this.valueMin) * diffX) / this.railWidth);
    this.moveSliderTo(this.valueNow);

    event.preventDefault();
    event.stopPropagation();

  };
 */
