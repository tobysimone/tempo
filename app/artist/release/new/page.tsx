'use client'

import './styles.css';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "flowbite-react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NewReleaseDetails from './detail/new-release-details';
import NewReleaseTracks from './tracks/new-release-tracks';
import { NewReleaseTrack } from './tracks/model/new-release-track';
import NewReleaseTrackCard from './tracks/components/new-release-track-card';
import NewReleaseSubmit from './submit/new-release-submit';
import toast from 'react-hot-toast';

export default function NewRelease() {
    const supabase = createClientComponentClient();

    //release detail
    const [releaseTitle, setReleaseTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState<Date | undefined>();
    const [editedArtwork, setEditedArtwork] = useState<string | null | undefined>();
    const [releaseDescription, setReleaseDescription] = useState('');
    const [releaseType, setReleaseType] = useState('');
    const [releaseTags, setReleaseTags] = useState('');
    const [artworkFilename, setArtworkFilename] = useState('');
    
    //release tracks
    const [tracks, setTracks] = useState<NewReleaseTrack[]>([]);

    //general release
    const [currentFlowPage, setCurrentFlowPage] = useState<'details' | 'tracks' | 'submit'>('submit');

    const onSubmit = async () => {
        console.log('submit');
        const release = await createRelease();
        //const artwork = await uploadArtwork();
        //const tracks = await uploadTracks(release.id);
    }

    const createRelease = async () => {
        const { data: releaseTypeData, error: releaseTypeError } = await supabase
            .from('release_type')
            .select('id')
            .eq('type', releaseType)
            .limit(1)
            .single();
        if(releaseTypeError) {
            console.error(`Invalid release type: ${releaseType}. Error: ${releaseTypeError}`);
            return null;
        }

        const { data: releaseData, error: releaseError } = await supabase
            .from('release')
            .insert({
                title: releaseTitle,
                date: releaseDate,
                description: releaseDescription,
                release_type_id: releaseTypeData.id
            })
            .select()
            .limit(1)
            .single();
        if(releaseError) {
            console.error(`Could not create release: ${releaseError}`);
            return null;
        }

        return releaseData;
    }

    const uploadTracks = async (releaseId: string) => {
        tracks.map(async (track) => {
            if(!track.file || !track.title) {
                console.error(`Could not upload track, file or title is null`);
                return;
            }

            const filepath = await uploadTrack(track);
            if(!filepath) {
                toast.error(`Could not upload track ${track.file?.name}, please try again later`);
                return;
            }

            const { data, error } = await supabase
                .from('track')
                .insert({ 
                    track_url: filepath,
                    filename: track.file.name,
                    title: track.title
                })
                .select()
                .limit(1)
                .single();
            if(error) {
                console.error(`Error while inserting track into database: ${error}`);
                return;
            }

            return track;
        })
    }

    const uploadArtwork = async () => {
        if (!editedArtwork || !artworkFilename) {
            console.error(`Could not upload artwork`);
            return;
        }

        const filename = `${uuidv4()}-${artworkFilename}}`;
        const { data, error } = await supabase.storage
            .from('release_artwork')
            .upload(filename, editedArtwork, {
                cacheControl: '3600',
                upsert: false
            });
        if (error) {
            console.error(`Error while upload artwork: ${error}`);
            return;
        }

        return data;
    }

    const uploadTrack = async (track: NewReleaseTrack) => {
        const filename = `${uuidv4()}-${track?.file?.name}}`;
        const { data, error } = await supabase.storage
            .from('track')
            .upload(filename, track.file!, {
                cacheControl: '3600',
                upsert: false
            });
        if(error) {
            console.error(`Error while upload track: ${error}`);
            return;
        }

        return data.path;
    }

    const canMoveToTracksPage = () => {
        return (!!releaseTitle && 
            !!releaseDate && 
            !!editedArtwork && 
            !!releaseDescription && 
            !!releaseType &&
            !!artworkFilename
        );
    }

    const canMoveToSubmitPage = () => 
        tracks.filter(t => !t.title || !t.file).length == 0;

    const addTrack = () => {
        const _tracks = [...tracks];
        _tracks.push({ id: uuidv4(), title: '' });
        setTracks(_tracks);
    }

    const removeTrack = (id: string) => {
        let _tracks = [...tracks];
        _tracks = _tracks.filter(track => track.id != id);
        setTracks(_tracks);
    }

    const updateTrack = (track: NewReleaseTrack) => {
        let _tracks = [...tracks];
        const index = _tracks.findIndex(t => t.id == track.id);
        _tracks[index] = track;
        setTracks(_tracks);
    }

    const getFlowPage = () => {
        switch(currentFlowPage) {
            case 'details':
                return (
                    <NewReleaseDetails
                        releaseTitle={releaseTitle}
                        setReleaseTitle={setReleaseTitle}
                        setReleaseDate={setReleaseDate}
                        editedArtwork={editedArtwork}
                        setEditedArtwork={setEditedArtwork}
                        releaseDescription={releaseDescription}
                        setReleaseDescription={setReleaseDescription}
                        releaseType={releaseType}
                        setReleaseType={setReleaseType}
                        releaseTags={releaseTags}
                        setReleaseTags={setReleaseTags}
                        setArtworkFilename={setArtworkFilename}
                        nextEnabled={canMoveToTracksPage()}
                        onNextClicked={() => {
                            setCurrentFlowPage('tracks');
                        }}
                    />
                )
            case 'tracks':
                return (
                    <NewReleaseTracks
                        tracks={tracks}
                        addTrack={addTrack}
                        onBackClicked={() => setCurrentFlowPage('details')}
                        onNextClicked={() => setCurrentFlowPage('submit')}
                        nextEnabled={canMoveToSubmitPage()}
                    />
                )
            case 'submit':
                return (
                    <NewReleaseSubmit
                        releaseTitle={releaseTitle}
                        releaseDate={releaseDate}
                        artwork={editedArtwork}
                        artworkFilename={artworkFilename}
                        releaseDescription={releaseDescription}
                        releaseType={releaseType}
                        releaseTags={releaseTags}
                        tracks={tracks}
                        onBackClicked={() => setCurrentFlowPage('tracks')}
                        onNextClicked={onSubmit}
                    />
                )
        }
    }

    return (
        <>
            <Card className="mt-5 w-full lg:w-4/5 xl:w-4/5 2xl:w-3/5 flex justify-center px-4 mx-5 container">
                <h1 className="text-3xl font-bold text-black dark:text-white">Create New Release</h1>
                <h2 className="text-2xl text-black dark:text-white">{(currentFlowPage.charAt(0).toUpperCase() + currentFlowPage.slice(1))}</h2>
                <hr />
                <div className="mt-5 flex flex-col w-full justify-center gap-2">
                    {getFlowPage()}
                </div>
            </Card>
            {currentFlowPage == 'tracks' && tracks.map(track => (
                <NewReleaseTrackCard
                    key={track.id}
                    track={track}
                    removeTrack={removeTrack}
                    updateTrack={updateTrack}
                />
            ))}
        </>
    )
}