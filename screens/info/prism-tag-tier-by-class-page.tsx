"use client"

import { RankClassesByTagsBoard } from "@/feature/prism/ui/rank-classes-by-tags"
import { SelectTagForm } from "@/feature/prism/ui/select-tag-form"
import { useState } from "react"


export function PrismTagTierByClassPage() {
    const [ranks, setRanks] = useState([])
    return (
        <div className="w-full flex flex-col gap-4">
            <SelectTagForm onSubmit={setRanks} />
            {ranks && <RankClassesByTagsBoard tags={ranks} />}
        </div>
    )
}