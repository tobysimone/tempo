import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand } from "flowbite-react";
import { getUser, getUserDisplayName, getUserType, isUserAuthenticated } from "../../helpers/AccountHelper";
import { FlowbiteTheme } from "../../theme/flowbite-theme";
import Link from "next/link";
import { createServerSupabaseClient } from "../../helpers/ServerSupabaseClient";

export default async function TestNavbar({ user }: any) {
    const supabase = createServerSupabaseClient();
    const displayName = getUserDisplayName(supabase, user);

    return (
        <div className="fixed z-20 w-full top-0 left-0" style={{ height: 60 }}>
            <Navbar rounded id="user-navbar" theme={FlowbiteTheme.NAVBAR}>
                <NavbarBrand href="/">
                    <img src="https://i.pinimg.com/736x/ed/18/39/ed18392a24e4a718d5bf11663d5e2b07.jpg" className="mr-3 h-9 sm:h-9 rounded-lg" alt="Tempo Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Tempo
                    </span>
                </NavbarBrand>
                <span className="user-nav-fade-in">
                    { await isUserAuthenticated(supabase) ? (
                        <UserNavigation
                            email={user?.email}
                            displayName={displayName}
                            userType={getUserType(user)}
                            supabase={supabase}
                        />
                    ) : (
                        <NoUserNavigation />
                    )}
                </span>
            </Navbar>
        </div>
    )
}

function UserNavigation({ supabase, email, displayName }: any) {
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
                    <DropdownHeader>
                        <span className="block text-sm">{displayName}</span>
                        <span className="block truncate text-sm font-medium">{email}</span>
                    </DropdownHeader>
                )}
                <Link href="/dashboard">
                    <DropdownItem>Dashboard</DropdownItem>
                </Link>
                <Link href="/profile">
                    <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownItem>Settings</DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/auth/sign-out">
                    Sign Out
                </DropdownItem>
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