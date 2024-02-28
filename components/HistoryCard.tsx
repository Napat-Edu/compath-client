'use client'
import useLocalStorage from "./hooks/useLocalStorage";
import Image from "next/image";
import { displayDate, displayTime } from "./utils/utils";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function HistoryCard() {
    const localStorage = useLocalStorage();

    return (
        <section className="w-full">
            <section className="w-full flex mb-4">
                <Image
                    src='bookmark.svg'
                    alt='history-card icon'
                    height={0}
                    width={0}
                    className="mr-2 h-6 w-auto " />
                <h3 className="font-semibold text-lg">การ์ดที่ทำนายไว้</h3>
            </section>
            <ScrollArea>
                <div className="flex flex-row gap-4 my-4 justify-evenly">
                    {
                        localStorage.predictionHistory.map((history, idx) => {
                            return (
                                <Link href='/' key={"prediction-history-card" + idx}>
                                    <div className="border-gray-200 border-[1px] rounded-lg p-4 flex flex-col min-w-[296px] shadow-[0_2px_4px_0px_rgba(0,0,0,0.09)] hover:bg-gray-50 transition delay-75">
                                        <div className='flex gap-4 h-full w-full select-none flex-col rounded-md bg-gradient-to-b  from-white to-primary p-6 no-underline outline-none focus:shadow-md'>
                                            <div className="flex flex-row justify-between">
                                                <Image
                                                    src={`/career-icon/${history.result}.svg`}
                                                    alt={`${history.result} icon`}
                                                    height={0}
                                                    width={0}
                                                    className=" h-6 w-auto" />
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="border-[#E4E4E7] border-[1px] rounded-lg p-2 relative -right-2 -top-2 bg-white hover:bg-gray-100">
                                                        <Image
                                                            src='more-horizontal.svg'
                                                            alt='more shortcut detail icon'
                                                            height={0}
                                                            width={0}
                                                            className=" h-4 w-auto" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="rounded-lg">
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
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

                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </section>
    );
}