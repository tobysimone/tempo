import { SupabaseClient, User } from "@supabase/supabase-js";
import { UserConstants, UserType } from "../constants/user-constants";
import { TableConstants } from "../constants/table-constants";

export async function isUserAuthenticated(supabase: SupabaseClient): Promise<boolean> {
    return (await supabase.auth.getSession())?.data?.session != null;
}

export async function getUser(supabase: SupabaseClient): Promise<User | null> {
    return (await supabase.auth.getUser()).data?.user;
}

export async function getArtistIdFromUser(supabase: SupabaseClient) {
    const userId = (await supabase.auth.getSession())?.data.session?.user?.id;

    try {
        const { data, error } = await supabase
            .from('artist')
            .select('id')
            .eq('user_id', userId)
            .single();
        if(error) {
            throw new Error(`Could not retrieve artistId from artist table. UserId: ${userId}`, { cause: error });
        }
        return data?.id;
    } catch (e) {
        console.error(`Error while getting artistId from userId: ${userId}`);
    }

    return null;
}

export function getUserType(user: User | null): UserType {
    if(!user) {
        return UserType.NONE;
    }

    const type = user.user_metadata[UserConstants.USER_METADATA_TYPE];
    switch(type) {
        case UserConstants.USER_TYPE_FAN:
            return UserType.FAN;
        case UserConstants.USER_TYPE_ARTIST:
            return UserType.ARTIST;
        default:
            return UserType.NONE;
    }
}

export function getUserDisplayName(supabase: SupabaseClient, user: User | null) {
    if(!user) {
        return null;
    }

    const userType = getUserType(user);
    switch(userType) {
        case UserConstants.USER_TYPE_FAN:
            return getFanDisplayName(supabase, user);
        case UserConstants.USER_TYPE_ARTIST:
            return getArtistDisplayName(supabase, user);
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