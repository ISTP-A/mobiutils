import { AbyssHoleList } from "@/feature/abysshole/ui/abysshole-list";
import { LayoutContent, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";
import { addMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ko } from "date-fns/locale";

const TZ = "Asia/Seoul";

function kstDate(input: string) {
    const [datePart, timePart] = input.split(" ");
    const iso = `${datePart.replaceAll(".", "-")}T${timePart}+09:00`;
    return new Date(iso);
}

export function AbyssHolePage() {
    const lastObserve = kstDate("2025.12.29 15:13:00");
    const lastUpdate = kstDate("2025.12.29 15:13:00");

    const stepMinutes = 35 * 60 + 15;
    const nextTimes = Array.from({ length: 10 }, (_, i) =>
        addMinutes(lastObserve, stepMinutes * (i + 1)).getTime()
    );

    const lastUpdateText = formatInTimeZone(
        lastUpdate,
        TZ,
        "yyyy년 MM월 dd일 HH시 mm분",
        { locale: ko }
    );

    const lastObserveText = formatInTimeZone(
        lastObserve,
        TZ,
        "yyyy년 MM월 dd일 HH시 mm분",
        { locale: ko }
    );

    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>어비스로 뚫린 검은 구멍 예측시간</HeaderTitle>
                <HeaderDescription>
                    정확하지 않은 정보로 참고만 부탁드립니다 (마지막 업데이트: {lastUpdateText})
                </HeaderDescription>
            </LayoutHeader>

            <LayoutContent>
                <div className="p-4 space-y-4 text-center bg-blue-50">
                    <div className="flex flex-col">
                        <p>마지막 어비스 구멍 출현 시각</p>
                        <p>
                            <strong className="tabular-nums text-lg">{lastObserveText}</strong>
                        </p>
                    </div>
                </div>

                <AbyssHoleList times={nextTimes} />
            </LayoutContent>
        </LayoutInner>
    );
}
