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
    const [currentFlowPage, setCurrentFlowPage] = useState<'detail' | 'track'>('track');

    const uploadArtwork = async () => {
        if (!editedArtwork || !artworkFilename) {
            console.error(`Could not upload artwork`);
            return;
        }

        const filename = `${uuidv4()}-${artworkFilename}}`;
        const { data, error } = await supabase.storage
            .from('artwork')
            .upload(filename, editedArtwork, {
                cacheControl: '3600',
                upsert: false
            });
        if (error) {
            console.error(`Error while upload artwork: ${error}`);
            return;
        }

        //TODO: Save to database
        const filepath = data.path;
    }

    const canMoveToTracksPage = () => {
        return (!!releaseTitle && 
            !!releaseDate && 
            !!editedArtwork && 
            !!releaseDescription && 
            !!releaseType &&
            !!artworkFilename
        )
    }

    const addTrack = () => {
        const _tracks = [...tracks];
        _tracks.push({ id: uuidv4() });
        setTracks(_tracks);
    }

    const removeTrack = (id: string) => {
        let _tracks = [...tracks];
        _tracks = _tracks.filter(track => track.id != id);
        setTracks(_tracks);
    }

    const setTrackFile = (id: string, file: File) => {
        let _tracks = [...tracks];
        const index = _tracks.findIndex(t => t.id == id);
        _tracks[index].file = file;
        setTracks(_tracks);
    }

    const getFlowPage = () => {
        switch(currentFlowPage) {
            case 'detail':
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
                            setCurrentFlowPage('track');
                        }}
                    />
                )
            case 'track':
                return (
                    <NewReleaseTracks
                        tracks={tracks}
                        addTrack={addTrack}
                        onBackClicked={() => setCurrentFlowPage('detail')}
                    />
                )
        }
    }

    return (
        <>
            <Card className="mt-5 w-full lg:w-3/5 2xl:w-2/5 flex justify-center px-4 mx-5 container">
                <h1 className="text-3xl font-bold text-black dark:text-white">Create New Release</h1>
                <div className="mt-5 flex flex-col w-full justify-center gap-2">
                    {getFlowPage()}
                </div>
            </Card>
            {currentFlowPage == 'track' && tracks.map(track => (
                <NewReleaseTrackCard
                    key={uuidv4()}
                    track={track}
                    removeTrack={removeTrack}
                    setTrackFile={setTrackFile}
                />
            ))}
        </>
    )
}