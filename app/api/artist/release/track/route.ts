import { isFulfilled as isPromiseFulfilled } from "@/app/_shared/util/promise-util";
import { NewReleaseTrack } from "@/app/artist/release/new/tracks/model/new-release-track";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

interface BucketTrack {
    path: string;
    track: NewReleaseTrack;
}

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    try {
        const formData = await request.formData();
        const releaseId = Number(formData.get('release_id'));
        const tracks = parseTracks(releaseId, formData);
        const bucketTracks = await uploadTracks(supabase, tracks);
        const trackIds = await insertTracks(supabase, bucketTracks);
        await insertReleaseTracks(supabase, trackIds, releaseId);
        return NextResponse.json({}, { status: 200 });
    } catch (e) {
        console.error(`Error while uploading tracks for request: ${JSON.stringify(request)}`, e);
        return NextResponse.json({}, { status: 500 });
    }
}

const insertReleaseTracks = async (supabase: SupabaseClient, trackIds: number[], releaseId: number) => {
    const convertToDbReleaseTrack = (trackId: number) => ({
        track_id: trackId,
        release_id: releaseId
    });
    
    const { data, error } = await supabase
        .from('release_track')
        .insert(trackIds.map(convertToDbReleaseTrack))
        .select();
    if(error) {
        throw new Error(`Error while inserting trackIds: ${trackIds} into release_tracks`, { cause: error });
    }

    return data;
}

const insertTracks = async (supabase: SupabaseClient, bucketTracks: BucketTrack[]): Promise<number[]> => {
    const convertToDbTrack = (bucketTrack: BucketTrack) => {
        if(!bucketTrack.path || !bucketTrack.track || !bucketTrack.track.file) {
            throw new Error(`Error while inserting tracks into track table, bucket track is invalid: ${bucketTrack}`);
        }

        return {
            track_url: bucketTrack.path,
            filename: bucketTrack.track?.file?.name,
            title: bucketTrack.track.title
        };
    }

    const { data, error } = await supabase
        .from('track')
        .insert(bucketTracks.map(convertToDbTrack).filter(t => t))
        .select();
    if(error) {
        throw new Error(`Error while inserting tracks into track table: ${JSON.stringify(error)}`, { cause: error });
    }

    return data.map(track => track.id);
}

const uploadTracks = async (supabase: SupabaseClient, tracks: NewReleaseTrack[]): Promise<BucketTrack[]> => {
    const uploadPromises = tracks.map(track => uploadTrack(supabase, track));
    return (await Promise.allSettled(uploadPromises))
        .filter(isPromiseFulfilled)
        .map(fulfilled => fulfilled?.value);
}

const uploadTrack = async (supabase: SupabaseClient, track: NewReleaseTrack): Promise<BucketTrack> => {
    if(!track.title || !track.file) {
        throw new Error(`Can not upload invalid track: ${track}`);
    }
    const { data, error } = await supabase.storage
        .from('track')
        .upload(`${uuidv4()}-${track.file.name}`, track.file, {
            cacheControl: '3600',
            upsert: false
        });
    if(error) {
        throw new Error(`Error while uploading track: ${track} to tracks bucket`, {  cause: error });
    }

    return {
        path: data?.path,
        track: track
    };
}

const parseTracks = (releaseId: number, formData: FormData): NewReleaseTrack[] => {
    const numberOfTracks = Number(formData.get('number_of_tracks'));
    if(!numberOfTracks == null || numberOfTracks == undefined || Number(numberOfTracks) <= 0) {
        throw new Error(`Number of tracks on upload tracks request is invalid: ${numberOfTracks}, releaseId: ${releaseId}`);
    }

    return Array.from(Array(numberOfTracks).keys()).map((_, i) => parseTrack(i, formData));
}

const parseTrack = (index: number, formData: FormData): NewReleaseTrack => {
    const title = String(formData.get(`track${index}_title`));
    const file = formData.get(`track${index}`) as File;
    
    return ({
        id: String(index),
        title,
        file
    });
}