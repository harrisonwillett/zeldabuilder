import { Controller } from "./controller";

/*sets the location of an object in space*/
export class Item {
	name;
	positionX;
	positionY;
	height;
	width;
	passable;
	collitionMap;
	owner;
	spriteSheetId: number;
	spriteNumber: number;
	facing;
	state;

	constructor(name = "item", positionX = 0, positionY = 0) {
		this.height = 2;
		this.width = 2;
		this.passable = true;
		this.collitionMap = null;
		this.owner = null;
		this.spriteSheetId = 1; // new Sprites.OverWorldSprite();
		this.spriteNumber = 2;
		// this.spirte = document.createElement("canvas");
		// this.spirteContext = null; // this.spirte.getContext("2d");
		// this.spirte.width = 16 * world.ratio;
		// this.spirte.height = 16 * world.ratio;
		this.facing = 1;
		// this.design = this.spirte;
		this.state = "active"; // active, inactive
	}


	setName = (name: string) => {
		this.name = name;
	}

	getName = (x, y) => {
		return this.name;
	}

	setPossition = (x, y) => {
		this.positionX = x;
		this.positionY = y;
	}

	getPossition = (x, y) => {

		return [x, y];

	}

	getCollitionMap = () => {
		return this.collitionMap;
	}

	setCollitionMap = (x) => {
		this.collitionMap = x;
	}

	getHitbox =  () => {
		const x1 = this.positionX;
		const y1 = this.positionY;
		const x2 = this.height + x1;
		const y2 = this.width + y1;
		if ( this.collitionMap == null ) {
			return [[x1, x2, y1, y2]];
		} else {
			const tempMap = [];
			if ( !!this.collitionMap[0] ) {
				tempMap.push([x1, (x1 + (this.height / 2)), y1, (y1 + (this.width / 2))]);
			}
			if ( !!this.collitionMap[1] ) {
				tempMap.push([x1 + (this.height / 2), (this.height + x1), y1, y1 + (this.width / 2)]);
			}
			if ( !!this.collitionMap[2] ) {
				tempMap.push([x1, (x1 + (this.height / 2)), y1 + (this.height / 2), (y1 + this.width)]);
			}
			if ( !!this.collitionMap[3] ) {
				tempMap.push([(x1 + this.height / 2), (x1 + this.height), y1, (y1 + this.width)]);
			}
			return tempMap;
		}

	}

	setSpriteNumber =  (x) => {
		this.spriteNumber = x;
	}

	/*
	getDesign =  () => {
		// this.spirte.width = Math.floor(16 * world.ratio) - 1;
		// this.spirte.height = Math.floor(16 * world.ratio) - 1;
		// this.spirteContext.clearRect(0, 0, 16 * world.ratio, 16 * world.ratio);
		// this.spirteContext.drawImage( this.spriteSheet.getSpriteImg(), Math.floor(-1 * this.spriteNumber * (16 * world.ratio)), 0 );
		this.design = this.spirte;
		return this.design;
	}
	*/


}

// FLOORING ETC
export class Decoration extends Item {
	constructor(name = "decoration", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.spriteSheetId = 1;
		this.spriteNumber = 3;
	}
}

// ACTORS ETC
export class Actor extends Decoration {
	constructor(name = "actor", positionX = 0, positionY = 0) {
		super(name, positionX, positionY); {
		}
	}
}

// WALLS ETC
export class Wall extends Actor {
	constructor(name = "wall", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.passable = false;
		this.spriteSheetId = 1;
		this.spriteNumber = 11;
	}

}

// DOOR ETC
export class Door extends Actor {
	lockedspriteNumber;
	unlockedspriteNumber;
	roomRequest;
	isLocked;

	constructor(name = "door", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.spriteSheetId = 1;
		this.spriteNumber = 17;
		this.lockedspriteNumber = 5;
		this.unlockedspriteNumber = 17;
		this.roomRequest = "http://google.com";
		this.isLocked = false;
		this.state = null;
	}

	open = () => {
		return "This is an open door";
	}

	closed = () => {
		return "This is a closed door";
	}

	leaving = () => {
		return "This door is being used to leave";
	}

