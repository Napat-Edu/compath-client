'use client'
import { useEffect, useState } from "react";
import InsightBox from "./InsightBox";
import { Badge } from "./ui/badge";
import { ICareerPredictionResult } from "@/interfaces/career-prediction-interface";
import { toSalaryNumber } from "./utils/utils";
import useSelectInsight from "./hooks/useSelectInsight";

export default function CareerInfoSection() {
    const [isLoading, setIsloading] = useState(true);
    const [careerPathInfo, setCareerPathInfo] = useState<ICareerPredictionResult>();
    const { selectedInsight } = useSelectInsight();

    const getCareerInfo = async (careerPath: string) => {
        const params = new URLSearchParams({ careerPath }).toString();
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CAREER_ENDPOINT}?${params}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            return response.json();
        }).then((careerInfo: ICareerPredictionResult) => {
            setCareerPathInfo(careerInfo);
            setIsloading(false);
        });
    };

    useEffect(() => {
        if (selectedInsight !== '' && selectedInsight) {
            setIsloading(true);
            getCareerInfo(selectedInsight);
        }
    }, [selectedInsight]);

    return (
        <div className="flex flex-row gap-4 min-w-full mb-6">
            <InsightBox title="อาชีพ" subtitle="ตัวอย่างอาชีพที่อยู่ในสายอาชีพนี้" icon="/group.svg" className="basis-1/3">
                <div className="flex flex-row flex-wrap gap-1">
                    {
                        careerPathInfo?.relatedCareers.map((career, idx) => {
                            return (
                                <Badge key={career + "-" + idx} variant="outline">{career.career}</Badge>
                            );
                        })
                    }
                </div>
            </InsightBox>
            <InsightBox title="เงินเดือน" subtitle="ช่วงเงินเดือนของสายอาชีพนี้" icon="/hand-coin.svg" className="basis-1/3">
                {
                    !isLoading && <p className="font-semibold text-lg">{toSalaryNumber(careerPathInfo?.baseSalary.min_salary ?? 0)} - {toSalaryNumber(careerPathInfo!.baseSalary.max_salary ?? 0)} ต่อเดือน</p>
                }
            </InsightBox>
            <InsightBox title="ผู้ร่วมทาง" subtitle="จำนวนคนที่ทำนายได้สายอาชีพนี้" icon="/users.svg" className="basis-1/3">
                <p className="font-semibold text-lg">{careerPathInfo?.careermatesCount} คน</p>
            </InsightBox>
        </div>
    );
}