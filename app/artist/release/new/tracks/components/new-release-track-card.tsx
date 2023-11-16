import { Card } from "flowbite-react";
import { NewReleaseTrack } from "../model/new-release-track";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";

export interface NewReleaseTrackCardProps {
    track: NewReleaseTrack;
    removeTrack: (id: string) => void;
    updateTrack: (track: NewReleaseTrack) => void;
}

export default function NewReleaseTrackCard(props: NewReleaseTrackCardProps) {
    const {
        track: {
            id,
            title,
            file
        },
        removeTrack,
        updateTrack
    } = props;

    const handleTrackFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if(!file) {
            console.error(`Track file is null`);
            toast.error('Could not upload track file, please try again');
            return;
        }
        updateTrack(({ id, title, file }));
    }

    return (
        <Card className="mt-5 w-full lg:w-3/5 2xl:w-2/5 flex self-center px-4 mx-5 container" theme={FlowbiteTheme.CARD}>
            <label htmlFor="track-title" className="text-lg text-black dark:text-white">Track Title</label>
            <input
                name="track-title"
                type="text"
                className="mb-6 rounded-md px-4 bg-inherit border text-black dark:text-white"
                value={title}
                onChange={(e) => {
                    e.preventDefault();
                    const title = e.target.value;
                    updateTrack(({ id, title, file }));
                }}
            />
            <label htmlFor="track-file" className="text-lg text-black dark:text-white">Track File</label>
            {file?.name ? (
                <p className="text-black dark:text-white">{file?.name}</p>
            ) : (
                <input
                    type="file"
                    accept=".wav,.flac"
                    name="track-file"
                    className="text-black dark:text-white rounded-md mb-6"
                    onChange={handleTrackFileSelected}
                />
            )}
            <div className="flex flex-row flex-1 items-center ml-auto mt-5">
                <a onClick={() => removeTrack(id)} className="mr-5 animated-link text-black dark:text-white">Delete</a>
            </div>
        </Card>
    )
}