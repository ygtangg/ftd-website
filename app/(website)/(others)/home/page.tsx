"use client";

import Image from "next/image"; 
import zellerbach from "@/public/image/zellerbach_fa23.png";
import { useState, useEffect } from "react";
import YouTubeVideo from "@/components/YouTubeVideo";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

type Event = {
  id: string;
  event_name: string;
  event_datetime: string;
  event_location: string;
};

export default function Home() {
    const videoIds = [
        "E_ODj4TrG9g",
        "2etgnaNvOT8",
        "xf1SdvA-6V0"
    ];

    const [isClient, setIsClient] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Fetch events from Supabase
    useEffect(() => {
        const fetchEvents = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('event')
                .select('id, event_name, event_datetime, event_location')
                .gt('event_datetime', new Date().toISOString())
                .order('event_datetime', { ascending: true })
                .limit(3);
                
            if (error) {
                console.error('Error fetching events:', error);
                return;
            }
            
            setEvents(data || []);
        };

        fetchEvents();
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
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/60 via-black/60 to-red-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white text-center px-4 md:px-8">
                    <motion.h1 
                        className="text-7xl md:text-20xl mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        Fei Tian Dancers
                    </motion.h1>
                    <motion.p 
                        className="max-w-3xl text-sm md:text-xl leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    >
                        Fei Tian Dancers (FTD) is a community of University of California, Berkeley students passionate about dance
                        and dedicated to presenting Chinese culture to the Bay Area.
                    </motion.p>
                </div>
            </div>

            {/* Upcoming Performances Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <motion.h2 
                    className="text-5xl mb-8 text-jujube"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    Upcoming Performance
                </motion.h2>
                <div className="border-l border-gray-300 pl-6 ml-4">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <motion.div 
                                key={event.id} 
                                className="mb-6 flex"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-3xl">{event.event_name}</h3>
                                    <p className="text-xl text-gray-600">{event.event_location}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-2xl">{new Date(event.event_datetime).toLocaleDateString()}</p>
                                    <p className="text-xl">{new Date(event.event_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.p 
                            className="text-gray-500"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            No upcoming performances scheduled.
                        </motion.p>
                    )}
                </div>
            </section>

            {/* Past Performances Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                <h2 className="text-5xl font-script mb-8 text-jujube">Past Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {isClient && videoIds.map((videoId, index) => (
                        <div key={index} className="aspect-video bg-gray-200 relative overflow-hidden">
                            <YouTubeVideo videoId={videoId} />
                            <p className="text-center mt-2 relative z-10">Date</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* New parallax image section */}
            <motion.div 
                className="h-[40vh] relative bg-fixed bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${zellerbach.src})` }}
                initial={{ opacity: 0.8 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <motion.h3 
                        className="italic text-white text-4xl md:text-6xl px-4 text-center"
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        Join us for our next performance
                    </motion.h3>
                </div>
            </motion.div>
        </div>
    )
}