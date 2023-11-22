import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ArtistSettings, ArtistSettingsDto } from "./ArtistSettings.model";

export async function getArtistSettings(userId?: string): Promise<ArtistSettings | null> {
    if(!userId) {
        throw new Error(`Could not get artist settings, userId is not defined`);
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
        .from('artist')
        .select('*')
        .eq('user_id', userId)
        .single();
    if(error) {
        console.error(`Error while getting artist settings for ID: ${userId}, error: ${JSON.stringify(error)}`);
        return null;
    }

    return {
        id: data.id,
        userId: data.user_id,
        name: data.name
    };
}

export async function saveArtistSettings(settingsDto: ArtistSettingsDto): Promise<ArtistSettings> {
    const supabase = createRouteHandlerClient({ cookies });

    const existingSettings = await getArtistSettings(settingsDto?.userId);
    const settings = {...existingSettings, ...settingsDto?.artistSettings};
    
    const { data, error } = await supabase
        .from('artist')
        .upsert([
            {
                id: settings.id,
                user_id: settings.userId,
                name: settings.name
            }
        ])
        .select('*')
        .single();
    if(error) {
        throw new Error(`Error while saving artist settings: ${settingsDto.id}, settings: ${JSON.stringify(settingsDto)}, error: ${JSON.stringify(error)}`);
    }

    return {
        id: data.id,
        userId: data.user_id,
        name: data.name
    };
}