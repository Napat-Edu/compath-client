'use client'
import useLocalStorage from "./hooks/useLocalStorage";

export default function HistoryCard() {
    const localStorage = useLocalStorage();

    return (
        <div className="flex flex-row flex-wrap gap-4 rounded-md mt-4">
            {
                localStorage.predictionHistory.map((history, idx) => {
                    return (
                        <button
                            className="bg-slate-100 p-2 rounded-lg"
                            key={"prediction-history-card" + idx}
                        >
                            {history.result}
                        </button>
                    );
                })
            }
        </div>
    );
}