"use client";
import styles from "./page.module.css";
import Image from "next/image";

export default function Events() {
    // Sample event data - replace with your actual events
    const events = [
        {
            name: "Event Name",
            description: "bla bla bla",
            date: "Date:",
            time: "Time:",
            location: "Location:",
            poster: "/path/to/poster.jpg"  // Replace with actual poster path
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Current/Featured Event Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                    {/* Event Details */}
                    <div className="md:w-1/2 flex flex-col items-center text-center">
                        <h1 className="text-5xl font-script mb-6">Event Name</h1>
                        <div className="space-y-1">
                            <p className="mb-4">bla bla bla</p>
                            <p>Date:</p>
                            <p>Time:</p>
                            <p>Location:</p>
                        </div>
                    </div>
                    
                    {/* Event Poster */}
                    <div className="md:w-1/2">
                        <div className="w-full aspect-square bg-gray-200 border-8 border-jujube relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                Poster
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                        
            {/* Coming Soon Section */}
            <section className="h-[30vw] py-24 px-4 md:px-8 lg:px-16 bg-jujube text-white flex items-center justify-center">
                <h2 className="text-5xl font-script text-center">Coming Soon</h2>
            </section>
        </div>
    );
}