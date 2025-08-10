import Image, { StaticImageData } from "next/image";
import showcase from "@/public/image/sp25_show_poster.jpeg";
import guzheng from "@/public/image/guzheng_poster.jpg";

type EventItem = {
  name: string;
  blurb?: string;       
  date: string;
  time: string;
  location: string;
  poster: StaticImageData;
};

function EventCard({ event, isEven }: { event: EventItem; isEven: boolean }) {
    const bgColor = isEven ? "bg-white" : "bg-jujube";          
    const titleColor = isEven ? "text-jujube" : "text-white";   
    const textColor = isEven ? "text-black" : "text-white";
    const textOrder = isEven ? "md:order-1" : "md:order-2";
    const posterOrder = isEven ? "md:order-2" : "md:order-1";

    return (
        <section className={`flex flex-col md:flex-row ${bgColor} ${textColor} py-12`}>
            {/* Details (column) */}
            <div className={`basis-full md:basis-1/2 ${textOrder} flex items-center justify-center p-4`}>
                <div className="w-full max-w-prose text-center">
                <h2 className={`${titleColor} text-4xl sm:text-5xl font-script mb-6`}>
                    {event.name}
                </h2>
                {event.blurb && (
                    <p className="italic text-base sm:text-lg mb-4">
                    {event.blurb}
                    </p>
                )}
                <div className="space-y-1 text-sm sm:text-base">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                    <p>@ {event.location}</p>
                </div>
                </div>
            </div>

            {/* Poster (column) */}
            <div className={`basis-full md:basis-1/2 ${posterOrder} flex justify-center items-center m-6 border-4 border-jujube`}>
                <Image
                src={event.poster}
                alt={`${event.name} poster`}
                width={600} 
                height={800}
                className="object-cover"
                // remove priority or set conditionally for the first card only
                />
            </div>
        </section>
    );
}

export default function Events() {
  const events: EventItem[] = [
    {
      name: "Spring 2025 Showcase",
      blurb:
        "Experience the elegance of classical, Han-Tang, Dai, and Dunhuang group pieces, \
        plus solos, duets, and trios highlighting the richness of Chinese dance.",
      date: "May 11, 2025",
      time: "1:00 – 3:00 PM",
      location: "Hearst Gym 230",
      poster: showcase,
    },
    {
      name: "Guzheng x Dance Collaboration",
      blurb:
        "Experience the timeless beauty of Chinese poetry, dance, and music in a captivating \
        collaboration of guzheng, strings, poetry recitation, and dance. From the bold spirit \
        of Li Bai to the graceful vision of Su Shi, centuries of artistry come alive on stage in \
        this unique cultural celebration.",
      date: "Aug 24, 2025",
      time: "2:00 – 4:00 PM",
      location: "San Francisco Conservatory of Music, Oak Street, CA",
      poster: guzheng,
    },
    // add more events by pushing objects here
  ];

  return (
  <div className="flex flex-col min-h-screen">
    {[...events].reverse().map((ev, index) => (
      <EventCard
        key={ev.name}
        event={ev}
        isEven={index % 2 === 0}
      />
    ))}
  </div>
);

}
