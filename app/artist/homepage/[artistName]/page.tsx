import { getHomepagePreferences } from '@/app/api/artist/homepage/preferences/homepage-preferences-service';
import './styles.css';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from 'flowbite-react';
import { cookies } from 'next/headers';
import React from 'react';
import ErrorPage from '@/app/error/page';

async function getArtist(artistId: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('artist')
        .select('*')
        .eq('id', artistId)
        .single();
    if (error) {
        console.error(`Error while getting artist by ID: ${artistId}. Error: ${JSON.stringify(error)}`);
        return null;
    }

    return data;
}

export default async function Page({ params }: { params: { artistName: string } }) {
    const preferences = await getHomepagePreferences({ subdomain: params.artistName });
    if(!preferences) {
        return <ErrorPage />
    }

    const artist = await getArtist(preferences?.artistId);

    return (
        <Card 
            className="container w-full"
            imgSrc={preferences?.header}
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
            <h1 className="text-3xl font-bold text-black dark:text-white">{artist?.name}</h1>
            <p className="mt-5 text-black dark:text-white">{preferences?.description}</p>
        </Card>
    );
}