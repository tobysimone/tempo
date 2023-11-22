import { User, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import b64toBlob from "b64-to-blob";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import { getUser } from "../../helpers/AccountHelper";
import { stripBase64ImageHeader } from "../../helpers/FileHelper";
import { ProfileSettings, ProfileSettingsDto } from "./ProfileSettings.model";

export async function getProfileSettings(userId: string): Promise<ProfileSettings | null> {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
        .from('profile_settings')
        .select('*')
        .eq('user_id', userId)
        .single();
    if(error) {
        console.error(`Error while getting profile settings for user: ${userId}, error: ${JSON.stringify(error)}`);
        return null;
    }

    data.profilePicture = getProfilePicture(data.profile_picture_url)?.data?.publicUrl;

    return {
        id: data.id,
        profilePicture: data.profilePicture
    };
}

export async function saveProfileSettings({ profileSettings, profilePictureFileExtension }: ProfileSettingsDto): Promise<ProfileSettings> {
    const supabase = createRouteHandlerClient({ cookies });
    const user = await getUser(supabase);
    if(!user) {
        throw new Error(`User is not logged in, cannot save profile settings`);
    }

    const existingSettings = await getProfileSettings(user.id);
    const settings = {...existingSettings, ...profileSettings};

    const profilePictureUrl = await saveProfilePicture(user, profileSettings.profilePicture, profilePictureFileExtension);
    if(profilePictureUrl) {
        settings.profilePicture = profilePictureUrl;
    }

    const { data, error } = await supabase
        .from('profile_settings')
        .upsert({
            id: settings.id,
            user_id: user.id,
            profile_picture_url: settings.profilePicture
        })
        .select('*')
        .single();
    if(error) {
        throw new Error(`Error while saving profile settings for userId: ${user.id}, error: ${JSON.stringify(profileSettings)}, error: ${JSON.stringify(error)}`);
    }

    return data;
}

async function saveProfilePicture(user: User, profilePicture: string, profilePictureFileExtension: string): Promise<string | undefined> {
    const supabase = createRouteHandlerClient({ cookies });

    let imageBlob = null;
    try {
        imageBlob = b64toBlob(stripBase64ImageHeader(profilePicture), `image/${profilePictureFileExtension}`);
    } catch (e) {
        throw new Error(`Profile picture blob conversion failed for user: ${user.id}, error: ${JSON.stringify(e)}`);
    }

    const { data, error } = await supabase.storage
        .from('profile_picture')
        .upload(`${uuidv4()}`, imageBlob, { 
            cacheControl: '3600',
            upsert: false,
            contentType: `image/${profilePictureFileExtension}`
        });
    if(error || !data || !data.path) {
        throw new Error(`Could not upload profile picture for user: ${user.id}, error: ${JSON.stringify(error)}`);
    }

    return data.path;
}

function getProfilePicture(profilePictureUrl: string) {
    const supabase = createRouteHandlerClient({ cookies });
    return supabase.storage
        .from('profile_picture')
        .getPublicUrl(profilePictureUrl);
}