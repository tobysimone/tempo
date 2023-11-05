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
import { CreateReleaseRequest } from '../../../api/artist/release/route';

export default function NewRelease() {
    const supabase = createClientComponentClient();

    //release detail
    const [releaseTitle, setReleaseTitle] = useState('Growing Season');
    const [releaseDate, setReleaseDate] = useState<Date | undefined>(new Date());
    const [editedArtwork, setEditedArtwork] = useState<string | null | undefined>("data:image/png;base64,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");
    const [releaseDescription, setReleaseDescription] = useState('test');
    const [releaseType, setReleaseType] = useState('ep');
    const [releaseTags, setReleaseTags] = useState('');
    const [artworkFilename, setArtworkFilename] = useState('test.jpg');
    
    //release tracks
    const [tracks, setTracks] = useState<NewReleaseTrack[]>([]);

    //general release
    const [currentFlowPage, setCurrentFlowPage] = useState<'details' | 'tracks' | 'submit'>('submit');

    const onSubmit = async () => {
        const request = createReleaseRequest();
        const createReleaseResponse = await sendCreateReleaseRequest(request);
        if(createReleaseResponse && createReleaseResponse.ok) {
            const release = (await createReleaseResponse.json()).release;
            await sendUploadTracksRequest(release.id);
        }
    }

    const sendUploadTracksRequest = async (releaseId: string) => {
        const request = new FormData();
        request.append('release_id', releaseId);

        let trackIndex = 0;
        tracks.forEach(track => {
            if(track.file) {
                const trackId = `track${trackIndex++}`; 
                request.append(trackId, track.file);
                request.append(`${trackId}_title`, track.title);
            } else {
                console.error(`Could not append track to request: ${track}`);
            }
        });
        request.append('number_of_tracks', String(trackIndex));

        return await fetch('/api/artist/release/track/', {
            method: 'POST',
            body: request
        })
    }

    const createReleaseRequest = (): CreateReleaseRequest => {
        return {
            releaseTitle: releaseTitle,
            releaseDate: releaseDate?.toDateString() || '',
            releaseDescription: releaseDescription,
            releaseType: releaseType,
            artwork: editedArtwork || '',
            artworkFilename: artworkFilename,
            tracks: tracks
        }
    };

    const sendCreateReleaseRequest = async (request: CreateReleaseRequest) => {
        return await fetch('/api/artist/release/', {
            method: 'POST',
            body: JSON.stringify(request)
        });
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