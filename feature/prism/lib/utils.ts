import { getSelectOptions } from "@/shared/form/rhf-select";
import {
  greenHeliodorValue,
  HeliodorType,
  PrismLevel,
  prismValue,
  yelloHeliodorValue,
} from "../model/prism.types";

export function getPrismValue(level: PrismLevel): number {
  return prismValue[level];
}

export function getHeliodorValue(
  type: HeliodorType,
  level: PrismLevel
): number {
  switch (type) {
    case "yello":
      return yelloHeliodorValue[level];
    case "green":
      return greenHeliodorValue[level];
  }
}

export function getPrismSelectOptions(value: Record<string, any>) {
  return Object.entries(value).map(([k, v]) => getSelectOptions(v, k));
}

export function getPrismGuide(index: number) {
  if (index === 1) return "무기1";
  else if (index === 2) return "무기2";
  else if (index === 3) return "무기3";
  else if (index === 4) return "엠블럼";
  else if (index === 5) return "팬던트";
  else if (index === 6) return "반지1";
  else if (index === 7) return "반지2";
  else if (index === 8) return "모자1";
  else if (index === 9) return "모자2";
  else if (index === 10) return "모자3";
  else if (index === 11) return "상의1";
  else if (index === 12) return "상의2";
  else if (index === 13) return "상의3";
  else if (index === 14) return "하의1";
  else if (index === 15) return "하의2";
  else if (index === 16) return "하의3";
  else if (index === 17) return "장갑1";
  else if (index === 18) return "장갑2";
  else if (index === 19) return "장갑3";
  else if (index === 20) return "신발1";
  else if (index === 21) return "신발2";
  else if (index === 22) return "신발3";
}
