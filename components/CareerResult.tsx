import { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { ICareerPredictionResult } from "@/interfaces/career-prediction-interface";
import Image from "next/image";
import { Alert, AlertDescription } from "./ui/alert"
import { DialogClose } from "./ui/dialog";
import useLocalStorage from "./hooks/useLocalStorage";

interface ICareerResult {
    isPredictionLoading: boolean;
    predictionResult: ICareerPredictionResult | undefined;
    togglePredictionState: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CareerResult(props: ICareerResult) {
    const localStorage = useLocalStorage();

    const toSalaryNumber = (salary: number): string => {
        const salaryString = salary.toString();
        const replacedSalary = salaryString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return replacedSalary;
    };

    const handleSaveClick = () => {
        localStorage.addPredictionHistory({
            result: props.predictionResult!.career ?? "Unknown"
        });
    };

    return (
        <>
            <div className="border-gray-200 border-[1px] rounded-lg">
                <ul className={`flex flex-row gap-3 p-4 ${props.isPredictionLoading ? 'animate-pulse' : null}`}>

                    <li className="max-w-[45%] min-w-[47%]">
                        <div
                            className={`flex h-full w-full select-none flex-col justify-end rounded-md ${props.isPredictionLoading ? 'bg-slate-100' : 'bg-gradient-to-b'} from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md`}
                        >
                            {
                                props.isPredictionLoading ?
                                    null :
                                    <object
                                        dangerouslySetInnerHTML={{ __html: props.predictionResult!.icon }}
                                        width="24px"
                                        height="24px"
                                    />
                            }
                            <div className="mb-2 mt-4 text-lg font-medium">
                                {props.isPredictionLoading ? null : props.predictionResult?.career}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                                {props.isPredictionLoading ? null : props.predictionResult?.description}
                            </p>
                        </div>
                    </li>

                    <div>
                        <div className="p-3">
                            <h3 className="font-medium text-primary text-sm">ตัวอย่างอาชีพที่เกี่ยวข้อง</h3>
                            <div className={`flex flex-row flex-wrap self-stretch items-start content-start gap-1 ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}`}>

                                {
                                    props.isPredictionLoading ?
                                        null :
                                        <>
                                            {
                                                props.predictionResult?.relatedCareers.slice(0, 3).map((relatedCareer, idx) => {
                                                    return (
                                                        <div className="border-[#E2E8F0] border-2 rounded-full font-medium w-fit h-fit text-sm px-3 py-1" key={'related-career-' + idx}>
                                                            {relatedCareer}
                                                        </div>
                                                    );
                                                })
                                            }
                                        </>
                                }

                            </div>
                        </div>
                        <div className="p-3 font-medium text-sm ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}">
                            <h3 className="font-medium text-primary text-sm">ฐานเงินเดือน</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        `${toSalaryNumber(props.predictionResult!.baseSalary.min_salary)} - ${toSalaryNumber(props.predictionResult!.baseSalary.max_salary)} บาท`
                                }
                            </p>
                        </div>
                        <div className="p-3 font-medium text-sm">
                            <h3 className="font-medium text-primary text-sm">มีคนทำนายได้สายอาชีพนี้</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        props.predictionResult?.careermatesCount + ' คน'
                                }
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2 px-2">
                            <Button className="px-4 py-2 h-full border-2 border-primary">
                                <Image className="mr-2" src="resume-white.svg" alt="resume-icon" width={16} height={16} />
                                ดูเพิ่มเติม
                            </Button>
                            <DialogClose asChild>
                                <Button className="p-3 rounded-md h-full" variant="outline" onClick={handleSaveClick}>
                                    <Image src="save-button.svg" alt="save button" width={16} height={16} />
                                </Button>
                            </DialogClose>
                            <Button className="p-3 rounded-md h-full" onClick={props.togglePredictionState} variant="outline">
                                <Image src="edit-button.svg" alt="edit button" width={16} height={16} />
                            </Button>
                        </div>
                    </div>

                </ul>
            </div>
            <Alert className="flex flex-row gap-3 p-4 items-start">
                <img src="lightbulb-icon.svg" alt="lightbulb-icon" width={16} height={16} />
                <AlertDescription>
                    สายอาชีพที่ทำนายเป็นเพียงการนำข้อมูลที่ผู้ใช้กรอกมาหาสายอาชีพที่เหมาะสม ยังสายมีอาชีพอื่น ๆ ที่คุณสามารถเป็นได้ตามความต้องการ
                </AlertDescription>
            </Alert>
        </>
    );
}