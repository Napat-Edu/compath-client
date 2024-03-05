import { FormDialog } from "@/components/predict-dialog/FormDialog";
import HistoryCard from "@/components/HistoryCard";
import Icon from "@/components/Icon";

export default function Home() {

  return (
    <>

      <section className="flex flex-col border-b-2 border-subgray pt-6 pb-4 gap-1">
        <h1 className="text-primary font-bold text-4xl">Career Prediction</h1>
        <p className="text-subtext">แนะนำอาชีพเหมาะสมกับคุณจากข้อมูลในเรซูเม</p>
      </section>

      <section className="flex flex-col justify-center border-2 border-primary border-dashed rounded-2xl min-h-96 mt-4">
        <Icon className="mx-auto" name={"Newspaper"} size={32} />
        <div className="my-4">
          <p className="text-center font-semibold text-xl">เริ่มทำนายอาชีพของคุณ</p>
          <p className="text-center text-subtext">ให้ข้อมูลกับเราเพื่อทำนายอาชีพที่เหมาะสมกับคุณ</p>
        </div>
        <FormDialog></FormDialog>
      </section>

      <section className="min-h-96 flex flex-col mt-8">
        <div className="flex flex-row mb-4 gap-[6px]">
          <Icon name={"BookMarked"} />
          <h3 className="font-semibold text-lg">การ์ดที่ทำนายไว้</h3>
        </div>
        <HistoryCard></HistoryCard>
      </section>

    </>
  )
}
