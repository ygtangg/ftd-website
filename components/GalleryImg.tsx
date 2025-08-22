import Image from "next/image";

type CloudinaryImage = {
  secure_url: string;
  width: number;
  height: number;
};

type Props = {
  img: CloudinaryImage;
  featured?: boolean; // large tile if true
};

export default function GalleryImg({ img, featured = false }: Props) {
  const { secure_url, width, height } = img;
  return (
    <div
      className={
        featured
          ? "w-full h-[420px] md:h-[520px] lg:h-[560px]"
          : "w-full h-[260px] md:h-[320px] lg:h-[360px]"
      }
    >
      <Image
        src={secure_url}
        alt=""
        width={width}
        height={height}
        className="h-full object-cover"
        priority={featured}
      />
    </div>
  );
}
