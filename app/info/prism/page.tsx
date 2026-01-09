import { PrismTagTierByClassPage } from "@/screens/info/prism-tag-tier-by-class-page";
import { LayoutContent, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";

export default function PrismInfo() {
    return (
        <LayoutInner>
            <LayoutHeader>
                <HeaderTitle>직업별 세공 정보</HeaderTitle>
                <HeaderDescription>잘못된 정보가 있을 수 있으니 참고정도로 이용부탁드립니다</HeaderDescription>
            </LayoutHeader>
            <LayoutContent>
                <PrismTagTierByClassPage />
            </LayoutContent>
        </LayoutInner>
    )
}