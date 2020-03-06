import { SpriteOptions } from "../model/sprite-options";

export const EmptyOptions: SpriteOptions = {
  height: null,
  width: null,
  colorChannels: null
};

export const EightBit: SpriteOptions = {
  height: 16,
  width: 16,
  colorChannels: 4
};

export const SixteenBit: SpriteOptions = {
  height: 16,
  width: 16,
  colorChannels: 16
};

export const ThirtytwoBit: SpriteOptions = {
  height: 32,
  width: 32,
  colorChannels: 32
};

export const SixtyfourBit: SpriteOptions = {
  height: 64,
  width: 64,
  colorChannels: 64
};

export const BitPresets = [
  {
    name: "Select a Mode",
    class: EmptyOptions,
    selectEval: sheetsOptions =>
      JSON.stringify(sheetsOptions) === JSON.stringify(EmptyOptions),
    disabled: true
  },
  {
    name: "8-Bit",
    class: EightBit,
    selectEval: sheetsOptions =>
      JSON.stringify(sheetsOptions) === JSON.stringify(EightBit),
    disabled: false
  },
  {
    name: "16-Bit",
    class: SixteenBit,
    selectEval: sheetsOptions =>
      JSON.stringify(sheetsOptions) === JSON.stringify(SixteenBit),
    disabled: false
  },
  {
    name: "32-Bit",
    class: ThirtytwoBit,
    selectEval: sheetsOptions =>
      JSON.stringify(sheetsOptions) === JSON.stringify(ThirtytwoBit),
    disabled: false
  },
  {
    name: "64-Bit",
    class: SixtyfourBit,
    selectEval: sheetsOptions =>
      JSON.stringify(sheetsOptions) === JSON.stringify(SixtyfourBit),
    disabled: false
  },
  {
    name: "Custom",
    selectEval: sheetsOptions => {
      return (
        JSON.stringify(sheetsOptions) !== JSON.stringify(EmptyOptions) &&
        JSON.stringify(sheetsOptions) !== JSON.stringify(EightBit) &&
        JSON.stringify(sheetsOptions) !== JSON.stringify(SixteenBit) &&
        JSON.stringify(sheetsOptions) !== JSON.stringify(ThirtytwoBit) &&
        JSON.stringify(sheetsOptions) !== JSON.stringify(SixtyfourBit)
      );
    },
    disabled: false
  }
];
