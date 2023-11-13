'use client'

import 'react-image-crop/dist/ReactCrop.css';

import { Button } from "flowbite-react";
import { Modal, ModalSizes } from "flowbite-react/lib/esm/components/Modal/Modal";
import { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

export interface CropperProps {
    size: keyof ModalSizes;
    show: boolean;
    header: string;
    image: string | undefined;
    onCropComplete: (croppedImage: string) => void;
    onClose: () => void;
    onError: (error: string) => void;
}

export default function Cropper({ size, show, header, image, onCropComplete, onClose, onError }: CropperProps) {
    if(!image) {
        onError('Image cannot be null');
    }

    const imageRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0
    });

    const onDoneClicked = () => {
        const image = imageRef?.current;
        if(!crop || !image) {
            onError(`Crop or image are null`);
            return;
        }

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image?.width;
        const scaleY = image.naturalHeight / image?.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx!.imageSmoothingQuality = 'high';

        ctx!.drawImage(
            image!,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        const base64Image = canvas.toDataURL('image/jpeg');
        onCropComplete(base64Image);
    }

    return (
        <Modal show={show} onClose={onClose} size={size}>
            <Modal.Header>{ header }</Modal.Header>
            <Modal.Body>
                <ReactCrop
                    crop={crop}
                    onChange={setCrop}
                >
                    <img
                        src={image}
                        style={{ width: '100%' }}
                        ref={imageRef}
                    />
                </ReactCrop>
                <Modal.Footer>
                    <Button onClick={onDoneClicked}>Done</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}