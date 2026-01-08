import { getSelectOptions, RHFSelect } from "@/shared/form/rhf-select";
import { Form } from "@/shared/ui/form";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { PRISM_TAGS } from "../model/prism.constants";
import { Button } from "@/shared/ui/button";

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
                className="flex flex-col gap-2"
                onSubmit={handleSubmit}
            >
                <div className="w-full grid grid-cols-3 gap-2">
                    <div className="grid grid-cols-2 gap-1">
                        <RHFSelect name="tags.0.tag" options={prismValueOptions} />
                        <RHFSelect name="tags.0.type" options={prismValueTypeOptions} />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <RHFSelect name="tags.1.tag" options={prismValueOptions} />
                        <RHFSelect name="tags.1.type" options={prismValueTypeOptions} />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <RHFSelect name="tags.2.tag" options={prismValueOptions} />
                        <RHFSelect name="tags.2.type" options={prismValueTypeOptions} />
                    </div>
                </div>
                <div>
                    <Button className="w-full" type="submit">검색</Button>
                </div>
            </form>
        </Form>
    )
}