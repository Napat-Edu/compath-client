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
    width: '100vw',
    height: '100vh'
  });

  return (
    <>
      <main>
        {View}
      </main>
    </>
  )
}
