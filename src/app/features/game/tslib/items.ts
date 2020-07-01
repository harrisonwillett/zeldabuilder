import { Item, Bot, Player } from "./actors";

/*Holds all items*/
export class Items {
	private itemsSet: Item[] = [];
	private newItemsSet: Item[] = [];
	private decorationSet: Item[] = [];

	/*Set All Items*/
	setItems = ( newItem: Item ) => {
		this.itemsSet.push( newItem );
	}

	/*Get All Items*/
	getItems = () => {
		return this.itemsSet;
	}

	/*Set All Decorations*/
	setDecoration = ( newDecoration: Item ) => {
		this.decorationSet.push( newDecoration );
	}

	/*Get All Decorations*/
	getDecoration = () => {
		return this.decorationSet;
	}

	getCollition = (i) => {
		if (i === undefined ) {
			i = 0;
		}
		// for item as "i"
		let hasCollided = false;
		const iHit = (this.itemsSet[i] as Bot).getRequestedHitbox();
		let jHit = [];

		if ( (this.itemsSet[i] as Bot).canMove ) {
			// if can move
			for (const decoration of this.decorationSet) {
				// If "i" wants to be where "j" is deny request
				jHit = (decoration as Bot).getHitbox();
				// ix1 and ix2
				if ( !decoration.passable || decoration.name === "door" ) {
					/* for (let k = 0; k < jHit.length; k++) {
						if ( (iHit[0] >= jHit[k][0] && iHit[0] < jHit[k][1]) || (iHit[1] > jHit[k][0] && iHit[1] <= jHit[k][1])  ) {
							// iy1 and iy2
							if ( (iHit[2] >= jHit[k][2] && iHit[2] < jHit[k][3]) || ( iHit[3] > jHit[k][2] && iHit[3] <= jHit[k][3])  ) {
								// if "i" is passable or "j" is passable
								if ( !this.decorationSet[j].passable ) {
									hasCollided = true;
								}
								if ( this.decorationSet[j].name === "door" ) {
									if ( this.itemsSet[i].canLeave &&  !this.decorationSet[j].isLocked  ) {
										this.itemsSet[i].canMove = false;
										// console.info("In door");
									} else {
										hasCollided = true;
									}

								}

							}
						}

					} */
				}
			}

			// check against each item as "j"
			for (let j = 0; j < this.itemsSet.length; j++) {
				// Stop hitting your self
				if (i !== j ) {
					jHit = this.itemsSet[j].getHitbox();
					// ix1 and ix2
					if ( !this.itemsSet[j].passable ) {
						/* for (let k = 0; k < jHit.length; k++) {
							if ( (iHit[0] >= jHit[k][0] && iHit[0] < jHit[k][1]) || (iHit[1] > jHit[k][0] && iHit[1] <= jHit[k][1])  ) {
								// iy1 and iy2
								if ( (iHit[2] >= jHit[k][2] && iHit[2] < jHit[k][3]) || ( iHit[3] > jHit[k][2] && iHit[3] <= jHit[k][3])  ) {
									// if "i" is passable or "j" is passable
									hasCollided = true;
								}
							}
						} */
					}
				}
			}

		} else {
			hasCollided = true;
		}

		return hasCollided;

	}

	/*Update Items in set*/
	updateItems = () => {

		// console.log('Items Updating');
		for (let i = 0; i < this.itemsSet.length; i++) {
			// damage
			// owner
			// movement
			if (this.itemsSet[i].owner === "ai") {
				if ( !!!Math.floor( (Math.random() * 4) )  ) {
					const direction = Math.floor( (Math.random() * 4) + 1 );
					switch (direction) {
						case 1:
							(this.itemsSet[i] as Bot).moveRequest("x", .5);
							// this.itemsSet[i].positionX += .5;
							break;
						case 2:
							(this.itemsSet[i] as Bot).moveRequest("y", .5);
							// this.itemsSet[i].positionY += .5;
							break;
						case 3:
							(this.itemsSet[i] as Bot).moveRequest("x", -.5);
							// this.itemsSet[i].positionX -= .5;
							break;
						case 4:
							(this.itemsSet[i] as Bot).moveRequest("y", -.5);
							// this.itemsSet[i].positionY -= .5;
							break;
						default: break;
					}
				}
				if ( ! this.getCollition(i) ) {
					(this.itemsSet[i] as Bot).moveApprove();
				}
			}

			if (this.itemsSet[i].owner === "controller") {
				console.log({
					controller: (this.itemsSet[i] as Player).controller
				});
				const directions = ["left", "right"]; // eval( (this.itemsSet[i] as Player).controller ).activeMap;
				if ( directions.length > 0 ) {

					// console.log(direction.length);
					for (const direction of directions) {

						if (direction === "left") {
							(this.itemsSet[i] as Player).moveRequest("x", -.5);
						}
						if (direction === "down") {
							(this.itemsSet[i] as Player).moveRequest("y", .5);
						}
						if (direction === "up") {
							(this.itemsSet[i] as Player).moveRequest("y", -.5);
						}
						if (direction === "right") {
							(this.itemsSet[i] as Player).moveRequest("x", .5);
						}
						if (direction === "dot") {
							this.newItemsSet.push( (this.itemsSet[i] as Player).projectileRequest("dot", this.itemsSet[i]) );
						}
						if (direction === "dash") {
							this.newItemsSet.push( (this.itemsSet[i] as Player).projectileRequest("dash", this.itemsSet[i]) );
						}

					}
					if ( ! this.getCollition(i) ) {
						(this.itemsSet[i] as Player).moveApprove();
					}

				}


			}

		}

		for (const newItem of this.newItemsSet) {
			this.setItems(newItem);
		}
		this.newItemsSet = [];

	}

}
