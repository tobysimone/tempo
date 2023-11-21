import { getUser } from "@/app/_shared/helpers/AccountHelper";
import { getProfileSettings, saveProfileSettings } from "@/app/_shared/service/profile/profile-settings.service";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        return NextResponse.json(await handlePut(request), { status: 200 });
    } catch (e) {
        console.error(`Error while saving profile: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        return NextResponse.json(await handleGet(request), { status: 200 });
    } catch (e) {
        console.error(`Error while saving profile: ${e}`);
        return NextResponse.json({}, { status: 500 });
    }
}

async function handlePut(request: Request) {
    const data = await request.json();
    return await saveProfileSettings(data);
}

async function handleGet(_: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const user = await getUser(supabase);
    if(!user) {
        throw new Error(`User is not logged in, cannot get profile settings`);
    }

    console.log(user?.id);

    return await getProfileSettings(user?.id);
}