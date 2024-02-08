'use client'
import { createContext, useState } from "react";

type selectedInsightContent = {
    selectedInsight: string,
    upDateSelectedInsight: any
}

export const SelectInsightContext = createContext<selectedInsightContent>({
    selectedInsight: "",
    upDateSelectedInsight: (career: string): void => { }
});

export const SelectInsightProvider = ({ children }: any) => {
    const [selectedInsight, setSelectedInsight] = useState<string>('');

    const upDateSelectedInsight = (career: string) => {
        setSelectedInsight(career);
    };

    return (
        <SelectInsightContext.Provider value={{ selectedInsight, upDateSelectedInsight }}>{children}</SelectInsightContext.Provider>
    );
};