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
import { Separator } from "@/components/ui/separator"
import { displayDate, displayTime } from "../utils/utils";
import useLocalStorage from "../hooks/useLocalStorage";
import useSelectInsight from "../hooks/useSelectInsight";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { mapCareerIcon } from "../utils/utils";

export function InsightSelect() {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const [currentSelectCareer, setCurrentSelectCareer] = useState<string>();

    const handleHistoryChange = (id: string) => {
        setCurrentSelectCareer(id);
        const foundedHistory = localStorage.findPredictionHistory(id);
        selectInsight.upDateSelectedInsight(foundedHistory.career_path, foundedHistory.object_id);
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
        <div className="border-[#E4E4E7] border-[1px] rounded-3xl flex flex-row gap-4 p-6 leading-9 justify-between">
            <Select onValueChange={(id) => { handleHistoryChange(id) }} value={currentSelectCareer}>
                <Icon name={"Newspaper"} />
                <h3 className="text-center font-semibold">การ์ดสายทำนาย</h3>
                <SelectTrigger className="w-[492px] py-2 flex flex-row">
                    <div className="w-full">
                        <SelectValue className="w-full" placeholder="เลือกการ์ดทำนาย" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel className="flex flex-row w-full pr-8">
                            <p className="basis-2/5 text-left">สายอาชีพ</p>
                            <p className="basis-1/5 text-left">เวลาที่ทำนาย</p>
                            <p className="basis-2/5 text-left">วันที่ทำนาย</p>
                        </SelectLabel>
                        {
                            localStorage.predictionHistory.map((history, idx) => {
                                return (
                                    <SelectItem value={history.object_id} key={"history-" + history.result + idx}>
                                        <div className="flex flex-row items-center">
                                            <p className="flex flex-row items-center gap-1 basis-2/5 text-left truncate">
                                                <Icon name={mapCareerIcon(history.result)} color="black" strokeWidth={1} />
                                                {history.result}
                                            </p>
                                            <p className="basis-1/5 text-left">{displayTime(history.submit_date)}</p>
                                            <p className="basis-2/5 text-left">{displayDate(history.submit_date)}</p>
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        <Separator className="my-1" />
                        <Link href='/'>
                            <SelectLabel className="flex flex-row gap-1 items-center">
                                <Icon name={"PlusSquare"} />
                                เพิ่มการ์ดทำนายใหม่
                            </SelectLabel>
                        </Link>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
