import Color from "color";

// these need to be hex so that shadowEquivalent works
export const colors = {
  theme: "#94cee4",
  themeLight: "#ebf9ff",

  white: "#ffffff",
  offWhite: "#efefef",
  lighterGray: "#e2e2e3",
  lightGray: "#c5c5c5",
  gray: "#969696",
  darkGray: "#5c5c5c",
  black: "#000000",

  red: "#ff3434",
  green: "#0cb900",
  blue: "#2da4ff",
};

export const fontSizes = {
  text: 16,
  subText: 15,
  small: 12,
  large: 20,
  extraLarge: 30,
};

export const styleConsts = {
  pressDuration: 200,
  shadowOpacity: 0.15,
  modalDelay: 400,
  depth: 2,
  radius: 10,
  darkenFace: 0.025,
};

export function shadowEquivalent(
  backgroundColor: string,
  shadowOpacity: number = styleConsts.shadowOpacity,
): string {
  "worklet";
  // only works for hex colors like '#ffffff'
  // we cant use Color lib because this runs on OS thread
  // WARNING: always pass shadowOpacity explicitly when calling from a worklet
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const nr = Math.round(r * (1 - shadowOpacity));
  const ng = Math.round(g * (1 - shadowOpacity));
  const nb = Math.round(b * (1 - shadowOpacity));
  return `rgb(${nr}, ${ng}, ${nb})`;
}
