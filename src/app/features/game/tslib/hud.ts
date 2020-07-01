export class InventoryItem {
	amount: number;
	max: number;

	constructor(n: number = 1) {
		this.amount = 0;
		this.max = n;
	}
	setMax = function( x ) {
		this.max = x;
	};
	setAmount = function( x ) {
		if ( x > this.amount) {
			if ( x > this.max ) {
				x = this.max;
			}
			this.amount = x;
		}
	};
	getAmount = function() {
		return this.amount;
	};
}

export class PerishableItem extends InventoryItem {

	constructor(n?: number) { super(n); }


	setAmount = function( x: number ) {
		if ( x > this.max ) {
			x = this.max;
		}
		this.amount = x;
	};
	requestAmount = function( x: number ) {
		let requestMessage = {};
		if ( x < 0) {
			if ( (x + this.amount) < 0 ) {
				requestMessage = { error: "Not enough available." };
			} else {
				this.setAmount( x + this.amount );
				requestMessage = { success: "request being made." };
			}
		}
		if ( x > 0) {
			this.setAmount( x + this.amount );
			requestMessage = { success: "request being made." };
		}
		return requestMessage;
	};
}

export class Dungeon {
	compass: number;
	map: number;
	explored: number[][];

	constructor() {
		this.compass = 0/*0 to 1*/;
		this.map = 0/*0 to 1*/;
		this.explored = new Array(8);
		for ( let i = 0; i < this.explored.length; i++ ) {
			this.explored[i] = new Array(8);
			for ( let j = 0; j < this.explored[i].length; j++ ) {
				this.explored[i][j] = 0;
			}
		}
	}

}

export class Hud {

	itemA;
	itemB;
	inventory;
	achivements;

	constructor() {
		this.inventory = {
			boomerang: new InventoryItem(2)/*0 to 2*/,
			arrow: new InventoryItem(2)/*0 to 2*/,
			candle: new InventoryItem(2)/*0 to 2*/,
			flute: new InventoryItem()/*0 to 1*/,
			magicWand: new InventoryItem()/*0 to 1*/,
			raft: new InventoryItem()/*0 to 1*/,
			book: new InventoryItem()/*0 to 1*/,
			ring: new InventoryItem(2)/*0 to 2*/,
			ladder: new InventoryItem()/*0 to 1*/,
			lionKey: new InventoryItem()/*0 to 1*/,
			bracelet: new InventoryItem()/*0 to 1*/,
			sword: new InventoryItem(3)/*0 to 3*/,
			bombUpgrade1: new InventoryItem(),
			bombUpgrade2: new InventoryItem(),
			bomb: new PerishableItem(8)/*0 to 8*/,
			ruppees: new PerishableItem(255)/*0 to 255*/,
			keys: new PerishableItem(255)/*0 to 255*/,
			meat: new PerishableItem()/*0 to 1*/,
			potion: new PerishableItem(3)/*0 to 3 with 0 as off, 1 as letter, */,
			shield: new PerishableItem(2)/*0 to 2*/
		};

		this.achivements = {
			dungeons: new Array(9),
			trifource: [0, 0, 0, 0, 0, 0, 0, 0]
		};

		for ( let i = 0; i < this.achivements.dungeons.length; i++ ) {
			this.achivements.dungeons[i] = new Dungeon();
		}
	}

	setInventory = function( key, value ) {
		if ( key in this.inventory) {
			this.inventory[key].setAmount(value);
		}
	};

	getInventory = function( ) {
		return this.inventory;
	};

	setItemA = function( key ) {
		let requestMessage = {};
		if ( this.inventory[key].getAmount() > 0 ) {
			this.itemA = key;
			requestMessage = { success: ("" + key + " was assigned to slot A.") };
		} else {
			requestMessage = { error: ("" + key + " is not available.") };
		}
		return requestMessage;
	};

	setItemB = function( key ) {
		let requestMessage = {};
		if ( this.inventory[key].getAmount() > 0 ) {
			this.itemB = key;
			requestMessage = { success: ("" + key + " was assigned to slot B.") };
		} else {
			requestMessage = { error: ("" + key + " is not available.") };
		}
		return requestMessage;
	};

	/*USE A AND B also flesh out bombupgrades and keys*/

}

const linkHud = new Hud();

/*for testing*/
linkHud.getInventory().sword.setAmount(1);
linkHud.setItemA("sword");

linkHud.getInventory().bomb.setAmount(5);
linkHud.setItemB("bomb");
