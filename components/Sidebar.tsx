'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react";
import Image from "next/image";

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
            label: 'Career Insight',
            icon: {
                path: 'inspect.svg',
                name: 'inspect'
            },
            navigateLink: '/career-insight'
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
                            <Image
                                src="compath-logo.svg"
                                alt="compath-logo icon"
                                width={172}
                                height={41}
                            />
                        </div>
                        <h3 className="pt-4 pb-2 pl-4 font-semibold">Feature</h3>
                        <div className="flex flex-col gap-1">
                            {
                                sideBarTabs.map((tab, idx) => {
                                    return (
                                        <Link href={tab.navigateLink} key={'sidebar-tab-' + idx}>
                                            <Button
                                                variant={activeTab == idx ? 'outline' : 'ghost'}
                                                className={`flex flex-row gap-2 w-full justify-start border-2 ${activeTab == idx ? 'border-primary' : 'border-transparent'}`}
                                                onClick={() => { handleTabClicked(idx) }}
                                            >
                                                <Image
                                                    src={tab.icon.path}
                                                    alt={tab.icon.name + "-icon"}
                                                    height={20}
                                                    width={20} />
                                                {tab.label}
                                            </Button>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </section>

                    <section className="px-6 py-4 flex flex-col gap-2">
                        <Button variant="outline" className="border-primary text-primary hover:text-primary">Login</Button>
                        <Button>Sign Up</Button>
                    </section>

                </div>
            </div>
        </div>
    )
}