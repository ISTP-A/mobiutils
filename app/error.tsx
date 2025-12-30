"use client"

import { LayoutHeader, LayoutInner } from "@/shared/layout/layout"
import { Button } from "@/shared/ui/button"
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string },
    reset: () => void,
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>500</HeaderTitle>
                <HeaderDescription>
                    <p>예기치 못한 오류가 발생했습니다</p>
                    <p>오류가 계속 발견되는 경우 메일을 남겨주세요</p>
                </HeaderDescription>
            </LayoutHeader>
            <Button
                size='lg'
                onClick={reset}
            >
                다시시도
            </Button>
        </LayoutInner>
    )
}