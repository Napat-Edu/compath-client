import InsightBox from "@/components/InsightBox";
import { InsightSelect } from "@/components/InsightSelect";
import { Badge } from "@/components/ui/badge";
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

            <h3 className="font-semibold text-lg flex flex-row gap-[6px] mb-4"><Image src="/box.svg" alt="box-icon" width={0} height={0} className="w-auto h-6" /> ข้อมูลทั่วไป</h3>
            <div className="flex flex-row gap-4 min-w-full mb-6">
                <InsightBox title="อาชีพ" subtitle="ตัวอย่างอาชีพที่อยู่ในสายอาชีพนี้" icon="/group.svg" className="basis-1/3">
                    <Badge variant="outline">xxxxxx</Badge>
                </InsightBox>
                <InsightBox title="เงินเดือน" subtitle="ช่วงเงินเดือนของสายอาชีพนี้" icon="/hand-coin.svg" className="basis-1/3">
                    <p className="font-semibold text-lg">35,000 - 50,000 ต่อเดือน</p>
                </InsightBox>
                <InsightBox title="ผู้ร่วมทาง" subtitle="จำนวนคนที่ทำนายได้สายอาชีพนี้" icon="/users.svg" className="basis-1/3">
                    <p className="font-semibold text-lg">20 คน</p>
                </InsightBox>
            </div>
            <h3 className="font-semibold text-lg">ทักษะ</h3>
        </section>
    );
};