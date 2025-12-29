"use client";

import { Field, FieldContent, FieldLabel } from "@/shared/ui/field";
import { RHFInput } from "@/shared/form/rhf-input";
import type { AwakeFormValues } from "../model/types";

export function StartTimeField() {
    return (
        <Field>
            <FieldLabel>전투시작시간</FieldLabel>
            <FieldContent className="grid grid-cols-2 gap-2">
                <RHFInput<AwakeFormValues>
                    name="startTime.min"
                    type="number"
                    placeholder="분"
                    valueAsNumber
                />
                <RHFInput<AwakeFormValues>
                    name="startTime.sec"
                    type="number"
                    placeholder="초"
                    valueAsNumber
                />
            </FieldContent>
        </Field>
    );
}
