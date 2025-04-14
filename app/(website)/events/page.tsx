import styles from "./page.module.css";
import Image from "next/image";

export default function Events() {
    const events = [
        {
            name: "Event Name",
            description: "bla bla bla",
            date: "Date:",
            time: "Time:",
            location: "Location:",
            poster: "/path/to/poster.jpg"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Current/Featured Event Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                    {/* Event Details */}
                    <div className="md:w-1/2 flex flex-col items-center text-center">
                        <h1 className="text-jujube text-5xl font-script mb-6">Spring 2025 Showcase</h1>
                        <div className="space-y-1">
                            <p className="italic text-lg mb-4">Join us to experience the elegance of classical, Han-Tang, Dai, 
                                and Dunhuang group pieces, alongside a vibrant array of solo, duet, 
                                and trio performances highlighting the rich diversity of Chinese dance styles! </p>
                            <p>May 11, 2025</p>
                            <p>1:00 - 3:00 PM</p>
                            <p>@ Hearst Gym 230</p>
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