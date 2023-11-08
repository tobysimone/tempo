import { User } from "@supabase/supabase-js";
import { UserConstants, UserType } from "../constants/user-constants";

export function getUserType(user?: User): UserType {
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