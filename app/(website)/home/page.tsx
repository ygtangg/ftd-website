"use client";
import Image from "next/image"; 
import zellerbach from "@/public/image/zellerbach_fa23.png";
import { useState, useEffect } from "react";
import YouTubeVideo from "@/components/YouTubeVideo";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";

// Define the Event type
type Event = {
  id: string;
  event_name: string;
  event_datetime: string;
  event_location: string;
};

export default function Home() {
    // Define video IDs from the YouTube URLs
    const videoIds = [
        "E_ODj4TrG9g",
        "2etgnaNvOT8",
        "xf1SdvA-6V0"
    ];

    // State to track if client-side is rendering (for YouTube component)
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
            console.log('Fetched events:', data);
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
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="mb-6 flex">
                                <div className="flex-1">
                                    <h3 className="font-medium text-xl">{event.event_name}</h3>
                                    <p className="text-gray-600">{event.event_location}</p>
                                </div>
                                <div className="flex-1">
                                    <p>{format(new Date(event.event_datetime), 'MMMM d, yyyy')}</p>
                                    <p>{format(new Date(event.event_datetime), 'h:mm a')}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No upcoming performances scheduled.</p>
                    )}
                </div>
            </section>

            {/* Past Performances Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                <h2 className="text-5xl font-script mb-8">Past Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {isClient && videoIds.map((videoId, index) => (
                        <div key={index} className="aspect-video bg-gray-200 relative overflow-hidden">
                            <YouTubeVideo videoId={videoId} />
                            <p className="text-center mt-2 relative z-10">Date</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}