'use client'
import CareerInfoSection from "@/components/CareerInfoSection";
import { InsightSelect } from "@/components/InsightSelect";
import { SelectInsightProvider } from "@/components/contexts/SelectInsightContext";
import useLocalStorage from "@/components/hooks/useLocalStorage"
import Image from "next/image";

export default function CareerInsightPage() {
    const localStorage = useLocalStorage();

    return (
        <section className="w-full px-6">
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
                            <h3 className="font-semibold text-lg flex flex-row gap-[6px] mb-4"><Image src="/box.svg" alt="box-icon" width={0} height={0} className="w-auto h-6" /> ข้อมูลทั่วไป</h3>
                            <CareerInfoSection />

                            <h3 className="font-semibold text-lg">ทักษะ</h3>
                        </> :
                        <>
                            <h3 className="font-bold text-2xl text-center">ยังไม่มีข้อมูล โปรดลองทำนายก่อน</h3>
                        </>
                }

            </SelectInsightProvider>
        </section>
    );
};