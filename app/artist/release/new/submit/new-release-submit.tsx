import { Button } from "flowbite-react";
import Link from "next/link";
import { NewReleaseTrack } from "../tracks/model/new-release-track";

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
            <p>Please review and ensure the information about your release is accurate before submitting</p>
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
            <div className="flex flex-row flex-1 items-center ml-auto mt-5">
                <Link href="#" className="mr-5 animated-link text-black dark:text-white">Cancel</Link>
                <Button onClick={onBackClicked} className="mr-5">
                    <p className="text-md font-normal text-white">
                        Back
                    </p>
                </Button>
                <Button onClick={onNextClicked}>
                    <p className="text-md font-normal text-white">
                        Next
                    </p>
                </Button>
            </div>
        </>
    )
}