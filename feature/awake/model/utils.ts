import { DecreaseRuneType, MinSec, TimeValue } from "./types";

export function getTimeValue(
  minute: TimeValue | undefined,
  second: TimeValue | undefined
): TimeValue {
  return (minute || 0) * 60 + (second || 0) * 1;
}

export function secondToMinSec(second: TimeValue): MinSec {
  return { min: Math.floor(second / 60), sec: second % 60 };
}

export function getDecreaseTime(value: DecreaseRuneType) {
  switch (value) {
    case "NONE":
      return 90;
    case "NORMAL":
      return 90 - 38;
    case "TRANS1":
      return 90 - 39;
    case "TRANS2":
      return 90 - 40;
    case "ETC":
    default:
      return 0;
  }
}

export function timeFormat(t: MinSec) {
  return `${String(t.min).padStart(2, "0")}:${String(t.sec).padStart(2, "0")}`;
}
