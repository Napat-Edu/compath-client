'use client'
import { Button } from "@/components/ui/button";

export default function Home() {

  const shootAPI = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);
    const message = await result.json();
    console.log(message + " test!");
  };

  return (
    <section className="w-full px-6">

      <section className="border-b-2 border-[#E4E4E7] pt-6 pb-4 flex flex-col gap-1">
        <h1 className="text-primary font-bold text-4xl">Career Prediction</h1>
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
          <p className="text-center font-semibold text-xl">เริ่มทำนายอาชีพของคุณ</p>
          <p className="text-center text-[#71717A]">ให้ข้อมูลกับเราเพื่อทำนายอาชีพที่เหมาะสมกับคุณ</p>
        </div>
        <Button className="ml-auto mr-auto" onClick={shootAPI}>ไปทำนายอาชีพ</Button>
      </section>

    </section>
  )
}
