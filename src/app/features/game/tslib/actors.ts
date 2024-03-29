export enum DIRECTION {
	TOP = "top",
	BOTTOM ="bottom",
	LEFT = "left",
	RIGHT ="right"
}

export enum OWNER {
	AI = "ai",
	CONTROLLER = "controller"
}

export class spriteConfig {
	constructor(public spriteSheetId: string, public spriteNumber: string, public collitionMap: null | [boolean, boolean, boolean, boolean]) {}
}

/*sets the location of an object in space*/
export class Item {
	private name: string;
	private positionX: number;
	private positionY: number;
	private height: number;
	private width: number;
	private passable: boolean;
	private collitionMap: null | [boolean, boolean, boolean, boolean];
	private owner: OWNER | Item | null;
	spriteSheetId: string;
	spriteNumber: string;
	facing: number;
	state: string;

	constructor(name = "item", positionX = 0, positionY = 0) {
		this.height = 2;
		this.width = 2;
		this.passable = true;
		this.collitionMap = null;
		this.owner = null;
		this.spriteSheetId = "0b9bcda2-c278-4539-83d0-7b92a413847d";
		this.spriteNumber = "2";
		this.facing = 1;
		this.state = "active";
		this.name = name;
		this.positionX = positionX;
		this.positionY = positionY;
	}


	setName = (name: string) => {
		this.name = name;
	}

	getName = () => {
		return this.name;
	}

	setPosition = (x, y) => {
		this.positionX = x;
		this.positionY = y;
	}

	getPosition = () => {
		return [this.positionX, this.positionY];
	}

	getCollitionMap = () => {
		return this.collitionMap;
	}

	setCollitionMap = (x: [boolean, boolean, boolean, boolean]) => {
		if (x.length === 4) {
			this.collitionMap = x;
		}
	}

	setOwner = (owner: OWNER | Item) => {
		this.owner = owner;
	}

	getOwner = () => {
		return this.owner;
	}

	getHeight = () => {
		return this.height;
	}

	setHeight = (height: number) => {
		this.height = height;
	}

	getWidth = () => {
		return this.width;
	}

	setWidth = (width: number) => {
		this.width = width;
	}

	getPassable = () => {
		return this.passable;
	};

	setPassable = (passable: boolean) => {
		this.passable = passable;
	};

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

	setSpriteNumber =  (x: string) => {
		this.spriteNumber = x;
	}

}

// FLOORING ETC
export class Decoration extends Item {
	constructor(name = "decoration", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.spriteSheetId = "0b9bcda2-c278-4539-83d0-7b92a413847d";
		this.spriteNumber = "3f5aa626-0b6b-49a3-b492-52a0b0bdbde0";
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
		this.setPassable(false);
		this.spriteSheetId = "0b9bcda2-c278-4539-83d0-7b92a413847d";
		this.spriteNumber = "9db8c14b-fa65-4717-b50a-f002bf954fe9";
	}

}

// DOOR ETC
export class Door extends Actor {
	lockedspriteNumber: string;
	unlockedspriteNumber: string;
	roomRequest;
	isLocked: boolean;

