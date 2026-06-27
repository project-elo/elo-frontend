import { View, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors, fontSizes } from "@/src/utils/styles";
import Popover, { Rect } from "react-native-popover-view";
import { sleep } from "@/src/utils/utils";
import { Option } from "@/src/types/componentTypes";
import { useRef, useState } from "react";
import SolidTile from "./Form/SolidTile";
import Ionicons from "@expo/vector-icons/Ionicons";

function MenuItem<T extends string | number>({
  opt,
  value,
  setValue,
  setOpen,
  isFirst,
  isLast,
  width,
}: {
  opt: Option<T>;
  value: any;
  setValue: (v: T) => void;
  setOpen: (v: boolean) => void;
  isFirst: boolean;
  isLast: boolean;
  width?: number;
}) {
  return (
    <SolidTile
      isFirst={isFirst}
      isLast={isLast}
      minHeight={0}
      contentStyle={styles.menuItem}
      width={width}
      onPress={async () => {
        setValue(opt.value);
        await sleep(150);
        setOpen(false);
      }}
    >
      <Text style={styles.text}>{opt.label}</Text>
      {opt.value === value && (
        <Entypo style={[styles.text, { color: colors.theme }]} name="check" />
      )}
    </SolidTile>
  );
}

export function SolidDropDown<T extends string | number>({
  options,
  value,
  setValue,
  isVisible,
  setOpen,
  from,
}: {
  options: Option<T>[];
  value: any;
  setValue: (v: T) => void;
  isVisible: boolean;
  setOpen: (v: boolean) => void;
  from: Rect | null;
}) {
  return (
    <Popover
      isVisible={isVisible}
      onRequestClose={() => setOpen(false)}
      backgroundStyle={{ backgroundColor: "transparent" }}
      popoverStyle={styles.popover}
      arrowSize={{ width: 0, height: 0 }}
      offset={14}
      from={from}
      popoverShift={{ x: -1 }}
    >
      <View>
        {options.map((opt, i) => (
          <MenuItem
            key={opt.value}
            opt={opt}
            value={value}
            setValue={setValue}
            setOpen={setOpen}
            isFirst={i === 0}
            isLast={i === options.length - 1}
            width={from?.width}
          />
        ))}
      </View>
    </Popover>
  );
}

export default function SolidDropDownTile<T extends string | number>({
  label,
  isFirst,
  isLast,
  options,
  value,
  setValue,
}: {
  label: string;
  isFirst?: boolean;
  isLast?: boolean;
  options: Option<T>[];
  value: T;
  setValue: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Rect | null>(null);
  const tileRef = useRef<View>(null);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <>
      <SolidTile
        isFirst={isFirst}
        isLast={isLast}
        label={label}
        onPress={() => {
          tileRef.current?.measureInWindow((x, y, width, height) => {
            setAnchor(new Rect(x, y, width, height));
            setOpen((o) => !o);
          });
        }}
      >
        <View ref={tileRef} style={styles.currOption}>
          <Text style={styles.text}>{selectedOption?.label ?? "Select"}</Text>
          <Ionicons name="chevron-expand" size={24} color={colors.shadow} />
        </View>
      </SolidTile>
      <SolidDropDown
        isVisible={open}
        setOpen={setOpen}
        from={anchor}
        options={options}
        value={value}
        setValue={setValue}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.text,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  popover: {
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingBottom: 2,
    paddingRight: 2,

    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  currOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
});
