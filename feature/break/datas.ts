import { BreakGroup } from "@/feature/break/model/break.types";

export const breakList: BreakGroup[] = [
  {
    id: "break_group_1",
    name: "지하 대공동",
    thumbnail: "/assets/지하_대공동.png",
    items: [
      {
        id: "break_abyss_1",
        location: "대공동 2번방",
        named: "저무는 태양의 스카라베",
        gauge: 15,
      },
    ],
  },
  {
    id: "break_group_2",
    name: "혼돈의 신전",
    thumbnail: "/assets/혼돈의_신전.png",
    items: [
      {
        id: "break_abyss_2",
        location: "신전 1번방",
        named: "광기 어린 애더르 강령술사",
        gauge: 8,
      },
      {
        id: "break_abyss_3",
        location: "신전 2번방",
        named: "애더르 심판자",
        gauge: 15,
      },
      {
        id: "break_abyss_4",
        location: "신전 3번방",
        named: "베스키아",
        gauge: 15,
      },
    ],
  },
  {
    id: "break_group_3",
    name: "부활의 신단",
    thumbnail: "/assets/부활의_신단.png",
    items: [
      {
        id: "break_abyss_5",
        location: "신단 1번방",
        named: "수정 문지기",
        gauge: 12,
      },
      {
        id: "break_abyss_6",
        location: "신단 2번방",
        named: "금단의 봉인술사",
        gauge: 15,
      },
      {
        id: "break_abyss_7",
        location: "신단 2번방",
        named: "테서랙트",
        gauge: 21,
      },
      {
        id: "break_abyss_8",
        location: "신단 3번방",
        named: "네베론",
        gauge: 15,
      },
    ],
  },
  {
    id: "break_group_4",
    name: "오염된 폐기장",
    thumbnail: "/assets/오염된_폐기장.png",
    items: [
      {
        id: "break_abyss_9",
        location: "폐기장 1번방",
        named: "증오 어린 주술사",
        gauge: 8,
      },
      {
        id: "break_abyss_10",
        location: "폐기장 2번방",
        named: "실험체 오거",
        gauge: 15,
      },
      {
        id: "break_abyss_11",
        location: "폐기장 3번방",
        named: "고르도스",
        gauge: 21,
      },
    ],
  },
];
