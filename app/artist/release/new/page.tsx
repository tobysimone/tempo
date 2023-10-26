'use client'

import './styles.css';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NewReleaseDetails from './new-release-details';
import useNotification from '@/app/_shared/hooks/useNotification';

export default function NewRelease() {
    const supabase = createClientComponentClient();

    const { addNotification } = useNotification();

    useEffect(() => {
        addNotification('Hello world 1', 'error');
        addNotification('Hello world 2', 'error');
        addNotification('Hello world 3', 'error');
    }, []);

    const [releaseTitle, setReleaseTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState<Date | undefined>();
    const [editedArtwork, setEditedArtwork] = useState<string | null | undefined>();
    const [releaseDescription, setReleaseDescription] = useState('');
    const [releaseType, setReleaseType] = useState('');
    const [releaseTags, setReleaseTags] = useState('');
    const [artworkFilename, setArtworkFilename] = useState('');
    const [currentFlowPage, setCurrentFlowPage] = useState<'detail' | 'track'>('detail');

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
                        nextEnabled={!!releaseTitle && 
                            !!releaseDate && 
                            !!editedArtwork && 
                            !!releaseDescription && 
                            !!releaseType &&
                            !!artworkFilename
                        }
                        onNextClicked={() => {
                            setCurrentFlowPage('track');
                        }}
                    />
                )
            case 'track':
                return (
                    <>Add tracks</>
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
        </>
    )
}