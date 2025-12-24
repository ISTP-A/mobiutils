import { LayoutContent, LayoutFooter, LayoutHeader, LayoutInner } from "@/shared/layout/layout";
import { HeaderDescription, HeaderTitle } from "@/shared/ui/typography";

export default function Home() {
  return (
    <LayoutInner>
      <LayoutHeader>
        <HeaderTitle>모바일 마비노기 유틸리티</HeaderTitle>
        <HeaderDescription>우측상단 메뉴를 통해 원하는 기능을 선택해주세요</HeaderDescription>
      </LayoutHeader>
      <LayoutContent>

      </LayoutContent>
      <LayoutFooter>

      </LayoutFooter>
    </LayoutInner>
  );
}
