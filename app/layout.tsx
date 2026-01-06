import type { Metadata } from "next";
import { pretendard } from "./fonts/fonts";
import "./globals.css";
import { GlobalLayout } from "@/shared/layout/layout";
import { AppHeader } from "@/widget/app-header/app-header";
import { AppFooter } from "@/widget/app-footer/app-footer";
import { Toaster } from "@/shared/ui/sonner";

export const metadata: Metadata = {
  title: "모바일 마비노기 유틸",
  description: "제작자: 아이라/이직기원N일차",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body
        className={`${pretendard.className} antialiased bg-gray-100`}
      >
        <GlobalLayout>
          <AppHeader />
          {children}
          <AppFooter />
        </GlobalLayout>
        <Toaster />
      </body>
    </html>
  );
}
