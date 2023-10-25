'use client'

import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiPlusCircle } from 'react-icons/hi';

export default function ArtistDashboard() {
    const router = useRouter();
    return (
        <div className="mt-5 container mx-auto px-4">
            <h1 className="text-3xl font-bold text-black dark:text-white">Artist Dashboard</h1>
            <Card className="mt-5 w-full md:w-1/2 xl:w-1/3">
                <span className="text-2xl font-bold text-black dark:text-white">Releases</span>
                <h2 className="font-light text-black dark:text-white">No releases.</h2>
                <Button onClick={() => router.push('/artist/release/new')}>
                    <HiPlusCircle className="mr-2 h-4 w-4"></HiPlusCircle>
                    <p className="text-md font-normal text-white">
                        New Release
                    </p>
                </Button>
            </Card>
        </div>
    )
}