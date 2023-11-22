'use client';

import { getUser } from "@/app/_shared/helpers/AccountHelper";
import { getFileExtension } from "@/app/_shared/helpers/FileHelper";
import { ArtistSettings } from "@/app/_shared/service/artist/ArtistSettings.model";
import { ProfileSettings } from "@/app/_shared/service/profile/ProfileSettings.model";
import Cropper from "@/components/cropper/Cropper";
import LoadingPage from "@/components/loading/loading";
import { User, createClientComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, Button } from "flowbite-react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { useFilePicker } from "use-file-picker";

export default function ArtistProfileSettingsPage() {
    const [profileSettings, setProfileSettings] = useState<ProfileSettings | undefined>();
    const [artistSettings, setArtistSettings] = useState<ArtistSettings | undefined>();

    const router = useRouter();

    const getProfileSettings = async () => {
        return await fetch('/api/user/profile');
    }

    const getArtistSettings = async () => {
        return await fetch('/api/artist');
    }

    const refresh = async () => {
        const profileSettingsResonse = await getProfileSettings();
        if(!profileSettingsResonse) {
            return router.push('/login');
        }

        const artistSettingsResponse = await getArtistSettings();
        if(!ArtistProfileSettingsPage) {
            return router.push('/login');
        }

        const profileSettings = await profileSettingsResonse.json();
        setProfileSettings(profileSettings);

        const artistSettings = await artistSettingsResponse.json();
        setArtistSettings(artistSettings);
    }

    useEffect(() => {
        (async () => {
            await refresh();
        })();
    }, []);

    if(!artistSettings || !profileSettings) {
        return <LoadingPage />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <UserDetails artistSettings={artistSettings} refresh={refresh} />
            <>
                <UserAvatar profileSettings={profileSettings} refresh={refresh} />
            </>
        </div>
    )
}

function UserDetails({ artistSettings, refresh }: { artistSettings?: ArtistSettings, refresh: () => void }) {
    const [name, setName] = useState<string>('');
    const [user, setUser] = useState<User | null>();

    const saveArtistSettings = async () => {
        const response = await fetch('/api/artist', {
            method: 'PUT',
            body: JSON.stringify({
                artistSettings: {
                    id: artistSettings?.id,
                    name: name
                },
                userId: user?.id
            })
        });

        if(!response.ok) {
            console.error(`Error while saving artist settings: ${JSON.stringify(response)}`);
        }

        refresh();
    }

    useEffect(() => {
        (async () => {
            setUser(await getUser(createClientComponentClient()));
        })();
    }, []);

    useEffect(() => {
        setName(artistSettings?.name || '');
    }, [artistSettings]);

    return (
        <div className="flex flex-col">
            <Button onClick={saveArtistSettings} className="w-fit" color="gray" outline>Save</Button>
            <hr className="mt-5" />
            <label className="text-sm font-bold mt-5" htmlFor="username">
                Artist/Band Name
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mt-2"
                name="username"
                type="text"
                placeholder="iwrestedabearonce"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>
    )
}

function UserAvatar({ profileSettings, refresh }: { profileSettings?: ProfileSettings, refresh: () => void }) {
    const [showCropper, setShowCropper] = useState<boolean>(false);
    const [uncroppedAvatar, setUncroppedAvatar] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [avatarExtension, setAvatarExtension] = useState<string>('');

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        accept: ['image/png', 'image/jpg', 'image/jpeg'],
        readAs: 'DataURL',
        multiple: false,
        limitFilesConfig: {
            max: 1,
            min: 1
        }
    });

    const resetCropper = () => {
        setShowCropper(false);
        setAvatar('');
        setUncroppedAvatar('');
        setAvatarExtension('');
    }

    const saveAvatar = async () => {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            body: JSON.stringify({
                profileSettings: {
                    profilePicture: avatar
                },
                profilePictureFileExtension: avatarExtension
            })
        });

        if(!response.ok) {
            console.error(`Error while saving avatar: ${JSON.stringify(response)}`);
        }

        refresh();
    }

    useEffect(() => {
        if(avatar) {
            saveAvatar();
        }
    }, [avatar]);

    useEffect(() => {
        if(!filesContent || filesContent.length == 0) {
            return;
        }

        const { content, name }  = filesContent[0];
        setUncroppedAvatar(content);
        setAvatarExtension(getFileExtension(name));
        setShowCropper(true);
    }, [filesContent]);

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className="flex self-center mb-2 text-sm font-bold text-label" style={{ marginRight: 40 }}>Profile Picture</div>
                <Avatar img={profileSettings?.profilePicture} size="xl" alt="Profile picture" rounded bordered />
                <Button onClick={openFilePicker} className="self-center mt-5 w-fit" color="gray" outline>
                    <FiEdit2 className="mr-1" />
                    Edit
                </Button>
            </div>
            { showCropper && (
                <Cropper
                    size={'2xl'}
                    show={showCropper}
                    header={'Edit Header'}
                    image={uncroppedAvatar}
                    onCropComplete={(croppedAvatar: any) => {
                        setAvatar(croppedAvatar);
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
        </>
    )
}