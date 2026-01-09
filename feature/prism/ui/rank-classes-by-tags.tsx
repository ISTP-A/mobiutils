import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Field, FieldContent, FieldLabel } from "@/shared/ui/field";
import { ClassName, getClassTags, getClassTagValue, prismTagTierByClass, PrismTagType, PrismValueType } from "../model/prism.constants";
import { PrismTag } from "./prism-tag";
import { useMemo, useState } from "react";
import { Input } from "@/shared/ui/input";

export type TagCondition = {
    tag: PrismTagType;
    type: PrismValueType;
};

export type ClassScoreRow = {
    name: ClassName;
    score: number;
    breakdown: Array<TagCondition & { value: number }>;
};

export const cond = (tag: PrismTagType, type: PrismValueType): TagCondition => ({ tag, type });

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
    tags: { tag: PrismTagType, type: PrismValueType }[]
}

export function RankClassesByTagsBoard(props: RankClassesByTagsBoardProps) {
    const [searchText, setSearchText] = useState("")
    const { tags } = props

    const ranked = useMemo(() => rankClassesByConditions(
        tags.map(tag => cond(tag.tag, tag.type)),
        { topN: undefined }
    ), [tags])

    const filtered = useMemo(() => ranked.filter(rank => searchText === "" || rank.name.includes(searchText)), [ranked, searchText])

    return (
        <Field>
            <div className="flex justify-between">
                <FieldLabel>검색결과</FieldLabel>
                <Input
                    className="w-40"
                    placeholder="결과 내 직업 검색"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <FieldContent className="flex flex-col gap-2">
                {filtered.map((rank, idx) => <RankScoreRowItem key={`rank-${idx}`} {...rank} />)}
            </FieldContent>
        </Field>
    )
}

function RankScoreRowItem(props: ClassScoreRow) {
    const { name, score } = props
    const classTags = getClassTags(name)
    const tagList = [...classTags].sort((a, b) => b.value - a.value)
    return (
        <Card className="flex flex-col bg-accent py-4 gap-2">
            <CardHeader>
                <CardTitle className="flex gap-1">
                    <span>{name}</span>
                    <span>(score: {score}) </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-1">
                {tagList.map((v, idx) => {
                    const correct = props.breakdown.find(tag => tag.tag === v.tag && v.type === tag.type)
                    return (
                        <PrismTag
                            key={`tag-${idx}`}
                            type={v.type}
                            tag={v.tag}
                            value={v.value}
                            active={!!correct}
                        />
                    )
                })}
            </CardContent>
        </Card>
    )
}