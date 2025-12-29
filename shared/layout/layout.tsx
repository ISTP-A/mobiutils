import { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/utils";

export function GlobalLayout({ children }: { children?: ReactNode }) {
    return (
        <main className="flex flex-col mx-auto max-w-screen-sm bg-white min-h-screen">
            {children}
        </main>
    )
}

export function LayoutInner({ className, children, ...props }: ComponentProps<'div'>) {
    return <div className={cn("px-4 flex flex-col flex-1 gap-10", className)} {...props}>{children}</div>
}

export function LayoutHeader({ className, children, ...props }: ComponentProps<'header'>) {
    return <header className={cn("flex flex-col gap-2 items-center justify-center min-h-40 border-b", className)} {...props}>{children}</header>
}

export function LayoutContent({ className, children, ...props }: ComponentProps<'div'>) {
    return <div className={cn("flex flex-col flex-1 py-8", className)} {...props}>{children}</div>
}

export function LayoutFooter({ className, children, ...props }: ComponentProps<'footer'>) {
    return <footer className={cn("", className)} {...props}>{children}</footer>
}