'use client'

import { getFileExtension } from "@/app/_shared/helpers/FileHelper";
import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";
import Cropper from "@/components/cropper/Cropper";
import { Button, Card, Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Iframe from "react-iframe";
import { useFilePicker } from "use-file-picker";
import { ImageDimensionsValidator } from "use-file-picker/validators";

export default function SetupArtistHomepage() {
    const [subdomain, setSubdomain] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [showCropper, setShowCropper] = useState<boolean>(false);
    const [formChanged, setFormChanged] = useState<boolean>(false);
    const [header, setHeader] = useState<string>('');
    const [headerFileExtension, setHeaderFileExtension] = useState<string>('');

    const getPreferences = useCallback(async () => {
        const response = await fetch('/api/artist/homepage/preferences');
        return await response.json();
    }, []);

    const savePreferences = async () => {
        const preferences = {
            subdomain: subdomain,
            description: description,
            header: header
        };

        await fetch('/api/artist/homepage/preferences', {
            method: 'PUT',
            body: JSON.stringify({
                preferences: {
                    ...preferences   
                },
                headerFileExtension
            })
        });
    }

    const handlePreviewClick = () => {
        setShowPreview(true);
    }

    useEffect(() => {
        (async () => {
            const preferences = await getPreferences();
            setSubdomain(preferences.subdomain);
            setDescription(preferences.description);
            setHeader(preferences.header);
        })();
    }, []);

    const onSubdomainChange = (e: any) => {
        setSubdomain(e.target?.value);
        setFormChanged(true);
    }

    const onDescriptionChange = (e: any) => {
        setDescription(e.target?.value);
        setFormChanged(true);
    }

    const resetCropper = () => {
        setShowCropper(false);
        setHeader('');
        setHeaderFileExtension('');
    }

    return (
        <>
            <Card className="mt-5 w-full xl:w-4/5 2xl:w-3/5 flex self-center px-4 mx-5 container" theme={FlowbiteTheme.CARD}>
                <div className="flex flex-row items-center">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Homepage Setup</h1>
                    <Button className='ml-auto' onClick={savePreferences} disabled={!formChanged}>
                        <p className="text-md font-normal text-white">
                            Save
                        </p>
                    </Button>
                    <Button className='ml-2' onClick={handlePreviewClick} disabled={formChanged}>
                        <p className="text-md font-normal text-white">
                            Preview
                        </p>
                    </Button>
                </div>
                <hr />
                <label htmlFor="title" className="mt-5 text-lg text-black dark:text-white font-bold">Homepage Link</label>
                <div className="flex flex-row items-center">
                    <input
                        name="title"
                        type="text"
                        className="rounded-md px-4 bg-inherit border text-black dark:text-white"
                        value={subdomain}
                        placeholder="bandname"
                        onChange={onSubdomainChange}
                    />
                    <span className="text-xl text-black dark:text-white">.tempo.com</span>
                </div>
                <label htmlFor="discription" className="mt-5 text-lg text-black dark:text-white font-bold">Artist Description</label>
                <textarea
                    name="description"
                    rows={6}
                    className="rounded-md px-4 bg-inherit border text-black dark:text-white"
                    value={description}
                    placeholder=""
                    onChange={onDescriptionChange}
                    style={{ resize: 'none' }}
                />
                <label className="mt-5 text-lg text-black dark:text-white font-bold">Header Image</label>
                { header && (
                    <img src={header} className="mt-3" style={{ }} />
                )}

                <ImageHeaderPicker onImagePicked={(image: string, extension: string) => {
                    setHeader(image);
                    setShowCropper(true);
                    setFormChanged(true);
                    setHeaderFileExtension(extension);
                }} />

                { showPreview && (
                    <Modal
                        show={showPreview}
                        size={'5xl'}
                        theme={FlowbiteTheme.MODAL_FULLSIZE}
                        onClose={() => setShowPreview(false)}
                    >
                        <Modal.Header>Preview</Modal.Header>
                        <Modal.Body style={{ height: '100vh' }}>
                            <Iframe
                                url={`http://${subdomain}.localhost:3000`}
                                width="100%"
                                height="100%"
                                display="initial"
                                position="relative"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setShowPreview(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                )}

                { showCropper && (
                    <Cropper
                        size={'5xl'}
                        show={showCropper}
                        header={'Edit Header'}
                        image={header}
                        onCropComplete={(croppedHeader) => {
                            setHeader(croppedHeader);
                            setShowCropper(false);
                        }}
                        onClose={resetCropper}
                        onError={(error: string) => {
                            resetCropper();
                            toast.error('Could not upload header, please try again');
                            console.error(error);
                        }}
                    />
                )}
            </Card>
        </>
    )
}

function ImageHeaderPicker({ onImagePicked }: { onImagePicked: (image: string, extension: string) => void }) {
    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        accept: ['image/png', 'image/jpg', 'image/jpeg'],
        multiple: false,
        readAs: 'DataURL',
        limitFilesConfig: {
            max: 1,
            min: 1,
            errorMessages: {
                max: 'You can only upload one file',
                min: 'You need to upload at least one file'
            }
        },
        validators: [
            new ImageDimensionsValidator({
                maxWidth: 975,
                minWidth: 0,
                maxHeight: 180,
                minHeight: 0
            })
        ]
    });

    useEffect(() => {
        if(!filesContent || filesContent.length == 0) {
            return;
        }

        onImagePicked(filesContent[0].content, getFileExtension(filesContent[0].name));
    }, [filesContent]);

    return (
        <a className="animated-link" onClick={openFilePicker} style={{ width: 'fit-content' }}>
            Select Header Image
        </a>
    )
}