import { Button } from "flowbite-react";
import { NewReleaseTrack } from "./model/new-release-track";
import Link from "next/link";

export interface NewReleaseTracksProps {
    tracks: NewReleaseTrack[];
    addTrack: () => void;
    onBackClicked: () => void;
    onNextClicked: () => void;
}

export default function NewReleaseTracks(props: NewReleaseTracksProps) {
    const {
        tracks,
        addTrack,
        onBackClicked,
        onNextClicked
    } = props;

    return (
        <>
            <p className="text-black dark:text-white">
                Total tracks: {tracks.length}
            </p>
            <Button className="mt-5" onClick={addTrack}>
                <p className="text-md font-normal text-white">
                    Add Track
                </p>
            </Button>
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