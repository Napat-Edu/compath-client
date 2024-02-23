'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useLocalStorage from "./hooks/useLocalStorage";
import useSelectInsight from "./hooks/useSelectInsight";
import { useEffect, useState } from "react";
import Image from "next/image";

export function InsightSelect() {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const [currentSelectCareer, setCurrentSelectCareer] = useState<string>();

    const handleHistoryChange = (id: string) => {
        setCurrentSelectCareer(id);
        selectInsight.upDateSelectedInsight(localStorage.findPredictionHistory(id));
    };

    const displayDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toDateString();
    };

    const displayTime = (dateString: string) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time = `${hours}:${minutes}:${seconds}`;
        return time;
    }

    useEffect(() => {
        if (localStorage.isStorageReady && localStorage.predictionHistory.length) {
            const latestHistory = localStorage.getLatestHistory();
            setCurrentSelectCareer(latestHistory.objectId);
            selectInsight.upDateSelectedInsight(latestHistory.result);
        }
    }, [localStorage.isStorageReady]);

    return (
        localStorage.isStorageReady &&
        <Select onValueChange={(id) => { handleHistoryChange(id) }} value={currentSelectCareer}>
            <Image
            src="resume.svg"
            alt="resume icon"
            height={0}
            width={0}
            className="mx-auto h-[32px] w-auto" />
            <h3 className="text-center">การ์ดสายทำนาย</h3>
            <SelectTrigger className="w-[492px] py-2">
                <SelectValue placeholder="เลือกการ์ดทำนาย" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>ผลลัพธ์และวันที่ทำการทำนาย</SelectLabel>
                    {
                        localStorage.predictionHistory.map((history, idx) => {
                            return (
                                <SelectItem value={history.objectId} key={"history-" + history.result + idx}>
                                    {history.result} - {displayTime(history.submitDate)} - {displayDate(history.submitDate)}
                                </SelectItem>
                            );
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
