import { ValidTag } from "../model/prism.constants";

export function PrismTagItem(props: { tag: ValidTag }) {
    const { tag } = props
    return (
        <div className="flex items-center gap-1">
            <div>{tag.tag}</div>
            <div>|</div>
            <div>{tag.value}</div>
        </div>
    )
}