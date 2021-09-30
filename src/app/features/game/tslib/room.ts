import { Wall, Door, Player, Decoration, AI, Item, spriteConfig } from "./actors";
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
                    this.roomItems.setDecoration(tempfloor);
                }

            }
            
            let greenRock = {
                top: new spriteConfig("0b8edc27-79d6-4f10-8272-b09f339dc20f", "a3964e80-3d72-408e-9300-5ad9300e582b", [true, true, true, true]),
                topRight: new spriteConfig("0b8edc27-79d6-4f10-8272-b09f339dc20f", "f8e2c2e2-db88-4920-8395-ca1c98509dee", [true, false, true, true]),
                topLeft: new spriteConfig("0b8edc27-79d6-4f10-8272-b09f339dc20f", "adc71ed4-d2f2-4939-9ec1-0ad5ff7191a8", [false, true, true, true]),
                bottom: new spriteConfig("0b8edc27-79d6-4f10-8272-b09f339dc20f", "cb5d0dc4-4e5c-45cc-bd5f-f7409f1365f6", [true, true, true, true]),
                bottomRight: new spriteConfig("0b8edc27-79d6-4f10-8272-b09f339dc20f", "7a0850c7-423b-443d-bfc8-e3996181d9bc", [true, true, true, false]),
                bottomLeft: new spriteConfig("0b8edc27-79d6-4f10-8272-b09f339dc20f", "5c5e217f-bc27-4017-92e0-ee94f514b464", [true, true, false, true]),
            };

            // Create the Walls
            let walls: [number, number, spriteConfig][] =  [
                [0, 0, greenRock.bottom], [1, 0, greenRock.bottom], [2, 0, greenRock.bottom], [3, 0, greenRock.bottom],
                [4, 0, greenRock.bottom], [5, 0, greenRock.bottom], [6, 0, greenRock.bottom], [9, 0, greenRock.bottom],
                [10, 0, greenRock.bottom], [11, 0, greenRock.bottom], [12, 0, greenRock.bottom], [13, 0, greenRock.bottom],
                [14, 0, greenRock.bottom], [15, 0, greenRock.bottom]
            ];
            walls = walls.concat([
                [0, 1, greenRock.bottom], [1, 1, greenRock.bottom], [2, 1, greenRock.bottom], [3, 1, greenRock.bottom],
                [5, 1, greenRock.bottom], [6, 1, greenRock.bottomRight], [9, 1, greenRock.bottom],
                [10, 1, greenRock.bottom], [11, 1, greenRock.bottom], [12, 1, greenRock.bottom], [13, 1, greenRock.bottom],
                [14, 1, greenRock.bottom], [15, 1, greenRock.bottom]
            ]);
            walls = walls.concat([
                [0, 2, greenRock.bottom], [1, 2, greenRock.bottom], [2, 2, greenRock.bottom], [3, 2, greenRock.bottomRight],
                [9, 2, greenRock.bottom], [10, 2, greenRock.bottom], [11, 2, greenRock.bottom], [12, 2, greenRock.bottom],
                [13, 2, greenRock.bottom], [14, 2, greenRock.bottom], [15, 2, greenRock.bottom]
            ]);
            walls = walls.concat([
                [0, 3, greenRock.bottom], [1, 3, greenRock.bottom], [2, 3, greenRock.bottomRight], [9, 3, greenRock.bottom],
                [10, 3, greenRock.bottom], [11, 3, greenRock.bottom], [12, 3, greenRock.bottom], [13, 3, greenRock.bottom],
                [14, 3, greenRock.bottom], [15, 3, greenRock.bottom]
            ]);
            walls = walls.concat([
                [0, 4, greenRock.bottom], [1, 4, greenRock.bottomRight], [9, 4, greenRock.bottomLeft], [10, 4, greenRock.bottom],
                [11, 4, greenRock.bottom], [12, 4, greenRock.bottom], [13, 4, greenRock.bottom], [14, 4, greenRock.bottom],
                [15, 4, greenRock.bottom]
            ]);
            walls = walls.concat([
                [0, 6, greenRock.top], [1, 6, greenRock.top], [14, 6, greenRock.top], [15, 6, greenRock.top]
            ]);
            walls = walls.concat([
                [0, 7, greenRock.bottom], [1, 7, greenRock.bottom], [14, 7, greenRock.bottom], [15, 7, greenRock.bottom]
            ]);
            walls = walls.concat([
                [0, 8, greenRock.bottom], [1, 8, greenRock.bottom], [14, 8, greenRock.bottom], [15, 8, greenRock.bottom]
            ]);
            walls = walls.concat([
                [0, 9, greenRock.bottom], [1, 9, greenRock.bottom], [2, 9, greenRock.top], [3, 9, greenRock.top],
                [4, 9, greenRock.top], [5, 9, greenRock.top], [6, 9, greenRock.top], [7, 9, greenRock.top],
                [8, 9, greenRock.top], [9, 9, greenRock.top], [10, 9, greenRock.top], [11, 9, greenRock.top],
                [12, 9, greenRock.top], [13, 9, greenRock.top], [14, 9, greenRock.bottom], [15, 9, greenRock.bottom]
            ]);
            walls = walls.concat([
                [0, 10, greenRock.bottom], [1, 10, greenRock.bottom], [2, 10, greenRock.bottom], [3, 10, greenRock.bottom],
                [4, 10, greenRock.bottom], [5, 10, greenRock.bottom], [6, 10, greenRock.bottom], [7, 10, greenRock.bottom],
                [8, 10, greenRock.bottom], [9, 10, greenRock.bottom], [10, 10, greenRock.bottom], [11, 10, greenRock.bottom],
                [12, 10, greenRock.bottom], [13, 10, greenRock.bottom], [14, 10, greenRock.bottom], [15, 10, greenRock.bottom]
            ]);
            if (walls.length > 0) {
                for (const wall of walls) {
                    const tempwall = new Wall();

                    tempwall.setPossition(wall[0] * 2, wall[1] * 2);
                    tempwall.spriteSheetId = wall[2].spriteSheetId;
                    tempwall.setSpriteNumber(wall[2].spriteNumber);
                    if ( wall[2].collitionMap !== undefined ) {
                        tempwall.setCollitionMap( wall[2].collitionMap );
                    }
                    this.roomItems.setDecoration(tempwall);
                }
            }

            const doors: Array<[number, number, string, string?, boolean?]> = [
                [7, 0, "3f5aa626-0b6b-49a3-b492-52a0b0bdbde0", "top", true], [8, 0, "3f5aa626-0b6b-49a3-b492-52a0b0bdbde0", "top"], [4, 1, "c9245ced-6e62-4f6e-a158-12822d47b99e", "to old man"], [0, 5, "3f5aa626-0b6b-49a3-b492-52a0b0bdbde0", "left"], [15, 5, "3f5aa626-0b6b-49a3-b492-52a0b0bdbde0", "right"]
            ];
            if (doors.length > 0) {
                for (const door of doors) {
                    const tempdoors = new Door();
                    tempdoors.setPossition((door[0] * 2), (door[1] * 2));
                    tempdoors.setSpriteNumber(door[2]);
                    if ( door[3] !== undefined ) {
                        tempdoors.setRoomRequest( door[3] );
                    }
                    if ( door[4] !== undefined ) {
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
                    tempAi.spriteSheetId = "0b8edc27-79d6-4f10-8272-b09f339dc20f";
                    tempAi.spriteNumber = "d4da32ea-10f2-460c-8723-45cfdace9e73";
                    this.roomItems.setItems(tempAi);
                }
            }

            // Create the AI on the page
            const aiArray2 = [[5, 5], [10, 8]];
            if (aiArray2.length > 0) {
                for (const aiData of aiArray2) {
                    const tempAi = new AI("Monster Type 2", (aiData[0] * 2), (aiData[1] * 2));
                    tempAi.spriteSheetId = "5e24b4c7-eb38-4bb0-8fe4-3ae79cf91005";
                    tempAi.spriteNumber = "2c05ef1d-cb9b-47e0-a170-96e86cb6bcab";
                    tempAi.passable = false;
                    this.roomItems.setItems(tempAi);
                }
            }

        }

    }
}
