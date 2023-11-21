'use client';

import { getFileExtension } from "@/app/_shared/helpers/FileHelper";
import { ProfileSettings } from "@/app/_shared/service/profile/profile-settings.service";
import Cropper from "@/components/cropper/Cropper";
import { Avatar, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { useFilePicker } from "use-file-picker";

export default function ArtistProfileSettingsPage() {
    const [profileSettings, setProfileSettings] = useState<ProfileSettings | undefined>();
    const router = useRouter();

    const getProfileSettings = async () => {
        return await fetch('/api/user/profile');
    }

    const refresh = async () => {
        const response = await getProfileSettings();
        if(!response) {
            return router.push('/login');
        }

        const profileSettings = await response.json();
        setProfileSettings(profileSettings);
    }

    useEffect(() => {
        (async () => {
            const response = await getProfileSettings();
            if(!response) {
                return router.push('/login');
            }

            const profileSettings = await response.json();
            setProfileSettings(profileSettings);
        })();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>01</div>
            <>
                <UserAvatar profileSettings={profileSettings} refresh={refresh} />
            </>
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

        if(response) {
            refresh();
        }
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