'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image";
import Icon from "./Icon";
import useSidebar from "@/hooks/useSidebar";

export function Sidebar() {
    const sidebar = useSidebar();

    const handleTabClicked = (index: number) => {
        sidebar.setActiveTab(index);
    };

    const handleSignIn = () => {
        const popupWidth = 350;
        const popupHeight = 500;
        const dualScreenLeft = window.screenLeft || window.screenX || 0;
        const dualScreenTop = window.screenTop || window.screenY || 0;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const left = (screenWidth - popupWidth) / 2 + dualScreenLeft;
        const top = (screenHeight - popupHeight) / 2 + dualScreenTop;
        const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

        window.open('', 'MsgWindow', popupFeatures);
    };

    return (
        <nav className="min-w-56 max-w-56 border-r-2">
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
                                sidebar.sideBarTabs.map((tab, idx) => {
                                    return (
                                        <Link href={tab.navigateLink} key={'sidebar-tab-' + idx}>
                                            <Button
                                                variant={sidebar.activeTab == idx ? 'outline' : 'ghost'}
                                                className={`flex flex-row gap-2 w-full justify-start border-2 ${sidebar.activeTab == idx ? 'border-primary' : 'border-transparent'}`}
                                                onClick={() => { handleTabClicked(idx) }}
                                            >
                                                <Icon name={tab.icon.name} size={20} />
                                                {tab.label}
                                            </Button>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </section>

                    <section className="px-8 py-4 flex flex-col gap-2">
                        <Button variant="outline" onClick={handleSignIn}>Sign In with Google</Button>
                    </section>

                </div>
            </div>
        </nav>
    )
}