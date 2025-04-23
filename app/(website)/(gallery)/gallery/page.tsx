import GalleryImg from "@/components/GalleryImg";
import { createClient } from "@/lib/supabase/server";

export default async function Gallery() {
    const supabase = await createClient();

    const { data: files, error: error } = await supabase
        .storage
        .from("pictures")
        .list("gallery", {limit: 60});

    if (error) {
        console.error("Error listing files:", error);
        return [];
    }
    
    const urls = files.map((f) => {
            const { data: { publicUrl } } = supabase
                .storage
                .from("pictures/gallery")
                .getPublicUrl(f.name);
            return publicUrl;
        });

    return(
        <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
            {urls.map((url, index) => (
                <GalleryImg key={index} url={url} />
            ))}
        </section>
    )
}