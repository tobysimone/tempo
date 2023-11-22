import { getArtistIdFromUser } from "@/app/_shared/helpers/AccountHelper";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getHomepageSettings, saveHomepageSettings } from "../../../../_shared/service/homepage/homepage-settings.service";
import { HomepageSettings } from "@/app/_shared/service/homepage/HomepageSettings.model";

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
            throw new Error(`ArtistId is null, cannot get artist homepage settings`);
        }

        return NextResponse.json(await getHomepageSettings({ artistId: artistId }), { status: 200 });
    } catch (e) {
        console.error(`Error while getting artist homepage settings: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}

async function handlePut(request: Request) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const artistId = await getArtistIdFromUser(supabase);
        if(!artistId) {
            throw new Error(`ArtistId is null, cannot save artist homepage settings`);
        }

        const data = await request.json();
        const settings: HomepageSettings = data.settings; 
        const savedSettings = await saveHomepageSettings(settings, artistId, data.headerFileExtension);
        return NextResponse.json(savedSettings, { status: 200 });
    } catch (e) {
        console.error(`Error while saving homepage settings: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}