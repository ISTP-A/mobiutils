// (데미지) 헬리오도르 5.0%
// (데미지) 정제된 헬리오도르 5.2%
// (데미지) 순수한 헬리오도르 5.4%

// 그린 헬리오도르 1.5%
// 정제된 그린 헬리오도르 2.10%
// 순수한 그린 헬리오도르 2.20%

// 스타프리즘 2.00%
// 스타프리즘S = 2.10%
// 온전한 스타프리즘 = 2.20%

export type PrismType = "prism" | "heliodor";
export type PrismLevel = "l1" | "l2" | "l3";
export type HeliodorType = "yello" | "green";

export type PrismResult = [string, number][];

export interface Prism {
  type: PrismType;
  level: PrismLevel;
  tag: string;
}

export const prismValue: Record<PrismLevel, number> = {
  l1: 1.5,
  l2: 2.1,
  l3: 2.2,
};

export const yelloHeliodorValue: Record<PrismLevel, number> = {
  l1: 5.0,
  l2: 5.2,
  l3: 5.4,
};

export const greenHeliodorValue: Record<PrismLevel, number> = {
  l1: 1.5,
  l2: 2.1,
  l3: 2.2,
};