	entering = () => {
		return "This door is being used to enter";
	}

	setRoomRequest = (x) => {
		this.roomRequest = x;
	}

	getRoomRequest = () => {
		return this.roomRequest;
	}

	setLock = (bool) => {
		this.isLocked = bool;
		if (bool) {
			this.spriteNumber = this.lockedspriteNumber;
		} else {
			this.spriteNumber = this.unlockedspriteNumber;
		}
	}


}

// MOVABLE ACTORS ETC
export class Bot extends Actor {
	team;
	requestedPositionX;
	requestedPositionY;
	direction;
	canMove;
	canLeave;

	constructor(name = "bot", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.team = undefined;
		this.spriteSheetId = 3;
		this.requestedPositionX = this.positionX;
		this.requestedPositionY = this.positionY;
		this.direction = "bottom";
		this.canMove = true;
		this.canLeave = false;
	}

	updateSpriteNumber = () => {

	}

	moveRequest = (dirct, speed) => {

		if (dirct === "x") {
			if ( !isNaN(this.positionX + speed)) {
				this.requestedPositionX = this.positionX + speed;
			}
			if ( !isNaN(this.positionY)) {
				this.requestedPositionY = this.positionY;
			}
			if ( speed > 0 ) {
				this.direction = "right";
			}
			if ( speed < 0 ) {
				this.direction = "left";
			}
		}

		if (dirct === "y") {
			if ( !isNaN(this.positionX)) {
				this.requestedPositionX = this.positionX;
			}
			if ( !isNaN(this.positionY + speed)) {
				this.requestedPositionY = this.positionY + speed;
			}
			if ( speed > 0 ) {
				this.direction = "bottom";
			}
			if ( speed < 0 ) {
				this.direction = "top";
			}
		}

		this.updateSpriteNumber();

		return this;

	}

	getRequestedHitbox =  () => {
		const x1 = this.requestedPositionX;
		const y1 = this.requestedPositionY;
		const x2 = this.height + x1;
		const y2 = this.width + y1;

		return [x1, x2, y1, y2];

	}

	moveApprove = () => {
		this.positionX = this.requestedPositionX;
		this.positionY = this.requestedPositionY;
	}

	projectileRequest = ( val, parent ) => {
		return (new Projectile(val, parent));
	}

}

// MOVABLE ACTORS HANDLED BY AI
export class AI extends Bot {
	constructor(name = "Monster", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.team = "red";
		this.owner = "ai";
	}

}

// MOVABLE ACTORS HANDLED BY CONTROLLER
export class Player extends Bot {

	controller: Controller;

	constructor( contollingParty: Controller, name: string = "Link", positionX: number = 0, positionY: number = 0 ) {
		super(name, positionX, positionY);
		this.spriteSheetId = 4; // new Sprites.LinkSprite();
		this.spriteNumber = 2;
		// this.design = this.spirte;

		// setDecoration
		this.team = "green";
		this.owner = "controller";
		this.canLeave = true;
		this.controller = contollingParty;
	}

	updateSpriteNumber = function() {
		if ( this.direction === "bottom" ) {
			if ( this.spriteNumber === 0 ) {
				this.spriteNumber = 1;
			} else {
				this.spriteNumber = 0;
			}
		}
		if ( this.direction === "top" ) {
			if ( this.spriteNumber === 2 ) {
				this.spriteNumber = 3;
			} else {
				this.spriteNumber = 2;
			}
		}
		if ( this.direction === "left" ) {
			if ( this.spriteNumber === 4 ) {
				this.spriteNumber = 5;
			} else {
				this.spriteNumber = 4;
			}
		}
		if ( this.direction === "right" ) {
			if ( this.spriteNumber === 6 ) {
				this.spriteNumber = 7;
			} else {
				this.spriteNumber = 6;
			}
		}

	};

}

// MOVABLE ACTORS HANDLED BY AI
export class Projectile extends Bot {
	constructor( val, parent ) {
		super(val, parent.positionX, parent.positionY);
		this.team = undefined;
		this.owner = parent;
		this.spriteSheetId = 7; // new Sprites.ItemSprite();
		this.spriteNumber = 0;
		// this.design = this.spirte;
	}
}
