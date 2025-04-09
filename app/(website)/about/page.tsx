"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";

export default function About() {
    // Placeholder board members data - replace with actual data
    const boardMembers = [
        { name: "Name", role: "Co-President", image: "/path/to/image1.jpg" },
        { name: "Name", role: "Co-President", image: "/path/to/image2.jpg" },
        { name: "Name", role: "Artistic Director", image: "/path/to/image3.jpg" },
    ];
    
    // Placeholder dancers data - replace with actual data
    const dancers = Array(10).fill(null).map((_, i) => ({
        name: "Name",
        image: "/path/to/dancer-image.jpg"
    }));

    return(
        <div className="flex flex-col">
            {/* About Us Section */}
            <section className="flex flex-col md:flex-row py-8 px-4 md:px-8">
                <div className="md:w-1/2 p-4">
                    <div className="w-full max-w-xs mx-auto mb-6">
                        <h1 className="text-4xl font-script text-center text-jujube border-b-2 border-jujube pb-2 mb-8">
                            About Us
                        </h1>
                    </div>
                    <p className="text-center leading-relaxed mb-6">
                        We are the one & only Chinese dance team at UC Berkeley. 
                        Established in 2003 as a Registered Student Organization, FTD 
                        supports dancers of all backgrounds in developing their Chinese 
                        dance skill & technique, enhancing their comprehension of 
                        traditional Chinese culture, & in spreading greater awareness of 
                        Chinese classical & ethnic cultures to the bigger community. FTD 
                        incorporates classical, ethnic, & modern Chinese dances into its 
                        repertoire through creating original choreography & learning 
                        traditional works, performing on campus & throughout the Bay Area.
                    </p>
                </div>
                <div className="md:w-1/2 p-4 flex justify-center items-center">
                    <div className="w-full h-80 bg-gray-200 relative">
                        {/* Replace with actual image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Placeholder Image
                        </div>
                    </div>
                </div>
            </section>

            {/* Board Section */}
            <section className="py-12 px-4 md:px-8 bg-jujube text-white">
                <h2 className="text-4xl font-script text-center mb-12">Board</h2>
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {boardMembers.map((member, index) => (
                        <div key={index} className="text-center mb-8">
                            <div className="w-[20vw] h-48 bg-gray-200 mx-auto mb-4"></div>
                            <h3 className="text-xl mb-1">{member.name}</h3>
                            <p className="text-sm">--{member.role}--</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dancers Section */}
            <section className="py-12 px-4 md:px-8">
                <div className="relative border border-jujube p-6 pt-8 mt-8">
                    <h2 className="text-4xl font-script text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8">Dancers</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {dancers.map((dancer, index) => (
                            <div key={index} className="text-center mb-8">
                                <div className="aspect-square bg-gray-200 mb-2"></div>
                                <p>{dancer.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Optional Footer Background */}
            <div className="bg-lightpink h-8"></div>
        </div>
    )
}