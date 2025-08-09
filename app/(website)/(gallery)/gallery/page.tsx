import fs from "fs";
import path from "path";
import GalleryImg from "@/components/GalleryImg";

const IMG_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".JPG",
  ".JPEG",
  ".PNG",
  ".WEBP",
  ".GIF",
  ".AVIF",
]);

// choose which images to feature (by index). ex: [0, 6]
const FEATURE_INDEXES = [0, 6, 10, 14, 17];

export default async function Gallery() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const images = fs
    .readdirSync(galleryDir)
    .filter((f) => IMG_EXT.has(path.extname(f)));

  return (
    <main className="min-h-screen bg-black">
      <section
        className="
          mx-1 w-full md:px-4 pb-16
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-2 md:gap-3
        "
      >
        {images.map((img, i) => (
          <GalleryImg key={i} url={`/gallery/${img}`} featured={i % 3 === 0} />
        ))}
      </section>
    </main>
  );
}
