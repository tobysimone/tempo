import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { HomepagePreferences, getHomepagePreferences, saveHomepagePreferences } from "./homepage-preferences-service";
import { getArtistIdFromUser } from "@/app/_shared/helpers/AccountHelper";

export async function GET(request: Request) {
    return handleGet(request);
}

export async function PUT(request: Request) {
    return handlePut(request);
}

async function handleGet(_: Request) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const artistId = await getArtistIdFromUser(supabase);
        if(!artistId) {
            throw new Error(`ArtistId is null, cannot get artist homepage preferences`);
        }

        return NextResponse.json(await getHomepagePreferences({ artistId: artistId }), { status: 200 });
    } catch (e) {
        console.error(`Error while getting artist homepage preferences: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}

async function handlePut(request: Request) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const artistId = await getArtistIdFromUser(supabase);
        if(!artistId) {
            throw new Error(`ArtistId is null, cannot save artist homepage preferences`);
        }

        const data = await request.json();
        const preferences: HomepagePreferences = data.preferences; 
        const savedPreferences = await saveHomepagePreferences(preferences, artistId, data.headerFileExtension);
        return NextResponse.json(savedPreferences, { status: 200 });
    } catch (e) {
        console.error(`Error while saving homepage preferences: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}