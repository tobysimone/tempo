import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";
import { Sidebar } from "flowbite-react";
import { FaRecordVinyl } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function ArtistDashboardSidebar() {
    return (
        <Sidebar id="artist-profile-sidebar" theme={FlowbiteTheme.SIDEBAR} className="fixed">
            <Sidebar.Logo href="" img="">
                Artist Dashboard
            </Sidebar.Logo>
            <hr />
            <Sidebar.Items className="mt-3">
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={FaRecordVinyl}>
                        Releases
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={CgWebsite}>
                        Homepage
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
} 