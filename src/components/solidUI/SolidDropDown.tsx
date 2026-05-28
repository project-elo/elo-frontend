import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  colors,
  fontSizes,
  styleConsts,
  shadowEquivalent,
} from "@/src/utils/styles";
import Popover from "react-native-popover-view";
import { useState } from "react";
import SolidButton from "./SolidButton";
import sleep from "@/src/utils/sleep";

export type Option<T = string> = {
  label: string;
  value: T;
};

const depth = 2;
const itemHeight = 40;
const itemWidth = 200;

function MenuItem<T extends string | number>({
  opt,
  value,
  setValue,
  setOpen,
}: {
  opt: Option<T>;
  value: any;
  setValue: (v: T) => void;
  setOpen: (v: boolean) => void;
}) {
  return (
    <SolidButton
      backgroundColor={colors.white}
      height={itemHeight}
      width={itemWidth}
      depth={depth}
      borderRadius={8}
      padding={0}
      isToggle={true}
      toggleValue={opt.value === value}
      onPress={async () => {
        setValue(opt.value);
        await sleep(250);
        setOpen(false);
      }}
      icon={
        <View style={styles.menuItemContent}>
          <Text style={styles.text}>{opt.label}</Text>
          {opt.value === value && (
            <Entypo
              style={[styles.icon, { color: colors.theme }]}
              name="check"
            />
          )}
        </View>
      }
    />
  );
}

export default function SolidDropDown<T extends string | number>({
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
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={() => setOpen(true)}
    >
      <Text style={styles.text}>{title}</Text>

      <Popover
        isVisible={open}
        onRequestClose={() => setOpen(false)}
        backgroundStyle={{ backgroundColor: "transparent" }}
        popoverStyle={styles.popover}
        arrowSize={{ width: 0, height: 0 }}
        offset={14}
        from={
          <View style={styles.button}>
            <Text style={[styles.buttonText, { color: colors.theme }]}>
              {selectedOption?.label ?? "Select"}
            </Text>
            <Entypo
              style={[styles.icon, { color: colors.theme }]}
              name="select-arrows"
            />
          </View>
        }
      >
        <View style={styles.menuContainer}>
          {options.map((opt) => (
            <MenuItem
              key={opt.value}
              opt={opt}
              value={value}
              setValue={setValue}
              setOpen={setOpen}
            />
          ))}
        </View>
      </Popover>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  text: {
    fontSize: fontSizes.text,
  },
  buttonText: {
    fontSize: fontSizes.text,
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
  },
  menuContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: 12,
    padding: depth + 4,
    gap: 4,
    boxShadow: ` ${depth}px ${depth}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
  },
  menuItemContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  popover: {
    backgroundColor: "transparent",
    borderRadius: 12,
    marginHorizontal: -10,
    paddingLeft: 2,
    overflow: "visible",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
  },
});
