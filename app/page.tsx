'use client'
import { useEffect } from "react"
import { useLottie } from "lottie-react";
import compathLogoAnimation from '../public/compath_logo_remix.json';

export default function Home() {

  useEffect(() => {

    const delayRedirect = setTimeout(() => {
      window.location.href = 'https://compath-qc72cy7wuq-uc.a.run.app/';
    }, 2000);

    return () => clearTimeout(delayRedirect);

  }, []);

  const options = {
    animationData: compathLogoAnimation,
    loop: false
  };

  const { View } = useLottie(options, {
    width: '100%',
    height: '100%'
  });

  return (
    <>
      <main className="w-screen h-screen md:w-1/2 md:m-auto">
        {View}
      </main>
    </>
  )
}
