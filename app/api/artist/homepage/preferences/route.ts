import { getArtistIdFromUser } from "@/app/_shared/helpers/getArtistIdFromUser";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getHomepagePreferences, saveHomepagePreferences } from "./homepage-preferences-service";

export interface HomepagePreferences {
    subdomain: string;
}

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

        return NextResponse.json(await getHomepagePreferences(artistId), { status: 200 });
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

        const preferences: HomepagePreferences = await request.json();
        const savedPreferences = await saveHomepagePreferences(preferences, artistId);
        return NextResponse.json(savedPreferences, { status: 200 });
    } catch (e) {
        console.error(`Error while saving homepage preferences: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}