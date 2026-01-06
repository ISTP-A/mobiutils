"use client";

import { Controller, type FieldValues, type Path, useFormContext } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

export type SelectOption = { value: string; label: string };

export const getSelectOptions = (label: string, value: string): SelectOption => ({ label: label, value: value })

type Props<T extends FieldValues> = {
    name: Path<T>;
    placeholder?: string;
    options: SelectOption[];
    disabled?: boolean;
};

export function RHFSelect<T extends FieldValues>({
    name,
    placeholder = "선택",
    options,
    disabled,
}: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={disabled}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
}
