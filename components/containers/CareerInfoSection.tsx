'use client'
import { useEffect, useState } from "react";
import InsightBox from "../InsightBox";
import { Badge } from "../ui/badge";
import { toSalaryNumber } from "../../utils/utils";
import useSelectInsight from "../../hooks/useSelectInsight";
import { ICareerPredictionResult } from "@/interfaces/career-prediction.interface";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ICareerInfoSection {
    setIsloading(arg0: boolean): unknown;
    getCareerInfo(career_path: string, object_id: string): void;
    isLoading: boolean;
    careerPathInfo: ICareerPredictionResult;
}

export default function CareerInfoSection(props: ICareerInfoSection) {
    const { selectedInsight, compareCareer } = useSelectInsight();

    useEffect(() => {
        if (
            selectedInsight.career_path !== '' &&
            selectedInsight.object_id !== '' &&
            selectedInsight.career_path &&
            selectedInsight.object_id
        ) {
            props.setIsloading(true);
            let currentCareer = selectedInsight.career_path;
            if (compareCareer !== '') {
                currentCareer = compareCareer;
            }
            props.getCareerInfo(currentCareer, selectedInsight.object_id);
        }
    }, [selectedInsight, compareCareer]);

    return (
        <>
            <InfoCarousel {...props}></InfoCarousel>
            <div className="hidden sm:flex sm:flex-row gap-4 min-w-full">
                <InsightBox title="อาชีพ" subtitle="ตัวอย่างอาชีพที่อยู่ในสายอาชีพนี้" className="basis-1/3" name={"Briefcase"}>
                    <div className={`flex flex-row flex-wrap gap-1 ${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                        {
                            !props.isLoading && props.careerPathInfo.related_careers.map((career, idx) => {
                                return (
                                    <Badge key={career + "-" + idx} variant="outline">{career.career}</Badge>
                                );
                            })
                        }
                    </div>
                </InsightBox>
                <InsightBox title="เงินเดือน" subtitle="ช่วงเงินเดือนของสายอาชีพนี้" className="basis-1/3" name={"HandCoins"}>
                    <div className={`${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                        {
                            !props.isLoading && <p className={`font-semibold text-lg`}>{toSalaryNumber(props.careerPathInfo.base_salary.min_salary ?? 0)} - {toSalaryNumber(props.careerPathInfo.base_salary.max_salary ?? 0)} ต่อเดือน</p>
                        }
                    </div>
                </InsightBox>
                <InsightBox title="ถูกทำนายไปแล้ว" subtitle="จำนวนครั้งที่ทำนายได้สายอาชีพนี้" className="basis-1/3" name={"Users"}>
                    <div className={`${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                        {
                            !props.isLoading && <p className={`font-semibold text-lg`}>{props.careerPathInfo.careermate_count} ครั้ง</p>
                        }
                    </div>
                </InsightBox>
            </div>
        </>
    );
}

function InfoCarousel(props: ICareerInfoSection) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Carousel className="w-full sm:hidden" setApi={setApi} plugins={[Autoplay({ delay: 2000 })]}>
            <CarouselContent>

                <CarouselItem key={0}>
                    <InsightBox title="อาชีพ" subtitle="ตัวอย่างอาชีพที่อยู่ในสายอาชีพนี้" className="h-full" name={"Briefcase"}>
                        <div className={`flex flex-row flex-wrap gap-1 ${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                            {
                                !props.isLoading && props.careerPathInfo.related_careers.map((career, idx) => {
                                    return (
                                        <Badge key={career + "-" + idx} variant="outline">{career.career}</Badge>
                                    );
                                })
                            }
                        </div>
                    </InsightBox>
                </CarouselItem>

                <CarouselItem key={1}>
                    <InsightBox title="เงินเดือน" subtitle="ช่วงเงินเดือนของสายอาชีพนี้" className="h-full" name={"HandCoins"}>
                        <div className={`${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                            {
                                !props.isLoading && <p className={`font-semibold text-lg`}>{toSalaryNumber(props.careerPathInfo.base_salary.min_salary ?? 0)} - {toSalaryNumber(props.careerPathInfo.base_salary.max_salary ?? 0)} ต่อเดือน</p>
                            }
                        </div>
                    </InsightBox>
                </CarouselItem>

                <CarouselItem key={2}>
                    <InsightBox title="ถูกทำนายไปแล้ว" subtitle="จำนวนครั้งที่ทำนายได้สายอาชีพนี้" className="h-full" name={"Users"}>
                        <div className={`${props.isLoading ? 'bg-slate-100 rounded-lg h-6 animate-pulse bg-gradient-to-b' : null}`}>
                            {
                                !props.isLoading && <p className={`font-semibold text-lg`}>{props.careerPathInfo.careermate_count} ครั้ง</p>
                            }
                        </div>
                    </InsightBox>
                </CarouselItem>

            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />

            <p className="text-center mt-4 text-subtext">{current + ' / ' + count}</p>
        </Carousel>
    )
}