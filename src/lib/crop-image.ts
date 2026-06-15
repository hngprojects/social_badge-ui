export const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues
		image.src = url;
	});

export function getRadianAngle(degreeValue: number) {
	return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
	const rotRad = getRadianAngle(rotation);

	return {
		width:
			Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
		height:
			Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
	};
}

/**
 * This function was adapted from the one in the react-easy-crop project
 */
export default async function getCroppedImg(
	imageSrc: string,
	pixelCrop: { x: number; y: number; width: number; height: number },
	rotation = 0,
	flip = { horizontal: false, vertical: false },
): Promise<string | null> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		return null;
	}

	const rotRad = getRadianAngle(rotation);

	// calculate bounding box of the rotated image
	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
		image.width,
		image.height,
		rotation,
	);

	// set canvas size to match the bounding box
	canvas.width = bBoxWidth;
	canvas.height = bBoxHeight;

	// translate canvas context to a central point to allow rotating and flipping around the center
	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
	ctx.rotate(rotRad);
	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
	ctx.translate(-image.width / 2, -image.height / 2);

	// draw rotated image
	ctx.drawImage(image, 0, 0);

	const croppedCanvas = document.createElement("canvas");

	const croppedCtx = croppedCanvas.getContext("2d");

	if (!croppedCtx) {
		return null;
	}

	// Cap output dimensions so the inlined data URL stays small. The photo only
	// renders in a ~240px box, so a full-resolution crop (e.g. 3000px from a phone
	// photo) bloats the base64 string, slows decode inside html-to-image's
	// foreignObject (worsening the capture race), and can hit browser data-URL
	// source-length limits. Downscaling keeps quality while removing both risks.
	const MAX_DIM = 1000;
	const scale = Math.min(
		1,
		MAX_DIM / Math.max(pixelCrop.width, pixelCrop.height),
	);

	// Set the size of the cropped canvas
	croppedCanvas.width = Math.round(pixelCrop.width * scale);
	croppedCanvas.height = Math.round(pixelCrop.height * scale);

	// Draw the cropped image onto the new canvas, scaling to the capped size
	croppedCtx.drawImage(
		canvas,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		croppedCanvas.width,
		croppedCanvas.height,
	);

	// As Base64 string
	return croppedCanvas.toDataURL("image/jpeg", 0.9);

	// As a blob
	// return new Promise((resolve, reject) => {
	//   croppedCanvas.toBlob((file) => {
	//     resolve(URL.createObjectURL(file))
	//   }, 'image/jpeg')
	// })
}
