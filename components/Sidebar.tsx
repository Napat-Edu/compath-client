'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import { icons } from "lucide-react";

interface ISidebarTab {
    label: string;
    icon: {
        name: keyof typeof icons;
    }
    navigateLink: string;
}

export function Sidebar() {
    useEffect(() => {
        let focusTab: number = Number(sessionStorage.getItem("focusTab"));
        if (!focusTab) {
            focusTab = sideBarTabs.findIndex((tab) => {
                return tab.navigateLink == window.location.pathname;
            });
        }
        setActiveTab(focusTab);
    }, []);

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
            label: 'Career Path',
            icon: {
                name: 'LayoutGrid'
            },
            navigateLink: '/career-path'
        }
    ];

    const handleTabClicked = (index: number) => {
        sessionStorage.setItem("focusTab", index.toString());
        setActiveTab(index);
    };

    return (
        <nav className="min-w-52 border-r-2">
            <div className="space-y-4 py-4 sticky top-0 h-screen">
                <div className="flex flex-col justify-between h-full">

                    <section className="px-3 py-2">
                        <div className="flex flex-row mb-2 px-4 gap-1">
                            <Image
                                src="compath-logo.svg"
                                alt="compath-logo icon"
                                width={0}
                                height={0}
                                className="w-[172px] h-auto"
                                priority
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
                                                <Icon name={tab.icon.name} />
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
        </nav>
    )
}