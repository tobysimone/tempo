import { getArtistIdFromUser } from "@/app/_shared/helpers/getArtistIdFromUser";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface HomepagePreferences {
    subdomain: string;
}

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const artistId = await getArtistIdFromUser(supabase);

    try {
        if(!artistId) {
            throw new Error(`ArtistId is null, cannot save artist homepage preferences`);
        }

        const preferences: HomepagePreferences = await request.json();
        const savedPreferences = await saveHomepagePreferences(supabase, artistId, preferences);
        return NextResponse.json(savedPreferences, { status: 200 });
    } catch (e) {
        console.error(`Error while saving homepage preferences: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}

async function saveHomepagePreferences(supabase: SupabaseClient, artistId: string, preferences: HomepagePreferences) {
    const { data, error } = await supabase
        .from('artist_homepage_preferences')
        .insert({ 
            artist_id: artistId,
            ...preferences
        })
        .select()
        .single();
    if(error) {
        throw new Error(`Error while saving artist homepage preferences: ${JSON.stringify(preferences)}, artistId: ${artistId}, error: ${JSON.stringify(error)}`, { cause: error });
    }
    return data;
}