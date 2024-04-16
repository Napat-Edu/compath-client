'use client'
import useAuth from "@/hooks/useAuth";
import { IFocusCareerInsight } from "@/interfaces/career-insight.interface";
import { IPredictionHistory } from "@/interfaces/storage.interface";
import { createContext, useEffect, useState } from "react";

type localStorageContent = {
    predictionHistory: IPredictionHistory[],
    addPredictionHistory: (newPredictHistory: IPredictionHistory) => void,
    findPredictionHistory: (id: string) => any,
    isStorageReady: boolean,
    getLatestHistory: () => IFocusCareerInsight,
    deleteHistory: (object_id: string) => void,
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
    },
    deleteHistory: function () {
        throw new Error("Function not implemented.");
    }
});

export const LocalStorageProvider = ({ children }: any) => {
    const auth = useAuth();
    const [predictionHistory, setPredictionHistory] = useState<IPredictionHistory[]>([]);
    const [isStorageReady, setIsStorageReady] = useState(false);

    useEffect(() => {
        if (auth.isReady) {
            initHistories();
        }
    }, [auth.isReady, auth.authData]);

    const initHistories = async () => {
        let oldHistory;
        if (!auth.authData.email) {
            oldHistory = localStorage.getItem("predictionHistory");
        } else {
            oldHistory = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_INSIGHT_ENDPOINT}/history?email=${auth.authData.email}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => response.json())
                .then((data) => {
                    const mappedHistory = data.map((history: any) => {
                        return {
                            career_path: history.prediction_result,
                            object_id: history._id,
                            submit_date: history.input_date
                        };
                    });
                    return JSON.stringify(mappedHistory);
                });
        }
        const sortedHistory = sortHistoryByDate(oldHistory ? JSON.parse(oldHistory) : []);
        setPredictionHistory(sortedHistory);
        setIsStorageReady(true);
    };

    const addPredictionHistory = (newPredictHistory: IPredictionHistory) => {
        if (!auth.authData.email) {
            predictionHistory.push(newPredictHistory);
            setPredictionHistory(sortHistoryByDate([...predictionHistory]));
            localStorage.setItem("predictionHistory", JSON.stringify(predictionHistory));
        } else {
            initHistories();
        }
    };

    const findPredictionHistory = (id: string) => {
        const historyResult = predictionHistory.find((history) => {
            if (history.object_id == id) {
                return history;
            } else {
                return null;
            }
        });
        const foundedHistory = {
            career_path: historyResult?.career_path ?? "",
            object_id: historyResult?.object_id ?? ""
        };
        return foundedHistory;
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
        return { career_path: latestHistory.career_path, object_id: latestHistory.object_id };
    };

    const deleteHistory = async (object_id: string) => {
        if (!auth.authData.email) {
            const fitleredHistory = predictionHistory.filter((history) => history.object_id !== object_id);
            localStorage.setItem("predictionHistory", JSON.stringify(fitleredHistory));
            setPredictionHistory(fitleredHistory);
        } else {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_INSIGHT_ENDPOINT}/history?id=${object_id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => response.json())
                .then((data) => {
                    initHistories();
                });
        }
    };

    return (
        <LocalStorageContext.Provider value={{ predictionHistory, addPredictionHistory, findPredictionHistory, isStorageReady, getLatestHistory, deleteHistory }}>{children}</LocalStorageContext.Provider>
    );
};