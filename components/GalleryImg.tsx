import Image from "next/image";
import path from "path";
import { imageSizeFromFile } from "image-size/fromFile";

type Props = {
  url: string;
  featured?: boolean; // large tile if true
};

function publicUrlToFsPath(url: string) {
  const relPath = url.replace(/^\//, "");
  return path.join(process.cwd(), "public", relPath);
}

async function getDimension(url: string) {
  const filePath = publicUrlToFsPath(url);
  const { width, height } = await imageSizeFromFile(filePath);
  return { width: width || 1600, height: height || 1200 };
}

export default async function GalleryImg({ url, featured = false }: Props) {
  const { width, height } = await getDimension(url);

  // layout: tight gaps, rectangular (no rounded corners), no filters/text
  // featured spans 2 columns on sm+ and gets a taller container
  return (
    <div className={featured ? "sm:col-span-2" : ""}>
      <div
        className={
          featured
            ? "w-full h-[420px] md:h-[520px] lg:h-[560px]"
            : "w-full h-[260px] md:h-[320px] lg:h-[360px]"
        }
      >
        <Image
          src={url}
          alt=""
          width={width}
          height={height}
          className="w-full h-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={featured}
        />
      </div>
    </div>
  );
}
