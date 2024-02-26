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

import useLocalStorage from "./hooks/useLocalStorage";
import useSelectInsight from "./hooks/useSelectInsight";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        let ampm = 'AM'
        let hours = date.getHours();
        const minutes = date.getMinutes();

        if (hours == 12) {
            ampm = 'PM'
        } else if (hours == 0) {
            hours = 12
        } else if (hours > 12) {
            hours -= 12
            ampm = 'PM'
        }

        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return time;
    }

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
            <Image
                src="resume.svg"
                alt="resume icon"
                height={0}
                width={0}
                className="mx-auto h-6 w-auto m-1" />
            <h3 className="text-center font-semibold">การ์ดสายทำนาย</h3>
            <SelectTrigger className="w-[492px] py-2">
                <SelectValue placeholder="เลือกการ์ดทำนาย" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="flex flex-row">
                        <p className="basis-[35%] text-left">สายอาชีพ</p>
                        <p className="basis-[24%] text-left">เวลาที่ทำนาย</p>
                        <p className="text-left">วันที่ทำนาย</p>
                    </SelectLabel>
                    {
                        localStorage.predictionHistory.map((history, idx) => {
                            return (
                                <SelectItem value={history.object_id} key={"history-" + history.result + idx}>
                                    <div className="flex flex-row justify-evenly gap-2 w-96">
                                        <p className="basis-3/6 text-left">
                                            <Image
                                                src={`/career-icon/${history.result}.svg`}
                                                alt={`${history.result} icon`}
                                                height={0}
                                                width={0}
                                                className="mr-2 h-4 w-auto float-left" />
                                            {history.result}
                                        </p>
                                        <p className="basis-2/6">{displayTime(history.submit_date)}</p>
                                        <p className="basis-2/6">{displayDate(history.submit_date)}</p>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    <Separator className="my-1" />
                    <Link href='/'>
                        <SelectLabel className="flex flex-row">
                            <Image
                                src="more-predict.svg"
                                alt="more career prediction icon"
                                height={0}
                                width={0}
                                className="mr-2 h-4 w-auto float-left" />
                            เพิ่มการ์ดทำนายใหม่
                        </SelectLabel>
                    </Link>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
