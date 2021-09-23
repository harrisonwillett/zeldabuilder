import { HsvaColor } from "src/app/model/hsva-color";
import { RgbaColor } from "src/app/model/rgba-color";
import { rgbaToHsva, hsvaToRgba } from "./colorFormulas";

describe("colorFormulas", () => {
  describe("rgbaToHsva", () => {
    const red = new RgbaColor(255, 0, 0, 1);
    const green = new RgbaColor(0, 255, 0, 1);
    const blue = new RgbaColor(0, 0, 255, 1);
    const black40 = new RgbaColor(0, 0, 0, .4);
    it("translates red from rgba to hsva", () => {
      expect(rgbaToHsva(red)).toEqual(new HsvaColor(0, 1, 1, 1));
    });
    it("translates green from rgba to hsva", () => {
      expect(rgbaToHsva(green)).toEqual(new HsvaColor(1/3, 1, 1, 1));
    });
    it("translates blue from rgba to hsva", () => {
      expect(rgbaToHsva(blue)).toEqual(new HsvaColor(2/3, 1, 1, 1));
    });
    it("translates black40 from rgba to hsva", () => {
      expect(rgbaToHsva(black40)).toEqual(new HsvaColor(0, 0, 0, .4));
    });
  });
  describe("hsvaToRgba", () => {
    const red = new HsvaColor(0, 1, 1, 1);
    const green = new HsvaColor(1/3, 1, 1, 1);
    const blue = new HsvaColor(2/3, 1, 1, 1);
    const black40 = new HsvaColor(0, 0, 0, .4);
    it("translates red from rgba to hsva", () => {
      expect(hsvaToRgba(red)).toEqual(new RgbaColor(255, 0, 0, 1));
    });
    it("translates green from rgba to hsva", () => {
      expect(hsvaToRgba(green)).toEqual(new RgbaColor(0, 255, 0, 1));
    });
    it("translates blue from rgba to hsva", () => {
      expect(hsvaToRgba(blue)).toEqual(new RgbaColor(0, 0, 255, 1));
    });
    it("translates black40 from rgba to hsva", () => {
      expect(hsvaToRgba(black40)).toEqual(new RgbaColor(0, 0, 0, .4));
    });
  });
});

