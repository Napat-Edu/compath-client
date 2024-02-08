'use client'
import { IPredictionHistory } from "@/interfaces/career-prediction-interface";
import { createContext, useEffect, useState } from "react";

type localStorageContent = {
    predictionHistory: IPredictionHistory[],
    addPredictionHistory: (newPredictHistory: IPredictionHistory) => void,
    findPredictionHistory: (id: string) => string,
    isStorageReady: boolean,
    getLatestHistory: () => IPredictionHistory
};

export const LocalStorageContext = createContext<localStorageContent>({
    predictionHistory: [],
    addPredictionHistory: function (newPredictHistory: IPredictionHistory): void {
        throw new Error("Function not implemented.");
    },
    findPredictionHistory: function (id: string): string {
        throw new Error("Function not implemented.");
    },
    isStorageReady: false,
    getLatestHistory: function (): IPredictionHistory {
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

    const findPredictionHistory = (id: string): string => {
        const history = predictionHistory.find((history) => {
            return history.objectId == id;
        });
        return history!.result ?? '';
    };

    const sortHistoryByDate = (oldHistory: IPredictionHistory[]) => {
        return oldHistory.sort(
            (b, a) => Number(new Date(a.submitDate)) - Number(new Date(b.submitDate)),
        );
    };

    const getLatestHistory = () => {
        const latestHistory = predictionHistory.reduce((acc: IPredictionHistory, current: IPredictionHistory) => {
            const currentDate = new Date(current.submitDate);
            const accDate = acc ? new Date(acc.submitDate) : null;

            if (!accDate || currentDate > accDate) {
                return current;
            } else {
                return acc;
            }
        });
        return latestHistory;
    };

    return (
        <LocalStorageContext.Provider value={{ predictionHistory, addPredictionHistory, findPredictionHistory, isStorageReady, getLatestHistory }}>{children}</LocalStorageContext.Provider>
    );
};