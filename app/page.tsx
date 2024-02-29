import { FormDialog } from "@/components/FormDialog";
import HistoryCard from "@/components/HistoryCard";
import Icon from "@/components/Icon";

export default function Home() {

  return (
    <main className="w-5/6 px-6">

      <section className="flex flex-col border-b-2 border-subgray pt-6 pb-4 gap-1">
        <h1 className="text-primary font-bold text-4xl">Career Prediction</h1>
        <p className="text-subtext">แนะนำอาชีพเหมาะสมกับคุณจากข้อมูลในเรซูเม</p>
      </section>

      <section className="flex flex-col justify-center border-2 border-primary border-dashed rounded-2xl min-h-96 mt-4">
        <div className="mx-auto">
          <Icon name={"Newspaper"} />
        </div>
        <div className="my-4">
          <p className="text-center font-semibold text-xl">เริ่มทำนายอาชีพของคุณ</p>
          <p className="text-center text-subtext">ให้ข้อมูลกับเราเพื่อทำนายอาชีพที่เหมาะสมกับคุณ</p>
        </div>
        <FormDialog></FormDialog>
      </section>

      <section className="min-h-96 flex flex-col mt-8">
        <HistoryCard></HistoryCard>
      </section>

    </main>
  )
}
