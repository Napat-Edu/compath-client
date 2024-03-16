'use client'
import { createContext, useEffect, useState } from "react";
import { ISidebarTab } from "@/interfaces/sidebar.interface";

type SidebarContent = {
    activeTab: number | undefined;
    setActiveTab: any;
    sideBarTabs: ISidebarTab[];
};

export const SidebarContext = createContext<SidebarContent>({
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

    const handlePopState = () => {
        const newFocusTab = sideBarTabs.findIndex((tab) => tab.navigateLink === window.location.pathname);
        setActiveTab(newFocusTab);
    };

    useEffect(() => {
        handlePopState();
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <SidebarContext.Provider value={{ activeTab, setActiveTab, sideBarTabs }}>
            {children}
        </SidebarContext.Provider>
    );
};
