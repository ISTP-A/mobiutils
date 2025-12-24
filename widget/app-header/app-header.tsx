"use client"

import { LayoutInner } from "@/shared/layout/layout";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui/drawer";
import { Label } from "@/shared/ui/label";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

export function AppHeader() {
    return (
        <LayoutInner className="h-14 border-b justify-center">
            <MenuNavigation />
        </LayoutInner>
    )
}

function MenuNavigation() {
    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <Menu size={20} />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="border-b">
                    <DrawerTitle>메뉴를 선택해주세요</DrawerTitle>
                    <DrawerDescription>Version 0.0.1</DrawerDescription>
                </DrawerHeader>
                <LayoutInner className="py-6">
                    <MenuGroup groupName="계산기">
                        <MenuItem href="/timer/awake">각성시간 계산기</MenuItem>
                        {/* <MenuItem href="/timer/awake">각성시간 계산기</MenuItem> */}
                        {/* <MenuItem href="/timer/awake">각성시간 계산기</MenuItem> */}
                        {/* <MenuItem href="/timer/awake">각성시간 계산기</MenuItem> */}
                        {/* <MenuItem href="/timer/awake">각성시간 계산기</MenuItem> */}
                    </MenuGroup>
                </LayoutInner>
            </DrawerContent>
        </Drawer>
    )
}

export function MenuGroup({ className, children, groupName, ...props }: ComponentProps<'div'> & { groupName: string }) {
    return (
        <div className={cn('', className)} {...props}>
            <Label className="mb-2">{groupName}</Label>
            <ul className={cn("flex flex-col gap-1", "pl-6")}>{children}</ul>
        </div>
    )
}

export function MenuItem({ className, href, ...props }: ComponentProps<typeof Link>) {
    return (
        <li className={cn('py-1 list-disc', className)}>
            <Link className={cn('hover:font-semibold')} href={href} {...props} />
        </li>
    )
}