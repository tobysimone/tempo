'use client'

import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

interface UserNavigationProps {
    supabase: SupabaseClient;
    router: AppRouterInstance;
}

export default async function UserNavbar({ user }: any) {
    const supabase = createClientComponentClient();
    const router = useRouter();

    return (
        <div className="fixed z-20 w-full top-0 left-0">
            <Navbar fluid rounded>
                <Navbar.Brand href="https://flowbite-react.com">
                    <img src="https://seeklogo.com/images/A/apple-music-logo-4FBA5FADCC-seeklogo.com.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tempo</span>
                </Navbar.Brand>
                { user ? (
                    <UserNavigation supabase={supabase} router={router} />
                ) : (
                    <div>
                        <NoUserNavigation />
                    </div>
                )}
            </Navbar>
        </div>
    )
}

function UserNavigation({ supabase, router }: UserNavigationProps) {
    return (
        <div className="flex md:order-2 mr-3">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img="https://scontent.fosu2-2.fna.fbcdn.net/v/t39.30808-6/353822101_6893632817318069_1083019472348269985_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9dK69ca8OQwAX_sAbNU&_nc_ht=scontent.fosu2-2.fna&oh=00_AfB3Pb3XF0rBXtDvmGZocjS3Mjav0kRwVAUJmQHn78nDdg&oe=6536A447" rounded />
                }>
                <Dropdown.Header>
                    <span className="block text-sm">Bonnie Green</span>
                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => signOutClicked(supabase, router)}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
        </div>
    )
}

function NoUserNavigation() {
    return (
        <>
            <Link href="/login" className="py-2 px-3 hover:bg-sky-700">login</Link>
            <Link href="/signup" className="py-2 px-3 hover:bg-sky-700">sign up</Link>
        </>
    )
}

async function signOutClicked(supabase: SupabaseClient, router: AppRouterInstance) {
    await supabase.auth.signOut();
    router.push("/");
}