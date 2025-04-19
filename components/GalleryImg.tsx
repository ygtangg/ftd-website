import Image from "next/image";

type GalleryImgProps = {
    url: string;
  }
  

export default function GalleryImg({ url }: GalleryImgProps) {
    return (
        <div className="relative w-full h-72 group">
            <Image
                src={url}
                alt="Gallery Image"
                className="object-cover group-hover:opacity-75"
                fill={true}
                sizes="(min-width: 2880px) 432px, (min-width: 2460px) calc(8.75vw + 217px), 
                (min-width: 2060px) calc(12.11vw + 183px), (min-width: 1640px) calc(16.75vw + 158px), 
                (min-width: 1600px) calc(30vw + 43px), (min-width: 1240px) calc(24.41vw + 130px), 
                (min-width: 840px) calc(43.42vw + 68px), (min-width: 480px) 100vw, calc(8.13vw + 407px)"
            />
        </div>
    );
}