'use client'

import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";
import { Button, Card, Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Iframe from "react-iframe";

export default function SetupArtistHomepage() {
    const [subdomain, setSubdomain] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [formChanged, setFormChanged] = useState<boolean>(false);

    const getPreferences = useCallback(async () => {
        const response = await fetch('/api/artist/homepage/preferences');
        return await response.json();
    }, []);

    const savePreferences = async () => {
        const preferences = {
            subdomain: subdomain,
            description: description
        };

        await fetch('/api/artist/homepage/preferences', {
            method: 'PUT',
            body: JSON.stringify(preferences)
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

    return (
        <>
            <Card className="mt-5 w-full lg:w-4/5 xl:w-4/5 2xl:w-3/5 flex justify-center px-4 mx-5 container">
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
                <label htmlFor="title" className="mt-5 text-lg text-black dark:text-white">Homepage Link</label>
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
                <label htmlFor="discription" className="mt-5 text-lg text-black dark:text-white">Artist Description</label>
                <textarea
                    name="description"
                    rows={6}
                    className="rounded-md px-4 bg-inherit border text-black dark:text-white" 
                    value={description}
                    placeholder=""
                    onChange={onDescriptionChange}
                    style={{ resize: 'none' }}
                />

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
            </Card>
        </>
    )
}