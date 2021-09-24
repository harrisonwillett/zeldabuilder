import { HsvaColor } from "src/app/model/hsva-color";
import { RgbaColor } from "src/app/model/rgba-color";

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and assumes a is contained in the set [0, 1]
 * returns h, s, v and a in the set [0, 1].
 *
 * @ param   Number  r       The red color value
 * @ param   Number  g       The green color value
 * @ param   Number  b       The blue color value
 * @ return  Array           The HSV representation
 */
export function rgbaToHsva(rgba: RgbaColor): HsvaColor {
    const r = rgba.red / 255;
    const g = rgba.green / 255;
    const b = rgba.blue / 255;
    const a = rgba.alpha;


    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const v = max;
    const d = max - min;
    if (max === 0) {
        s = 0;
    } else {
        s = d / max;
    }

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return new HsvaColor(h, s, v, a);
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @ param   Number  h       The hue
 * @ param   Number  s       The saturation
 * @ param   Number  v       The value
 * @ return  Array           The RGB representation
 */
export function hsvaToRgba(hsva: HsvaColor): RgbaColor {
    let r: number;
    let g: number;
    let b: number;

    const i = Math.floor(hsva.hue * 6);
    const f = hsva.hue * 6 - i;
    const p = hsva.value * (1 - hsva.saturation);
    const q = hsva.value * (1 - f * hsva.saturation);
    const t = hsva.value * (1 - (1 - f) * hsva.saturation);

    switch (i % 6) {
        case 0: r = hsva.value, g = t, b = p; break;
        case 1: r = q, g = hsva.value, b = p; break;
        case 2: r = p, g = hsva.value, b = t; break;
        case 3: r = p, g = q, b = hsva.value; break;
        case 4: r = t, g = p, b = hsva.value; break;
        case 5: r = hsva.value, g = p, b = q; break;
    }

    return new RgbaColor( r * 255, g * 255, b * 255, hsva.alpha );
}
