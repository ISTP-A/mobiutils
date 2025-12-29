"use client";

import { Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { ko } from "date-fns/locale";

const TZ = "Asia/Seoul";

interface AbyssHoleListProps {
    /** epoch milliseconds */
    times: number[];
}

export function AbyssHoleList({ times }: AbyssHoleListProps) {
    const [nowMs, setNowMs] = useState<number>(() => Date.now());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const id = window.setInterval(() => {
            setNowMs(Date.now());
        }, 1000);

        return () => window.clearInterval(id);
    }, []);

    return (
        <div>
            <div>
                <div className="text-center text-accent-foreground py-4">
                    <p className="font-semibold">계산방식</p>
                    <p className="text-sm text-muted-foreground">
                        마지막 어비스 구멍 출현일시로부터 35시간 15분 간격으로 계산되었습니다
                    </p>
                </div>
            </div>

            <ul className="space-y-2">
                {times.map((ms, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                        <AbyssHoleTime valueMs={ms} nowMs={nowMs} mounted={mounted} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function formatRemain(targetMs: number, nowMs: number) {
    const diffSec = Math.floor((targetMs - nowMs) / 1000);
    const isPast = diffSec < 0;

    const abs = Math.abs(diffSec);

    const days = Math.floor(abs / 86400);
    const hours = Math.floor((abs % 86400) / 3600);
    const minutes = Math.floor((abs % 3600) / 60);
    const seconds = abs % 60;

    const head = days > 0 ? `${days}일 ${hours}시간` : `${hours}시간`;
    const text = `${head} ${pad2(minutes)}분 ${pad2(seconds)}초`;

    return isPast ? `${text} 지남` : `${text} 남음`;
}

function AbyssHoleTime({
    valueMs,
    nowMs,
    mounted,
}: {
    valueMs: number;
    nowMs: number;
    mounted: boolean;
}) {
    const dateText = useMemo(
        () =>
            formatInTimeZone(
                new Date(valueMs),
                TZ,
                "yyyy년 MM월 dd일 (EEE) HH시 mm분",
                { locale: ko }
            ),
        [valueMs]
    );

    const remainText = mounted ? formatRemain(valueMs, nowMs) : "—";

    return (
        <div className="w-full flex max-sm:flex-col items-center justify-between gap-2 border rounded-md p-4 bg-accent text-accent-foreground">
            <div className="flex items-center gap-2">
                <Timer size={20} />
                <span className="font-medium">{dateText}</span>
            </div>
            <span className="tabular-nums text-sm opacity-90">{remainText}</span>
        </div>
    );
}
