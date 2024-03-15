'use client'
import { IFocusCareerInsight } from "@/interfaces/career-insight.interface";
import { createContext, useState } from "react";

type selectedInsightContent = {
    selectedInsight: IFocusCareerInsight,
    upDateSelectedInsight: any,
    focusCareer: string,
    upDateFocusCareer: any,
    clearFocusCareer: any,
}

export const SelectInsightContext = createContext<selectedInsightContent>({
    selectedInsight: { career_path: '', object_id: '' },
    upDateSelectedInsight: (career: string, id: string): void => { },
    focusCareer: '',
    upDateFocusCareer: (career: string): void => { },
    clearFocusCareer: (): void => { },
});

export const SelectInsightProvider = ({ children }: any) => {
    const [selectedInsight, setSelectedInsight] = useState<IFocusCareerInsight>({
        career_path: '',
        object_id: ''
    });
    const [focusCareer, setFocusCareer] = useState<string>('');

    const upDateSelectedInsight = (career: string, id: string) => {
        setSelectedInsight({ career_path: career, object_id: id });
    };

    const upDateFocusCareer = (career: string) => {
        setFocusCareer(career);
    };

    const clearFocusCareer = () => {
        setFocusCareer('');
    };

    return (
        <SelectInsightContext.Provider value={{ selectedInsight, upDateSelectedInsight, focusCareer, upDateFocusCareer, clearFocusCareer }}>{children}</SelectInsightContext.Provider>
    );
};