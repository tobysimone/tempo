
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from 'flowbite-react';
import { cookies } from 'next/headers';
import React from 'react';

async function getHomepagePreferences(artistName: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('artist_homepage_preferences')
        .select('*')
        .eq('subdomain', artistName)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

async function getArtist(artistId: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('artist')
        .select('*')
        .eq('id', artistId)
        .single();
    if (error) {
        console.error(`Error while getting artist by ID: ${artistId}. Error: ${error}`);
        return null;
    }

    return data;
}

export default async function Page({ params }: { params: { artistName: string } }) {
    const preferences = await getHomepagePreferences(params.artistName);
    const artist = await getArtist(preferences?.artist_id);
    return (
        <Card 
            className="mt-5 container w-full lg:w-4/5 xl:w-4/5 2xl:w-3/5"
            imgSrc="https://f4.bcbits.com/img/0025172979_100.png"
        >
            <h1 className="text-3xl font-bold">{artist?.name}</h1>
            <p className="mt-5">{preferences?.description}</p>
        </Card>
    );
}