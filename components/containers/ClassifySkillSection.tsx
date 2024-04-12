'use client'
import { ICareer, ICareerPredictionResult } from "@/interfaces/career-prediction.interface";
import InsightBox from "../InsightBox";
import { Badge } from "../ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Icon from "../Icon";
import Link from "next/link";
import useSidebar from "@/hooks/useSidebar";
import useSelectInsight from "@/hooks/useSelectInsight";

interface IClassifySkillSection {
    careerPathInfo: ICareerPredictionResult;
    isLoading: boolean;
}

Chart.register(ArcElement, Tooltip, Legend);

export default function ClassifySkillSection(props: IClassifySkillSection) {
    const sidebar = useSidebar();
    const selectInsight = useSelectInsight();

    const [skillTypeCount, setSkillTypeCount] = useState({
        existSkill: 0,
        nonExistSkill: 0,
        altSkill: 0
    });

    const data = {
        labels: ['ควรเรียนรู้', 'อื่น ๆ', 'เหมาะสม'],
        datasets: [
            {
                label: " จำนวน ",
                data: [skillTypeCount.nonExistSkill, skillTypeCount.altSkill, skillTypeCount.existSkill],
                backgroundColor: [
                    '#EDF8EF',
                    '#EFEFEF',
                    '#4EBC62',
                ],
                borderColor: [
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            maintainAspectRatio: false
        },
    };

    const findExistingSkill = (related_careers: ICareer[], tabCareerIdx: number) => {
        const domains = related_careers[tabCareerIdx].skill_domains;
        const uniqueExistSkills: Set<string> = new Set();
        domains.forEach((domain) => {
            domain.skill_list.forEach((skill) => {
                if (skill.isExisInResume) {
                    uniqueExistSkills.add(skill.name[0]);
                }
            });
        });
        return Array.from(uniqueExistSkills);
    };


    const findNonExistingDomain = (related_careers: ICareer[], tabCareerIdx: number) => {
        const domains = related_careers[tabCareerIdx].skill_domains;
        const nonExistingSkillDomain = domains.map((domain) => {
            const isSkillInDomainExist = domain.skill_list.some((skill) => skill.isExisInResume);
            const newSkillList = isSkillInDomainExist ? [] : domain.skill_list.filter((skill) => !skill.isExisInResume);
            return { ...domain, skill_list: newSkillList };
        });
        const filteredDomain = nonExistingSkillDomain.filter((domain) => domain.skill_list.length > 0);
        return filteredDomain;
    };

    const mapExistingSkill = (related_careers: ICareer[], tabCareerIdx: number) => {
        const existSkills = findExistingSkill(related_careers, tabCareerIdx);
        if (existSkills.length > 0) {
            return (
                <>
                    {existSkills.map((existSkill, idx) => {
                        return <Badge key={`exist-skill-${idx}`} variant={'outline'}>{existSkill}</Badge>;
                    })}
                </>
            );
        } else {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-medium text-xs">ไม่พบทักษะ</p>
                    <Icon name={"HelpCircle"} color={"#71717A"} size={10} />
                </div>
            );
        }
    };

    const mapNonExistingDomain = (related_careers: ICareer[], tabCareerIdx: number) => {
        const filteredDomain = findNonExistingDomain(related_careers, tabCareerIdx);
        if (filteredDomain.length > 0) {
            return (
                <React.Fragment key={`${related_careers[tabCareerIdx]}-learning-domain`}>
                    {filteredDomain.map((domain, idx) => {
                        return (
                            <HoverCard key={`non-exist-domain-${idx}`} openDelay={0} closeDelay={0}>
                                <HoverCardTrigger>
                                    <Badge className="text-primary" variant={'outline'} key={`badge-${idx}`}>
                                        {domain.name}
                                    </Badge>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <div className="flex flex-row flex-wrap justify-center gap-1">
                                        {domain.skill_list.map((skill, skillIdx) => (
                                            <Badge key={`non-exist-domain-${idx}-skill-${skillIdx}`} variant={'outline'}>
                                                {skill.name[0]}
                                            </Badge>
                                        ))}
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        );
                    })}
                </React.Fragment>
            );
        } else {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-medium text-xs">ไม่พบทักษะ</p>
                    <Icon name={"HelpCircle"} color={"#71717A"} size={10} />
                </div>
            );
        }
    };

    const mapAlternateSkill = (careerPathInfo: ICareerPredictionResult, tabCareerIdx: number) => {
        const career = careerPathInfo.related_careers[tabCareerIdx];
        if (career.alt_skills.length > 0) {
            return careerPathInfo.related_careers[tabCareerIdx].alt_skills.map((domain, idx) => {
                return <Badge key={`skill-${idx}`} variant={'outline'}>{domain.name[0]}</Badge>;
            })
        } else {
            return (
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-medium text-xs">ไม่พบทักษะ</p>
                    <Icon name={"HelpCircle"} color={"#71717A"} size={10} />
                </div>
            );
        }
    };

    const handleCareerChange = (careerIndex: number) => {
        const existSkills = findExistingSkill(props.careerPathInfo.related_careers, careerIndex);
        const nonExistSkill = findNonExistingDomain(props.careerPathInfo.related_careers, careerIndex);
        setSkillTypeCount({
            existSkill: existSkills.length,
            nonExistSkill: nonExistSkill.length,
            altSkill: props.careerPathInfo.related_careers[careerIndex].alt_skills.length
        });
    };

    const handleExplorationClick = (career: string) => {
        sidebar.setActiveTab(2);
        selectInsight.upDateFocusCareer(career);
    };

    useEffect(() => {
        if (!props.isLoading) {
            handleCareerChange(0);
        }
        return () => { };
    }, [props.isLoading]);

    if (props.isLoading) {
        return (
            <>
                <div className="w-1/4 bg-slate-100 rounded-lg h-10 animate-pulse bg-gradient-to-b" />
                <div className="flex flex-row gap-6">
                    <div className="basis-1/2 flex flex-col gap-6">
                        <div className="bg-slate-100 rounded-lg h-20 animate-pulse bg-gradient-to-b" />
                        <div className="bg-slate-100 rounded-lg h-20 animate-pulse bg-gradient-to-b" />
                        <div className="bg-slate-100 rounded-lg h-20 animate-pulse bg-gradient-to-b" />
                    </div>
                    <div className="basis-1/2 bg-slate-100 rounded-lg h-auto animate-pulse bg-gradient-to-b" />
                </div>
            </>
        );
    }

    return (
        <>
            <Tabs defaultValue={`${props.careerPathInfo.related_careers[0].career}`} className="w-full hidden md:block">
                <h3 className="font-semibold text-lg flex flex-row gap-[6px] mb-4"><Icon name={"Boxes"} />ทักษะ</h3>
                <div className="overflow-x-auto">
                    <TabsList>
                        {
                            props.careerPathInfo.related_careers.map((career, careerIndex) => {
                                return <TabsTrigger value={`${career.career}`} key={`tab-list-${career.career}`} onClick={() => { handleCareerChange(careerIndex) }}>{career.career}</TabsTrigger>;
                            })
                        }
                    </TabsList>
                </div>
                {
                    props.careerPathInfo.related_careers.map((career, tabCareerIdx) => {
                        return (
                            <TabsContent value={`${career.career}`} key={`tab-content-${career.career}`} className="mt-4">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex flex-col gap-4 basis-1/2 h-full">
                                        <InsightBox
                                            title={"ทักษะที่เหมาะสม"}
                                            subtitle={"ทักษะที่มักจะมีอยู่ในเรซูเมในสายอาชีพนี้ ที่คุณมีอยู่แล้ว"}
                                            name={"CheckCircle"}
                                        >
                                            <div className="flex flex-row flex-wrap gap-1">
                                                {!props.isLoading && mapExistingSkill(props.careerPathInfo.related_careers, tabCareerIdx)}
                                            </div>
                                        </InsightBox>
                                        <InsightBox
                                            title={"ทักษะที่ควรเรียนรู้"}
                                            subtitle={"ทักษะที่มักจะมีอยู่ในเรซูเมในสายอาชีพนี้  ที่คุณควรเรียนรู้เพิ่มเติม"}
                                            name={"PlusCircle"}
                                        >
                                            <div className="flex flex-row flex-wrap gap-1">
                                                {!props.isLoading && mapNonExistingDomain(props.careerPathInfo.related_careers, tabCareerIdx)}
                                            </div>
                                        </InsightBox>
                                        <InsightBox
                                            title={"ทักษะอื่น ๆ"}
                                            subtitle={"ทักษะที่ไม่เกี่ยวข้องกับสายอาชีพนี้มากนัก แต่ที่คุณยังสามารถพัฒนาต่อไปได้"}
                                            name={"CircleDot"}
                                        >
                                            <div className="flex flex-row flex-wrap gap-1">
                                                {
                                                    !props.isLoading && mapAlternateSkill(props.careerPathInfo, tabCareerIdx)
                                                }
                                            </div>
                                        </InsightBox>
                                    </div>
                                    <InsightBox
                                        title={"สรุปผลทักษะ"}
                                        subtitle={"กราฟแสดงอัตราส่วนของทักษะในอาชีพนี้"}
                                        name={"PieChart"}
                                        className="basis-1/2"
                                    >
                                        <div className="flex flex-col h-full">
                                            <div className="flex flex-row justify-center items-center gap-1 border-[1px] rounded-[8px] p-5 h-full">
                                                <div className="flex flex-row justify-center align-middle items-center h-full">
                                                    {!props.isLoading && <Doughnut className="max-h-full max-w-full" data={data} options={options}></Doughnut>}
                                                </div>
                                                <div className="flex flex-col gap-5">
                                                    <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#4EBC62] mr-1" />ทักษะที่เหมาะสม : {skillTypeCount.existSkill}</Badge>
                                                    <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#EDF8EF] mr-1" />ทักษะที่ควรเรียนรู้ : {skillTypeCount.nonExistSkill}</Badge>
                                                    <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#EFEFEF] mr-1" />ทักษะอื่น ๆ : {skillTypeCount.altSkill}</Badge>
                                                </div>
                                            </div>
                                            <div className="flex flex-row p-5 border-[1px] rounded-[8px] gap-3 items-center w-full justify-between mt-4">
                                                <div className="flex flex-col">
                                                    <h5 className="font-medium text-base">อาชีพและทักษะที่เกี่ยวข้อง</h5>
                                                    <p className="font-normal text-sm text-gray-500">คุณสามารถดูอาชีพและทักษะที่เกี่ยวข้องอื่น ๆ ได้</p>
                                                </div>
                                                <Link href={"/career-exploration"}>
                                                    <Button className="relative" onClick={() => { handleExplorationClick(career.career) }}>
                                                        ไปดู
                                                        <span className="absolute flex h-3 w-3 -right-1 -top-1">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </InsightBox>
                                </div>
                            </TabsContent>
                        );
                    })
                }
            </Tabs>
            <ClassifySectionTab {...props}
                findExistingSkill={findExistingSkill}
                findNonExistingDomain={findNonExistingDomain}
                mapExistingSkill={mapExistingSkill}
                mapNonExistingDomain={mapNonExistingDomain}
                mapAlternateSkill={mapAlternateSkill}
                handleCareerChange={handleCareerChange}
                handleExplorationClick={handleExplorationClick}
                data={data}
                options={options}
                skillTypeCount={skillTypeCount}
            />
        </>
    );
}

