import { AbyssHolePage } from "@/screens/info/abysshole-page";
import { Metadata } from "next";
import axios from 'axios'
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "어비스로 뚫린 검은 구멍 예측시간",
    description: "어비스로 뚫린 검은 구멍을 예측한 시간 정보입니다",
};

export default async function AbyssHoleInfoPage() {
    const response = await axios.get(process.env.BASE_URL + '/api/info/abysshole')
    const data = await response.data

    return <AbyssHolePage lastObserve={data.appearance_time} />
}