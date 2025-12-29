import { BreakList } from "@/feature/break/ui/break-list";
import { LayoutContent, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";

export default function BreakInfoPage() {
    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>브레이크 정보</HeaderTitle>
                <HeaderDescription>브레이크 게이지(칸)을 의미하며, 브레이크까지 소요시간을 의미하는 것이 아닙니다.</HeaderDescription>
            </LayoutHeader>
            <LayoutContent>
                <BreakList />
            </LayoutContent>
        </LayoutInner>
    )
}