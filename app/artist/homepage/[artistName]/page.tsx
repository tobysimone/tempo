
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

export default async function Page({ params }: { params: { artistName: string } }) {
    const data = await getHomepagePreferences(params.artistName);
    return <h1>{ JSON.stringify(data) }</h1>;
}

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