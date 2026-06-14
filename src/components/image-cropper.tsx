"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/crop-image";

interface ImageCropperProps {
	image: string;
	aspectRatio?: number;
	onCropComplete: (croppedImage: string) => void;
	onCancel: () => void;
	open: boolean;
}

export function ImageCropper({
	image,
	aspectRatio = 1,
	onCropComplete,
	onCancel,
	open,
}: ImageCropperProps) {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const onCropChange = (crop: Point) => {
		setCrop(crop);
	};

	const onZoomChange = (zoom: number) => {
		setZoom(zoom);
	};

	const onCropAreaComplete = useCallback(
		(rearrangedArea: Area, pixelCrop: Area) => {
			setCroppedAreaPixels(pixelCrop);
		},
		[],
	);

	const handleCrop = async () => {
		if (!croppedAreaPixels) return;
		try {
			const croppedImage = await getCroppedImg(image, croppedAreaPixels);
			if (croppedImage) {
				onCropComplete(croppedImage);
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Dialog open={open} onOpenChange={(val) => !val && onCancel()}>
			<DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 overflow-hidden">
				<DialogHeader className="p-6 pb-2">
					<DialogTitle>Crop your photo</DialogTitle>
				</DialogHeader>
				<div className="relative flex-1 bg-neutral-900">
					<Cropper
						image={image}
						crop={crop}
						zoom={zoom}
						aspect={aspectRatio}
						onCropChange={onCropChange}
						onZoomChange={onZoomChange}
						onCropComplete={onCropAreaComplete}
					/>
				</div>
				<div className="p-6 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium">Zoom</label>
						<input
							type="range"
							value={zoom}
							min={1}
							max={3}
							step={0.1}
							aria-labelledby="Zoom"
							onChange={(e) => setZoom(Number(e.target.value))}
							className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
						/>
					</div>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button variant="outline" onClick={onCancel} className="flex-1">
							Cancel
						</Button>
						<Button onClick={handleCrop} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
							Apply Crop
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
