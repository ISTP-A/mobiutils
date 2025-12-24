import { ComponentProps } from "react";
import { cn } from "../lib/utils";

export function HeaderTitle({ className, children, ...props }: ComponentProps<'h1'>) {
    return <h1 className={cn("text-lg font-semibold", className)}{...props}>{children}</h1>
}


export function HeaderDescription({ className, children, ...props }: ComponentProps<'h1'>) {
    return <h1 className={cn("text-sm text-muted-foreground", className)}{...props}>{children}</h1>
}
