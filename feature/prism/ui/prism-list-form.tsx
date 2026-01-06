"use client"

import { memo, useEffect, useMemo, useState } from "react"
import { useForm, useFormContext, useWatch } from "react-hook-form"
import pako from "pako"

import { Checkbox } from "@/shared/ui/checkbox"
import { Form } from "@/shared/ui/form"
import { Label } from "@/shared/ui/label"
import { Button } from "@/shared/ui/button"
import { Field, FieldContent, FieldLabel } from "@/shared/ui/field"
import { getSelectOptions, RHFSelect } from "@/shared/form/rhf-select"

import { getHeliodorValue, getPrismGuide, getPrismSelectOptions, getPrismValue } from "../lib/utils"

import {
    GREEN_HELIODOR_LABELS,
    PRISM_LEVEL_LABELS,
    PRISM_TAGS,
    STORAGE_KEY,
    YELLOW_HELIODOR_LABELS,
} from "../model/prism.constants"
import {
    greenHeliodorValue,
    PrismResult,
    yelloHeliodorValue,
    type HeliodorType,
    type PrismLevel,
} from "../model/prism.types"
import { cn } from "@/shared/lib/utils"
import { toast } from "sonner"

const TOTAL_SLOTS = 22
const PRISM_INDEXES = Array.from({ length: TOTAL_SLOTS }, (_, i) => i)

const YELLO_LOCK_INDEX = 0
const GREEN_LOCK_INDEX = 3

// ===== 공유(압축) 설정 =====
const SHARE_HASH_KEY = "d" // #d=...
const SHARE_VERSION_PREFIX = "v1." // 토큰 버전 (나중에 포맷 바뀌면 v2로 올리기)

// ===== 공유(압축) 유틸 =====
function bytesToBase64(bytes: Uint8Array) {
    let binary = ""
    const chunkSize = 0x8000
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
    }
    return btoa(binary)
}

function base64ToBytes(base64: string) {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return bytes
}

