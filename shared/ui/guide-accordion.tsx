import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

interface Guide {
    id: string
    title: string
    guides: string[]
}

export function GuideAccordion({ id, title, guides }: Guide) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={id}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent className="text-secondary-foreground">
                    {guides.map((guide, idx) => (
                        <p key={id + idx}>{guide}</p>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}