	constructor(name = "door", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.spriteSheetId = "0b9bcda2-c278-4539-83d0-7b92a413847d";
		this.spriteNumber = "c9245ced-6e62-4f6e-a158-12822d47b99e";
		this.lockedspriteNumber = "21e8dbc6-9c11-4817-b4f6-5f9fa667e9fc5";
		this.unlockedspriteNumber = "c9245ced-6e62-4f6e-a158-12822d47b99e";
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
	team: string | undefined;
	requestedPositionX: number;
	requestedPositionY: number;
	direction: DIRECTION;
	canMove: boolean;
	canLeave: boolean;

	constructor(name = "bot", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.team = undefined;
		this.spriteSheetId = "0c595db0-e6ab-4999-a3f3-a1a60b8cede5";
		[this.requestedPositionX, this.requestedPositionY] = this.getPosition();
		this.direction = DIRECTION.BOTTOM;
		this.canMove = true;
		this.canLeave = false;
	}

	updateSpriteNumber = () => {

	}

	tick = () => {

	}

	moveRequest = (dirct, speed) => {
		const [x, y] = this.getPosition();
		if (dirct === "x") {
			if ( !isNaN(x + speed)) {
				this.requestedPositionX = x + speed;
			}
			if ( !isNaN(y)) {
				this.requestedPositionY = y;
			}
			if ( speed > 0 ) {
				this.direction = DIRECTION.RIGHT;
			}
			if ( speed < 0 ) {
				this.direction = DIRECTION.LEFT;
			}
		}

		if (dirct === "y") {
			if ( !isNaN(x)) {
				this.requestedPositionX = x;
			}
			if ( !isNaN(y + speed)) {
				this.requestedPositionY = y + speed;
			}
			if ( speed > 0 ) {
				this.direction = DIRECTION.BOTTOM;
			}
			if ( speed < 0 ) {
				this.direction = DIRECTION.TOP;
			}
		}

		this.updateSpriteNumber();

		return this;

	}

	getRequestedHitbox =  () => {
		const x1 = this.requestedPositionX;
		const y1 = this.requestedPositionY;
		const x2 = this.getHeight() + x1;
		const y2 = this.getWidth() + y1;

		return [x1, x2, y1, y2];

	}

	moveApprove = () => {
		this.setPosition(
			this.requestedPositionX,
			this.requestedPositionY
		);
	}

	projectileRequest = ( val: string, parent:Bot ) => {
		return (new Projectile(val, parent));
	}

}

// MOVABLE ACTORS HANDLED BY AI
export class AI extends Bot {
	constructor(name = "Monster", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.team = "red";
		this.setOwner(OWNER.AI);
	}
}

// OCTOROK
export class Octorok extends Bot {
	constructor(name = "Octorak", positionX = 0, positionY = 0) {
		super(name, positionX, positionY);
		this.spriteSheetId = "917319e7-9381-4830-89e5-c84d42c8eecd";
		this.spriteNumber = "77caa5ef-8162-4d20-9f6c-53283c64cd84";
		this.team = "red";
		this.setOwner(OWNER.AI);
	}

	updateSpriteNumber = () => {
		if ( this.spriteNumber === "f38bcbd6-f01b-4ad8-8d03-9b399cf5dbef" ) {
			this.spriteNumber = "77caa5ef-8162-4d20-9f6c-53283c64cd84";
		} else {
			this.spriteNumber = "f38bcbd6-f01b-4ad8-8d03-9b399cf5dbef";
		}
	}

	tick = () => {
		this.updateSpriteNumber();
	}
}

// MOVABLE ACTORS HANDLED BY CONTROLLER
export class Player extends Bot {

	constructor( name: string = "Link", positionX: number = 0, positionY: number = 0 ) {
		super(name, positionX, positionY);
		this.spriteSheetId = "5e24b4c7-eb38-4bb0-8fe4-3ae79cf91005";
		this.spriteNumber = "c9781df1-56f7-476e-a17e-911862a1df90";
		this.team = "green";
		this.setOwner(OWNER.CONTROLLER);
		this.canLeave = true;
	}

	updateSpriteNumber = function() {
		if ( this.direction === "bottom" ) {
			if ( this.spriteNumber === "f0e03da5-f4cf-4ffe-9662-3c0e989686d3" ) {
				this.spriteNumber = "c9781df1-56f7-476e-a17e-911862a1df90";
			} else {
				this.spriteNumber = "f0e03da5-f4cf-4ffe-9662-3c0e989686d3";
			}
		}
		if ( this.direction === "top" ) {
			if ( this.spriteNumber === "c13fa6a5-6894-42d6-ae52-46ca62c8ff4f" ) {
				this.spriteNumber = "69b48164-00c4-4f95-b1fe-b1d3758927fb";
			} else {
				this.spriteNumber = "c13fa6a5-6894-42d6-ae52-46ca62c8ff4f";
			}
		}
		if ( this.direction === "left" ) {
			if ( this.spriteNumber === "fc85babb-3665-4760-abca-53497c96a42d" ) {
				this.spriteNumber = "24dc4df7-60bd-47ab-8627-1adc2df55535";
			} else {
				this.spriteNumber = "fc85babb-3665-4760-abca-53497c96a42d";
			}
		}
		if ( this.direction === "right" ) {
			if ( this.spriteNumber === "4e76f2e8-bf00-4a64-ad2a-9a213fc0f12b" ) {
				this.spriteNumber = "3b152b28-b99f-4f0a-8608-140187f7ff77";
			} else {
				this.spriteNumber = "4e76f2e8-bf00-4a64-ad2a-9a213fc0f12b";
			}
		}

	};

}

// MOVABLE ACTORS HANDLED BY AI
export class Projectile extends Bot {
	constructor( val:string, parent:(Bot) ) {
		const [x, y] = parent.getPosition();
		super(val, x, y);
		this.team = undefined;
		this.setOwner(parent as Item);
		this.spriteSheetId = "f475af10-d131-4490-a41c-1c9cd068e3e6";
		this.spriteNumber = "7eb68029-cfc3-42c0-84e8-8bcd2801a022";
	}
}
