import { getUser } from "@/app/_shared/helpers/AccountHelper";
import { ArtistSettings } from "@/app/_shared/service/artist/ArtistSettings.model";
import { getArtistSettings, saveArtistSettings } from "@/app/_shared/service/artist/artist-settings.service";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const response = await handleGet(request);
        return NextResponse.json(response, { status: 200 });
    } catch (e) {
        console.error(`Error while getting artist: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const response = await handlePut(request);
        return NextResponse.json(response, { status: 200 });
    } catch (e) {
        console.error(`Error while saving artist: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}

async function handleGet(_: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const user = await getUser(supabase);
    return getArtistSettings(user?.id)
}

async function handlePut(request: Request) {
    const data = await request.json();
    return saveArtistSettings(data);
}
