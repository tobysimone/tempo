import './styles.css';

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
            className="container w-full"
            imgSrc="https://f4.bcbits.com/img/0025172979_100.png"
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
            <h1 className="text-3xl font-bold text-black dark:text-white">{artist?.name}</h1>
            <p className="mt-5 text-black dark:text-white">{preferences?.description}</p>
        </Card>
    );
}