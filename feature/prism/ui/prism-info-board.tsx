import { Field, FieldContent, FieldLabel } from "@/shared/ui/field";
import { PrismResult } from "../model/prism.types";

interface PrismInfoBoardProps {
    data: PrismResult;
}

export function PrismInfoBoard({ data }: PrismInfoBoardProps) {
    return (
        <Field>
            <FieldLabel>세공정보</FieldLabel>
            <FieldContent className="grid grid-cols-3 gap-2">
                {data.map(([tag, value], idx) => (
                    <div
                        key={'result' + idx}
                        className="p-2 border rounded-md bg-accent text-sm"
                    >
                        <span>{tag}</span> <strong>{value.toFixed(2)}%</strong>
                    </div>
                ))}
            </FieldContent>
        </Field>
    )
}