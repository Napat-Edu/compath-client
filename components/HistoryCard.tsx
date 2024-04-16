'use client'
import useLocalStorage from "../hooks/useLocalStorage";
import { displayDate, displayTime, mapCareerIcon } from "../utils/utils";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Icon from "./Icon";
import useSelectInsight from "@/hooks/useSelectInsight";
import { IPredictionHistory } from "@/interfaces/storage.interface";
import useSidebar from "@/hooks/useSidebar";
import { MouseEvent } from "react";

export default function HistoryCard() {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const sidebar = useSidebar();

    if (!localStorage.isStorageReady) {
        return null;
    }

    const handleDeleteCard = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, object_id: string) => {
        e.stopPropagation();
        localStorage.deleteHistory(object_id);
    };

    const handleCardClick = (history: IPredictionHistory) => {
        sidebar.setActiveTab(1);
        selectInsight.upDateSelectedInsight(history.career_path, history.object_id);
    };

    return (
        localStorage.predictionHistory.length > 0 &&
        <>
            <div className="flex flex-row mb-4 gap-[6px]">
                <Icon name={"BookMarked"} />
                <h3 className="font-semibold text-lg">การ์ดที่ทำนายไว้</h3>
            </div>
            <ScrollArea>
                <div className="flex flex-row gap-4 mb-4">
                    {
                        localStorage.predictionHistory.map((history, idx) => {
                            return (
                                <Link href='/career-insight' onClick={() => { handleCardClick(history) }} key={"prediction-history-card" + idx}>
                                    <div className="border-gray-200 border-[1px] rounded-lg p-4 flex flex-col min-w-[296px] shadow-[0_2px_4px_0px_rgba(0,0,0,0.09)] hover:bg-gray-50 transition delay-75">
                                        <div className='flex gap-4 h-full w-full select-none flex-col rounded-md bg-gradient-to-b  from-white to-primary p-6 no-underline outline-none focus:shadow-md'>
                                            <div className="flex flex-row justify-between">
                                                <Icon name={mapCareerIcon(history.career_path)} color="black" />
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="border-maingray border-[1px] rounded-lg p-2 relative -right-2 -top-2 bg-white hover:bg-gray-100">
                                                        <Icon name={"MoreHorizontal"} color="black" size={16} />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="rounded-lg">
                                                        <DropdownMenuItem>View</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-500" onClick={(e) => { handleDeleteCard(e, history.object_id) }}>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {history.career_path}
                                            </div>
                                            <div className="p-4 flex justify-between text-sm bg-white rounded-md">
                                                <div>
                                                    <p className="text-[#64748B] font-normal">วันที่</p>
                                                    <p>{displayDate(history.submit_date)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[#64748B] font-medium">เวลา</p>
                                                    <p>{displayTime(history.submit_date)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    );
}