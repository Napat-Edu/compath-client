'use client'
import { useRef, useState } from "react";
import Icon from "../Icon";
import { Button } from "../ui/button";
import CareerResult from "./CareerResult";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import useAuth from "@/hooks/useAuth";
import { ICareerPredictionResult } from "@/interfaces/career-prediction.interface";

export default function OcrButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [predictionResult, setPredictionResult] = useState<ICareerPredictionResult>();

    const auth = useAuth();

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleUploadFileClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const handleChange = (event: any) => {
        if (event.target.files.length > 0) {
            const fileUploaded = event.target.files[0];
            setIsOpen(true);
            uploadFile(fileUploaded);
        } else {
            setIsOpen(false);
            setLoading(true);
        }
    };

    const uploadFile = async (fileUploaded: File) => {
        const formData = new FormData();
        formData.append('file', fileUploaded);
        const owner = (!auth.authData || Object.keys(auth.authData).length === 0) ? undefined : auth.authData.email;
        formData.append('owner', owner);
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CAREER_ENDPOINT}/file`, {
            method: "POST",
            headers: {},
            body: formData
        })
            .then((res) => res.json())
            .then((data: ICareerPredictionResult) => {
                setPredictionResult(data);
                setLoading(false);
            });
    };

    return (
        <>
            <Button variant={"outline"} className="border" onClick={handleUploadFileClick}>
                <Icon name={"FileUp"} color="black" className="mr-1" size={16}></Icon>
                อัพโหลดไฟล์
                <div className="bg-black text-white rounded-full px-2 py-1 text-xs ml-2">
                    BETA
                </div>
            </Button>
            <input
                type="file"
                onChange={(e) => { handleChange(e) }}
                ref={hiddenFileInput}
                className="hidden"
            />

            <Dialog open={isOpen} onOpenChange={() => {
                setIsOpen(false);
                setLoading(true);
            }}>
                <DialogContent
                    className="w-full sm:w-4/5 h-full sm:h-fit sm:max-h-fit"
                    onEscapeKeyDown={(e) => {
                        e.preventDefault();
                        setIsOpen(false);

                        setLoading(true);
                    }}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                        setIsOpen(false);

                        setLoading(true);
                    }}
                >

                    <div className="max-h-fit flex flex-col">
                        <DialogHeader className="space-y-0 h-fit mb-4 min-h-fit">
                            <DialogTitle>
                                <div className="flex flex-row gap-2 items-center">
                                    <Icon name={"Wand2"} />
                                    <label>{"ผลการทำนายสายอาชีพ"}</label>
                                </div>
                            </DialogTitle>
                            <DialogDescription className="text-left">
                                {"สายอาชีพที่เหมาะสมกับคุณคือ"}
                            </DialogDescription>
                        </DialogHeader>

                        {
                            isOpen && <CareerResult
                                isPredictionLoading={loading}
                                predictionResult={predictionResult}
                                togglePredictionState={undefined}
                                isEdited={false}
                                setIsEdited={undefined}
                            />
                        }
                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}