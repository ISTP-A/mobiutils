"use client";

import { Controller, type FieldValues, type Path, useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui/input";

type Props<T extends FieldValues> = Omit<
    React.ComponentProps<typeof Input>,
    "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "ref"
> & {
    name: Path<T>;
    /** type="number"일 때 숫자 변환을 자동으로 하고 싶으면 true */
    valueAsNumber?: boolean;
};

export function RHFInput<T extends FieldValues>({
    name,
    valueAsNumber,
    ...props
}: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Input
                    {...props}
                    name={field.name}
                    ref={field.ref}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={(e: any) => {
                        if (valueAsNumber || props.type === "number") {
                            const n = e?.target?.valueAsNumber;
                            field.onChange(Number.isNaN(n) ? 0 : n);
                            return;
                        }
                        field.onChange(e?.target?.value ?? e);
                    }}
                />
            )}
        />
    );
}
