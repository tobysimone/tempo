import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { NewReleaseTrack } from "../tracks/model/new-release-track";
import { FlowbiteTheme } from "@/app/_shared/theme/flowbite-theme";

export interface NewReleaseSubmitProps {
    releaseTitle: string;
    releaseDate: Date | undefined;
    artwork: string | null | undefined;
    artworkFilename: string;
    releaseDescription: string;
    releaseType: string;
    releaseTags: string;
    tracks: NewReleaseTrack[];
    onBackClicked: () => void;
    onNextClicked: () => void;
}

export default function NewReleaseSubmit(props: NewReleaseSubmitProps) {
    const {
        releaseTitle,
        releaseDate,
        artwork,
        artworkFilename,
        releaseDescription,
        releaseType,
        releaseTags,
        tracks,
        onBackClicked,
        onNextClicked
    } = props;

    return (
        <>
            <p className="text-black dark:text-white">Please review and ensure the information about your release is accurate before submitting</p>
            <p className="mt-5 text-lg font-semibold text-black dark:text-white">
                Release Title: <span className="font-normal">{releaseTitle}</span>
            </p>
            <p className="mt-3 text-lg font-semibold text-black dark:text-white">
                Release Date: <span className="font-normal">{releaseDate?.toLocaleDateString()}</span>
            </p>
            <p className="mt-3 text-lg font-semibold text-black dark:text-white">
                Release Description: <span className="font-normal">{releaseDescription}</span>
            </p>
            <p className="mt-3 text-lg font-semibold text-black dark:text-white">
                Release Type: <span className="font-normal">{releaseType}</span>
            </p>
            <p className="mt-3 text-lg font-semibold text-black dark:text-white">
                Release Tags: <span className="font-normal">{releaseTags}</span>
            </p>
            <p className="mt-3 text-lg font-semibold text-black dark:text-white">
                Artwork Filename: <span className="font-normal">{artworkFilename}</span>
            </p>
            {artwork && (
                <img src={artwork} style={{ width: '25%' }} />
            )}
            <p className="mt-3 text-lg font-semibold text-black dark:text-white">
                Tracks
            </p>
            {tracks.map(track => (
                <Card theme={FlowbiteTheme.CARD}>
                    <p className="mt-1 text-lg font-normal text-black dark:text-white">
                        Title: {track.title}
                    </p>
                    <p className="mt-1 text-lg font-normal text-black dark:text-white">
                        File: {track.file?.name}
                    </p>
                </Card>
            ))}
            <div className="flex flex-row flex-1 items-center ml-auto mt-5">
                <Link href="#" className="mr-5 animated-link text-black dark:text-white">Cancel</Link>
                <Button onClick={onBackClicked} className="mr-5">
                    <p className="text-md font-normal text-white">
                        Back
                    </p>
                </Button>
                <Button onClick={onNextClicked}>
                    <p className="text-md font-normal text-white">
                        Submit
                    </p>
                </Button>
            </div>
        </>
    )
}