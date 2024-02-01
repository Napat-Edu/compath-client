'use client'
import { IPredictionHistory } from "@/interfaces/career-prediction-interface";
import { createContext, useEffect, useState } from "react";

type localStorageContent = {
    predictionHistory: IPredictionHistory[],
    addPredictionHistory: (newPredictHistory: IPredictionHistory) => void
};

export const LocalStorageContext = createContext<localStorageContent>({
    predictionHistory: [],
    addPredictionHistory: function (newPredictHistory: IPredictionHistory): void {
        throw new Error("Function not implemented.");
    }
});

export const LocalStorageProvider = ({ children }: any) => {
    const [predictionHistory, setPredictionHistory] = useState<IPredictionHistory[]>([]);

    useEffect(() => {
        const oldHistory = localStorage.getItem("predictionHistory");
        setPredictionHistory(oldHistory ? JSON.parse(oldHistory) : []);
    }, []);

    const addPredictionHistory = (newPredictHistory: IPredictionHistory) => {
        predictionHistory.push(newPredictHistory);
        setPredictionHistory([...predictionHistory]);
        localStorage.setItem("predictionHistory", JSON.stringify(predictionHistory));
    };

    return (
        <LocalStorageContext.Provider value={{ predictionHistory, addPredictionHistory }}>{children}</LocalStorageContext.Provider>
    );
};