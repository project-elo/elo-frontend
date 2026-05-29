import { View, Text, StyleSheet } from "react-native";
import { fontSizes, styleConsts } from "@/src/utils/styles";
import SolidButton from "./SolidButton";
import { Option } from "../form/DropDownMenu";

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
  setValue: (v: T) => void;
  backgroundColor?: string;
}) {
  const selectedOption = options.find((o) => o.value === value);
  const totalWidth = 200;
  const width = totalWidth / options.length;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttonContainer}>
        {options.map((opt, i) => (
          <SolidButton
            key={i}
            onPress={() => setValue(opt.value)}
            borderTopLeftRadius={i === 0 ? styleConsts.radius : 0}
            borderBottomLeftRadius={i === 0 ? styleConsts.radius : 0}
            borderTopRightRadius={
              i === options.length - 1 ? styleConsts.radius : 0
            }
            borderBottomRightRadius={
              i === options.length - 1 ? styleConsts.radius : 0
            }
            width={width}
            height={39}
            isToggle={true}
            toggleValue={selectedOption === opt}
            child={<Text style={styles.text}>{opt.label}</Text>}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 1,
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
  },
  text: {
    fontSize: fontSizes.text,
  },
});
