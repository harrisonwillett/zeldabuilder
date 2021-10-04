import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[appGameController]'
})
export class GameControllerDirective {

  activeKeys: string[] = [];
	mapSet: Array<[string, string]> = [];
  @Output()
	activeMap = new EventEmitter<string[]>();
  @Output()
  resizeEvent = new EventEmitter<Event>();
  @Output()
  scrollEvent = new EventEmitter<Event>();

	constructor() {
		this.mapSet.push(
			["ArrowLeft", "left"],
			["ArrowUp", "up"],
			["ArrowRight", "right"],
			["ArrowDown", "down"],
			["z", "dot"],
			["x", "dash"]
		);
	}
	
  @HostListener('keydown', ['$event'])
	onKeyDown(e: KeyboardEvent) {
		let isKeyInArray = false;
		for (const activeKey of this.activeKeys) {
			if ( activeKey === e.key ) {
				isKeyInArray = true;
			}
		}
		if ( isKeyInArray ) {
		} else {
			this.activeKeys.push(e.key);
		}
		this.setControllerByKeyboard();
	}

  @HostListener('keyup', ['$event'])
	onKeyUp(e: KeyboardEvent) {
		for ( let i = 0; i < this.activeKeys.length; i++ ) {
			if ( this.activeKeys[i] === e.key ) {
				this.activeKeys.splice(i, 1);
			}
		}
		this.setControllerByKeyboard();
	}

	setControllerByKeyboard() {
		let activeMap: string[] = [];
		for (const activeKey of this.activeKeys) {
			for ( const mapSubSet of this.mapSet) {
				if ( activeKey === mapSubSet[0] ) {
					activeMap.push( mapSubSet[1] );
				}
			}
		}
    this.activeMap.emit(activeMap);
	}

  @HostListener('window:resize', ['$event'])
  requestResizeCanvas(e: Event) {
    this.resizeEvent.emit(e);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e: Event) {
    this.scrollEvent.emit(e);
  }

}
