'use client'
import { IFocusCareerInsight } from "@/interfaces/career-insight.interface";
import { createContext, useState } from "react";

type selectedInsightContent = {
    selectedInsight: IFocusCareerInsight,
    upDateSelectedInsight: any,
    focusCareer: string,
    upDateFocusCareer: any,
    clearFocusCareer: any,
    compareCareer: string,
    updateCompareCareer: any
}

export const SelectInsightContext = createContext<selectedInsightContent>({
    selectedInsight: { career_path: '', object_id: '' },
    upDateSelectedInsight: (career: string, id: string): void => { },
    focusCareer: '',
    upDateFocusCareer: (career: string): void => { },
    clearFocusCareer: (): void => { },
    compareCareer: '',
    updateCompareCareer: (value: string): void => { },
});

export const SelectInsightProvider = ({ children }: any) => {
    const [selectedInsight, setSelectedInsight] = useState<IFocusCareerInsight>({
        career_path: '',
        object_id: ''
    });
    const [focusCareer, setFocusCareer] = useState<string>('');
    const [compareCareer, setCompareCareer] = useState('');

    const upDateSelectedInsight = (career: string, id: string) => {
        setSelectedInsight({ career_path: career, object_id: id });
    };

    const upDateFocusCareer = (career: string) => {
        setFocusCareer(career);
    };

    const clearFocusCareer = () => {
        setFocusCareer('');
    };

    const updateCompareCareer = (value: string) => {
        setCompareCareer(value);
    };

    return (
        <SelectInsightContext.Provider value={{
            selectedInsight, upDateSelectedInsight, focusCareer, upDateFocusCareer, clearFocusCareer, compareCareer, updateCompareCareer
        }}>{children}</SelectInsightContext.Provider>
    );
};