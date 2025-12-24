"use client"

import { DecreaseRuneType, MinSec } from "@/feature/awake/model/types";
import { getDecreaseTime, getTimeValue, secondToMinSec, timeFormat } from "@/feature/awake/model/utils";
import { CalcTypeField } from "@/feature/awake/ui/calc-type-field";
import { StartTimeField } from "@/feature/awake/ui/start-time-field";
import { LayoutContent, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Form } from "@/shared/ui/form";
import { GuideAccordion } from "@/shared/ui/guide-accordion";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

const schema = z.object({
    startTime: z.object({
        min: z.number().optional(),
        sec: z.number().optional(),
    }),
    calcType: z.string<DecreaseRuneType>(),
    etcValue: z.number().default(0),
})

type FormValues = z.infer<typeof schema>

const guides = [
    "1. 전투 시작 시간을 분/초로 각각 입력해주세요.",
    "2. 눈먼 예언자 착용 여부를 선택해주세요. (다음 각성 시간의 기준이 눈먼 예언자가 아니라면, 초 단위로 직접 입력해주세요.)",
    "3. 계산 버튼을 클릭하거나 Enter 키를 눌러주세요.",
]

export function AwakePage() {
    const [result, setResult] = useState<FormValues | null>(null)
    const form = useForm<FormValues>({
        defaultValues: {
            startTime: { min: undefined, sec: undefined },
            calcType: "NONE" as DecreaseRuneType,
            etcValue: 0,
        }
    })

    const watch = useWatch({ control: form.control, name: "calcType" })

    const handleSubmit = form.handleSubmit((data) => {
        setResult({
            ...data, startTime: {
                min: data.startTime.min ?? 0,
                sec: data.startTime.sec ?? 0
            }
        })
    })

    useEffect(() => {
        if (watch) form.setValue("etcValue", 0)
    }, [watch])

    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>각성 시간 계산기</HeaderTitle>
                <HeaderDescription>계산하기 너무 귀찮아</HeaderDescription>
            </LayoutHeader>
            <LayoutContent className="gap-8">
                <Form {...form}>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <FieldGroup className="grid grid-cols-2">
                            <StartTimeField />
                            <CalcTypeField />
                        </FieldGroup>
                        <Button className="w-full">계산하기</Button>
                        <GuideAccordion id="awake_guide" title="사용법" guides={guides} />
                    </form>
                </Form>
                <hr />
                {result && <AwakeResult result={result} />}
            </LayoutContent>
        </LayoutInner>
    )
}

function AwakeResult({ result }: { result: FormValues }) {
    const { min, sec } = result.startTime;

    const startSeconds = getTimeValue(min, sec);
    const stepSeconds = getDecreaseTime(result.calcType) + (result.etcValue ?? 0);

    if (stepSeconds <= 0) {
        return (
            <div className="text-center text-muted-foreground">
                감소 시간이 0초 이하라서 반복 계산할 수 없습니다
            </div>
        )
    }

    const awakes: MinSec[] = []
    let current = startSeconds;

    awakes.push({ min: min!, sec: sec! })

    const MAX_ITER = 500;

    for (let i = 0; i < MAX_ITER; i++) {
        current -= stepSeconds;
        if (current <= 0) break;
        awakes.push(secondToMinSec(current))
    }

    return (
        <Field>
            <FieldLabel>결과</FieldLabel>
            <FieldContent className="flex flex-col gap-2">
                {awakes.map((t, idx) => (
                    <div
                        key={idx}
                        className="bg-blue-50 p-4 rounded-md border flex items-center gap-4"
                    >
                        <span className="text-sm text-muted-foreground">{idx + 1}번째 각성</span>
                        <span className="text-sm text-muted-foreground">|</span>
                        <span className="font-semibold">{timeFormat(t)}</span>
                    </div>
                ))}
            </FieldContent>
        </Field>
    );
}
