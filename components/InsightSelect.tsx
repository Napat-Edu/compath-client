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

    useEffect(() => {
        if (localStorage.isStorageReady && localStorage.predictionHistory.length) {
            const latestHistory = localStorage.getLatestHistory();
            setCurrentSelectCareer(latestHistory.object_id);
            selectInsight.upDateSelectedInsight(latestHistory.career_path, latestHistory.object_id);
        }
    }, [localStorage.isStorageReady]);

    return (
        localStorage.isStorageReady &&
        <Select onValueChange={(id) => { handleHistoryChange(id) }} value={currentSelectCareer}>
            <SelectTrigger className="w-52">
                <SelectValue placeholder="เลือกการ์ดทำนาย" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>ผลลัพธ์และวันที่ทำการทำนาย</SelectLabel>
                    {
                        localStorage.predictionHistory.map((history, idx) => {
                            return (
                                <SelectItem value={history.object_id} key={"history-" + history.result + idx}>
                                    {history.result} - {displayDate(history.submit_date)}
                                </SelectItem>
                            );
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
