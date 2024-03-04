'use client'
import CareerInfoSection from "@/components/CareerInfoSection";
import ClassifySkillSection from "@/components/ClassifySkillSection";
import Icon from "@/components/Icon";
import { InsightSelect } from "@/components/InsightSelect";
import { SelectInsightProvider } from "@/contexts/SelectInsightContext";
import useLocalStorage from "@/hooks/useLocalStorage"
import { ICareerPredictionResult } from "@/interfaces/career-prediction-interface";
import { useState } from "react";

export default function CareerInsightPage() {
    const localStorage = useLocalStorage();
    const [isLoading, setIsloading] = useState(true);
    const [careerPathInfo, setCareerPathInfo] = useState<ICareerPredictionResult>();

    const getCareerInfo = async (careerPath: string, objectId: string) => {
        const params = new URLSearchParams({ career_path: careerPath, object_id: objectId }).toString();
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_INSIGHT_ENDPOINT}?${params}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            return response.json();
        }).then((careerInfo: ICareerPredictionResult) => {
            setCareerPathInfo(careerInfo);
            setIsloading(false);
        });
    };

    return (
        <>
            <SelectInsightProvider>
                <section className="border-b-2 border-[#E4E4E7] pt-6 pb-4 flex flex-row justify-between items-end mb-5">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-primary font-bold text-4xl">Career Insight</h1>
                        <p className="text-[#71717A]">แสดงผลข้อมูลเชิงลึกของอาชีพที่คุณทำนายได้</p>
                    </div>
                    <InsightSelect></InsightSelect>
                </section>

                {
                    localStorage.isStorageReady && localStorage.predictionHistory.length ?
                        <>
                            <section className="border-[#E4E4E7] border-[1px] rounded-3xl flex flex-col gap-4 p-6">
                                <h3 className="font-semibold text-lg flex flex-row gap-[6px]"><Icon name={"Boxes"} /> ข้อมูลทั่วไป</h3>
                                <CareerInfoSection getCareerInfo={getCareerInfo} careerPathInfo={careerPathInfo!} isLoading={isLoading} setIsloading={setIsloading} />
                            </section>

                            <section className="border-[#E4E4E7] border-[1px] rounded-3xl flex flex-col gap-4 p-6 mt-6 mb-6">
                                <h3 className="font-semibold text-lg flex flex-row gap-[6px]"><Icon name={"Box"} />ทักษะ</h3>
                                <ClassifySkillSection careerPathInfo={careerPathInfo!} isLoading={isLoading} />
                            </section>
                        </> :
                        <>
                            <h3 className="font-bold text-2xl text-center">ยังไม่มีข้อมูล โปรดลองทำนายก่อน</h3>
                        </>
                }

            </SelectInsightProvider>
        </>
    );
};