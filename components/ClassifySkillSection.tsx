import { ICareer, ICareerPredictionResult } from "@/interfaces/career-prediction-interface";
import InsightBox from "./InsightBox";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface IClassifySkillSection {
    careerPathInfo: ICareerPredictionResult;
    isLoading: boolean;
}

Chart.register(ArcElement, Tooltip, Legend);

export default function ClassifySkillSection(props: IClassifySkillSection) {
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
        let existSkills: string[] = [];
        domains.forEach((domain) => {
            domain.skill_list.forEach((skill) => {
                if (skill.isExisInResume) {
                    existSkills.push(skill.name[0]);
                }
            });
        });
        return existSkills;
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
        return (
            <>
                {existSkills.map((existSkill, idx) => {
                    return <Badge key={`exist-skill-${idx}`} variant={'outline'}>{existSkill}</Badge>;
                })}
            </>
        );
    };

    const mapNonExistingDomain = (related_careers: ICareer[], tabCareerIdx: number) => {
        const filteredDomain = findNonExistingDomain(related_careers, tabCareerIdx);
        return (
            <React.Fragment key={`${related_careers[tabCareerIdx]}-learning-domain`}>
                {filteredDomain.map((domain, idx) => {
                    return (
                        <HoverCard key={`non-exist-domain-${idx}`} openDelay={0} closeDelay={0}>
                            <HoverCardTrigger>
                                <Badge className="border-primary" variant={'outline'} key={`badge-${idx}`}>
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

    useEffect(() => {
        if (!props.isLoading) {
            handleCareerChange(0);
        }
        return;
    }, [props.isLoading]);

    return (
        !props.isLoading ?
            <Tabs defaultValue={`${props.careerPathInfo.related_careers[0].career}`} className="w-full">
                <TabsList>
                    {
                        props.careerPathInfo.related_careers.map((career, careerIndex) => {
                            return <TabsTrigger value={`${career.career}`} key={`tab-list-${career.career}`} onClick={() => { handleCareerChange(careerIndex) }}>{career.career}</TabsTrigger>;
                        })
                    }
                </TabsList>
                {
                    props.careerPathInfo.related_careers.map((career, tabCareerIdx) => {
                        return (
                            <TabsContent value={`${career.career}`} key={`tab-content-${career.career}`} className="mt-4">
                                <div className="flex flex-row gap-4">
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
                                                    !props.isLoading && props.careerPathInfo.related_careers[tabCareerIdx].alt_skills.map((domain, idx) => {
                                                        return <Badge key={`skill-${idx}`} variant={'outline'}>{domain.name[0]}</Badge>;
                                                    })
                                                }
                                            </div>
                                        </InsightBox>
                                    </div>
                                    <InsightBox
                                        title={"กราฟทักษะ"}
                                        subtitle={"โปรดกรอกข้อมูลให้ระบบเพื่อนำไปทำนายสายอาชีพที่เหมาะสมกับคุณ"}
                                        name={"AreaChart"}
                                        className="basis-1/2"
                                    >
                                        <div className="flex flex-col h-full">
                                            <div className="flex flex-row justify-center items-center gap-6 border-[1px] rounded-[8px] p-5 h-full">
                                                <div className="flex flex-row justify-center align-middle items-center h-full">
                                                    {!props.isLoading && <Doughnut className="max-h-full max-w-full" data={data} options={options}></Doughnut>}
                                                </div>
                                                <div className="flex flex-col gap-5">
                                                    <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#4EBC62] mr-1" />เหมาะสม : {skillTypeCount.existSkill}</Badge>
                                                    <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#EDF8EF] mr-1" />ควรเรียนรู้ : {skillTypeCount.nonExistSkill}</Badge>
                                                    <Badge className="w-fit leading-5" variant={"outline"}><span className="w-3 h-3 rounded-full bg-[#EFEFEF] mr-1" />อื่น ๆ : {skillTypeCount.altSkill}</Badge>
                                                </div>
                                            </div>
                                            <div className="flex flex-row p-5 border-[1px] rounded-[8px] gap-3 items-center w-full justify-between mt-4">
                                                <div className="flex flex-col">
                                                    <h5 className="font-medium text-base">อาชีพและทักษะที่เกี่ยวข้อง</h5>
                                                    <p className="font-normal text-sm text-gray-500">คุณสามารถดูอาชีพและทักษะที่เกี่ยวข้องอื่น ๆ ได้</p>
                                                </div>
                                                <Button>ไปดู</Button>
                                            </div>
                                        </div>
                                    </InsightBox>
                                </div>
                            </TabsContent>
                        );
                    })
                }
            </Tabs> :
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