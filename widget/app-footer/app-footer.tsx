import { LayoutContent, LayoutInner } from "@/shared/layout/layout";

export function AppFooter() {
    return (
        <footer className="border-t bg-gray-500 text-white">
            <LayoutInner>
                <LayoutContent className="flex flex-col gap-4 text-sm py-8">
                    <div>
                        <p>제작자: 이직기원N일차 / 아이라</p>
                    </div>
                    <div>
                        <p>건의내용은 아래 이메일로 부탁드립니다</p>
                        <p>Email: <strong>suntory.aira@gmail.com</strong></p>
                    </div>
                </LayoutContent>
            </LayoutInner>
        </footer>
    )
}