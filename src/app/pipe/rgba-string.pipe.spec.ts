import { RgbaStringPipe } from "./rgba-string.pipe";
import { RgbaColor } from "../model/rgba-color";

describe("RgbaStringPipe", () => {
  let pipe;
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

  beforeEach(() => {
    pipe = new RgbaStringPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it('shoule be "red"', () => {
    expect(pipe.transform(red)).toEqual("rgba(255, 0, 0, 1)");
  });

  it('shoule be "green"', () => {
    expect(pipe.transform(green)).toEqual("rgba(0, 255, 0, 1)");
  });

  it('shoule be "blue"', () => {
    expect(pipe.transform(blue)).toEqual("rgba(0, 0, 255, 1)");
  });

  it('shoule be "gray and 40% opacity"', () => {
    expect(pipe.transform(gray40)).toEqual("rgba(128, 128, 128, 0.4)");
  });
});
