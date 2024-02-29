'use client'
import { useEffect } from "react";
import InsightBox from "./InsightBox";
import { Badge } from "./ui/badge";
import { toSalaryNumber } from "./utils/utils";
import useSelectInsight from "./hooks/useSelectInsight";
import { ICareerPredictionResult } from "@/interfaces/career-prediction-interface";

interface ICareerInfoSection {
    setIsloading(arg0: boolean): unknown;
    getCareerInfo(career_path: string, object_id: string): void;
    isLoading: boolean;
    careerPathInfo: ICareerPredictionResult;
}

export default function CareerInfoSection(props: ICareerInfoSection) {
    const { selectedInsight } = useSelectInsight();

    useEffect(() => {
        if (selectedInsight.career_path !== '' && selectedInsight.object_id !== '' && selectedInsight.career_path && selectedInsight.object_id) {
            props.setIsloading(true);
            props.getCareerInfo(selectedInsight.career_path, selectedInsight.object_id);
        }
    }, [selectedInsight.career_path]);

    return (
        <div className="flex flex-row gap-4 min-w-full">
            <InsightBox title="อาชีพ" subtitle="ตัวอย่างอาชีพที่อยู่ในสายอาชีพนี้" className="basis-1/3" name={"Briefcase"}>
                <div className={`flex flex-row flex-wrap gap-1 ${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                    {
                        !props.isLoading && props.careerPathInfo.related_careers.map((career, idx) => {
                            return (
                                <Badge key={career + "-" + idx} variant="outline">{career.career}</Badge>
                            );
                        })
                    }
                </div>
            </InsightBox>
            <InsightBox title="เงินเดือน" subtitle="ช่วงเงินเดือนของสายอาชีพนี้" className="basis-1/3" name={"HandCoins"}>
                <div className={`${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                    {
                        !props.isLoading && <p className={`font-semibold text-lg`}>{toSalaryNumber(props.careerPathInfo.base_salary.min_salary ?? 0)} - {toSalaryNumber(props.careerPathInfo.base_salary.max_salary ?? 0)} ต่อเดือน</p>
                    }
                </div>
            </InsightBox>
            <InsightBox title="ผู้ร่วมทาง" subtitle="จำนวนคนที่ทำนายได้สายอาชีพนี้" className="basis-1/3" name={"User"}>
                <div className={`${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                    {
                        !props.isLoading && <p className={`font-semibold text-lg`}>{props.careerPathInfo.careermate_count} คน</p>
                    }
                </div>
            </InsightBox>
        </div>
    );
}