"use client";

import Image from "next/image";
import homcom from "@/public/image/homcom.jpeg";
import DancerCard from "@/components/DancerCard";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Dancer = {
  first_name: string;
  last_name: string;
  picture: string;
  fav_dance_style: string;
  facts: string;
  role: string;
};

export default function About() {
  const [dancers, setDancers] = useState<Dancer[]>([]);

  // Fetch dancers from Supabase
  useEffect(() => {
    const fetchDancers = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("dancers")
        .select("*")
        .order("last_name", { ascending: true });

      if (error) {
        console.error("Error fetching dancers:", error);
        return;
      }

      setDancers(data || []);
    };

    fetchDancers();
  }, []);

  const boardMem = dancers
    .filter((dancer) => dancer.role !== "member" && dancer.role !== "alumni")
    .map((dancer: Dancer) => ({
      name: `${dancer.first_name} ${dancer.last_name}`,
      role: dancer.role,
      image: dancer.picture,
      facts: dancer.facts,
      style: dancer.fav_dance_style,
    }));

  const coPresidents = boardMem.filter(
    (member) => member.role === "Co-President",
  );

  const otherBoard = boardMem.filter(
    (member) => member.role !== "Co-President",
  );

  const generalMem = dancers
    .filter((dancer) => dancer.role === "member")
    .map((dancer: Dancer) => ({
      name: `${dancer.first_name} ${dancer.last_name}`,
      image: dancer.picture,
      facts: dancer.facts,
      style: dancer.fav_dance_style,
    }));

  const alumniMem = dancers
    .filter((dancer) => dancer.role === "alumni")
    .map((dancer) => ({
      name: `${dancer.first_name} ${dancer.last_name}`,
      image: dancer.picture,
      facts: dancer.facts,
      style: dancer.fav_dance_style,
    }));

  console.log(generalMem);
  return (
    <div className="flex flex-col">
      {/* About Us Section */}
      <section className="flex flex-col md:flex-row py-8 px-4 md:px-8">
        <motion.div
          className="md:w-1/2 p-10"
          initial={{ opacity: 1, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full max-w-xs mx-auto mb-6">
            <h1 className="text-5xl font-script text-center text-jujube border-b-2 border-jujube pb-2 mb-8">
              About Us
            </h1>
          </div>
          <p className="text-center leading-relaxed mb-6">
            We are the one & only Chinese dance team at UC Berkeley. Established
            in 2003 as a Registered Student Organization, FTD supports dancers
            of all backgrounds in developing their Chinese dance skill &
            technique, enhancing their comprehension of traditional Chinese
            culture, & in spreading greater awareness of Chinese classical &
            ethnic cultures to the bigger community. FTD incorporates classical,
            ethnic, & modern Chinese dances into its repertoire through creating
            original choreography & learning traditional works, performing on
            campus & throughout the Bay Area.
          </p>
        </motion.div>
        <div className="md:w-1/2 py-6 px-10 flex justify-center items-center">
          <div className="w-full h-80 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Image
                src={homcom}
                alt="homcom"
                placeholder="blur"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Board Section */}
      <section className="py-12 px-4 md:px-8 bg-jujube text-white">
        <div className="w-[85vw] m-auto relative border border-white p-6 pt-10 mt-8">
          <h2 className="text-5xl text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-jujube px-8">
            Board
          </h2>
          <div className="w-[70vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            {coPresidents.map((member, i) => (
              <div key={`copres-${i}`} className="w-full h-full">
                <DancerCard dancer={member} />
              </div>
            ))}
          </div>
          <div className="w-[70vw] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {otherBoard.map((member, i) => (
              <div key={`other-${i}`} className="w-full h-full">
                <DancerCard dancer={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dancers Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="w-[85vw] m-auto relative border border-jujube p-6 pt-10 mt-8">
          <h2 className="text-5xl text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8">
            Dancers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {generalMem.map((dancer, index) => (
              <DancerCard key={index} dancer={dancer} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="w-[85vw] m-auto relative border border-jujube p-6 pt-10 mt-8">
          <h2 className="text-5xl text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8">
            Alumni
          </h2>
          {alumniMem.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {alumniMem.map((dancer, index) => (
                <DancerCard key={index} dancer={dancer} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic mt-6">
              No alumni listed yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
