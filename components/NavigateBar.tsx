'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image";
import Icon from "./Icon";
import useSidebar from "@/hooks/useSidebar";
import { SidebarContent } from "@/contexts/SidebarContext";
import { useState } from "react";
import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuth from "@/hooks/useAuth";
import { useGoogleLogin } from '@react-oauth/google';

export default function NavigateBar() {
    const sidebar = useSidebar();

    const handleTabClicked = (index: number) => {
        sidebar.setActiveTab(index);
    };

    // const handleSignIn = () => {
    //     const popupWidth = 350;
    //     const popupHeight = 500;
    //     const dualScreenLeft = window.screenLeft || window.screenX || 0;
    //     const dualScreenTop = window.screenTop || window.screenY || 0;
    //     const screenWidth = window.screen.width;
    //     const screenHeight = window.screen.height;
    //     const left = (screenWidth - popupWidth) / 2 + dualScreenLeft;
    //     const top = (screenHeight - popupHeight) / 2 + dualScreenTop;
    //     const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

    //     window.open('', 'MsgWindow', popupFeatures);
    // };

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
        <nav className="min-w-56 max-w-56 border-r-2 hidden md:block">
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
                        <SignInButton />
                    </section>

                </div>
            </div>
        </nav>
    );
}

function NavigateDrawer({ handleTabClicked, sidebar }: INavigate) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            <div className="md:hidden flex gap-4 border-b-[1px] p-4 bg-white">
                <button onClick={() => { setIsOpen((prev) => !prev) }}>
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
                <div onClick={() => { setIsOpen((prev) => !prev) }} className={`fixed z-30 bg-black w-full h-full opacity-50 ${isOpen ? '' : 'hidden'}`} />
                <div className="fixed w-full z-50">
                    <div className={`bg-white rounded-b-xl ease-in-out duration-200 px-4 overflow-hidden transition-all ${isOpen ? 'max-h-96 pt-4 pb-6' : 'max-h-0 pt-0 pb-0'}`}>
                        <h3 className="font-semibold text-primary">Feature</h3>
                        <div className="flex flex-col gap-1 w-full pb-1 border-b">
                            {sidebar.sideBarTabs.map((tab, idx) => (
                                <Link href={tab.navigateLink} key={'sidebar-tab-' + idx}>
                                    <Button
                                        variant={sidebar.activeTab === idx ? 'outline' : 'ghost'}
                                        className={`flex flex-row gap-2 w-full justify-start border-2 ${sidebar.activeTab === idx ? 'border-primary' : 'border-transparent'}`}
                                        onClick={() => { handleTabClicked(idx) }}
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
                            onClick={() => setIsOpen((prev) => !prev)}
                            className={`rounded-full p-1 absolute z-50 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white ${!isOpen && 'hidden'}`}
                        >
                            <Icon name={"ChevronsUp"} size={16} color="black" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function SignInButton() {
    const auth = useAuth();

    const handleLoginSuccess = async (credential: CredentialResponse) => {
        const requestLogin = {
            token: credential.credential
        };
        const authData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestLogin)
        }).then((data) => data.json());
        localStorage.setItem('authData', JSON.stringify(authData));
        auth.updateAuthData(authData);
    };

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
            <Button onClick={() => login()} className="w-full border" variant={"outline"}>
                Sign in
            </Button>
        );

        // return (<GoogleLogin
        //     type={"standard"}
        //     theme={"outline"}
        //     text={"continue_with"}
        //     locale={"en"}
        //     onSuccess={credentialResponse => {
        //         handleLoginSuccess(credentialResponse);
        //     }}
        //     onError={() => {
        //         console.log('Login Failed');
        //     }}
        // />);
    }

    return (
        <Button variant={"outline"} onClick={handleLogout}>Log out</Button>
    );
}