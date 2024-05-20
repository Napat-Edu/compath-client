'use client'
import useLocalStorage from "@/hooks/useLocalStorage";
import { ICareerPredictionResult } from "@/interfaces/career-prediction.interface";
import { useEffect, useState } from "react";
import CareerInfoSection from "./CareerInfoSection";
import ClassifySkillSection from "./ClassifySkillSection";
import Icon from "../Icon";
import { Button } from "../ui/button";
import Link from "next/link";
import useSidebar from "@/hooks/useSidebar";
import CompareSelect from "../CompareSelect";
import { InsightSelect } from "../InsightSelect";
import useSelectInsight from "@/hooks/useSelectInsight";

export default function CareerInsightContainer() {
    const localStorage = useLocalStorage();
    const sidebar = useSidebar();
    const selectInsight = useSelectInsight();
    const [isLoading, setIsloading] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [careerPathInfo, setCareerPathInfo] = useState<ICareerPredictionResult>();

    useEffect(() => {
        selectInsight.updateCompareCareer('');
        setIsReset(true);
        return () => { };
    }, []);

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

    if (!localStorage.isStorageReady || !isReset) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <Icon name={"Loader2"} className={`animate-spin`} size={64} />
            </div>
        );
    }

    const handleLinkClick = () => {
        sidebar.setActiveTab(0);
    };

    return (
        <>
            {
                (localStorage.predictionHistory.length > 0) ?
                    <>
                        <div className="flex flex-col md:flex-row gap-4 flex-wrap mt-4">
                            <InsightSelect></InsightSelect>
                            <CompareSelect></CompareSelect>
                        </div>
                        <section className="border-maingray border rounded-3xl flex flex-col gap-4 p-6 mt-4">
                            <h3 className="font-semibold text-lg flex flex-row gap-[6px]"><Icon name={"Box"} /> ข้อมูลทั่วไป</h3>
                            <CareerInfoSection getCareerInfo={getCareerInfo} careerPathInfo={careerPathInfo!} isLoading={isLoading} setIsloading={setIsloading} />
                        </section>

                        <section className="border-maingray border rounded-3xl flex flex-col gap-4 p-6 mt-6 mb-6">
                            <ClassifySkillSection careerPathInfo={careerPathInfo!} isLoading={isLoading} />
                        </section>
                    </> :
                    <>
                        <section className="flex flex-col justify-center border-2 border-primary border-dashed rounded-2xl min-h-96 mt-4 px-4">
                            <Icon className="mx-auto" name={"Newspaper"} size={32} />
                            <div className="my-4">
                                <p className="text-center font-semibold text-xl">คุณยังไม่ได้ทำนายอาชีพกับเรา</p>
                                <p className="text-center text-subtext">ไปทำนายสายอาชีพเพื่อดูข้อมูลเชิงลึกของสายอาชีพที่เหมาะสมกับคุณ</p>
                            </div>
                            <Link href={"/"} className="ml-auto mr-auto" onClick={handleLinkClick}>
                                <Button className="px-4 py-2">
                                    <Icon name={"Sparkles"} color="white" size={16} className="mr-[6px]" />
                                    ไปทำนายอาชีพ
                                </Button>
                            </Link>
                        </section>
                    </>
            }
        </>
    );
};