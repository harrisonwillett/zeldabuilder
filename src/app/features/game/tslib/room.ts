import { Wall, Door, Player, Decoration, AI, Item } from "./actors";
import { Items } from "./items";

export class Room {

    roomItems: Items;

    constructor(roomNumber: number) {
        this.roomItems = new Items();
        this.getRoom(roomNumber);
    }
    /*Request Room*/
    getRoom = (roomNumber: number) => {

        if (roomNumber === 1) {
            // Draw Floor

            for (let i = 0; i < (22); i = i + 2) {
                for (let j = 0; j < (32); j = j + 2) {
                    const tempfloor = new Decoration();
                    tempfloor.setPossition(j, i);
                    // console.log({i, j});
                    this.roomItems.setDecoration(tempfloor);
                }

            }

            // Create the Walls
            let walls: [number, number, number, [number, number, number, number]?][] =  [
                [0, 0, 11], [1, 0, 11], [2, 0, 11], [3, 0, 11],
                [4, 0, 11], [5, 0, 11], [6, 0, 11], [9, 0, 11],
                [10, 0, 11], [11, 0, 11], [12, 0, 11], [13, 0, 11],
                [14, 0, 11], [15, 0, 11]
            ];
            walls = walls.concat([
                [0, 1, 11], [1, 1, 11], [2, 1, 11], [3, 1, 11],
                [5, 1, 11], [6, 1, 12, [1, 1, 1, 0]], [9, 1, 11],
                [10, 1, 11], [11, 1, 11], [12, 1, 11], [13, 1, 11],
                [14, 1, 11], [15, 1, 11]
            ]);
            walls = walls.concat([
                [0, 2, 11], [1, 2, 11], [2, 2, 11], [3, 2, 12, [1, 1, 1, 0]],
                [9, 2, 11], [10, 2, 11], [11, 2, 11], [12, 2, 11],
                [13, 2, 11], [14, 2, 11], [15, 2, 11]
            ]);
            walls = walls.concat([
                [0, 3, 11], [1, 3, 11], [2, 3, 12, [1, 1, 1, 0]], [9, 3, 11],
                [10, 3, 11], [11, 3, 11], [12, 3, 11], [13, 3, 11],
                [14, 3, 11], [15, 3, 11]
            ]);
            walls = walls.concat([
                [0, 4, 11], [1, 4, 12, [1, 1, 1, 0]], [9, 4, 10, [1, 1, 0, 1]], [10, 4, 11],
                [11, 4, 11], [12, 4, 11], [13, 4, 11], [14, 4, 11],
                [15, 4, 11]
            ]);
            walls = walls.concat([
                [0, 6, 8], [1, 6, 8], [14, 6, 8], [15, 6, 8]
            ]);
            walls = walls.concat([
                [0, 7, 11], [1, 7, 11], [14, 7, 11], [15, 7, 11]
            ]);
            walls = walls.concat([
                [0, 8, 11], [1, 8, 11], [14, 8, 11], [15, 8, 11]
            ]);
            walls = walls.concat([
                [0, 9, 11], [1, 9, 11], [2, 9, 8], [3, 9, 8],
                [4, 9, 8], [5, 9, 8], [6, 9, 8], [7, 9, 8],
                [8, 9, 8], [9, 9, 8], [10, 9, 8], [11, 9, 8],
                [12, 9, 8], [13, 9, 8], [14, 9, 11], [15, 9, 11]
            ]);
            walls = walls.concat([
                [0, 10, 11], [1, 10, 11], [2, 10, 11], [3, 10, 11],
                [4, 10, 11], [5, 10, 11], [6, 10, 11], [7, 10, 11],
                [8, 10, 11], [9, 10, 11], [10, 10, 11], [11, 10, 11],
                [12, 10, 11], [13, 10, 11], [14, 10, 11], [15, 10, 11]
            ]);
            if (walls.length > 0) {
                for (const wall of walls) {
                    const tempwall = new Wall();

                    tempwall.setPossition(wall[0] * 2, wall[1] * 2);
                    tempwall.spriteSheetId = 2;
                    tempwall.setSpriteNumber(wall[2]);
                    if ( wall[3] !== undefined ) {
                        tempwall.setCollitionMap( wall[3] );
                    }
                    this.roomItems.setDecoration(tempwall);


                }
            }

            const doors: Array<[number, number, number, string?, boolean?]> = [
                [7, 0, 3, "top", true], [8, 0, 3, "top"], [4, 1, 17, "to old man"], [0, 5, 3, "left"], [15, 5, 3, "right"]
            ];
            if (doors.length > 0) {
                for (const door of doors) {
                    const tempdoors = new Door();
                    tempdoors.setPossition((door[0] * 2), (door[1] * 2));
                    tempdoors.setSpriteNumber(door[2]);
                    if ( door[3] !== undefined ) {
                        // console.log("door[" + i + "] was set to go to " + doors[i][3]);
                        tempdoors.setRoomRequest( door[3] );
                    }
                    if ( door[4] !== undefined ) {
                        // console.log("door[" + i + "] was locked? " + doors[i][4]);
                        tempdoors.setLock( door[4] );
                    }
                    this.roomItems.setDecoration(tempdoors);
                }
            }


            // // Create Player
            const tempPlayer = new Player("Link", (7.5 * 2), (5 * 2));
            this.roomItems.setItems(tempPlayer);

            // Create the AI on the page
            const aiArray = [[3, 5], [10, 5], [8, 3]];
            if (aiArray.length > 0) {
                for (const aiData of aiArray) {
                    const tempAi = new AI("Monster Type 1", (aiData[0] * 2), (aiData[1] * 2));
                    tempAi.spriteSheetId = 2;
                    tempAi.spriteNumber = 6;
                    this.roomItems.setItems(tempAi);
                }
            }

            // Create the AI on the page
            const aiArray2 = [[5, 5], [10, 8]];
            if (aiArray2.length > 0) {
                for (const aiData of aiArray2) {
                    const tempAi = new AI("Monster Type 2", (aiData[0] * 2), (aiData[1] * 2));
                    tempAi.spriteSheetId = 4;
                    tempAi.spriteNumber = 13;
                    tempAi.passable = false;
                    this.roomItems.setItems(tempAi);
                }
            }

        }

    }
}
