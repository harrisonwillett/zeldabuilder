import { HsvaColor } from './hsva-color';

describe('RgbaColor', () => {
  const color1: HsvaColor = new HsvaColor(
    1,
    0,
    .25,
    1
  );
  const color2: HsvaColor = new HsvaColor(
    .25,
    1,
    0,
    .4
  );
  const color3: HsvaColor = new HsvaColor(
    0,
    .25,
    1
  );
  describe('Hue', () => {
    it('is a value of 1 out of 1 from color1', () => {
      expect(color1.hue).toEqual(1);
    });
    it('is a value of 0 out of 1 from color2', () => {
      expect(color2.hue).toEqual(.25);
    });
    it('is a value of 0 out of 1 from color3', () => {
      expect(color3.hue).toEqual(0);
    });
  });
  describe('Saturation', () => {
    it('is a value of 1 out of 1 from color1', () => {
      expect(color1.saturation).toEqual(0);
    });
    it('is a value of 0 out of 1 from color2', () => {
      expect(color2.saturation).toEqual(1);
    });
    it('is a value of 0 out of 1 from color3', () => {
      expect(color3.saturation).toEqual(.25);
    });
  });
  describe('Value', () => {
    it('is a value of 1 out of 1 from color1', () => {
      expect(color1.value).toEqual(.25);
    });
    it('is a value of 0 out of 1 from color2', () => {
      expect(color2.value).toEqual(0);
    });
    it('is a value of 0 out of 1 from color3', () => {
      expect(color3.value).toEqual(1);
    });
  });
  describe('Alpha', () => {
    it('is a value of 1 out of 1 from color1', () => {
      expect(color1.alpha).toEqual(1);
    });
    it('is a value of 0 out of 1 from color2', () => {
      expect(color2.alpha).toEqual(.4);
    });
    it('is a value of 0 out of 1 from color3', () => {
      expect(color3.alpha).toEqual(1);
    });
  });
});
