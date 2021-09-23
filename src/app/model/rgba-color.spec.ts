import { RgbaColor } from './rgba-color';

describe('RgbaColor', () => {
  const red: RgbaColor = new RgbaColor(
    255,
    0,
    0,
    1
  );
  const green: RgbaColor = new RgbaColor(
    0,
    255,
    0,
    1
  );
  const blue: RgbaColor = new RgbaColor(
    0,
    0,
    255
  );
  const gray40: RgbaColor = new RgbaColor(
    128,
    128,
    128,
    0.4
  );
  describe('Red', () => {
    it('is a value of 255 out of 255 from Red', () => {
      expect(red.red).toEqual(255);
    });
    it('is a value of 0 out of 255 from Green', () => {
      expect(green.red).toEqual(0);
    });
    it('is a value of 0 out of 255 from Blue', () => {
      expect(blue.red).toEqual(0);
    });
  });
  describe('Green', () => {
    it('is a value of 0 out of 255 from Red', () => {
      expect(red.green).toEqual(0);
    });
    it('is a value of 255 out of 255 from Green', () => {
      expect(green.green).toEqual(255);
    });
    it('is a value of 0 out of 255 from Blue', () => {
      expect(blue.green).toEqual(0);
    });
  });
  describe('Blue', () => {
    it('is a value of 0 out of 255 from Red', () => {
      expect(red.blue).toEqual(0);
    });
    it('is a value of 0 out of 255 from Green', () => {
      expect(green.blue).toEqual(0);
    });
    it('is a value of 255 out of 255 from Blue', () => {
      expect(blue.blue).toEqual(255);
    });
  });
  describe('Alpha', () => {
    it('is a value of 1 out of 1 from Red', () => {
      expect(red.alpha).toEqual(1);
    });
    it('is a value of 1 out of 1 from Blue', () => {
      expect(blue.alpha).toEqual(1);
    });
    it('is a value of .4 out of 1 from Gray 40%', () => {
      expect(gray40.alpha).toEqual(.4);
    });
  });
});
