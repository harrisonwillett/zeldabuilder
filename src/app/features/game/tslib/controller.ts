/*controller for binding moments to sets of actions*/
export class Controller {

	activeKeys = [];
	mapSet = [];
	activeMap = [];

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


	setActiveMap = function() {
		this.activeMap = [];
		for (const activeKey of this.activeKeys) {
			for ( const mapSubSet of this.mapSet) {
				if ( activeKey === mapSubSet[0] ) {
					this.activeMap.push( mapSubSet[1] );
				}
			}
		}

	};

	press = function( button ) {
		let isKeyInArray = false;
		for (const activeKey of this.activeKeys) {
			if ( activeKey === button ) {
				isKeyInArray = true;
			}
		}
		if ( isKeyInArray ) {
		} else {
			this.activeKeys.push(button);
		}
		this.setActiveMap();
		// console.log( this.activeMap );

	};

	release = function( button ) {
		for ( let i = 0; i < this.activeKeys.length; i++ ) {
			if ( this.activeKeys[i] === button ) {
				this.activeKeys.splice(i, 1);
			}
		}
		this.setActiveMap();
		// console.log( this.activeMap );

	};



}
