import type { Option } from "../components/solidUI/SolidDropDown";

export function listToOptions(values: string[]): Option<string>[] {
  return values.map((v) => ({
    label: v,
    value: v,
  }));
}
