import Image from "next/image";
import path from "path";
import { imageSizeFromFile } from "image-size/fromFile";

type GalleryImgProps = {
	url: string;
};

function publicUrlToFsPath(url: string) {
	const relPath = url.replace(/^\//, "");
	return path.join(process.cwd(), "public", relPath);
}

async function getDimension(url: string) {
	const filePath = publicUrlToFsPath(url);
	const { width, height } = await imageSizeFromFile(filePath);
	return { width, height };
}

export default async function GalleryImg({ url }: GalleryImgProps) {
	const { width, height } = await getDimension(url);
	const widthHeightRatio = height / width;
	const galleryHeight = Math.ceil(400 * widthHeightRatio);
	const photoSpans = Math.ceil(galleryHeight / 10) + 1;

	return (
		<div className="w-[400px] justify-self-center" style={{ gridRow: `span ${photoSpans}` }}>
			<div className="overflow-hidden group">
				<Image
					src={url}
					alt="Gallery Image"
					width={width}
					height={height}
					className="group-hover:opacity-75"
					sizes="400px"
				/>
			</div>
		</div>
	);
}
