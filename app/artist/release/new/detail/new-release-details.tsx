'use client'

import '../styles.css';

import Cropper from "@/components/cropper/Cropper";
import { Button, Datepicker, Textarea } from "flowbite-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import toast from 'react-hot-toast';

export interface NewReleaseDetailsProps {
    releaseTitle: string;
    setReleaseTitle: (releaseTitle: string) => void;
    setReleaseDate: (date: Date) => void;
    editedArtwork: string | null | undefined;
    setEditedArtwork: (image: string | null | undefined) => void;
    releaseDescription: string;
    setReleaseDescription: (releaseDescription: string) => void;
    releaseType: string;
    setReleaseType: (releaseType: string) => void;
    releaseTags: string;
    setReleaseTags: (releaseTags: string) => void;
    setArtworkFilename: (filename: string) => void;
    nextEnabled: boolean;
    onNextClicked: () => void;
}

export default function NewReleaseDetails(props: NewReleaseDetailsProps) {
    const [rawArtwork, setRawArtwork] = useState<string>();
    const [showCropper, setShowCropper] = useState(false);

    const {
        releaseTitle,
        setReleaseTitle,
        editedArtwork,
        setReleaseDate,
        onNextClicked,
        setEditedArtwork,
        releaseDescription,
        setReleaseDescription,
        releaseType,
        setReleaseType,
        releaseTags,
        setReleaseTags,
        setArtworkFilename,
        nextEnabled
    } = props;

    const handleArtworkFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (!file) {
            console.error(`Artwork file is null`);
            toast.error('Could not upload artwork, please try again');
            return;
        }
        setArtworkFilename(file.name);
        setRawArtwork(URL.createObjectURL(file));
        setShowCropper(true);
    }

    return (
        <>
            <label htmlFor="title" className="text-lg text-black dark:text-white">Release Title</label>
            <input
                name="title"
                type="text" 
                className="rounded-md px-4 bg-inherit border mb-6 text-black dark:text-white" 
                value={releaseTitle}
                onChange={(e) => setReleaseTitle(e.target.value)}
            />

            <label htmlFor="release-date" className="text-lg text-black dark:text-white">Release Date</label>
            <Datepicker 
                aria-label='custom-datepicker' 
                className="mb-6" 
                minDate={new Date()}
                onSelectedDateChanged={(date: Date) => setReleaseDate(date)} 
            />

            <label htmlFor="artwork" className="text-lg text-black dark:text-white">Artwork</label>
            <input 
                type="file" 
                accept="image/*"
                name="artwork"
                className="text-black dark:text-white rounded-md mb-6" 
                onChange={handleArtworkFileSelected} 
            />

            {editedArtwork && (
                <img src={editedArtwork} className="mb-6" style={{ width: '25%' }} />
            )}

            <label htmlFor="release-description" className="text-lg text-black dark:text-white">Release Description</label>
            <Textarea
                name="release-description"
                id="release-description"
                placeholder=""
                required
                rows={4}
                className="bg-inherit mb-6" 
                value={releaseDescription}
                onChange={(e) => setReleaseDescription(e.target.value)} />

            <label htmlFor="release-type" className="text-lg text-black dark:text-white">Release Type</label>
            <select 
                name="release-type" 
                className="text-black dark:text-white rounded-md bg-inherit mb-6" 
                value={releaseType}
                onChange={(e) => setReleaseType(e.target.value)}
            >
                <option value="album">Album</option>
                <option value="single">Single</option>
                <option value="ep">EP</option>
                <option value="lp">LP</option>
            </select>

            <label htmlFor="tags" className="text-lg text-black dark:text-white">Tags</label>
            <input 
                type="text" 
                className="text-black dark:text-white rounded bg-inherit border mb-6" 
                value={releaseTags}
                onChange={(e) => setReleaseTags(e.target.value)}
            />

            <div className="flex flex-row flex-1 items-center ml-auto mt-5">
                <Link href="#" className="mr-5 animated-link text-black dark:text-white">Cancel</Link>
                <Button onClick={onNextClicked} disabled={!nextEnabled}>
                    <p className="text-md font-normal text-white">
                        Next
                    </p>
                </Button>
            </div>

            {showCropper && (
                <Cropper 
                    size={'xl'} 
                    show={showCropper} 
                    header={'Edit Artwork'} 
                    image={rawArtwork} 
                    onCropComplete={(croppedArtwork) => {
                        setEditedArtwork(croppedArtwork);
                        setShowCropper(false);
                    }}
                    onClose={() => {
                        setShowCropper(false);
                    }}
                    onError={(error: string) => {
                        setRawArtwork('');
                        setEditedArtwork(null);
                        setShowCropper(false);
                        toast.error('Could not upload artwork, please try again');
                        console.error(error);
                    }}
                />
            )}
        </>
    );
}
