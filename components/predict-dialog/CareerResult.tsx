import { MouseEventHandler } from "react";
import { Button } from "../ui/button";
import { ICareer, ICareerPredictionResult } from "@/interfaces/career-prediction.interface";
import { Alert, AlertDescription } from "../ui/alert"
import { DialogClose } from "../ui/dialog";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Badge } from "../ui/badge";
import { mapCareerIcon, toSalaryNumber } from "../../utils/utils";
import Icon from "../Icon";
import ConfirmAlertDialog from "../ConfirmAlertDialog";
import { useRouter } from "next/navigation";
import useSidebar from "@/hooks/useSidebar";
import useSelectInsight from "@/hooks/useSelectInsight";
import { IPredictionHistory } from "@/interfaces/storage.interface";

interface ICareerResult {
    isPredictionLoading: boolean;
    predictionResult: ICareerPredictionResult | undefined;
    togglePredictionState: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CareerResult(props: ICareerResult) {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const sidebar = useSidebar();

    const router = useRouter()

    const handleSaveClick = () => {
        localStorage.addPredictionHistory({
            career_path: props.predictionResult!.career_path_name ?? "Unknown",
            submit_date: props.predictionResult!.input_date.toString(),
            object_id: props.predictionResult?.object_id
        });
    };

    const handleToInsightClick = () => {
        sidebar.setActiveTab(1);
        const newHistory: IPredictionHistory = {
            career_path: props.predictionResult?.career_path_name!,
            submit_date: props.predictionResult?.input_date.toString()!,
            object_id: props.predictionResult?.object_id
        };
        localStorage.addPredictionHistory(newHistory);
        selectInsight.upDateSelectedInsight(props.predictionResult?.career_path_name, props.predictionResult?.object_id);
        router.push('/career-insight');
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
                                    <Icon name={mapCareerIcon(props.predictionResult?.career_path_name!)} size={24} color="black" />
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
                        <div className="border-[1px] rounded-lg p-4">
                            <h3 className="font-medium text-primary text-sm">อาชีพที่เกี่ยวข้อง</h3>
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
                        <div className="border-[1px] rounded-lg p-4 font-medium text-sm mt-2">
                            <h3 className="font-medium text-primary text-sm">ฐานเงินเดือน</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        `${toSalaryNumber(props.predictionResult!.base_salary.min_salary)} - ${toSalaryNumber(props.predictionResult!.base_salary.max_salary)} บาท`
                                }
                            </p>
                        </div>
                        <div className="border-[1px] rounded-lg p-4 font-medium text-sm mt-2">
                            <h3 className="font-medium text-primary text-sm">ถูกทำนายไปแล้ว</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-lg h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        props.predictionResult?.careermate_count + ' คน'
                                }
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-3">
                            <Button className="grow px-4 py-2 h-full leading-6" disabled={props.isPredictionLoading}>
                                <Icon name={"Newspaper"} color="white" size={16} className="mr-[6px]" />
                                ดูเพิ่มเติม
                            </Button>
                            <Button className="p-3 rounded-md h-full" onClick={props.togglePredictionState} variant="outline" disabled={props.isPredictionLoading}>
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