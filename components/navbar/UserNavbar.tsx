'use client'

import { useUser } from "@/app/_shared/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

interface UserNavigationProps {
    email: string | undefined;
    displayName: string | null;
}

export default function UserNavbar() {
    const supabase = createClientComponentClient();
    const userInfo = useUser(supabase);

    console.log('rendering');

    return (
        <div className="fixed z-20 w-full top-0 left-0">
            <Navbar rounded>
                <Navbar.Brand href="https://flowbite-react.com">
                    <img src="https://i.pinimg.com/736x/ed/18/39/ed18392a24e4a718d5bf11663d5e2b07.jpg" className="mr-3 h-9 sm:h-9 rounded-lg" alt="Tempo Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tempo</span>
                </Navbar.Brand>
                { userInfo ? (
                    <UserNavigation email={userInfo?.user?.email} displayName={userInfo?.displayName} />
                ) : (
                    <div>
                        <NoUserNavigation />
                    </div>
                )}
            </Navbar>
        </div>
    )
}

function UserNavigation({ email, displayName }: UserNavigationProps) {
    const supabase = createClientComponentClient();
    const router = useRouter();

    return (
        <div className="flex md:order-2 mr-3">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img="https://scontent.fosu2-2.fna.fbcdn.net/v/t39.30808-6/353822101_6893632817318069_1083019472348269985_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9dK69ca8OQwAX_sAbNU&_nc_ht=scontent.fosu2-2.fna&oh=00_AfB3Pb3XF0rBXtDvmGZocjS3Mjav0kRwVAUJmQHn78nDdg&oe=6536A447" rounded />
                }>
                <Dropdown.Header>
                    <span className="block text-sm">{ displayName }</span>
                    <span className="block truncate text-sm font-medium">{ email }</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={async () => {
                    await supabase.auth.signOut();
                    router.refresh();
                }}>
                    Sign Out
                </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
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