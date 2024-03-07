'use client'
import { createContext, useEffect, useState } from "react";
import { ISidebarTab } from "@/interfaces/sidebar.interface"

type sidebarContent = {
    activeTab: number | undefined;
    setActiveTab: any;
    sideBarTabs: ISidebarTab[];
};

export const SidebarContext = createContext<sidebarContent>({
    activeTab: 0,
    setActiveTab: undefined,
    sideBarTabs: []
});

export const SidebarProvider = ({ children }: any) => {
    const [activeTab, setActiveTab] = useState<number>();

    const sideBarTabs: ISidebarTab[] = [
        {
            label: 'Career Prediction',
            icon: {
                name: 'Wand2'
            },
            navigateLink: '/'
        },
        {
            label: 'Career Insight',
            icon: {
                name: 'MousePointerSquare'
            },
            navigateLink: '/career-insight'
        },
        {
            label: 'Career Exploration',
            icon: {
                name: 'LayoutGrid'
            },
            navigateLink: '/career-exploration'
        }
    ];

    useEffect(() => {
        if (window.location.pathname !== "") {
            const newFocusTab = sideBarTabs.findIndex((tab) => {
                return tab.navigateLink == window.location.pathname;
            });
            setActiveTab(newFocusTab);
        }
    }, []);

    return (<SidebarContext.Provider value={{ activeTab, setActiveTab, sideBarTabs }}>{children}</SidebarContext.Provider>);
};