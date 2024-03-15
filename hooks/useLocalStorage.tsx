import { useContext } from "react";
import { LocalStorageContext } from "../contexts/LocalStorageContext";

export const useLocalStorage = () => {
    const localStorageContext = useContext(LocalStorageContext);
    return localStorageContext;
}

export default useLocalStorage;