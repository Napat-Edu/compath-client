'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image";
import Icon from "./Icon";
import useSidebar from "@/hooks/useSidebar";
import { SidebarContent } from "@/contexts/SidebarContext";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import useAuth from "@/hooks/useAuth";
import { useGoogleLogin } from '@react-oauth/google';

export default function NavigateBar() {
    const sidebar = useSidebar();

    const handleTabClicked = (index: number) => {
        sidebar.setActiveTab(index);
    };

    return (
        <>
            <Sidebar sidebar={sidebar} handleTabClicked={handleTabClicked}></Sidebar>
            <NavigateDrawer sidebar={sidebar} handleTabClicked={handleTabClicked}></NavigateDrawer>
        </>
    )
}

interface INavigate {
    handleTabClicked: (index: number) => void;
    sidebar: SidebarContent;
}

function Sidebar({ handleTabClicked, sidebar }: INavigate) {
    return (
        <nav className="min-w-60 max-w-60 border-r-2 border-subgray hidden md:block">
            <div className="space-y-4 py-4 sticky top-0 h-screen">
                <div className="flex flex-col justify-between h-full">

                    <section className="px-4 py-2">
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

                    <section className="px-4 py-4 flex flex-col gap-2">
                        <SignInButton />
                    </section>

                </div>
            </div>
        </nav>
    );
}

function NavigateDrawer({ handleTabClicked, sidebar }: INavigate) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawerTrigger = () => {
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
        setIsOpen((prev) => !prev)
    };

    return (
        <>
            <div className="sticky top-0 z-50 md:hidden flex gap-4 border-b-[1px] p-4 bg-white">
                <button onClick={() => { handleDrawerTrigger() }}>
                    <Icon name={"Menu"} color={"black"} size={24} />
                </button>
                <Image
                    src="compath-logo.svg"
                    alt="compath-logo icon"
                    width={0}
                    height={0}
                    className="w-[172px] h-auto"
                    priority
                />
            </div>
            <div>
                <div onClick={() => { handleDrawerTrigger() }} className={`fixed z-30 bg-black w-full h-full opacity-50 ${isOpen ? '' : 'hidden'}`} />
                <div className="fixed w-full z-50">
                    <div className={`bg-white rounded-b-xl ease-in-out duration-200 px-4 overflow-hidden transition-all ${isOpen ? 'max-h-96 pt-4 pb-10' : 'max-h-0 pt-0 pb-0'}`}>
                        <h3 className="font-semibold text-primary">Feature</h3>
                        <div className="flex flex-col gap-1 w-full pb-1 border-b">
                            {sidebar.sideBarTabs.map((tab, idx) => (
                                <Link href={tab.navigateLink} key={'sidebar-tab-' + idx}>
                                    <Button
                                        variant={sidebar.activeTab === idx ? 'outline' : 'ghost'}
                                        className={`flex flex-row gap-2 w-full justify-start border-2 ${sidebar.activeTab === idx ? 'border-primary' : 'border-transparent'}`}
                                        onClick={() => { handleTabClicked(idx); handleDrawerTrigger(); }}
                                    >
                                        <Icon name={tab.icon.name} size={20} />
                                        {tab.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                        <h3 className="font-semibold text-primary my-2">Account</h3>
                        <SignInButton />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDrawerTrigger()}
                            className={`rounded-full p-1 absolute z-50 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white ${!isOpen && 'hidden'}`}
                        >
                            <Icon name={"ChevronsUp"} size={16} color="black" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

function SignInButton() {
    const auth = useAuth();

    const handleLogout = () => {
        googleLogout();
        localStorage.setItem('authData', JSON.stringify({}));
        auth.updateAuthData({});
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeResponse.code })
            })
                .then(response => response.json())
                .then(authData => {
                    localStorage.setItem('authData', JSON.stringify(authData));
                    auth.updateAuthData(authData);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        flow: 'auth-code',
        ux_mode: 'popup'
    });

    if (!auth.authData || Object.keys(auth.authData).length === 0) {
        return (
            <Button onClick={() => login()} className="w-full border rounded-lg flex px-4 py-2 items-center justify-center gap-2" variant={"outline"}>
                <Image src={"google-logo.svg"} alt={"google-logo"} width={0} height={0} className="h-full w-auto" />
                <span>Sign in with Google</span>
            </Button>
        );
    }

    return (
        <div className="flex w-full max-h-14 border rounded-xl p-2 align-middle items-center">
            <Image src={auth.authData.picture} alt={"user-profile"} width={64} height={64} className="w-10 h-10 rounded-full mr-2" />
            <div className="flex flex-col flex-grow truncate justify-center md:max-w-24">
                <span className="text-sm font-medium truncate">{auth.authData.displayName}</span>
                <span className="text-sm text-subtext truncate">{auth.authData.email}</span>
            </div>
            <Button variant={"outline"} onClick={handleLogout} className="border ml-2 flex gap-2 h-full w-fit md:h-fit md:p-2 items-center bg-white">
                <Icon name={"LogOut"} size={16} color={"black"} />
                <span className="md:hidden">Sign Out</span>
            </Button>
        </div>
    );
}