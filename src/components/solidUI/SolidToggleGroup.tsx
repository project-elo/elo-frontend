import { View, Text, StyleSheet } from "react-native";
import {
  fontSizes,
  styleConsts,
  colors,
  shadowEquivalent,
} from "@/src/utils/styles";
import SolidButton from "./SolidButton";
import { Option } from "@/src/types/componentTypes";
import SolidTile from "./Form/SolidTile";

export default function SolidToggleGroup<T extends string | number>({
  options,
  value,
  setValue,
  backgroundColor,
}: {
  options: Option<T>[];
  value: any;
  setValue: (v: T | T[]) => void;
  backgroundColor?: string;
}) {
  const isArray = Array.isArray(value);

  const gap = isArray ? 5 : 1;
  const totalWidth = 200 - gap * (options.length - 1);
  const width = totalWidth / options.length;
  const color = shadowEquivalent(colors.theme);

  return (
    <View style={[styles.buttonContainer, { gap }]}>
      {options.map((opt, i) => (
        <SolidTile
          key={i}
          onPress={() => {
            if (isArray) {
              setValue(
                value.includes(opt.value)
                  ? value.filter((v) => v !== opt.value)
                  : [...value, opt.value],
              );
            } else {
              setValue(opt.value);
            }
          }}
          width={width}
        >
          <Text
            style={[
              styles.text,
              (isArray ? value.includes(opt.value) : opt.value === value) && {
                color,
              },
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.6}
          >
            {opt.label}
          </Text>
        </SolidTile>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
  },
  text: {
    fontSize: fontSizes.text,
    textAlign: "center",
  },
});
