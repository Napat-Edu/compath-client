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
import useAuth from "@/hooks/useAuth";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import useSidebar from "@/hooks/useSidebar";
import useSelectInsight from "@/hooks/useSelectInsight";
import useLocalStorage from "@/hooks/useLocalStorage";

export function FormDialog() {
    const auth = useAuth();
    const storage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const sidebar = useSidebar();
    const { toast } = useToast();
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

        const owner = (!auth.authData || Object.keys(auth.authData).length === 0) ? undefined : auth.authData.email;
        setPredictionResult(
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CAREER_ENDPOINT}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resume_owner: owner,
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

    const handleToastClick = () => {
        sidebar.setActiveTab(1);
        const history = storage.getLatestHistory();
        selectInsight.upDateSelectedInsight(history.career_path, history.object_id);
    };

    const openToast = () => {
        toast({
            duration: 3000,
            title: "บันทึกผลทำนายของคุณเรียบร้อยแล้ว",
            description: "สามารถกดไปดูเพื่อดูข้อมูลเชิงลึกของอาชีพที่ทำนายได้",
            action: (
                <Link href={"/career-insight"} className="h-full">
                    <ToastAction altText="Watch Insight" className="bg-primary p-4 text-white hover:bg-[#3da150]" onClick={() => { handleToastClick(); }}>
                        ไปดู
                    </ToastAction>
                </Link>
            ),
        })
    };

    return (
        <>
            <Dialog open={isFormDialogOpen} onOpenChange={(open) => {
                if (!open && !isPredicting) {
                    setIsConfirmDialogOpen(true);
                } else if (!open && isPredicting) {
                    openToast();
                    setIsFormDialogOpen(false);
                }
            }}>
                <DialogTrigger asChild>
                    <Button className="ml-auto mr-auto py-4 px-4 hover:bg-[#3da150]" onClick={handleOpenForm}>
                        <Icon name={"Sparkles"} color="white" size={16} className="mr-[6px]" />
                        ไปทำนายอาชีพ
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="w-full sm:w-4/5 h-full sm:h-fit sm:max-h-fit"
                    onEscapeKeyDown={(e) => {
                        e.preventDefault();
                        if (!isPredicting) {
                            setIsConfirmDialogOpen(true);
                        } else {
                            openToast();
                            setIsFormDialogOpen(false);
                        }
                    }}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                        if (!isPredicting) {
                            setIsConfirmDialogOpen(true);
                        } else {
                            openToast();
                            setIsFormDialogOpen(false);
                        }
                    }}
                >

                    <div className="max-h-fit flex flex-col">
                        <DialogHeader className="space-y-0 h-fit mb-4 min-h-fit">
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
                    </div>

                </DialogContent>
            </Dialog>

            <ConfirmAlertDialog isOpen={isConfirmDialogOpen} handleOpenChange={setIsConfirmDialogOpen} onAcceptClick={closeForm} title={"คุณต้องการละทิ้งการกรอกข้อมูลหรือไม่"} description={"หากคุณละการกรอกข้อมูลไปแล้ว ระบบจะไม่บันทึกข้อมูลและทำให้คุณต้องกรอกข้อมูลใหม่อีกครั้งเมื่อต้องการทำนาย"} />
        </>
    )
}
