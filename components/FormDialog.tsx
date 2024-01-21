'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InputForm } from "./InputForm";
import { useState } from "react";
import CareerResult from "./CareerResult";

export function FormDialog() {
    const [isPredicting, setPredicting] = useState(false);

    const getCareerPrediction = async (userResume: any) => {
        setPredicting(true);
        console.log(userResume);
        const response = await fetch(`
        ${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CAREER_ENDPOINT}
        `);
        const careerResult = await response.json();
        console.log(careerResult);
    };

    const togglePredictionState = () => {
        setPredicting(!isPredicting);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto mr-auto py-4 px-2">
                    <img
                        src="sparkles.svg"
                        alt="sparkles icon"
                        height="16px"
                        width="16px"
                        className="mr-1"
                    />
                    ไปทำนายอาชีพ
                </Button>
            </DialogTrigger>
            <DialogContent className="w-4/5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={!isPredicting ? "resume.svg" : "wand.svg"}
                                alt={!isPredicting ? "resume icon" : "wand icon"}
                                height="24px"
                                width="24px"
                            />
                            <label>{!isPredicting ? "กรอกข้อมูลของคุณเพื่อทำนายอาชีพ" : "ผลการทำนายอาชีพ"}</label>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        {!isPredicting ? "โปรดกรอกข้อมูลให้ระบบเพื่อนำไปทำนายอาชีพที่เหมาะสมกับคุณ" : "อาชีพที่เหมาะสมกับคุณคือ"}
                    </DialogDescription>
                </DialogHeader>

                {
                    !isPredicting ?
                        <InputForm getCareerPrediction={getCareerPrediction}></InputForm> :
                        <CareerResult
                            togglePredictionState={togglePredictionState}
                        />
                }

            </DialogContent>
        </Dialog>
    )
}
