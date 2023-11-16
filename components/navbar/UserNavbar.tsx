'use client'

import './styles.css';

import { UserType } from "@/app/_shared/constants/user-constants";
import { getUserType } from '@/app/_shared/helpers/AccountHelper';
import { useUser as userUserContext } from "@/app/_shared/hooks/useUserContext";
import { FlowbiteTheme } from '@/app/_shared/theme/flowbite-theme';
import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, Dropdown, Flowbite, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react';
import { useEffect, useState } from "react";

interface UserNavigationProps {
    email: string | undefined;
    displayName: string | null;
    userType: UserType;
    supabase: SupabaseClient;
}

export default function UserNavbar() {
    const supabase = createClientComponentClient();
    const userContext = userUserContext();
    const userType = getUserType(userContext.user);

    return (
        <div className="fixed z-20 w-full top-0 left-0" style={{ height: 60 }}>
            <Navbar rounded id="user-navbar" theme={FlowbiteTheme.NAVBAR}>
                <Navbar.Brand href="/">
                    <img src="https://i.pinimg.com/736x/ed/18/39/ed18392a24e4a718d5bf11663d5e2b07.jpg" className="mr-3 h-9 sm:h-9 rounded-lg" alt="Tempo Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Tempo
                    </span>
                </Navbar.Brand>
                <span className="user-nav-fade-in">
                    { !userContext.pending && (
                        <span>
                            { userContext?.user ? (
                                <UserNavigation
                                    email={userContext?.user?.email}
                                    displayName={userContext?.displayName}
                                    userType={userType}
                                    supabase={supabase}
                                />
                            ) : (
                                <NoUserNavigation />
                            )}
                        </span>
                    )}
                </span>
            </Navbar>
        </div>
    )
}

function UserNavigation({ supabase, email, displayName, userType }: UserNavigationProps) {
    const [dashboardRoute, setDashboardRoute] = useState<string>('/');
    const router = useRouter();

    useEffect(() => {
        switch (userType) {
            case UserType.ARTIST:
                setDashboardRoute('/dashboard/artist');
                break;
            case UserType.FAN:
                setDashboardRoute('/dashboard/fan');
                break;
            default:
                setDashboardRoute('/');
                break;
        }
    }, [userType]);

    return (
        <div className="flex md:order-2 mr-3">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar
                        theme={FlowbiteTheme.AVATAR}
                        alt="Profile picute"
                        img="/profile.jpeg"
                        size={'md'}
                        rounded
                    />
                }>
                {(displayName && email) && (
                    <Dropdown.Header>
                        <span className="block text-sm">{displayName}</span>
                        <span className="block truncate text-sm font-medium">{email}</span>
                    </Dropdown.Header>
                )}
                <Dropdown.Item onClick={() => router.push(dashboardRoute)}>Dashboard</Dropdown.Item>
                <Dropdown.Item onClick={() => router.push('/profile')}>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={async () => {
                    await supabase.auth.signOut();
                    router.refresh();
                }}>
                    Sign Out
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

function NoUserNavigation() {
    return (
        <div className="flex">
            <Link href="/login" className="py-2 px-3 hover:bg-sky-700 dark:text-white">login</Link>
            <Link href="/signup" className="py-2 px-3 hover:bg-sky-700 dark:text-white">sign up</Link>
        </div>
    )
}