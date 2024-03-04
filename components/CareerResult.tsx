import { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { ICareer, ICareerPredictionResult } from "@/interfaces/career-prediction-interface";
import { Alert, AlertDescription } from "./ui/alert"
import { DialogClose } from "./ui/dialog";
import useLocalStorage from "../hooks/useLocalStorage";
import { Badge } from "./ui/badge";
import { toSalaryNumber } from "../utils/utils";
import Icon from "./Icon";

interface ICareerResult {
    isPredictionLoading: boolean;
    predictionResult: ICareerPredictionResult | undefined;
    togglePredictionState: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CareerResult(props: ICareerResult) {
    const localStorage = useLocalStorage();

    const handleSaveClick = () => {
        localStorage.addPredictionHistory({
            result: props.predictionResult!.career_path_name ?? "Unknown",
            submit_date: props.predictionResult!.input_date.toString(),
            object_id: props.predictionResult?.object_id
        });
    };

    const samplingRelatedCareers = (relatedCareers: ICareer[]) => {
        if (relatedCareers!.length) {
            return relatedCareers.slice(0, relatedCareers.length >= 3 ? 3 : relatedCareers.length).map((relatedCareer, idx) => {
                return (
                    <Badge variant="outline" key={'related-career-' + idx} >
                        {relatedCareer.career}
                    </Badge>
                );
            })
        } else {
            return null;
        }
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
                                        dangerouslySetInnerHTML={{ __html: props.predictionResult!.icon_svg }}
                                        width="24px"
                                        height="24px"
                                    />
                            }
                            <div className="mb-2 mt-4 text-lg font-medium">
                                {props.isPredictionLoading ? null : props.predictionResult?.career_path_name}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                                {props.isPredictionLoading ? null : props.predictionResult?.career_path_description}
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
                                                samplingRelatedCareers(props.predictionResult!.related_careers)
                                            }
                                        </>
                                }

                            </div>
                        </div>
                        <div className="p-3 font-medium text-sm">
                            <h3 className="font-medium text-primary text-sm">ฐานเงินเดือน</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        `${toSalaryNumber(props.predictionResult!.base_salary.min_salary)} - ${toSalaryNumber(props.predictionResult!.base_salary.max_salary)} บาท`
                                }
                            </p>
                        </div>
                        <div className="p-3 font-medium text-sm">
                            <h3 className="font-medium text-primary text-sm">มีคนทำนายได้สายอาชีพนี้</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        props.predictionResult?.careermate_count + ' คน'
                                }
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2 px-2">
                            <Button className="px-4 py-2 h-full border-2 border-primary">
                                <Icon name={"Newspaper"} color="white" size={16} className="mr-[6px]" />
                                ดูเพิ่มเติม
                            </Button>
                            <DialogClose asChild>
                                <Button className="p-3 rounded-md h-full" variant="outline" onClick={handleSaveClick}>
                                    <Icon name={"Save"} color="black" size={16} />
                                </Button>
                            </DialogClose>
                            <Button className="p-3 rounded-md h-full" onClick={props.togglePredictionState} variant="outline">
                                <Icon name={"SquarePen"} color="black" size={16} />
                            </Button>
                        </div>
                    </div>

                </ul >
            </div >
            <Alert className="flex flex-row gap-3 p-4 items-start">
                <Icon name={"Lightbulb"} color="black" size={16} />
                <AlertDescription>
                    สายอาชีพที่ทำนายเป็นเพียงการนำข้อมูลที่ผู้ใช้กรอกมาหาสายอาชีพที่เหมาะสม ยังสายมีอาชีพอื่น ๆ ที่คุณสามารถเป็นได้ตามความต้องการ
                </AlertDescription>
            </Alert>
        </>
    );
}