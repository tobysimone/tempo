'use client'

import { UserType } from "@/app/_shared/constants/user-constants";
import { useUser } from "@/app/_shared/hooks/useUser";
import { useUserType } from "@/app/_shared/hooks/useUserType";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';

interface UserNavigationProps {
    email: string | undefined;
    displayName: string | null;
    userType: UserType;
}

export default function UserNavbar() {
    const supabase = createClientComponentClient();
    const userInfo = useUser(supabase);
    const userType = useUserType(userInfo?.user);

    return (
        <div className="fixed z-20 w-full top-0 left-0">
            <Navbar rounded>
                <Navbar.Brand href="/">
                    <img src="https://i.pinimg.com/736x/ed/18/39/ed18392a24e4a718d5bf11663d5e2b07.jpg" className="mr-3 h-9 sm:h-9 rounded-lg" alt="Tempo Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tempo</span>
                </Navbar.Brand>
                { userInfo?.authenticated ? (
                    <UserNavigation
                        email={userInfo?.user?.email}
                        displayName={userInfo?.displayName}
                        userType={userType}
                    />
                ) : (
                    <div>
                        <NoUserNavigation />
                    </div>
                )}
            </Navbar>
        </div>
    )
}

function UserNavigation({ email, displayName, userType }: UserNavigationProps) {
    const [dashboardRoute, setDashboardRoute] = useState<string>('/');
    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        switch(userType) {
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
                    <Avatar alt="User settings" img="https://scontent.fosu2-2.fna.fbcdn.net/v/t39.30808-6/353822101_6893632817318069_1083019472348269985_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Wpbq5_HlrzkAX9qu2K_&_nc_ht=scontent.fosu2-2.fna&oh=00_AfAWRZhyoux4qHya_4o8eD9vwnNJMoFiYR3hoSaEBykXLA&oe=65467647" rounded />
                }>
                {(displayName && email) && (
                    <Dropdown.Header>
                        <span className="block text-sm">{ displayName }</span>
                        <span className="block truncate text-sm font-medium">{ email }</span>
                    </Dropdown.Header>
                )}
                <Dropdown.Item>
                    <Link href={dashboardRoute}>Dashboard</Link>
                </Dropdown.Item>
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
        <>
            <Link href="/login" className="py-2 px-3 hover:bg-sky-700 dark:text-white">login</Link>
            <Link href="/signup" className="py-2 px-3 hover:bg-sky-700 dark:text-white">sign up</Link>
        </>
    )
}