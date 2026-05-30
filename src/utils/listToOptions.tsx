import type { Option } from "../types/componentTypes";

export function listToOptions(values: string[]): Option<string>[] {
  return values.map((v) => ({
    label: v,
    value: v,
  }));
}
