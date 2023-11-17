'use client'

import './styles.css';

import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiPlusCircle } from 'react-icons/hi';
import ArtistDashboardSidebar from "./ArtistDashboardSidebar";

export default function ArtistDashboard() {
    const router = useRouter();
    return (
        <div className="page-container !flex-row !items-stretch">
            <ArtistDashboardSidebar />
            <div className="container-fluid mt-5 px-4 w-full" style={{ marginLeft: 255 }}>
                <div className="flex flex-row lg:flex-row">
                    <ReleasesCard router={router} />
                    <ArtistHomepageCard router={router} />
                </div>
            </div>
        </div>
    )
}

function ArtistHomepageCard({ router }: any) {
    return (
        <Card className="mt-5 mx-2 w-full lg:w-1/2 xl:w-1/3" theme={FlowbiteTheme.CARD}>
            <span className="text-2xl font-bold text-black dark:text-white">Homepage</span>
            <h2 className="font-light text-black dark:text-white">Homepage has not been setup yet.</h2>
            <Button onClick={() => router.push('/artist/homepage/setup')}>
                <HiPlusCircle className="mr-2 h-4 w-4"></HiPlusCircle>
                <p className="text-md font-normal text-white">
                    Setup Homepage
                </p>
            </Button>
        </Card>
    )
}

function ReleasesCard({ router }: any) {
    return (
        <Card className="mt-5 mx-2 w-full lg:w-1/2 xl:w-1/3" theme={FlowbiteTheme.CARD}>
                <span className="text-2xl font-bold text-black dark:text-white">Releases</span>
                <h2 className="font-light text-black dark:text-white">No releases.</h2>
                <Button onClick={() => router.push('/artist/release/new')}>
                    <HiPlusCircle className="mr-2 h-4 w-4"></HiPlusCircle>
                    <p className="text-md font-normal text-white">
                        New Release
                    </p>
                </Button>
            </Card>
    )
}