'use client'
import { IFocusCareerInsight } from "@/interfaces/career-insight-interface";
import { createContext, useState } from "react";

type selectedInsightContent = {
    selectedInsight: IFocusCareerInsight,
    upDateSelectedInsight: any
}

export const SelectInsightContext = createContext<selectedInsightContent>({
    selectedInsight: { career_path: '', object_id: '' },
    upDateSelectedInsight: (career: string, id: string): void => { }
});

export const SelectInsightProvider = ({ children }: any) => {
    const [selectedInsight, setSelectedInsight] = useState<IFocusCareerInsight>({
        career_path: '',
        object_id: ''
    });

    const upDateSelectedInsight = (career: string, id: string) => {
        setSelectedInsight({ career_path: career, object_id: id });
    };

    return (
        <SelectInsightContext.Provider value={{ selectedInsight, upDateSelectedInsight }}>{children}</SelectInsightContext.Provider>
    );
};