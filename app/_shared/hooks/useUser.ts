import { SupabaseClient, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { UserConstants } from "../constants/user-constants";
import { TableConstants } from "../constants/table-constants";

export interface UserInfo {
    authenticated: boolean;
    user: User | undefined;
    displayName: string | null;
}

export function useUser(supabase: SupabaseClient): UserInfo | null {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [displayName, setDisplayName] = useState<string | null>(null);

    const getUserType = (user: User): string => {
        return user.user_metadata['type'];
    }

    const getFanDisplayName = async (user: User) => {
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

    const getArtistDisplayName = async (user: User) => {
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

    const getUser = async () => {
        setUser((await supabase.auth.getSession())?.data?.session?.user);
    }

    const getDisplayName = async (user: User) => {
        const userType = getUserType(user);
        console.log(userType);
        switch(userType) {
            case UserConstants.USER_TYPE_FAN:
                setDisplayName(await getFanDisplayName(user));
                break;
            case UserConstants.USER_TYPE_ARTIST:
                setDisplayName(await getArtistDisplayName(user));
                break;
            default:
                setDisplayName(null);
                break;
        }
    }

    useEffect(() => {
        (async () => {
            if(!user) {
                await getUser();
            }

            if(user != null && !displayName) {
                await getDisplayName(user);
            } else {
                console.debug('No authenticated user found');
            }
        })();
    }, [user, displayName]);

    return {
        authenticated: user != null && user != undefined,
        user: user,
        displayName: displayName
    };
}