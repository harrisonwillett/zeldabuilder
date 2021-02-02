// import { ControllerService } from "src/app/service/controller.service";

/*controller for binding moments to sets of actions*/
export class Controller {

	activeKeys: number[] = [];
	mapSet: Array<[number, string]> = [];
	activeMap: string[] = [];

	constructor() {
		this.mapSet.push(
			[37, "left"],
			[38, "up"],
			[39, "right"],
			[40, "down"],
			[90, "dot"],
			[88, "dash"]
		);
	}
	// keyboard events start
	onKeyDown(e) {
		let isKeyInArray = false;
		for (const activeKey of this.activeKeys) {
			if ( activeKey === e.keyCode ) {
				isKeyInArray = true;
			}
		}
		if ( isKeyInArray ) {
		} else {
			this.activeKeys.push(e.keyCode);
		}
		this.setControllerByKeyboard();
	}

	onKeyUp(e) {
		for ( let i = 0; i < this.activeKeys.length; i++ ) {
			if ( this.activeKeys[i] === e.keyCode ) {
				this.activeKeys.splice(i, 1);
			}
		}
		this.setControllerByKeyboard();
	}

	setControllerByKeyboard() {
		this.activeMap = [];
		for (const activeKey of this.activeKeys) {
			for ( const mapSubSet of this.mapSet) {
				if ( activeKey === mapSubSet[0] ) {
					this.activeMap.push( mapSubSet[1] );
				}
			}
		}
	}
	// keyboard events end
}
