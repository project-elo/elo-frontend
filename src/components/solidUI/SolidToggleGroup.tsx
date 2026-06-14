import { View, Text, StyleSheet } from "react-native";
import {
  fontSizes,
  styleConsts,
  colors,
  shadowEquivalent,
} from "@/src/utils/styles";
import SolidButton from "./SolidButton";
import { Option } from "@/src/types/componentTypes";

export default function SolidToggleGroup<T extends string | number>({
  title,
  options,
  value,
  setValue,
  backgroundColor,
}: {
  title: string;
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
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{title}</Text>
      <View style={[styles.buttonContainer, { gap }]}>
        {options.map((opt, i) => (
          <SolidButton
            key={i}
            startFlat
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
            borderTopLeftRadius={i === 0 || isArray ? styleConsts.radius : 0}
            borderBottomLeftRadius={i === 0 || isArray ? styleConsts.radius : 0}
            borderTopRightRadius={
              i === options.length - 1 || isArray ? styleConsts.radius : 0
            }
            borderBottomRightRadius={
              i === options.length - 1 || isArray ? styleConsts.radius : 0
            }
            width={width}
            height={39}
            isToggle={true}
            toggleValue={
              isArray ? value.includes(opt.value) : opt.value === value
            }
            maxPress={1}
            depth={1}
            child={
              <Text
                style={[
                  styles.text,
                  (isArray
                    ? value.includes(opt.value)
                    : opt.value === value) && { color },
                ]}
                adjustsFontSizeToFit
                numberOfLines={1}
                minimumFontScale={0.6}
              >
                {opt.label}
              </Text>
            }
          />
        ))}
      </View>
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
