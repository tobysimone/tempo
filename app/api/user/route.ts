import { getUserDisplayName, getUserType } from "@/app/_shared/helpers/AccountHelper";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        return NextResponse.json(await handleGet(request), { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

async function handleGet(_: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const session = await getSession(supabase);
    if(!session) {
        throw new Error(`No session found`);
    }
    const userType = getUserType(session.user);
    const displayName = await getUserDisplayName(supabase, session.user);

    return {
        user: session.user,
        displayName: displayName
    }
}

async function getSession(supabase: SupabaseClient) {
    return (await supabase.auth.getSession()).data?.session;
}