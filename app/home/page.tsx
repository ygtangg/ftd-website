"use client";
import styles from "./page.module.css";
import Image from "next/image"; 
import zellerbach from "../../public/image/zellerbach_fa23.png";
import YouTube from "react-youtube";
import { useState, useEffect } from "react";

export default function Home() {
    // Define video IDs from the YouTube URLs
    const videoIds = [
        "E_ODj4TrG9g",
        "lvBJbfhcTiI",
        "2etgnaNvOT8"
    ];

    // Options for YouTube player
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
        },
    };

    // State to track if client-side is rendering (for YouTube component)
    const [isClient, setIsClient] = useState(false);
    
    // Set isClient to true when component mounts
    useEffect(() => {
        setIsClient(true);
    }, []);

    return(
        <div className="flex flex-col min-h-screen">
            {/* Hero Section with Zellerbach image, club name and description */}
            <div className="relative w-full h-[80vh]">
                <Image 
                    src={zellerbach} 
                    alt="Fei Tian Dancers performance"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/60 via-black/60 to-purple-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white text-center px-4 md:px-8">
                    <h1 className="text-7xl md:text-20xl mb-6">Fei Tian Dancers</h1>
                    <p className="max-w-3xl text-sm md:text-xl leading-relaxed">
                        Fei Tian Dancers (FTD) is a community of University of California, Berkeley students passionate about dance
                        and dedicated to presenting Chinese culture to the Bay Area.
                    </p>
                </div>
            </div>

            {/* Upcoming Performances Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <h2 className="text-5xl mb-8">Upcoming Performance</h2>
                <div className="border-l border-gray-300 pl-6 ml-4">
                    <div className="mb-6 flex">
                        <div className="flex-1">
                            <h3 className="font-medium text-xl">Performance 1</h3>
                        </div>
                        <div className="flex-1">
                            <p>Date</p>
                        </div>
                    </div>
                    <div className="mb-6 flex">
                        <div className="flex-1">
                            <h3 className="font-medium text-xl">Performance 2</h3>
                        </div>
                        <div className="flex-1">
                            <p>Date</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Past Performances Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                <h2 className="text-5xl font-script mb-8">Past Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {isClient && videoIds.map((videoId, index) => (
                        <div key={index} className="aspect-video bg-gray-200 relative overflow-hidden">
                            <YouTube 
                                videoId={videoId} 
                                opts={opts} 
                                className="absolute inset-0"
                            />
                            <p className="text-center mt-2 relative z-10">Date</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}