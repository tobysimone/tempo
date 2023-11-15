import { SupabaseClient, User } from "@supabase/supabase-js";
import { UserConstants, UserType } from "../constants/user-constants";

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