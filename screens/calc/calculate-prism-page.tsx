"use client"

import { PrismResult } from "@/feature/prism/model/prism.types";
import { PrismInfoBoard } from "@/feature/prism/ui/prism-info-board";
import { PrismListForm } from "@/feature/prism/ui/prism-list-form";
import { LayoutContent, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { Button } from "@/shared/ui/button";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";
import { useState } from "react";

export function CalculatePrismPage() {
    const [result, setResult] = useState<PrismResult | null>(null)
    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>보석 세공 계산기</HeaderTitle>
                <HeaderDescription>보석 세공 계산기 이므로 데미지 증가만 적용됩니다</HeaderDescription>
            </LayoutHeader>
            <LayoutContent className="gap-4 pt-0">
                <PrismListForm onSubmit={setResult} />
                {result && <PrismInfoBoard data={result} />}
            </LayoutContent>
        </LayoutInner>
    )
}