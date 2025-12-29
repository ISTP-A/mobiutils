import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion"
import { Gauge } from "lucide-react"
import { ReactNode } from "react"
import { breakList } from "../datas"
import { BreakGroup, BreakItem } from "../model/break.types"

export function BreakList() {

    return (
        <div className="flex flex-col gap-4 divide-y">
            {breakList.map((group) => (
                <DungeonGroup
                    key={group.id}
                    group={group}
                >
                    {group.items.map(item => (
                        <BreakGuageItem
                            key={item.id}
                            {...item}
                        />
                    ))}
                </DungeonGroup>
            ))}
        </div>
    )
}

interface DungeonGroupProps {
    group: BreakGroup
    children?: ReactNode
}

function DungeonGroup({ group, children }: DungeonGroupProps) {
    return (
        <Accordion type='multiple'>
            <AccordionItem value={group.id}>
                <AccordionTrigger className="px-4 relative">
                    <h2 className="text-xl font-semibold">{group.name}</h2>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 px-4">
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

function BreakGuageItem({ id, location, named, gauge }: BreakItem) {
    return (
        <div
            id={id}
            className="p-4 border flex items-center justify-between rounded-md bg-accent"
        >
            <div>
                <p className="text-sm text-muted-foreground">{location}</p>
                <p className="text-lg text-accent-foreground font-semibold">{named}</p>
            </div>
            <p className="flex items-center gap-1 border rounded-md py-1 px-4 bg-white shadow">
                <Gauge size={16} />
                <span className="font-semibold">{gauge}</span>
            </p>
        </div>
    )
}