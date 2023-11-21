import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";
import { Sidebar } from "flowbite-react";
import { FaRecordVinyl } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";

export default function ArtistDashboardSidebar() {
    return (
        <Sidebar id="artist-profile-sidebar" theme={FlowbiteTheme.SIDEBAR} className="fixed">
            <Sidebar.Logo href="" img="">
                <span className="!font-normal">Artist Dashboard</span>
            </Sidebar.Logo>
            <hr />
            <Sidebar.Items className="mt-3">
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={FaRecordVinyl}>
                        Releases
                    </Sidebar.Item>
                    <Sidebar.Item href="/artist/homepage/setup" icon={CgWebsite}>
                        Homepage
                    </Sidebar.Item>
                    <Sidebar.Item href="/settings" icon={IoMdSettings}>
                        Settings
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
} 