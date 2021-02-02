export interface ItemModel {
	name: string;
	positionX: number;
	positionY: number;
	height: number;
	width: number;
	passable: boolean;
	collitionMap: number[][] | number[] | null;
	owner: string;
	spriteSheetId: number;
	spriteNumber: number;
	facing: number;
	state: string;
}

// FLOORING ETC
export interface DecorationModel extends ItemModel {
    name: string;
    positionX: number;
    positionY: number;
    height: number;
    width: number;
    passable: boolean;
    collitionMap: number[] | number[][];
    owner: string;
    spriteSheetId: number;
    spriteNumber: number;
    facing: number;
    state: string;
}

// ACTORS ETC
// tslint:disable-next-line: no-empty-interface
export interface ActorModel extends DecorationModel {
}

// WALLS ETC
// tslint:disable-next-line: no-empty-interface
export interface WallModel extends ActorModel {
}

// DOOR ETC
export interface DoorModel extends ActorModel {
	lockedspriteNumber: number;
	unlockedspriteNumber: number;
	roomRequest: string;
	isLocked: boolean;
}

// MOVABLE ACTORS ETC
export interface BotModel extends ActorModel {
	team: string;
	requestedPositionX: number;
	requestedPositionY: number;
	direction: string;
	canMove: boolean;
	canLeave: boolean;
}

// MOVABLE ACTORS HANDLED BY AI
// tslint:disable-next-line: no-empty-interface
export interface AIModel extends BotModel {
}

// MOVABLE ACTORS HANDLED BY CONTROLLER
export interface PlayerModel extends BotModel {
	controller: any;
}

// MOVABLE ACTORS HANDLED BY AI
// tslint:disable-next-line: no-empty-interface
export interface ProjectileModel extends BotModel {
}