function toBase64Url(base64: string) {
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function fromBase64Url(b64url: string) {
    const base64 = b64url.replace(/-/g, "+").replace(/_/g, "/")
    const pad = base64.length % 4
    return base64 + (pad ? "=".repeat(4 - pad) : "")
}

/** JSON -> deflate -> base64url */
function encodeShare<T>(data: T) {
    const json = JSON.stringify(data)
    const compressed = pako.deflate(json)
    const b64 = bytesToBase64(compressed)
    return SHARE_VERSION_PREFIX + toBase64Url(b64)
}

/** base64url -> inflate -> JSON */
function decodeShare<T>(token: string): T {
    if (!token.startsWith(SHARE_VERSION_PREFIX)) {
        throw new Error("Unsupported token version")
    }
    const payload = token.slice(SHARE_VERSION_PREFIX.length)
    const b64 = fromBase64Url(payload)
    const bytes = base64ToBytes(b64)
    const json = pako.inflate(bytes, { to: "string" }) as string
    return JSON.parse(json) as T
}

function readTokenFromHash(): string | null {
    const raw = window.location.hash?.replace(/^#/, "") ?? ""
    if (!raw) return null
    const params = new URLSearchParams(raw)
    const token = params.get(SHARE_HASH_KEY)
    if (token) return token

    // 혹시 #v1.xxxxx 형태로 들어오는 케이스도 허용
    if (raw.startsWith(SHARE_VERSION_PREFIX)) return raw
    return null
}

type PrismRow = {
    type: PrismLevel | ""
    value1: string
    value2: string
    value3: string
}

type HeliodorState = {
    enabled: boolean
    level: PrismLevel
}

type FormValues = {
    heliodor: Record<HeliodorType, HeliodorState>
    prism: PrismRow[]
}

const createEmptyPrism = (): PrismRow => ({ type: "", value1: "", value2: "", value3: "" })
const isEmptyPrism = (row?: PrismRow) => !row?.type && !row?.value1 && !row?.value2 && !row?.value3

function getPrismResult(datas: FormValues): PrismResult {
    const map = new Map<string, number>()
    const isSelected = (value: unknown) => value !== "" && value !== undefined && value !== null

    const greenEnabled = datas.heliodor.green.enabled
    const yelloEnabled = datas.heliodor.yello.enabled

    const greenBonus = greenEnabled ? getHeliodorValue("green", datas.heliodor.green.level) : 0
    const yelloBonus = yelloEnabled ? getHeliodorValue("yello", datas.heliodor.yello.level) : 0
    const heliodorBonus = greenBonus + yelloBonus

    datas.prism.forEach((row) => {
        if (row.type !== "") {
            const stat = getPrismValue(row.type)
            if (isSelected(row.value1)) map.set(row.value1, (map.get(row.value1) ?? 0) + stat)
            if (isSelected(row.value2)) map.set(row.value2, (map.get(row.value2) ?? 0) + stat)
            if (isSelected(row.value3)) map.set(row.value3, (map.get(row.value3) ?? 0) + stat)
        }
    })

    return Array.from(map).map(([label, value]) => [label, value + heliodorBonus])
}

const formDefaultValue: FormValues = {
    heliodor: {
        yello: { enabled: false, level: "l1" },
        green: { enabled: false, level: "l1" },
    } as Record<HeliodorType, HeliodorState>,
    prism: Array.from({ length: TOTAL_SLOTS }, () => createEmptyPrism()),
}

interface PrismListFormProps {
    onSubmit?: (datas: PrismResult) => void
}

export function PrismListForm({ onSubmit }: PrismListFormProps) {
    const form = useForm<FormValues>({
        defaultValues: formDefaultValue,
        mode: "onChange",
    })

    const { control, setValue, getValues } = form

    const [shareInput, setShareInput] = useState("")

    const yEnabled = useWatch({ control, name: "heliodor.yello.enabled" })
    const gEnabled = useWatch({ control, name: "heliodor.green.enabled" })

    const lockedSet = useMemo(() => {
        const s = new Set<number>()
        if (yEnabled) s.add(YELLO_LOCK_INDEX) // 1번 슬롯
        if (gEnabled) s.add(GREEN_LOCK_INDEX) // 4번 슬롯
        return s
    }, [yEnabled, gEnabled])

    useEffect(() => {
        const current = getValues("prism") ?? []

        let needsReset = false
        for (const idx of lockedSet) {
            if (!isEmptyPrism(current[idx])) {
                needsReset = true
                break
            }
        }
        if (!needsReset) return

        const next = current.map((row, i) => (lockedSet.has(i) ? createEmptyPrism() : row))
        setValue("prism", next, { shouldDirty: true, shouldTouch: true })
    }, [lockedSet, getValues, setValue])

    useEffect(() => {
        const token = readTokenFromHash()
        if (!token) return

        try {
            const data = decodeShare<FormValues>(token)
            form.reset(data)
            toast.info("공유 링크 데이터를 적용했습니다")
        } catch (e) {
            console.error(e)
            toast.error("공유 링크를 해석할 수 없습니다")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const greenHeliodorSelectOptions = useMemo(() => getPrismSelectOptions(GREEN_HELIODOR_LABELS), [])
    const yellowHeliodorSelectOptions = useMemo(() => getPrismSelectOptions(YELLOW_HELIODOR_LABELS), [])
    const prismLevelSelectOptions = useMemo(() => getPrismSelectOptions(PRISM_LEVEL_LABELS), [])

    const prismValueOptions = useMemo(
        () => PRISM_TAGS.map((tag, idx) => getSelectOptions(`${idx}.${tag}`, tag)),
        []
    )

    const handleSubmit = form.handleSubmit((_data) => {
        onSubmit?.(getPrismResult(_data))
    })

    const getLockReason = (index: number) => {
        if (index === YELLO_LOCK_INDEX && yEnabled) return "헬리오도르 적용 중"
        if (index === GREEN_LOCK_INDEX && gEnabled) return "그린 헬리오도르 적용 중"
        return "잠금"
    }

    const handleLoad = () => {
        const loadData = localStorage.getItem(STORAGE_KEY)
        if (loadData) {
            form.reset(JSON.parse(loadData))
            toast.info("성공적으로 불러왔습니다")
        } else {
            toast.error("불러오기에 실패했습니다")
        }
    }

    const handleSave = () => {
        const datas = form.getValues()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(datas))
        toast.info("저장되었습니다")
    }

    const handleCopyShareLink = async () => {
        try {
            const values = form.getValues()
            const token = encodeShare(values)

            const url = new URL(window.location.href)
            url.hash = `${SHARE_HASH_KEY}=${token}`

            const shareUrl = url.toString()

            // clipboard가 안 되는 환경 대비
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl)
                toast.info("공유 링크를 복사했습니다")
            } else {
                window.prompt("아래 링크를 복사하세요", shareUrl)
            }
        } catch (e) {
            console.error(e)
            toast.error("공유 링크 생성에 실패했습니다")
        }
    }

    const handleApplyShareInput = () => {
        const text = shareInput.trim()
        if (!text) {
            toast.error("붙여넣은 링크(또는 토큰)가 없습니다")
            return
        }

        try {
            let token: string | null = null

            // 1) 전체 URL이면 hash에서 d 추출
            if (text.startsWith("http://") || text.startsWith("https://")) {
                const u = new URL(text)
                const rawHash = u.hash.replace(/^#/, "")
                const params = new URLSearchParams(rawHash)
                token = params.get(SHARE_HASH_KEY)
                if (!token && rawHash.startsWith(SHARE_VERSION_PREFIX)) token = rawHash
            } else {
                // 2) 토큰만 붙여넣은 경우(v1....) 또는 d=... 형태
                if (text.startsWith(`${SHARE_HASH_KEY}=`)) token = text.slice(`${SHARE_HASH_KEY}=`.length)
                else token = text
            }

            if (!token) {
                toast.error("공유 토큰을 찾을 수 없습니다")
                return
            }

            const data = decodeShare<FormValues>(token)
            form.reset(data)
            toast.info("공유 데이터가 적용되었습니다")
        } catch (e) {
            console.error(e)
            toast.error("공유 링크를 해석할 수 없습니다")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <Field className="border px-4 py-6 rounded-md bg-accent shadow">
                    <FieldLabel>공유옵션</FieldLabel>
                    <FieldContent className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-2">
                            <Button size="lg" type="button" onClick={handleSave}>
                                저장하기
                            </Button>
                            <Button variant="outline" size="lg" type="button" onClick={handleLoad}>
                                가져오기
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <Button size="lg" type="button" onClick={handleCopyShareLink}>
                                공유 링크 복사(압축)
                            </Button>
                            <Button variant="outline" size="lg" type="button" onClick={handleApplyShareInput}>
                                붙여넣은 링크 적용
                            </Button>
                        </div>

                        <input
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            placeholder="공유 링크(또는 v1.로 시작하는 토큰)를 붙여넣으세요"
                            value={shareInput}
                            onChange={(e) => setShareInput(e.target.value)}
                        />
                    </FieldContent>
                </Field>

                <Field>
                    <FieldLabel className="text-lg">헬리오도르</FieldLabel>
                    <FieldContent className="grid grid-cols-2 gap-2">
                        <HeliodorItem type="yello" levelOptions={yellowHeliodorSelectOptions} />
                        <HeliodorItem type="green" levelOptions={greenHeliodorSelectOptions} />
                    </FieldContent>
                </Field>

                <hr />

                <Field>
                    <FieldLabel className="text-lg">스타프리즘</FieldLabel>
                    <FieldContent className="flex flex-col gap-6">
                        {PRISM_INDEXES.map((index) => {
                            const disabled = lockedSet.has(index)
                            const lockReason = disabled ? getLockReason(index) : undefined

                            return (
                                <PrismItem
                                    key={index}
                                    index={index}
                                    disabled={disabled}
                                    lockReason={lockReason}
                                    prismLevelOptions={prismLevelSelectOptions}
                                    prismValueOptions={prismValueOptions}
                                />
                            )
                        })}
                    </FieldContent>
                </Field>

                <div className="grid grid-cols-1 gap-1">
                    <Button size="lg" type="submit">
                        계산하기
                    </Button>
                </div>
            </form>
        </Form>
    )
}

interface HeliodorItemProps {
    type: HeliodorType
    levelOptions: { label: string; value: string }[]
}

function HeliodorItem({ type, levelOptions }: HeliodorItemProps) {
    const form = useFormContext<FormValues>()
    const { control, setValue } = form

    const enabled = useWatch({ control, name: `heliodor.${type}.enabled` })
    const level = useWatch({ control, name: `heliodor.${type}.level` })

    const title = type === "yello" ? "헬리오도르" : "그린 헬리오도르"
    const desc = type === "yello" ? "데미지" : "스킬 데미지"

    const value = type === "yello" ? yelloHeliodorValue[level ?? "l1"] : greenHeliodorValue[level ?? "l1"]

    return (
        <div className="flex flex-col items-stretch gap-2">
            <Label
                className={cn(
                    "flex flex-1 items-start gap-3 rounded-lg border p-3 hover:bg-accent/50",
                    "has-aria-checked:border-blue-600",
                    "has-aria-checked:bg-blue-50"
                )}
            >
                <Checkbox
                    checked={Boolean(enabled)}
                    onCheckedChange={(v) => {
                        const next = Boolean(v)
                        setValue(`heliodor.${type}.enabled`, next, { shouldDirty: true, shouldTouch: true })
                        if (!next) setValue(`heliodor.${type}.level`, "l1", { shouldDirty: true })
                    }}
                />
                <div className="flex flex-col gap-1">
                    <p>{title} 적용</p>
                    <p className="font-normal text-muted-foreground">
                        {desc} ({value.toFixed(1)}%)
                    </p>
                </div>
            </Label>

            <div className="w-full">
                <RHFSelect name={`heliodor.${type}.level`} options={levelOptions} disabled={!enabled} />
            </div>
        </div>
    )
}

interface PrismItemProps {
    index: number
    disabled: boolean
    lockReason?: string
    prismLevelOptions: { label: string; value: string }[]
    prismValueOptions: { label: string; value: string }[]
}

const PrismItem = memo(
    function PrismItem({ index, disabled, lockReason, prismLevelOptions, prismValueOptions }: PrismItemProps) {
        const indexNumber = index + 1

        return (
            <Field>
                <FieldLabel className="flex items-center gap-2">
                    <span>
                        슬롯{indexNumber} ({getPrismGuide(indexNumber)})
                    </span>

                    {disabled && <span className="text-sm font-normal text-muted-foreground">· {lockReason}</span>}
                </FieldLabel>

                <FieldContent className={cn("grid grid-cols-4 gap-2", disabled && "opacity-60")}>
                    {disabled ? (
                        <div className="col-span-4 rounded-md border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                            {lockReason} 상태라 이 슬롯은 사용할 수 없습니다.
                        </div>
                    ) : (
                        <>
                            <RHFSelect placeholder="보석등급선택" name={`prism.${index}.type`} options={prismLevelOptions} />
                            <RHFSelect placeholder="태그선택" name={`prism.${index}.value1`} options={prismValueOptions} />
                            <RHFSelect placeholder="태그선택" name={`prism.${index}.value2`} options={prismValueOptions} />
                            <RHFSelect placeholder="태그선택" name={`prism.${index}.value3`} options={prismValueOptions} />
                        </>
                    )}
                </FieldContent>
            </Field>
        )
    },
    (prev, next) =>
        prev.index === next.index &&
        prev.disabled === next.disabled &&
        prev.lockReason === next.lockReason &&
        prev.prismLevelOptions === next.prismLevelOptions &&
        prev.prismValueOptions === next.prismValueOptions
)
