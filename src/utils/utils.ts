import type { Option } from "../types/componentTypes";

export function listToOptions(values: string[]): Option<string>[] {
  return values.map((v) => ({
    label: v,
    value: v,
  }));
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatSliderVal(
  v: number,
  unit: string,
  isMax: boolean,
): string {
  "worklet";
  const suffix = isMax ? "+" : "";
  if (unit === "feet") return `${Math.trunc(v / 12)}'${v % 12}"${suffix}`;
  return `${v}${suffix}`;
}

export function formatSliderLabel(
  value: number,
  unit: string,
  max: number,
  value2?: number,
): string {
  "worklet";
  const v1 = formatSliderVal(value, unit, value === max);
  const unitLabel = unit === "feet" ? "" : ` ${unit}`;
  if (value2 !== undefined) {
    const v2 = formatSliderVal(value2, unit, value2 === max);
    return `Between ${v1} and ${v2}${unitLabel}`;
  }
  return `Up to ${v1}${unitLabel}`;
}
