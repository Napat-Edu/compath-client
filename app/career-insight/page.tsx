import CareerInsightContainer from "@/components/containers/CareerInsightContainer";
import { InsightSelect } from "@/components/InsightSelect";

export default function CareerInsightPage() {
    return (
        <>
            <section className="border-b-2 border-maingray pt-6 pb-4 flex flex-row justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary font-bold text-4xl">Career Insight</h1>
                    <p className="text-subtext">แสดงผลข้อมูลเชิงลึกของอาชีพที่คุณทำนายได้</p>
                </div>
                <InsightSelect></InsightSelect>
            </section>

            <CareerInsightContainer />
        </>
    );
};