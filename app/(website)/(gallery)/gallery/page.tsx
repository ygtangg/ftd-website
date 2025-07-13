import fs from "fs";
import path from "path";
import GalleryImg from "@/components/GalleryImg";

export default async function Gallery() {
	const galleryDir = path.join(process.cwd(), "public", "gallery");
	const images = fs.readdirSync(galleryDir);

	return (
		<section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
			{images.map((img, index) => (
				<GalleryImg key={index} url={`/gallery/${img}`} />
			))}
		</section>
	);
}
