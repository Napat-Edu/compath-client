'use client'
import { Button } from "@/components/ui/button";

export default function Home() {

  const shootAPI = async () => {
    const result = await fetch(`${process.env.API_BASE_URL}`).then((res) => res.json());
    console.log(result.msg);
  };

  return (
    <section className="w-full px-6">

      <section className="border-b-2 border-[#E4E4E7] pt-6 pb-4 flex flex-col gap-1">
        <h1 className="font-bold text-4xl">Career Prediction</h1>
        <p className="text-[#71717A]">แนะนำอาชีพเหมาะสมกับคุณจากข้อมูลในเรซูเม</p>
      </section>

      <section className="mt-4 border-2 rounded-lg border-dashed min-h-96 flex flex-col justify-center">
        <img
          src="resume.svg"
          alt="resume icon"
          height="32px"
          width="32px"
          className="ml-auto mr-auto" />
        <div className="my-4">
          <p className="text-center font-semibold text-xl">ยังไม่มีข้อมูลเรซูเม</p>
          <p className="text-center text-[#71717A]">เรายังไม่มีข้อมูลเรซูเมของคุณ กดปุ่มด้านล่างเพื่อกรอกข้อมูล</p>
        </div>
        <Button className="ml-auto mr-auto" onClick={shootAPI}>ไปกรอกข้อมูล</Button>
      </section>

    </section>
  )
}
