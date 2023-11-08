'use client'

import { Button, Card } from "flowbite-react";
import { useState } from "react";

export default function SetupArtistHomepage() {
    const [subdomain, setSubdomain] = useState<string>('');

    const savePreferences = async () => {
        const preferences = {
            subdomain: subdomain
        };

        const response = await fetch('/api/artist/homepage/update', {
            method: 'POST',
            body: JSON.stringify(preferences)
        });

        console.log(response);
    }

    return (
        <>
            <Card className="mt-5 w-full lg:w-4/5 xl:w-4/5 2xl:w-3/5 flex justify-center px-4 mx-5 container plain-card">
                <div className="flex flex-row items-center">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Homepage Setup</h1>
                    <Button className='ml-auto' onClick={savePreferences}>
                        <p className="text-md font-normal text-white">
                            Save
                        </p>
                    </Button>
                </div>
                <hr />
                <label htmlFor="title" className="mt-5 text-lg text-black dark:text-white">Homepage Link</label>
                <div className="flex flex-row items-center">
                    <input
                        name="title"
                        type="text" 
                        className="rounded-md px-4 bg-inherit border text-black dark:text-white" 
                        value={subdomain}
                        placeholder="bandname"
                        onChange={(e) => setSubdomain(e.target?.value)}
                    />
                    <span className="text-xl text-black dark:text-white">.tempo.com</span>
                </div>
            </Card>
        </>
    )
}