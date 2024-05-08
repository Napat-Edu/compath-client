'use client'
import { useEffect } from "react"

export default function Home() {

  useEffect(() => {

    const delayRedirect = setTimeout(() => {
      window.location.href = 'https://compath-qc72cy7wuq-uc.a.run.app/';
    }, 2000);

    return () => clearTimeout(delayRedirect);

  }, []);

  return (
    <>
      <main className="w-full min-h-screen flex flex-col gap-2 justify-center items-center">
        <img src="compath-logo.svg" alt="compath-logo" className="animate-bounce w-80 h-auto" />
        <p>กำลังพาคุณไปที่ compath โปรดรอสักครู่...</p>
      </main>
    </>
  )
}
