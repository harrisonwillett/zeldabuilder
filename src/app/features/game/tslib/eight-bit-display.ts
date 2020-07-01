export interface IRectSize {
    native: DOMRect;
    natural: DOMRect;
}

export interface IBoundingRect {
    [key: string]: IRectSize;
}


export class EightBitDisplay {
    boundingRects: IBoundingRect = {};

    constructor() {
        this.boundingRects.screen = {
            native: new DOMRect(0, 0, 32, 32),
            natural: new DOMRect(0, 0, 32, 32)
        };
        this.boundingRects.sprite = {
            native: new DOMRect(0, 0, 1, 1),
            natural: new DOMRect(0, 0, 1, 1)
        };
        this.boundingRects.pixel = {
            native: new DOMRect(0, 0, .125, .125),
            natural: new DOMRect(0, 0, .125, .125)
        };
    }
    setNaturalSize = (scale: number) => {
        for (const [key, value] of Object.entries(this.boundingRects)) {
            /* console.log({
                key,
                value
            }); */
            this.boundingRects[key].natural = new DOMRect(
                (this.boundingRects[key].native.x * scale),
                (this.boundingRects[key].native.y * scale),
                (this.boundingRects[key].native.width * scale),
                (this.boundingRects[key].native.height * scale)
            );
        }
    }
}
export class TopdownEightBitDisplay extends EightBitDisplay {
    constructor() {
        super();
        this.boundingRects.hud = {
            native: new DOMRect(0, 0, 32, 10),
            natural: new DOMRect(0, 0, 32, 10)
        };
        this.boundingRects.room = {
            native: new DOMRect(0, 10, 32, 22),
            natural: new DOMRect(0, 10, 32, 22)
        };
    }
}
