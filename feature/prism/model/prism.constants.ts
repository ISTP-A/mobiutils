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

export const PRISM_TAGS = [
  "원소",
  "소환",
  "생존",
  "보조",
  "강타",
  "연타",
  "방해",
  "이동",
] as const;

export type PrismTagType = (typeof PRISM_TAGS)[number];

export type PrismValueType = "damage" | "cooltime";

export interface ValidTag {
  tag: PrismTagType;
  type: PrismValueType;
  value: number;
}

export interface ClassTier {
  name: string;
  validTag: ValidTag[];
}

function geValidTag(
  tag: PrismTagType,
  type: PrismValueType,
  value: number
): ValidTag {
  return { tag, type, value };
}

export const prismTagTierByClass = [
  {
    name: "검술사",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("연타", "damage", 1),
      geValidTag("이동", "damage", 1),
      geValidTag("보조", "damage", 1),
    ],
  },
  {
    name: "격투가",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("이동", "damage", 2),
      geValidTag("보조", "damage", 0.5),
      geValidTag("방해", "damage", 0.5),
    ],
  },
  {
    name: "궁수",
    validTag: [
      geValidTag("강타", "damage", 1),
      geValidTag("연타", "damage", 2),
      geValidTag("이동", "damage", 0.5),
      geValidTag("방해", "damage", 1),
    ],
  },
  {
    name: "대검전사",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("보조", "damage", 2),
      geValidTag("강타", "cooltime", 0.5),
      geValidTag("보조", "cooltime", 0.5),
    ],
  },
  {
    name: "댄서",
    validTag: [
      geValidTag("강타", "damage", 1),
      geValidTag("연타", "damage", 2),
      geValidTag("이동", "damage", 2),
      geValidTag("보조", "damage", 1),
    ],
  },
  {
    name: "도적",
    validTag: [
      geValidTag("강타", "damage", 1),
      geValidTag("연타", "damage", 1),
      geValidTag("이동", "damage", 0.5),
      geValidTag("방해", "damage", 2),
    ],
  },
  {
    name: "듀얼블레이드",
    validTag: [
      geValidTag("강타", "damage", 1),
      geValidTag("연타", "damage", 2),
      geValidTag("이동", "damage", 2),
    ],
  },
  {
    name: "마법사",
    validTag: [
      geValidTag("연타", "damage", 1),
      geValidTag("원소", "damage", 2),
      geValidTag("방해", "damage", 2),
    ],
  },
  {
    name: "빙결술사",
    validTag: [
      geValidTag("원소", "damage", 2),
      geValidTag("소환", "damage", 1),
      geValidTag("생존", "damage", 1),
      geValidTag("강타", "damage", 0.5),
    ],
  },
  {
    name: "사제",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("연타", "damage", 0.5),
      geValidTag("보조", "damage", 2),
      geValidTag("보조", "cooltime", 1),
    ],
  },
  {
    name: "석궁사수",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("연타", "damage", 1),
      geValidTag("원소", "damage", 2),
      geValidTag("방해", "damage", 0.5),
    ],
  },
  {
    name: "수도사",
    validTag: [
      geValidTag("연타", "damage", 2),
      geValidTag("이동", "damage", 1),
      geValidTag("보조", "damage", 2),
      geValidTag("방해", "damage", 0.5),
    ],
  },
  {
    name: "악사",
    validTag: [
      geValidTag("강타", "damage", 1),
      geValidTag("연타", "damage", 1),
      geValidTag("보조", "damage", 0.5),
      geValidTag("방해", "damage", 2),
    ],
  },
  {
    name: "암흑술사",
    validTag: [
      geValidTag("강타", "damage", 0.5),
      geValidTag("연타", "damage", 1),
      geValidTag("소환", "damage", 2),
      geValidTag("방해", "damage", 2),
    ],
  },
  {
    name: "음유시인",
    validTag: [
      geValidTag("강타", "damage", 1),
      geValidTag("연타", "damage", 0.8),
      geValidTag("보조", "damage", 2),
      geValidTag("방해", "damage", 2),
    ],
  },
  {
    name: "장궁병",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("연타", "damage", 1),
      geValidTag("원소", "damage", 0.5),
      geValidTag("보조", "damage", 0.5),
      geValidTag("방해", "damage", 2),
    ],
  },
  {
    name: "전격술사",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("원소", "damage", 2),
      geValidTag("보조", "damage", 1),
      geValidTag("방해", "damage", 0.5),
    ],
  },
  {
    name: "전사",
    validTag: [
      geValidTag("강타", "damage", 2),
      geValidTag("이동", "damage", 1),
      geValidTag("보조", "damage", 0.5),
      geValidTag("방해", "damage", 2),
    ],
  },
  {
    name: "화염술사",
    validTag: [
      geValidTag("강타", "damage", 1),
      geValidTag("연타", "damage", 2),
      geValidTag("원소", "damage", 2),
      geValidTag("보조", "damage", 0.5),
      geValidTag("방해", "damage", 0.5),
    ],
  },
  {
    name: "힐러",
    validTag: [
      geValidTag("강타", "damage", 0.5),
      geValidTag("연타", "damage", 2),
      geValidTag("보조", "damage", 2),
      geValidTag("보조", "cooltime", 1),
    ],
  },
] as const satisfies readonly ClassTier[];

export const getClassTags = (cls: ClassName) => prismTagTierByClassMap[cls];

function makeClassMap<const T extends readonly ClassTier[]>(arr: T) {
  type Name = T[number]["name"];
  const out = {} as Record<Name, readonly ValidTag[]>;
  for (const item of arr) {
    out[item.name as Name] = item.validTag;
  }
  return out;
}

export const prismTagTierByClassMap = makeClassMap(prismTagTierByClass);
export type ClassName = keyof typeof prismTagTierByClassMap;

/**
 * 클래스에서 (type, tag) 값 조회
 * - 동일 (type, tag)가 여러 개 들어오는 경우를 대비해 "최대값"을 반환합니다.
 */
export const getClassTagValue = (
  cls: ClassName,
  type: PrismValueType,
  tag: PrismTagType
) => {
  const values = prismTagTierByClassMap[cls]
    .filter((x) => x.type === type && x.tag === tag)
    .map((x) => x.value);

  return values.length ? Math.max(...values) : 0;
};

/**
 * 엑셀처럼 8개 태그를 "매트릭스"로 정규화해서 쓰고 싶을 때
 * - damage/cooltime 각각 Record<PrismTag, number> 형태로 반환
 * - 미지정 태그는 0
 */
export const getClassTagMatrix = (cls: ClassName) => {
  const base = Object.fromEntries(
    PRISM_TAGS.map((t) => [t, 0] as const)
  ) as Record<PrismTagType, number>;

  const damage = { ...base };
  const cooltime = { ...base };

  for (const { tag, type, value } of prismTagTierByClassMap[cls]) {
    const target = type === "damage" ? damage : cooltime;
    target[tag] = Math.max(target[tag], value);
  }

  return { damage, cooltime };
};
