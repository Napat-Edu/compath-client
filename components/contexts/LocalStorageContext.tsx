'use client'
import { IFocusCareerInsight } from "@/interfaces/career-insight-interface";
import { IPredictionHistory } from "@/interfaces/career-prediction-interface";
import { createContext, useEffect, useState } from "react";

type localStorageContent = {
    predictionHistory: IPredictionHistory[],
    addPredictionHistory: (newPredictHistory: IPredictionHistory) => void,
    findPredictionHistory: (id: string) => any,
    isStorageReady: boolean,
    getLatestHistory: () => any
};

export const LocalStorageContext = createContext<localStorageContent>({
    predictionHistory: [],
    addPredictionHistory: function (newPredictHistory: IPredictionHistory): void {
        throw new Error("Function not implemented.");
    },
    isStorageReady: false,
    findPredictionHistory: function (id: string): any {
        throw new Error("Function not implemented.");
    },
    getLatestHistory: function () {
        throw new Error("Function not implemented.");
    }
});

export const LocalStorageProvider = ({ children }: any) => {
    const [predictionHistory, setPredictionHistory] = useState<IPredictionHistory[]>([]);
    const [isStorageReady, setIsStorageReady] = useState(false);

    useEffect(() => {
        const oldHistory = localStorage.getItem("predictionHistory");
        const sortedHistory = sortHistoryByDate(oldHistory ? JSON.parse(oldHistory) : []);
        setPredictionHistory(sortedHistory);
        setIsStorageReady(true);
    }, []);

    const addPredictionHistory = (newPredictHistory: IPredictionHistory) => {
        predictionHistory.push(newPredictHistory);
        setPredictionHistory(sortHistoryByDate([...predictionHistory]));
        localStorage.setItem("predictionHistory", JSON.stringify(predictionHistory));
    };

    const findPredictionHistory = (id: string) => {
        const historyResult = predictionHistory.find((history) => {
            if (history.object_id == id) {
                return history;
            } else {
                return null;
            }
        });
        return historyResult!.result ?? { career_path: '', object_id: '' };
    };

    const sortHistoryByDate = (oldHistory: IPredictionHistory[]) => {
        return oldHistory.sort(
            (b, a) => Number(new Date(a.submit_date)) - Number(new Date(b.submit_date)),
        );
    };

    const getLatestHistory = () => {
        const latestHistory = predictionHistory.reduce((acc: IPredictionHistory, current: IPredictionHistory) => {
            const currentDate = new Date(current.submit_date);
            const accDate = acc ? new Date(acc.submit_date) : null;

            if (!accDate || currentDate > accDate) {
                return current;
            } else {
                return acc;
            }
        });
        return { career_path: latestHistory.result, object_id: latestHistory.object_id };
    };

    return (
        <LocalStorageContext.Provider value={{ predictionHistory, addPredictionHistory, findPredictionHistory, isStorageReady, getLatestHistory }}>{children}</LocalStorageContext.Provider>
    );
};