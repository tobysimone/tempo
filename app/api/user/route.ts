import { TableConstants } from "@/app/_shared/constants/table-constants";
import { UserConstants } from "@/app/_shared/constants/user-constants";
import { SupabaseClient, User, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        return NextResponse.json(await handleGet(request), { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

async function handleGet(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const session = await getSession(supabase);
    if(!session) {
        throw new Error(`No session found`);
    }
    const userType = getUserType(session.user);
    const displayName = await getDisplayName(supabase, userType, session.user);

    return {
        user: session.user,
        displayName: displayName
    }
}

function getDisplayName(supabase: SupabaseClient, userType: string, user: User) {
    switch(userType) {
        case UserConstants.USER_TYPE_FAN:
            return getFanDisplayName(supabase, user);
            break;
        case UserConstants.USER_TYPE_ARTIST:
            return getArtistDisplayName(supabase, user);
            break;
        default:
            return null;
    }
}

async function getFanDisplayName(supabase: SupabaseClient, user: User) {
    let displayName;
    const {
        data,
        error
    } = await supabase.from(TableConstants.FAN)
        .select('username')
        .eq('user_id', user.id)
        .single();
    
    if(error) {
        console.error(`Could not get fan from userId: ${user.id}, error: ${error}`);
    }
    
    if(data) {
        displayName = data.username;
    }

    return displayName;
}

async function getArtistDisplayName(supabase: SupabaseClient, user: User) {
    let displayName;
    const {
        data,
        error
    } = await supabase.from(TableConstants.ARTIST)
        .select('name')
        .eq('user_id', user.id)
        .single();

    if(error) {
        console.error(`Could not get artist from userId: ${user.id}`);
    }

    if(data) {
        displayName = data.name;
    }

    return displayName;
}


function getUserType(user: User): string {
    return user.user_metadata['type'];
}

//function which returns the supabase session user 
async function getSession(supabase: SupabaseClient) {
    return (await supabase.auth.getSession()).data?.session;
}