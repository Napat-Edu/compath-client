import { MouseEventHandler, useEffect } from "react";
import { Button } from "../ui/button";
import { ICareer, ICareerPredictionResult } from "@/interfaces/career-prediction.interface";
import { Alert, AlertDescription } from "../ui/alert"
import useLocalStorage from "../../hooks/useLocalStorage";
import { Badge } from "../ui/badge";
import { mapCareerIcon, mapCareerThemeColor, toSalaryNumber } from "../../utils/utils";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import useSidebar from "@/hooks/useSidebar";
import useSelectInsight from "@/hooks/useSelectInsight";
import { IPredictionHistory } from "@/interfaces/storage.interface";

interface ICareerResult {
    isPredictionLoading: boolean;
    predictionResult: ICareerPredictionResult | undefined;
    togglePredictionState: () => void;
    isEdited: boolean;
    setIsEdited: any;
}

export default function CareerResult(props: ICareerResult) {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();
    const sidebar = useSidebar();

    const router = useRouter()

    useEffect(() => {
        if (props.predictionResult && !props.isPredictionLoading) {
            const newHistory: IPredictionHistory = {
                career_path: props.predictionResult?.career_path_name!,
                submit_date: props.predictionResult?.input_date.toString()!,
                object_id: props.predictionResult?.object_id
            }
            localStorage.addPredictionHistory(newHistory, props.isEdited);
        }
        return () => { };
    }, [props.predictionResult]);

    const handleToInsightClick = () => {
        sidebar.setActiveTab(1);
        const latestHistory = localStorage.getLatestHistory();
        selectInsight.upDateSelectedInsight(latestHistory.career_path, latestHistory.object_id);
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

    const handleEditClick = () => {
        props.togglePredictionState();
        props.setIsEdited(true);
    }

    return (
        <>
            <div className="border-gray-200 border-[1px] rounded-2xl overflow-auto">
                <ul className={`flex flex-col sm:flex-row gap-3 p-4 ${props.isPredictionLoading ? 'animate-pulse' : null}`}>

                    <li className="max-w-full sm:max-w-[45%] min-w-[47%]">
                        <div
                            className={`flex h-full w-full select-none flex-col justify-end rounded-lg ${props.isPredictionLoading ? 'bg-slate-100' : 'bg-zinc-800'} from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md`}
                            style={{
                                background: `radial-gradient(250.57% 184.23% at -5.49% -6.3%, ${props.isPredictionLoading ? '#27272A' : mapCareerThemeColor(props.predictionResult?.career_path_name!)} 0%, #27272A 64.5%)`
                            }}
                        >
                            {
                                props.isPredictionLoading ?
                                    null :
                                    <Icon name={mapCareerIcon(props.predictionResult?.career_path_name!)} size={24} color="white" />
                            }
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                                {props.isPredictionLoading ? null : props.predictionResult?.career_path_name}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground text-white">
                                {props.isPredictionLoading ? null : props.predictionResult?.career_path_description}
                            </p>
                        </div>
                    </li>

                    <div>
                        <div className="border-[1px] rounded-xl p-4">
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
                        <div className="border-[1px] rounded-xl p-4 font-medium text-sm mt-2">
                            <h3 className="font-medium text-primary text-sm">ฐานเงินเดือน</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-xl h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        `${toSalaryNumber(props.predictionResult!.base_salary.min_salary)} - ${toSalaryNumber(props.predictionResult!.base_salary.max_salary)} บาท`
                                }
                            </p>
                        </div>
                        <div className="border-[1px] rounded-xl p-4 font-medium text-sm mt-2">
                            <h3 className="font-medium text-primary text-sm">ถูกทำนายไปแล้ว</h3>
                            <p className={`font-semibold text-lg ${props.isPredictionLoading ? 'bg-slate-100 rounded-xl h-6' : null}`}>
                                {
                                    props.isPredictionLoading ?
                                        null :
                                        props.predictionResult?.careermate_count + ' คน'
                                }
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-3">
                            <Button onClick={handleToInsightClick} className="grow px-4 py-2 h-full leading-6 hover:bg-[#399049]" disabled={props.isPredictionLoading}>
                                <Icon name={"MousePointerSquare"} color="white" size={16} className="mr-[6px]" />
                                ดูข้อมูลเชิงลึก
                            </Button>
                            <Button className="p-3 rounded-lg h-full border" onClick={handleEditClick} variant="outline" disabled={props.isPredictionLoading}>
                                <Icon name={"SquarePen"} color="black" size={16} />
                            </Button>
                        </div>
                    </div>

                </ul >
            </div >
            <Alert className="flex flex-row gap-3 p-4 items-start mt-4">
                <Icon name={"Lightbulb"} color="black" size={16} />
                <AlertDescription>
                    สายอาชีพที่ทำนายเป็นเพียงการนำข้อมูลที่ผู้ใช้กรอกมาหาสายอาชีพที่เหมาะสม ยังมีสายอาชีพอื่น ๆ ที่คุณสามารถเป็นได้ตามความต้องการ
                </AlertDescription>
            </Alert>
        </>
    );
}