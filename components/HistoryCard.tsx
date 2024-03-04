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

export default function HistoryCard() {
    const localStorage = useLocalStorage();

    if (!localStorage.isStorageReady) {
        return null;
    }

    const handleDeleteCard = (object_id: string) => {
        localStorage.deleteHistory(object_id);
    };

    return (
        localStorage.predictionHistory.length > 0 &&
        <ScrollArea>
            <div className="flex flex-row gap-4 mb-4">
                {
                    localStorage.predictionHistory.map((history, idx) => {
                        return (
                            <Link href='#' key={"prediction-history-card" + idx}>
                                <div className="border-gray-200 border-[1px] rounded-lg p-4 flex flex-col min-w-[296px] shadow-[0_2px_4px_0px_rgba(0,0,0,0.09)] hover:bg-gray-50 transition delay-75">
                                    <div className='flex gap-4 h-full w-full select-none flex-col rounded-md bg-gradient-to-b  from-white to-primary p-6 no-underline outline-none focus:shadow-md'>
                                        <div className="flex flex-row justify-between">
                                            <Icon name={mapCareerIcon(history.result)} color="black" />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="border-maingray border-[1px] rounded-lg p-2 relative -right-2 -top-2 bg-white hover:bg-gray-100">
                                                    <Icon name={"MoreHorizontal"} color="black" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="rounded-lg">
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500" onClick={() => { handleDeleteCard(history.object_id) }}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className="text-lg font-semibold">
                                            {history.result}
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
    );
}