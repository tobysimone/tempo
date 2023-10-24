'use client'

import { Button, Card } from "flowbite-react";
import { HiPlusCircle } from 'react-icons/hi';

export default function ArtistDashboard() {
    return (
        <div className="mt-5 container mx-auto px-4">
            <h1 className="text-3xl font-bold">Artist Dashboard</h1>
            <Card className="mt-5 w-full md:w-1/2 lg:w-1/3">
                <span className="text-2xl font-bold">Releases</span>
                <h2 className="font-light">No releases.</h2>
                <Button>
                    <HiPlusCircle className="mr-3 h-4 w-4"></HiPlusCircle>
                    <p className="text-md font-normal">New Release</p>
                </Button>
            </Card>
        </div>
    )
}