interface IClassifySectionTab extends IClassifySkillSection {
    findExistingSkill: any;
    findNonExistingDomain: any;
    mapExistingSkill: any;
    mapNonExistingDomain: any;
    mapAlternateSkill: any;
    handleCareerChange: any;
    handleExplorationClick: any;
    data: any;
    options: any;
    skillTypeCount: any;
}

function ClassifySectionTab(props: IClassifySectionTab) {
    const [currentSelectedCareer, setCurrentSelectedCareer] = useState(props.careerPathInfo.related_careers[0].career);

    return (
        <>
            <Tabs defaultValue="info" className="md:hidden">
                <div className="flex flex-row justify-between mb-4">
                    <h3 className="font-semibold text-lg flex flex-row gap-[6px]"><Icon name={"Boxes"} />ทักษะ</h3>
                    <TabsList>
                        <TabsTrigger value={`info`} key={`tab-info`}>
                            <Icon name={"LayoutList"} />
                        </TabsTrigger>
                        <TabsTrigger value={`pie`} key={`tab-pie`}>
                            <Icon name={"PieChart"} />
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value={"info"} key={`tab-content-info`}>
                    <Tabs defaultValue={`${currentSelectedCareer}`} className="w-full">
                        <div className="overflow-x-auto">
                            <TabsList>
                                {
                                    props.careerPathInfo.related_careers.map((career: { career: string; }, careerIndex: any) => {
                                        return <TabsTrigger value={`${career.career}`} key={`tab-list-${career.career}`} onClick={() => { props.handleCareerChange(careerIndex); setCurrentSelectedCareer(career.career); }}>{career.career}</TabsTrigger>;
                                    })
                                }
                            </TabsList>
                        </div>
                        {
                            props.careerPathInfo.related_careers.map((career: { career: any; }, tabCareerIdx: any) => {
                                return (
                                    <TabsContent value={`${career.career}`} key={`tab-content-${career.career}`} className="mt-4">
                                        <div className="flex flex-col lg:flex-row gap-4">
                                            <div className="flex flex-col gap-4 basis-1/2 h-full">
                                                <InsightBox
                                                    title={"ทักษะที่เหมาะสม"}
                                                    subtitle={"ทักษะที่มักจะมีอยู่ในเรซูเมในสายอาชีพนี้ ที่คุณมีอยู่แล้ว"}
                                                    name={"CheckCircle"}
                                                >
                                                    <div className="flex flex-row flex-wrap gap-1">
                                                        {!props.isLoading && props.mapExistingSkill(props.careerPathInfo.related_careers, tabCareerIdx)}
                                                    </div>
                                                </InsightBox>
                                                <InsightBox
                                                    title={"ทักษะที่ควรเรียนรู้"}
                                                    subtitle={"ทักษะที่มักจะมีอยู่ในเรซูเมในสายอาชีพนี้  ที่คุณควรเรียนรู้เพิ่มเติม"}
                                                    name={"PlusCircle"}
                                                >
                                                    <div className="flex flex-row flex-wrap gap-1">
                                                        {!props.isLoading && props.mapNonExistingDomain(props.careerPathInfo.related_careers, tabCareerIdx)}
                                                    </div>
                                                </InsightBox>
                                                <InsightBox
                                                    title={"ทักษะอื่น ๆ"}
                                                    subtitle={"ทักษะที่ไม่เกี่ยวข้องกับสายอาชีพนี้มากนัก แต่ที่คุณยังสามารถพัฒนาต่อไปได้"}
                                                    name={"CircleDot"}
                                                >
                                                    <div className="flex flex-row flex-wrap gap-1">
                                                        {
                                                            !props.isLoading && props.mapAlternateSkill(props.careerPathInfo, tabCareerIdx)
                                                        }
                                                    </div>
                                                </InsightBox>
                                            </div>
                                        </div>
                                    </TabsContent>
                                );
                            })
                        }
                    </Tabs>
                </TabsContent>
                <TabsContent value={"pie"} key={`tab-content-pie`}>
                    <Tabs defaultValue={`${currentSelectedCareer}`} className="w-full">
                        <div className="overflow-x-auto">
                            <TabsList>
                                {
                                    props.careerPathInfo.related_careers.map((career: { career: string; }, careerIndex: any) => {
                                        return <TabsTrigger value={`${career.career}`} key={`tab-list-${career.career}`} onClick={() => { props.handleCareerChange(careerIndex); setCurrentSelectedCareer(career.career); }}>{career.career}</TabsTrigger>;
                                    })
                                }
                            </TabsList>
                        </div>
                        {
                            props.careerPathInfo.related_careers.map((career: { career: any; }, tabCareerIdx: any) => {
                                return (
                                    <TabsContent value={`${career.career}`} key={`tab-content-${career.career}`} className="mt-4">
                                        <div className="flex flex-col lg:flex-row gap-4">
                                            <InsightBox
                                                title={"สรุปผลทักษะ"}
                                                subtitle={"กราฟแสดงอัตราส่วนของทักษะในอาชีพนี้"}
                                                name={"PieChart"}
                                                className="basis-1/2"
                                            >
                                                <div className="flex flex-col h-full">
                                                    <div className="flex flex-col justify-center items-center gap-4 p-5 h-full">
                                                        <div className="flex flex-row justify-center align-middle items-center h-full">
                                                            {!props.isLoading && <Doughnut className="h-auto w-full" data={props.data} options={props.options}></Doughnut>}
                                                        </div>
                                                        <div className="flex flex-col gap-5">
                                                            <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#4EBC62] mr-1" />ทักษะที่เหมาะสม : {props.skillTypeCount.existSkill}</Badge>
                                                            <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#EDF8EF] mr-1" />ทักษะที่ควรเรียนรู้ : {props.skillTypeCount.nonExistSkill}</Badge>
                                                            <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#EFEFEF] mr-1" />ทักษะอื่น ๆ : {props.skillTypeCount.altSkill}</Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col p-5 border-[1px] rounded-[8px] gap-3 items-center w-full justify-between mt-4">
                                                        <div className="flex flex-col">
                                                            <h5 className="font-medium text-base">อาชีพและทักษะที่เกี่ยวข้อง</h5>
                                                            <p className="font-normal text-sm text-gray-500">คุณสามารถดูอาชีพและทักษะที่เกี่ยวข้องอื่น ๆ ได้</p>
                                                        </div>
                                                        <Link href={"/career-exploration"} className="w-full">
                                                            <Button className="relative w-full" onClick={() => { props.handleExplorationClick(career.career) }}>
                                                                ไปดู
                                                                <span className="absolute flex h-3 w-3 -right-1 -top-1">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                                                                </span>
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </InsightBox>
                                        </div>
                                    </TabsContent>
                                );
                            })
                        }
                    </Tabs>
                </TabsContent>

            </Tabs>
        </>
    );
}
