import { stripBase64ImageHeader } from "@/app/_shared/helpers/FileHelper";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import b64toBlob from "b64-to-blob";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';

export interface HomepageSettings {
    id: string;
    artistId: string;
    subdomain: string;
    description: string;
    header: string;
}

export async function getHomepageSettings({ artistId, subdomain }: any): Promise<HomepageSettings | null> {
    const supabase = createRouteHandlerClient({ cookies });

    const eqField = artistId ? 'artist_id' : 'subdomain';
    const { data: settings, error } = await supabase
        .from('artist_homepage_settings')
        .select('*')
        .eq(eqField, artistId || subdomain)
        .single();
    if(error) {
        console.error(`Error while getting artist homepage settings: ${JSON.stringify(error)}`);
        return null;
    }

    settings.header = getHeaderImage(settings?.header_url)?.data?.publicUrl;

    return {
        id: settings.id,
        artistId: settings.artist_id,
        subdomain: settings.subdomain,
        description: settings.description,
        header: settings.header
    };
}

export async function saveHomepageSettings(settings: HomepageSettings, artistId: string, headerFileExtension: string) {
    const supabase = createRouteHandlerClient({ cookies });
    const existingSettings = await getHomepageSettings({ artistId: artistId });

    const savedHeader = await saveHeaderImage(settings.header, headerFileExtension);

    const { data, error } = await supabase
        .from('artist_homepage_settings')
        .upsert({
            id: existingSettings?.id,
            artist_id: artistId,
            subdomain: settings.subdomain,
            description: settings.description,
            header_url: savedHeader?.path
        })
        .select('*')
        .single();
    if(error) {
        throw new Error(`Error while saving artist homepage settings: ${JSON.stringify(settings)}, artistId: ${artistId}, error: ${JSON.stringify(error)} ${error.details} ${error.hint} ${error.message}`);
    }

    return data;
}

async function saveHeaderImage(header: string, extension: string) {
    const supabase = createRouteHandlerClient({ cookies });

    let imageBlob = null;
    try {
        imageBlob = b64toBlob(stripBase64ImageHeader(header), `image/${extension}`);
    } catch (e) {
        throw new Error(`Header blob conversion failed for header: ${header}, extension: ${extension}`, { cause: e });
    }

    if(!imageBlob) {
        throw new Error(`Could not upload image: ${header} extension: ${extension}, blob conversion failed`);
    }

    const { data, error } = await supabase.storage
        .from('homepage')
        .upload(`${uuidv4()}`, imageBlob, {
            cacheControl: '3600',
            upsert: false,
            contentType: `image/${extension}`
        });
    if(error) {
        console.error(`Could not upload header image: ${JSON.stringify(error)}`);
        return null;
    }

    return data;
}

function getHeaderImage(headerUrl: string) {
    const supabase = createRouteHandlerClient({ cookies });
    return supabase.storage
        .from('homepage')
        .getPublicUrl(headerUrl);
}