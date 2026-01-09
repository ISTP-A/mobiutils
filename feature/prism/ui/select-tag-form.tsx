import { getSelectOptions, RHFSelect } from "@/shared/form/rhf-select";
import { Form } from "@/shared/ui/form";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { PRISM_TAGS } from "../model/prism.constants";
import { Button } from "@/shared/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/shared/ui/field";

export function SelectTagForm({
    onSubmit,
}: {
    onSubmit: (reault: any) => void
}) {
    const form = useForm()

    const prismValueOptions = useMemo(
        () => PRISM_TAGS.map((tag, idx) => getSelectOptions(`${idx}.${tag}`, tag)),
        []
    )

    const prismValueTypeOptions = useMemo(
        () => [getSelectOptions("뎀증", "damage"), getSelectOptions("쿨감", "cooltime")],
        []
    )

    const handleSubmit = form.handleSubmit(data => {
        onSubmit(data.tags)
    })

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <FieldGroup className="w-full grid grid-cols-3 gap-2">
                    <Field className="gap-1">
                        <FieldLabel>태그1</FieldLabel>
                        <FieldContent className="grid grid-cols-2 gap-1">
                            <RHFSelect
                                name="tags.0.tag"
                                options={prismValueOptions}
                            />
                            <RHFSelect
                                name="tags.0.type"
                                options={prismValueTypeOptions}
                            />
                        </FieldContent>
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel>태그2</FieldLabel>
                        <FieldContent className="grid grid-cols-2 gap-1">
                            <RHFSelect
                                name="tags.1.tag"
                                options={prismValueOptions}
                            />
                            <RHFSelect
                                name="tags.1.type"
                                options={prismValueTypeOptions}
                            />
                        </FieldContent>
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel>태그3</FieldLabel>
                        <FieldContent className="grid grid-cols-2 gap-1">
                            <RHFSelect
                                name="tags.2.tag"
                                options={prismValueOptions}
                            />
                            <RHFSelect
                                name="tags.2.type"
                                options={prismValueTypeOptions}
                            />
                        </FieldContent>
                    </Field>
                </FieldGroup>
                <div>
                    <Button className="w-full" type="submit">검색</Button>
                </div>
            </form>
        </Form>
    )
}