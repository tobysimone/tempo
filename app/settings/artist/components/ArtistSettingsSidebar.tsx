'use client'

import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";
import { Sidebar } from "flowbite-react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export default function ArtistSettingsSidebar({ setActiveTab }: { setActiveTab: (index: number) => void }) {
    return (
        <Sidebar id="artist-profile-sidebar" className="fixed" theme={FlowbiteTheme.SIDEBAR}>
            <Sidebar.Logo href="#" img="#" className="!cursor-default">
                <span className="!font-normal">Settings</span>
            </Sidebar.Logo>
            <hr />
            <Sidebar.Items className="mt-3">
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={MdAccountCircle} onClick={() => setActiveTab(0)} style={{ cursor: 'pointer' }}>
                        Profile
                    </Sidebar.Item>
                    <Sidebar.Item href="/auth/sign-out" icon={FaSignOutAlt}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}