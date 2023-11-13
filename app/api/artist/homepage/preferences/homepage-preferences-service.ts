import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { HomepagePreferences } from "./route";

export async function getHomepagePreferences(artistId: string) {
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

    return preferences;
}

export async function saveHomepagePreferences(preferences: HomepagePreferences, artistId: string) {
    const supabase = createRouteHandlerClient({ cookies });
    const existingPreferences = await getHomepagePreferences(artistId);

    const { data, error } = await supabase
        .from('artist_homepage_preferences')
        .upsert({
            id: existingPreferences?.id,
            artist_id: artistId,
            ...preferences
        })
        .select('*')
        .single();
    if(error) {
        throw new Error(`Error while saving artist homepage preferences: ${JSON.stringify(preferences)}, artistId: ${artistId}, error: ${JSON.stringify(error)}`);
    }

    return data;
}