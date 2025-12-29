import { BreakList } from "@/feature/break/ui/break-list";
import { LayoutContent, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";

export default function BreakInfoPage() {
    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>브레이크 정보</HeaderTitle>
                <HeaderDescription></HeaderDescription>
            </LayoutHeader>
            <LayoutContent>
                <BreakList />
            </LayoutContent>
        </LayoutInner>
    )
}