import { FormDialog } from "@/components/predict-dialog/FormDialog";
import HistoryCard from "@/components/HistoryCard";
import Icon from "@/components/Icon";
import OcrButton from "@/components/predict-dialog/OcrButton";

export default function Home() {

  return (
    <>

      <section className="flex flex-col border-b-2 border-subgray pt-6 pb-4 gap-1">
        <h1 className="text-primary font-bold text-4xl">Career Prediction</h1>
        <p className="text-subtext">แนะนำอาชีพเหมาะสมกับคุณจากข้อมูลในเรซูเม</p>
      </section>

      <section className="flex flex-col justify-center border-2 border-primary border-dashed rounded-2xl min-h-96 mt-4 px-4">
        <Icon className="mx-auto" name={"Newspaper"} size={32} />
        <div className="my-4 mx-8">
          <p className="text-center font-semibold text-xl">เริ่มทำนายอาชีพของคุณ</p>
          <p className="text-center text-subtext">ให้ข้อมูลกับเราเพื่อทำนายอาชีพที่เหมาะสมกับคุณ</p>
        </div>
        <div className="flex flex-col gap-2 w-fit mx-auto">
          <FormDialog></FormDialog>
          <div className="flex items-center gap-2 mx-2">
            <div className="border-t border  border-maingray flex-grow"></div>
            <div className="text-subtext font-medium">หรือ</div>
            <div className="border-t border border-maingray flex-grow"></div>
          </div>
          <OcrButton></OcrButton>
        </div>
      </section>

      <section className="flex flex-col mt-8">
        <HistoryCard></HistoryCard>
      </section>

    </>
  )
}
