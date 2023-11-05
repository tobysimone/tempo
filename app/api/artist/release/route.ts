import { NewReleaseTrack } from "@/app/artist/release/new/tracks/model/new-release-track";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export interface CreateReleaseRequest {
    releaseTitle: string;
    releaseDate: string;
    releaseDescription: string;
    releaseType: string;
    artwork: string;
    artworkFilename: string;
    tracks: NewReleaseTrack[];
}

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    let response;

    try {
        const createReleaseRequest: CreateReleaseRequest = await request.json();
        response = await createRelease(supabase, createReleaseRequest);
    } catch (e) {
        console.error(e);
        return redirectToErrorPage();
    }

    return redirectToSuccessPage(response);
}

async function createRelease(supabase: SupabaseClient, request: CreateReleaseRequest) {
    const artistId = await getArtistId(supabase);
    const releaseTypeId = await getReleaseTypeId(supabase, request.releaseType);

    const release = await insertRelease(supabase, artistId, releaseTypeId, request);
    const artwork = await createArtwork(supabase, release.id, request);

    return ({
      release,
      artwork  
    });
}

async function createArtwork(supabase: SupabaseClient, releaseId: string, request: CreateReleaseRequest) {
    const artwork = await uploadArtworkToBucket(supabase, request.artwork, request.artworkFilename);
    return await insertArtwork(supabase, releaseId, artwork.path, request);
}

async function insertArtwork(supabase: SupabaseClient, releaseId: string, artworkUrl: string, request: CreateReleaseRequest) {
    const { data, error } = await supabase
        .from('release_artwork')
        .insert({
            release_id: releaseId,
            artwork_url: artworkUrl,
            filename: request.artworkFilename
        });
    if(error) {
        throw new Error(`Error while inserting artwork into release_artwork. ReleaseId: ${releaseId}, artworkUrl: ${artworkUrl}, request: ${request}`, { cause: error });
    }

    return data;
}

async function uploadArtworkToBucket(supabase: SupabaseClient, artwork: string, artworkFilename: string) {
    const { data, error } = await supabase.storage
        .from('release_artwork')
        .upload(`${uuidv4()}-${artworkFilename}`, artwork, {
            cacheControl: '3600',
            upsert: false
        });
    if(error) {
        throw new Error(`Error while uploading artwork with filename: ${artworkFilename}, artwork: ${artwork}`, { cause: error });
    }
    
    return data;
}

async function insertRelease(supabase: SupabaseClient, 
    artistId: string, 
    releaseTypeId: string, 
    { releaseTitle, releaseDate, releaseDescription }: CreateReleaseRequest) {

    const { data, error } = await supabase
        .from('release')
        .insert({
            artist_id: artistId,
            title: releaseTitle,
            date: releaseDate,
            description: releaseDescription,
            release_type_id: releaseTypeId
        })
        .select()
        .limit(1)
        .single();
    if(error) {
        console.error(`Could not create release: ${error}`);
        return null;
    }

    return data;
}

async function getReleaseTypeId(supabase: SupabaseClient, releaseType: string): Promise<string> {
    const { data, error } = await supabase
        .from('release_type')
        .select('id')
        .eq('type', releaseType)
        .limit(1)
        .single();
    if(error || !data.id) {
        throw new Error(`Invalid release type: ${releaseType}`, { cause: error });
    }

    return data.id;
}

async function getArtistId(supabase: SupabaseClient): Promise<string> {
    const userId = (await supabase.auth.getSession()).data.session?.user.id;
    const { data, error } = await supabase
        .from('artist')
        .select('id')
        .eq('user_id', (await supabase.auth.getSession()).data.session?.user.id)
        .limit(1)
        .single();
    if(error) {
        throw new Error(`Could not find artist for userId: ${userId}`, { cause: error });
    }

    return data.id;
}

function redirectToErrorPage() {
    return NextResponse.json({}, { status: 500 });
}

function redirectToSuccessPage(response: any) {
    return NextResponse.json(response, { status: 200 });
}