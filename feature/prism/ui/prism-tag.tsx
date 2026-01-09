import { cn } from "@/shared/lib/utils"
import { PrismValueType, type PrismTagType } from "../model/prism.constants"
import { getTagValueLabel } from "../lib/utils"

interface PrismTagProps {
    className?: string
    type: PrismValueType
    tag: PrismTagType
    value?: number | string
    active?: boolean
}

export function PrismTag(props: PrismTagProps) {
    const { className, type, tag, value, active = false } = props
    return (
        <p
            className={
                cn(
                    'px-2 py-1 border font-semibold rounded-md bg-white text-sm flex flex-nowrap gap-0.5 shadow',
                    active && "bg-chart-1 text-white",
                    className
                )}
        >
            <span>{tag}</span>
            <span>{getTagValueLabel(type)}</span>
            <span>·</span>
            <span>{value}</span>
        </p>
    )
}