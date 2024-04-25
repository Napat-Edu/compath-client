'use client'
import useLocalStorage from "../hooks/useLocalStorage";
import { displayDate, displayTime, mapCareerIcon } from "../utils/utils";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Icon from "./Icon";
import useSelectInsight from "@/hooks/useSelectInsight";
import { IPredictionHistory } from "@/interfaces/storage.interface";
import useSidebar from "@/hooks/useSidebar";
import { MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import ConfirmAlertDialog from "./ConfirmAlertDialog";

export default function HistoryCard() {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const sidebar = useSidebar();

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [focusHistory, setFocusHistory] = useState('');

    if (!localStorage.isStorageReady) {
        return null;
    }

    const handleDeleteButtonClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, object_id: string) => {
        e.stopPropagation();
        e.preventDefault();
        setIsConfirmOpen(true);
        setFocusHistory(object_id);
    };

    const handleDeleteCard = (object_id: string) => {
        localStorage.deleteHistory(object_id);
        setIsConfirmOpen(false);
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
                                <Link href='/career-insight' onClick={(e) => { handleCardClick(history); }} key={"prediction-history-card" + idx}>
                                    <div className="border border-gray-200 rounded-lg flex flex-col gap-4 p-4 w-64 h-full hover:shadow">
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-row gap-1">
                                                <Icon name={mapCareerIcon(history.career_path)} />
                                                <span className="font-medium">{history.career_path}</span>
                                            </div>
                                            <Icon name={"ChevronRight"} size={18} color="black" />
                                        </div>
                                        <div className="flex justify-between text-sm border border-gray-200 rounded-lg p-3">
                                            <div className="min-w-fit">
                                                <p className="text-muted-foreground">วันที่</p>
                                                <p className="font-medium">{displayDate(history.submit_date)}</p>
                                            </div>
                                            <div className="min-w-fit">
                                                <p className="text-muted-foreground">เวลา</p>
                                                <p className="font-medium">{displayTime(history.submit_date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-between mt-1">
                                            <Button className="flex grow gap-2 p-2 border" variant={"outline"}>
                                                <Icon name={"MousePointerSquare"} className="w-auto h-full" color="black"></Icon>
                                                ดูข้อมูลเชิงลึก
                                            </Button>
                                            <Button className="shrink-0 p-2 border" variant={"outline"} onClick={(e) => { handleDeleteButtonClick(e, history.object_id); }}>
                                                <Icon name={"Trash2"} color="red" className="w-auto h-full"></Icon>
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <ConfirmAlertDialog isOpen={isConfirmOpen} onAcceptClick={() => { handleDeleteCard(focusHistory) }} handleOpenChange={setIsConfirmOpen} title={"คุณต้องการลบผลการทำนายหรือไม่"} description={"หากคุณลบผลการทำนายไปแล้ว จะไม่สามารถกลับมาดูผลการทำนายครั้งนี้ได้อีก"}></ConfirmAlertDialog>
        </>
    );
}