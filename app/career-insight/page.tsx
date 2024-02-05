import { InsightSelect } from "@/components/InsightSelect";
import Image from "next/image";

export default function CareerInsightPage() {
    return (
        <section className="w-full px-6">
            <section className="border-b-2 border-[#E4E4E7] pt-6 pb-4 flex flex-row justify-between items-end mb-5">
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary font-bold text-4xl">Career Insight</h1>
                    <p className="text-[#71717A]">แสดงผลข้อมูลเชิงลึกของอาชีพที่คุณทำนายได้</p>
                </div>
                <InsightSelect></InsightSelect>
            </section>

            <h3 className="font-semibold text-lg">ข้อมูลทั่วไป</h3>
            <div className="flex flex-row gap-4 min-w-full">
                <div className="border-[1px] rounded-2xl p-6 flex flex-col basis-1/3">
                    <div className="flex flex-row justify-between">
                        <h4>อาชีพ</h4>
                        <Image src="/grid.svg" alt="career-icon" width={24} height={24} />
                    </div>
                    <h5>ตัวอย่างอาชีพที่อยู่ในสายอาชีพนี้</h5>
                    <div>
                        <div className="border-[#E2E8F0] border-2 rounded-full font-medium w-fit h-fit text-sm px-2 py-[2px]">
                            xxx
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="font-semibold text-lg">ทักษะ</h3>
        </section>
    );
};