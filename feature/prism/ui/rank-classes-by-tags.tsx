import { cn } from "@/shared/lib/utils";
import { getTagValueLabel } from "../lib/utils";
import { ClassName, getClassTags, getClassTagValue, PrismTag, prismTagTierByClass, PrismValueType } from "../model/prism.constants";
import { Field, FieldContent, FieldLabel } from "@/shared/ui/field";

export type TagCondition = {
    tag: PrismTag;
    type: PrismValueType;
};

export type ClassScoreRow = {
    name: ClassName;
    score: number;
    breakdown: Array<TagCondition & { value: number }>;
};

export const cond = (tag: PrismTag, type: PrismValueType): TagCondition => ({ tag, type });

export const CLASS_NAMES = prismTagTierByClass.map((x) => x.name) as readonly ClassName[];

export function rankClassesByConditions(
    conditions: readonly TagCondition[],
    options?: { topN?: number }
): ClassScoreRow[] {
    const rows: ClassScoreRow[] = CLASS_NAMES.map((name) => {
        const breakdown = conditions.map((c) => ({
            ...c,
            value: getClassTagValue(name, c.type, c.tag),
        }));

        const score = breakdown.reduce((sum, x) => sum + x.value, 0);

        return { name, score, breakdown };
    });

    rows.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.name.localeCompare(b.name, "ko");
    });

    return options?.topN ? rows.slice(0, options.topN) : rows;
}



interface RankClassesByTagsBoardProps {
    tags: { tag: PrismTag, type: PrismValueType }[]
}


export function RankClassesByTagsBoard(props: RankClassesByTagsBoardProps) {
    const { tags } = props

    const ranked = rankClassesByConditions(
        tags.map(tag => cond(tag.tag, tag.type)),
        { topN: undefined }
    )


    return (
        <Field>
            <FieldLabel>검색결과</FieldLabel>
            <FieldContent className="flex flex-col gap-2">
                {ranked.map((rank, idx) => <RankScoreRowItem key={`rank-${idx}`} {...rank} />)}
            </FieldContent>
        </Field>
    )
}

function RankScoreRowItem(props: ClassScoreRow) {
    return (
        <div className="flex flex-col border bg-accent rounded-md">
            <div className="flex gap-2 text-sm font-semibold p-2">
                <div>{props.name}</div>
                <div>(score: {props.score}) </div>
            </div>
            <hr />
            <div className="flex items-center gap-2  p-2">
                {[...getClassTags(props.name)].sort((a, b) => b.value - a.value).map((v, idx) => {
                    const correct = props.breakdown.find(tag => tag.tag === v.tag && v.type === tag.type)
                    return (
                        <span
                            key={props.name + v.tag + idx}
                            className={
                                cn(
                                    "px-2 py-1 border font-semibold rounded-md bg-white text-sm",
                                    correct && "bg-blue-500"
                                )
                            }
                        >
                            <span>{v.tag}</span>
                            <span>{getTagValueLabel(v.type)}</span>
                            <span>{v.value}</span>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}