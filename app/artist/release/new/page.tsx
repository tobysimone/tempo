'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Card, Datepicker, Modal, Textarea, Toast } from "flowbite-react";
import { ChangeEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { HiExclamation } from 'react-icons/hi';
import Image from 'next/image'

import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { Crop, PercentCrop, PixelCrop } from "react-image-crop";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewRelease() {
    const supabase = createClientComponentClient();
    const router = useRouter();

    const [artworkFilename, setArtworkFilename] = useState<string>();
    const [artwork, setArtwork] = useState<string>();
    const [showCropModal, setShowCropModal] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const imageRef = useRef(null);
    const [rawArtwork, setRawArtwork] = useState<string>();
    const [artworkCrop, setArtworkCrop] = useState<Crop>({
        unit: '%',
        width: 50,
        height: 50,
        x: 0,
        y: 0
    });
    const [showArtworkError, setShowArtworkError] = useState(false);

    const uploadArtwork = async () => {
        if (!artwork || !artworkFilename) {
            console.error(`Could not upload artwork`);
            setShowArtworkError(true);
            return;
        }

        const filename = `${uuidv4()}-${artworkFilename}}`;
        const { data, error } = await supabase.storage
            .from('artwork')
            .upload(filename, artwork, {
                cacheControl: '3600',
                upsert: false
            });
        if (error) {
            console.error(`Error while upload artwork: ${error}`);
            setShowArtworkError(true);
            return;
        }

        //TODO: Save to database
        const filepath = data.path;
    }

    const onCreateReleaseClicked = () => {
    }

    const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const file = input?.files?.[0];
        if (!file) {
            console.error(`Artwork file is null`);
            setShowArtworkError(true);
            return;
        }
        setRawArtwork(URL.createObjectURL(file));
        setShowCropModal(true);
    }

    const onCropComplete = () => {
        console.log('crop complete');
        setShowCropModal(false);

        const image = imageRef?.current;
        const canvas = document.createElement('canvas');
        const scaleX = image?.naturalWidth / image?.width;
        const scaleY = image?.naturalHeight / image?.height;
        canvas.width = artworkCrop.width;
        canvas.height = artworkCrop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = artworkCrop.width * pixelRatio;
        canvas.height = artworkCrop.height * pixelRatio;
        ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx!.imageSmoothingQuality = 'high';

        ctx!.drawImage(
            image!,
            artworkCrop.x * scaleX,
            artworkCrop.y * scaleY,
            artworkCrop.width * scaleX,
            artworkCrop.height * scaleY,
            0,
            0,
            artworkCrop.width,
            artworkCrop.height,
        );

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        console.log(base64Image);
        setArtwork(base64Image);
    }

    const onCropCancel = () => {
        console.log('crop canceled');
        setRawArtwork('');
        setShowCropModal(false);
    }

    return (
        <>
            <Card className="mt-5 w-full lg:w-3/5 2xl:w-2/5 flex justify-center px-4 mx-5 container">
                <h1 className="text-3xl font-bold text-black dark:text-white">Create New Release</h1>
                <div className="mt-5 flex flex-col w-full justify-center gap-2">
                    <label htmlFor="title" className="text-lg text-black dark:text-white">Release Title</label>
                    <input type="text" className="rounded-md px-4 bg-inherit border mb-6 text-black dark:text-white" />

                    <label htmlFor="release-date" className="text-lg text-black dark:text-white">Release Date</label>
                    <Datepicker aria-label='custom-datepicker' className="mb-6"/>

                    <label htmlFor="artwork" className="text-lg text-black dark:text-white">Artwork</label>
                    <input type="file" accept="image/*" name="artwork" className="text-black dark:text-white rounded-md mb-6" onChange={handleFileSelected} />

                    <label htmlFor="release-description" className="text-lg text-black dark:text-white">Release Description</label>
                    <Textarea
                        name="release-description"
                        placeholder=""
                        required
                        rows={4}
                        className="bg-inherit"
                    />

                    {artwork && (
                        <img src={artwork} style={{ width: '100%' }} />
                    )}

                    <label htmlFor="release-type" className="mt-5 text-lg text-black dark:text-white">Release Type</label>
                    <select name="release-type" className="text-black dark:text-white rounded-md bg-inherit">
                        <option value="ep">Album</option>
                        <option value="ep">Single</option>
                        <option value="ep">EP</option>
                        <option value="ep">LP</option>
                    </select>

                    <label htmlFor="tags" className="mt-5 text-lg text-black dark:text-white">Tags</label>
                    <input type="text" className="text-black dark:text-white rounded bg-inherit border" />

                    {showArtworkError && (
                        <Toast className="mt-5 absolute bottom-10 left-10">
                            <div className="mr-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                                <HiExclamation className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-normal text-muted dark:text-muted">
                                Could not upload artwork, please try again
                            </div>
                            <Toast.Toggle />
                        </Toast>
                    )}

                    <div className="flex flex-row flex-1 items-center ml-auto mt-5">
                        <Link href="#" className="mr-5 animated-link">Cancel</Link>
                        <Button onClick={onCreateReleaseClicked}>
                            <p className="text-md font-normal text-white">
                                Next
                            </p>
                        </Button>
                    </div>
                </div>
                <Modal show={showCropModal} onClose={onCropCancel} size={'sm'}>
                    <Modal.Header>Crop Artwork</Modal.Header>
                    <Modal.Body>
                        <ReactCrop
                            crop={artworkCrop}
                            onChange={setArtworkCrop}
                        >
                            <img
                                src={rawArtwork}
                                style={{ width: '100%' }}
                                ref={imageRef}
                            />
                        </ReactCrop>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => onCropComplete()}>Done</Button>
                        <Button onClick={() => onCropCancel()}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </>
    )
}