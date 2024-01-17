'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react";

interface ISidebarTab {
    label: string;
    icon: {
        path: string;
        name: string;
    }
    navigateLink: string;
}

export function Sidebar() {
    const [activeTab, setActiveTab] = useState(0);

    const sideBarTabs: ISidebarTab[] = [
        {
            label: 'Career Prediction',
            icon: {
                path: 'paperclip.svg',
                name: 'paperclip'
            },
            navigateLink: '/'
        },
        {
            label: 'Career Path',
            icon: {
                path: 'grid.svg',
                name: 'grid'
            },
            navigateLink: '/career-path'
        }
    ];

    const handleTabClicked = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className="min-w-52 max-w-72 w-1/6 border-r-2">
            <div className="space-y-4 py-4 sticky top-0 h-screen">
                <div className="flex flex-col justify-between h-full">

                    <section className="px-3 py-2">
                        <div className="flex flex-row mb-2 px-4 gap-1">
                            <img
                                src="compass.svg"
                                alt="compass icon"
                                height="36px"
                                width="36px" />
                            <h2 className="text-primary text-2xl font-semibold tracking-tight mt-auto mb-auto">
                                Compath
                            </h2>
                        </div>
                        <h3 className="pt-4 pb-2 pl-4 font-semibold">Feature</h3>
                        <div className="space-y-1">
                            {
                                sideBarTabs.map((tab, idx) => {
                                    return (
                                        <Link href={tab.navigateLink} key={'sidebar-tab-' + idx}>
                                            <Button
                                                variant={activeTab == idx ? 'outline' : 'ghost'}
                                                className={`flex flex-row gap-2 w-full justify-start border-2 ${activeTab == idx ? 'border-primary' : 'border-transparent'}`}
                                                onClick={() => { handleTabClicked(idx) }}
                                            >
                                                <img
                                                    src={tab.icon.path}
                                                    alt={tab.icon.name + "-icon"}
                                                    height="20px"
                                                    width="20px" />
                                                {tab.label}
                                            </Button>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </section>

                    <section className="px-6 py-4 flex flex-col gap-4">
                        <Button variant="outline" className="border-primary text-primary hover:text-primary">Login</Button>
                        <Button>Sign Up</Button>
                    </section>

                </div>
            </div>
        </div>
    )
}