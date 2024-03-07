'use client'
import useLocalStorage from "@/hooks/useLocalStorage";
import { ICareerPredictionResult } from "@/interfaces/career-prediction.interface";
import { useState } from "react";
import CareerInfoSection from "./CareerInfoSection";
import ClassifySkillSection from "./ClassifySkillSection";
import Icon from "../Icon";

export default function CareerInsightContainer() {
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
            {
                localStorage.isStorageReady && localStorage.predictionHistory.length ?
                    <>
                        <section className="border-maingray border-[1px] rounded-3xl flex flex-col gap-4 p-6">
                            <h3 className="font-semibold text-lg flex flex-row gap-[6px]"><Icon name={"Boxes"} /> ข้อมูลทั่วไป</h3>
                            <CareerInfoSection getCareerInfo={getCareerInfo} careerPathInfo={careerPathInfo!} isLoading={isLoading} setIsloading={setIsloading} />
                        </section>

                        <section className="border-maingray border-[1px] rounded-3xl flex flex-col gap-4 p-6 mt-6 mb-6">
                            <h3 className="font-semibold text-lg flex flex-row gap-[6px]"><Icon name={"Box"} />ทักษะ</h3>
                            <ClassifySkillSection careerPathInfo={careerPathInfo!} isLoading={isLoading} />
                        </section>
                    </> :
                    <>
                        <h3 className="font-bold text-2xl text-center">ยังไม่มีข้อมูล โปรดลองทำนายก่อน</h3>
                    </>
            }
        </>
    );
};