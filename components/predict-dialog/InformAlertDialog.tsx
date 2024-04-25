'use client'
import { Button } from "../ui/button";
import Icon from "../Icon";
import Image from "next/image";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface IInformAlertDialog {
    acceptInformStatus: (agreement: boolean) => void;
}

export default function InformAlertDialog({ acceptInformStatus }: IInformAlertDialog) {
    const [agreement, setAgreement] = useState(false);

    const setInformHiddenState = (state: string | boolean) => {
        const booleanState = typeof state === 'string' ? state.toLowerCase() === 'true' : state;
        localStorage.setItem("hideInform", JSON.stringify(state));
        setAgreement(booleanState);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="ml-auto mr-auto py-4 px-4">
                    <Icon name={"Sparkles"} color="white" size={16} className="mr-[6px]" />
                    ไปทำนายอาชีพ
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full h-full sm:h-auto">

                <div className="flex flex-col-reverse sm:flex-col">
                    <AlertDialogHeader>
                        <AlertDialogTitle>โปรดกรอกข้อมูลเป็นภาษาอังกฤษ</AlertDialogTitle>
                    </AlertDialogHeader>

                    <Image src={"inform.svg"} alt={"inform-english"} width={0} height={0} className="w-full h-auto"></Image>
                </div>
                <p className="text-subtext text-sm">โปรดกรอกข้อมูลเป็นภาษาอังกฤษเพื่อให้โมเดลสามารถทำนายสายอาชีพได้อย่างแม่นยำและมีประสิทธิภาพมากยิ่งขึ้น</p>

                <AlertDialogFooter>
                    <div className="flex flex-col sm:flex-row justify-between w-full">
                        <div className="flex gap-1 h-full items-center">
                            <Checkbox id="agreement-inform" onCheckedChange={(checked) => { setInformHiddenState(checked); }} />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="agreement-inform"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    ไม่ต้องแสดงอีก
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <AlertDialogCancel><Icon name={"Undo2"} size={16} color={"black"} className={"mr-1"} />ย้อนกลับ</AlertDialogCancel>
                            <AlertDialogAction onClick={() => { acceptInformStatus(agreement); }}>รับทราบ<Icon name={"ArrowRight"} size={16} color={"white"} className={"ml-1"} /></AlertDialogAction>
                        </div>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}