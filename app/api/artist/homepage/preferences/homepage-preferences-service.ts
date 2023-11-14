import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';

export interface HomepagePreferences {
    id: string;
    subdomain: string;
    description: string;
    header: string;
}

export async function getHomepagePreferences(artistId: string): Promise<HomepagePreferences | null> {
    const supabase = createRouteHandlerClient({ cookies });

    const { data: preferences, error } = await supabase
        .from('artist_homepage_preferences')
        .select('*')
        .eq('artist_id', artistId)
        .single();
    if(error) {
        console.error(`Error while getting artist homepage preferences: ${JSON.stringify(error)}`);
        return null;
    }

    preferences.header = getHeaderImage(preferences?.header_url)?.data?.publicUrl;

    return preferences;
}

export async function saveHomepagePreferences(preferences: HomepagePreferences, artistId: string) {
    const supabase = createRouteHandlerClient({ cookies });
    const existingPreferences = await getHomepagePreferences(artistId);

    const savedHeader = await saveHeaderImage(artistId, preferences.header);

    const { data, error } = await supabase
        .from('artist_homepage_preferences')
        .upsert({
            id: existingPreferences?.id,
            artist_id: artistId,
            subdomain: preferences.subdomain,
            description: preferences.description,
            header_url: savedHeader?.path
        })
        .select('*')
        .single();
    if(error) {
        throw new Error(`Error while saving artist homepage preferences: ${JSON.stringify(preferences)}, artistId: ${artistId}, error: ${JSON.stringify(error)}`);
    }

    return data;
}

async function saveHeaderImage(artistId: string, header: string) {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.storage
        .from('homepage')
        .upload(`${uuidv4()}`, header, {
            cacheControl: '3600',
            upsert: false
        });
    if(error) {
        console.error(`Could not upload header image: ${JSON.stringify(error)}`);
        return null;
    }

    return data;
}

function getHeaderImage(headerUrl: string) {
    const supabase = createRouteHandlerClient({ cookies });
    return supabase.storage
        .from('homepage')
        .getPublicUrl(headerUrl);
    
}