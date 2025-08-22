"use client";

import { useEffect, useState } from "react";
import GalleryImg from "@/components/GalleryImg";
import { motion } from "framer-motion";

type CloudinaryImage = {
  secure_url: string;
  width: number;
  height: number;
};

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/cloudinary");
      const data = await res.json();
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <section
        className="
          mx-1 w-full md:px-4 pb-16
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-2 md:gap-3
        "
      >
        {images.map(
          (
            img: { secure_url: string; width: number; height: number },
            i: number,
          ) => (
            <motion.div
              key={i}
              className={i % 3 === 0 ? "sm:col-span-2" : ""}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            >
              <GalleryImg img={img} featured={i % 3 === 0} />
            </motion.div>
          ),
        )}
      </section>
    </main>
  );
}
