import Color from "color";

export const colors = {
  theme: "#94cee4",

  white: "white",
  offWhite: "rgb(240,240,240)",
  lighterGray: "rgb(226, 226, 227)",
  lightGray: "rgb(197,197,197)",
  gray: "rgb(150,150,150)",
  darkGray: "rgb(92, 92, 92)",
  black: "black",

  shadow: "rgba(0,0,0,0.35)",

  red: "rgb(255, 52, 52)",
  green: "rgb(12, 185, 0)",
  blue: "rgb(45, 164, 255)",
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
  shadowOpacity: 0.3,
  modalDelay: 400,
};

export function shadowEquivalent(backgroundColor: string): string {
  const c = Color(backgroundColor);
  return Color.rgb(
    c.red() * (1 - styleConsts.shadowOpacity),
    c.green() * (1 - styleConsts.shadowOpacity),
    c.blue() * (1 - styleConsts.shadowOpacity),
  ).string();
}
