"use client";

import { RHFInput } from "@/shared/form/rhf-input";
import { RHFSelect } from "@/shared/form/rhf-select";
import { Field, FieldContent, FieldLabel } from "@/shared/ui/field";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { AwakeFormValues } from "../model/types";

const OPTIONS = [
    { value: "NONE", label: "없음" },
    { value: "NORMAL", label: "기본" },
    { value: "TRANS1", label: "1차초월" },
    { value: "TRANS2", label: "2차초월" },
    { value: "ETC", label: "직접입력" },
] as const;



export function CalcTypeField() {
    const { control } = useFormContext<AwakeFormValues>();
    const calcType = useWatch({ control, name: "calcType" });

    const isEtc = useMemo(() => calcType === "ETC", [calcType]);

    return (
        <Field>
            <FieldLabel>눈먼 예언자 여부</FieldLabel>
            <FieldContent className="grid grid-cols-2 gap-2">
                <RHFSelect<AwakeFormValues> name="calcType" options={[...OPTIONS]} />
                <div>
                    <RHFInput<AwakeFormValues>
                        name="etcValue"
                        type="number"
                        placeholder={!isEtc ? "입력 X" : "초 입력"}
                        valueAsNumber
                        disabled={!isEtc}
                    />
                </div>
            </FieldContent>
        </Field>
    );
}
