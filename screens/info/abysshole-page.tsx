import { AbyssHoleList } from "@/feature/abysshole/ui/abysshole-list";
import { LayoutContent, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";
import { addMinutes, format, parse } from "date-fns";

export function AbyssHolePage() {
    const lastObserve = parse("2025.12.29 15:13:00", "yyyy.MM.dd HH:mm:ss", new Date());
    const lastUpdate = parse("2025.12.29 15:13:00", "yyyy.MM.dd HH:mm:ss", new Date());
    const stepMinutes = 35 * 60 + 15;
    const nextTimes = Array.from({ length: 10 }, (_, i) =>
        addMinutes(lastObserve, stepMinutes * (i + 1))
    );

    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>어비스로 뚫린 검은 구멍 예측시간</HeaderTitle>
                <HeaderDescription>정확하지 않은 정보로 참고만 부탁드립니다 (마지막 업데이트: {format(lastUpdate, "yyyy년 MM월 dd일 HH시 mm분")})</HeaderDescription>
            </LayoutHeader>
            <LayoutContent>
                <div className="p-4 space-y-4 text-center">
                    <div className="flex flex-col">
                        <p>마지막 어비스 구멍 출현 시각</p>
                        <p><strong className="tabular-nums text-lg">{format(lastObserve, "yyyy년 MM월 dd일 HH시 mm분")}</strong></p>
                    </div>
                </div>
                <AbyssHoleList
                    times={nextTimes}
                    lastObserve={lastObserve}
                />
            </LayoutContent>
        </LayoutInner >
    )
}