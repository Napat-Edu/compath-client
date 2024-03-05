import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";

export const useSidebar = () => {
    const sidebarContext = useContext(SidebarContext);
    return sidebarContext;
}

export default useSidebar;