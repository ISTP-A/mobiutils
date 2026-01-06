import { PrismLevel } from "./prism.types";

export const STORAGE_KEY = "prism-data";
export const PRISM_LEVEL_LABELS: Record<PrismLevel, string> = {
  l1: "스타프리즘",
  l2: "스타프리즘S",
  l3: "온전한 스타프리즘",
};

export const YELLOW_HELIODOR_LABELS = {
  l1: "헬리오도르",
  l2: "정제된 헬리오도르",
  l3: "순수한 헬리오도르",
};

export const GREEN_HELIODOR_LABELS = {
  l1: "그린 헬리오도르",
  l2: "정제된 그린 헬리오도르",
  l3: "순수한 그린 헬리오도르",
};

export const PRISM_TAGS: string[] = [
  "원소",
  "소환",
  "생존",
  "보조",
  "강타",
  "연타",
  "방해",
  "이동",
];
