import { differenceInSeconds, format } from "date-fns"
import { Timer } from "lucide-react"
import { ko } from "date-fns/locale"

interface AbyssHoleListProps {
    times: Date[]
    lastObserve: Date
}

export function AbyssHoleList({
    times,
    lastObserve
}: AbyssHoleListProps) {
    return (
        <div>
            <div>
                <div className="text-center text-accent-foreground py-4">
                    <p className="font-semibold">계산방식</p>
                    <p className="text-sm text-muted-foreground">마지막 어비스 구멍 출현일시로부터 35시간 15분 간격으로 계산되었습니다</p>
                </div>
            </div>
            <ul className="space-y-2">
                {times.map((d, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                        <AbyssHoleTime value={d} lastObserve={lastObserve} />
                    </li>
                ))}
            </ul>
        </div>
    )
}


function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function formatRemain(target: Date, now = new Date()) {
    const diffSec = differenceInSeconds(target, now);
    const isPast = diffSec < 0;

    const abs = Math.abs(diffSec);
    const hours = Math.floor(abs / 3600);
    const minutes = Math.floor((abs % 3600) / 60);
    const seconds = abs % 60;

    const text = `${hours}시간 ${pad2(minutes)}분 ${pad2(seconds)}초`;

    return isPast ? `${text} 지남` : `${text} 남음`;
}
function AbyssHoleTime({ value, lastObserve }: { value: Date, lastObserve: Date }) {
    const remainText = formatRemain(value);
    return (
        <div className="w-full flex max-sm:flex-col items-center justify-between gap-2 border rounded-md p-4 bg-accent text-accent-foreground">
            <div className="flex items-center gap-2">
                <Timer size={20} />
                <span className="font-medium">{format(value, "yyyy년 MM월 dd일 (EEE) HH시 mm분", { locale: ko })}</span>
            </div>
            <span className="tabular-nums text-sm opacity-90">{remainText}</span>
        </div>
    )
}