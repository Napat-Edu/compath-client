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
import Icon from "./Icon";
import { mapCareerIcon } from "../utils/utils";
import useSidebar from "@/hooks/useSidebar";
import Link from "next/link";

export function InsightSelect() {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const sidebar = useSidebar();
    const [currentSelectCareer, setCurrentSelectCareer] = useState<string>();

    const handleHistoryChange = (id: string) => {
        setCurrentSelectCareer(id);
        const foundedHistory = localStorage.findPredictionHistory(id);
        selectInsight.upDateSelectedInsight(foundedHistory.career_path, foundedHistory.object_id);
    };

    const handleCreateSelectClick = () => {
        sidebar.setActiveTab(0);
    };

    useEffect(() => {
        if (localStorage.isStorageReady && localStorage.predictionHistory.length) {
            let focusHistory = selectInsight.selectedInsight;
            if (focusHistory.object_id === '') {
                focusHistory = localStorage.getLatestHistory();
            }
            setCurrentSelectCareer(focusHistory.object_id);
            selectInsight.upDateSelectedInsight(focusHistory.career_path, focusHistory.object_id);
        }
    }, [localStorage.isStorageReady]);

    return (
        (localStorage.isStorageReady && localStorage.predictionHistory.length > 0) &&
        <div className="flex flex-col md:flex-row gap-4 justify-between border-maingray border-[1px] rounded-3xl p-6 leading-9 max-w-3xl mt-4">
            <Select onValueChange={(id) => { handleHistoryChange(id) }} value={currentSelectCareer}>
                <div className="flex gap-1 min-w-fit">
                    <Icon name={"BookMarked"} className="my-auto" />
                    <h3 className="text-center font-semibold">การ์ดที่ทำนายไว้</h3>
                </div>
                <SelectTrigger className="w-full py-2 flex flex-row">
                    <div className="w-full">
                        <SelectValue className="w-full" placeholder="เลือกการ์ดทำนาย" />
                    </div>
                </SelectTrigger>
                <SelectContent className="w-full">
                    <SelectGroup>
                        <SelectLabel className="flex flex-row w-full pr-8">
                            <p className="basis-3/5 sm:basis-2/5 text-left">สายอาชีพ</p>
                            <p className="basis-2/5 sm:basis-1/5 text-left">เวลาที่ทำนาย</p>
                            <p className="basis-2/5 text-left hidden sm:block">วันที่ทำนาย</p>
                        </SelectLabel>
                        {
                            localStorage.predictionHistory.map((history, idx) => {
                                return (
                                    <SelectItem value={history.object_id} key={"history-" + history.career_path + idx}>
                                        <div className="flex flex-row items-center">
                                            <p className="flex flex-row items-center gap-2 basis-3/5 sm:basis-2/5 text-left truncate">
                                                <Icon name={mapCareerIcon(history.career_path)} color="black" strokeWidth={1} size={16} />
                                                {history.career_path}
                                            </p>
                                            <p className="basis-2/5 sm:basis-1/5 text-left">{displayTime(history.submit_date)}</p>
                                            <p className="basis-2/5 text-left hidden sm:block">{displayDate(history.submit_date)}</p>
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        <Separator className="my-1" />
                        <Link href="/" onClick={handleCreateSelectClick}>
                            <SelectLabel className="flex flex-row gap-2 items-center">
                                <Icon name={"PlusSquare"} size={16} />
                                เพิ่มการ์ดทำนายใหม่
                            </SelectLabel>
                        </Link>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
