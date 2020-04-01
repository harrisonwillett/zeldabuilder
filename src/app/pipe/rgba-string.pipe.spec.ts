import { RgbaStringPipe } from "./rgba-string.pipe";
import { RgbaColor } from "../model/rgba-color";

describe("RgbaStringPipe", () => {
  let pipe;
  const red: RgbaColor = {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1
  };
  const green: RgbaColor = {
    red: 0,
    green: 255,
    blue: 0,
    alpha: 1
  };
  const blue: RgbaColor = {
    red: 0,
    green: 0,
    blue: 255
  };
  const gray40: RgbaColor = {
    red: 128,
    green: 128,
    blue: 128,
    alpha: 0.4
  };

  beforeEach(() => {
    pipe = new RgbaStringPipe();
  });

  fit("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  fit('shoule be "red"', () => {
    expect(pipe.transform(red)).toEqual("rgba(255, 0, 0, 1)");
  });

  fit('shoule be "green"', () => {
    expect(pipe.transform(green)).toEqual("rgba(0, 255, 0, 1)");
  });

  fit('shoule be "blue"', () => {
    expect(pipe.transform(blue)).toEqual("rgba(0, 0, 255, 1)");
  });

  fit('shoule be "gray and 40% opacity"', () => {
    expect(pipe.transform(gray40)).toEqual("rgba(128, 128, 128, 0.4)");
  });
});
