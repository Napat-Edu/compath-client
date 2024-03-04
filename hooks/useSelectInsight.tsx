import { useContext } from "react";
import { SelectInsightContext } from "../contexts/SelectInsightContext";

export const useSelectInsight = () => {
    const selectInsightContext = useContext(SelectInsightContext);
    return selectInsightContext;
}

export default useSelectInsight;