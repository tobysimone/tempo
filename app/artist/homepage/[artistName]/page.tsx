
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

export default async function Page({ params }: { params: { artistName: string } }) {
    const data = await getHomepagePreferences(params.artistName);
    return <h1>{ JSON.stringify(data) }</h1>;
}

async function getArtistId(artistName: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('artist')
        .select('id')
        .eq('name', artistName)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data?.id;
}

async function getHomepagePreferences(artistName: string) {
    const artistId = await getArtistId(artistName);
    if(!artistId) {
        console.log('Artist not found');
        return null;
    }

    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('artist_homepage_preferences')
        .select('*')
        .eq('artist_id', artistId)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}