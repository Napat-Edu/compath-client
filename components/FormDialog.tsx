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
import { ICareerPredictionResult, IUserResume } from "@/interfaces/career-prediction-interface";
import Image from "next/image";

export function FormDialog() {
    const [isPredicting, setPredicting] = useState(false);
    const [isPredictionLoading, setIsPredictionLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState<ICareerPredictionResult>();

    const getCareerPrediction = async (userResume: IUserResume) => {
        setPredicting(true);
        setIsPredictionLoading(true);

        const userResumeRecord: Record<string, any> = userResume;
        const predictionParams = new URLSearchParams(userResumeRecord);

        setPredictionResult(
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CAREER_ENDPOINT}?${predictionParams}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => res.json())
                .then((data: ICareerPredictionResult) => {
                    setPredictionResult(data);
                    setIsPredictionLoading(false);
                    return data;
                })
        );
    };

    const togglePredictionState = () => {
        setPredicting(!isPredicting);
    }

    const handleOpenForm = () => {
        setPredicting(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto mr-auto py-4 px-2" onClick={handleOpenForm}>
                    <Image
                        src="sparkles.svg"
                        alt="sparkles icon"
                        height={16}
                        width={16}
                        className="mr-1"
                    />
                    ไปทำนายอาชีพ
                </Button>
            </DialogTrigger>
            <DialogContent className="w-4/5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-row gap-2 items-center">
                            <Image
                                src={!isPredicting ? "resume.svg" : "wand.svg"}
                                alt={!isPredicting ? "resume icon" : "wand icon"}
                                height={24}
                                width={24}
                            />
                            <label>{!isPredicting ? "กรอกข้อมูลของคุณเพื่อทำนายอาชีพ" : "ผลการทำนายสายอาชีพ"}</label>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        {!isPredicting ? "โปรดกรอกข้อมูลให้ระบบเพื่อนำไปทำนายอาชีพที่เหมาะสมกับคุณ" : "สายอาชีพที่เหมาะสมกับคุณคือ"}
                    </DialogDescription>
                </DialogHeader>

                {
                    !isPredicting ?
                        <InputForm getCareerPrediction={getCareerPrediction}></InputForm> :
                        <CareerResult
                            predictionResult={predictionResult}
                            isPredictionLoading={isPredictionLoading}
                            togglePredictionState={togglePredictionState}
                        />
                }

            </DialogContent>
        </Dialog>
    )
}
