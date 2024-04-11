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
import { useEffect, useState } from "react";
import CareerResult from "./CareerResult";
import { ICareerPredictionResult, IUserResume } from "@/interfaces/career-prediction.interface";
import Icon from "../Icon";
import ConfirmAlertDialog from "../ConfirmAlertDialog";
import InformAlertDialog from "./InformAlertDialog";

export function FormDialog() {
    const [isPredicting, setPredicting] = useState(false);
    const [isPredictionLoading, setIsPredictionLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState<ICareerPredictionResult>();

    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const [informHidden, setInformHidden] = useState<boolean>(false);
    useEffect(() => {
        const informConfig = localStorage.getItem('hideInform') === 'true';
        setInformHidden(informConfig);
    }, [])
    const [isAgreementFilled, setIsAgreementFilled] = useState(false);

    const [currentUserInput, setCurrentUserInput] = useState({
        skill: undefined,
        educational: undefined,
        experience: undefined,
        agreement: undefined
    });

    const acceptInformStatus = (agreement: boolean) => {
        setIsFormDialogOpen(true);
        setInformHidden(true);
        setIsAgreementFilled(agreement);
    };

    if (!informHidden && !isAgreementFilled) {
        return (<InformAlertDialog acceptInformStatus={acceptInformStatus}></InformAlertDialog>);
    }

    const updateCurrentUserInput = (input: any) => {
        setCurrentUserInput(input);
    };

    const resetCurrentUserInput = () => {
        setCurrentUserInput({
            skill: undefined,
            educational: undefined,
            experience: undefined,
            agreement: undefined
        });
    };

    const getCareerPrediction = async (userResume: IUserResume) => {
        setPredicting(true);
        setIsPredictionLoading(true);

        setPredictionResult(
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CAREER_ENDPOINT}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resume_input: userResume
                })
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
        resetCurrentUserInput();
        setPredicting(false);
        setIsFormDialogOpen(true);
    };

    const closeForm = () => {
        resetCurrentUserInput();
        setPredicting(false);
        setIsConfirmDialogOpen(false);
        setIsFormDialogOpen(false);
    };

    return (
        <>
            <Dialog open={isFormDialogOpen} onOpenChange={(open) => {
                if (!open) {
                    setIsConfirmDialogOpen(true);
                }
            }}>
                <DialogTrigger asChild>
                    <Button className="ml-auto mr-auto py-4 px-4" onClick={handleOpenForm}>
                        <Icon name={"Sparkles"} color="white" size={16} className="mr-[6px]" />
                        ไปทำนายอาชีพ
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="w-full sm:w-4/5 h-full sm:max-h-[80%]"
                    onEscapeKeyDown={(e) => {
                        e.preventDefault();
                        setIsConfirmDialogOpen(true);
                    }}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                        setIsConfirmDialogOpen(true);
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-row gap-2 items-center">
                                <Icon name={!isPredicting ? "Newspaper" : "Wand2"} />
                                <label>{!isPredicting ? "กรอกข้อมูลของคุณเพื่อทำนายอาชีพ" : "ผลการทำนายสายอาชีพ"}</label>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="text-left">
                            {!isPredicting ? "โปรดกรอกข้อมูลให้ระบบเพื่อนำไปทำนายอาชีพที่เหมาะสมกับคุณ" : "สายอาชีพที่เหมาะสมกับคุณคือ"}
                        </DialogDescription>
                    </DialogHeader>

                    {
                        !isPredicting ?
                            <InputForm getCareerPrediction={getCareerPrediction} currentUserInput={currentUserInput} updateCurrentUserInput={updateCurrentUserInput}></InputForm> :
                            <CareerResult
                                predictionResult={predictionResult}
                                isPredictionLoading={isPredictionLoading}
                                togglePredictionState={togglePredictionState}
                            />
                    }

                </DialogContent>
            </Dialog>

            <ConfirmAlertDialog isOpen={isConfirmDialogOpen} handleOpenChange={setIsConfirmDialogOpen} onAcceptClick={closeForm} title={"คุณต้องการละทิ้งการกรอกข้อมูลหรือไม่"} description={"หากคุณละการกรอกข้อมูลไปแล้ว ระบบจะไม่บันทึกข้อมูลและทำให้คุณต้องกรอกข้อมูลใหม่อีกครั้งเมื่อต้องการทำนาย"} />
        </>
    )
}
