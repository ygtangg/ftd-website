import Image from "next/image";
import events from "@/data/events.json";

type EventItem = {
  name: string;
  blurb?: string;
  date: string;
  time: string;
  location: string;
  poster: string; // now a public path string (e.g., "/image/xxx.jpg")
};

function EventCard({ event, isEven }: { event: EventItem; isEven: boolean }) {
  const bgColor = isEven ? "bg-white" : "bg-jujube";
  const titleColor = isEven ? "text-jujube" : "text-white";
  const textColor = isEven ? "text-black" : "text-white";
  const textOrder = isEven ? "md:order-1" : "md:order-2";
  const posterOrder = isEven ? "md:order-2" : "md:order-1";

  return (
    <section className={`flex flex-col md:flex-row ${bgColor} ${textColor} py-12`}>
      {/* Details */}
      <div className={`basis-full md:basis-1/2 ${textOrder} flex items-center justify-center p-4`}>
        <div className="w-full max-w-prose text-center">
          <h2 className={`${titleColor} text-4xl sm:text-5xl font-script mb-6`}>
            {event.name}
          </h2>
          {event.blurb && (
            <p className="italic text-base sm:text-lg mb-4">{event.blurb}</p>
          )}
          <div className="space-y-1 text-sm sm:text-base">
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>@ {event.location}</p>
          </div>
        </div>
      </div>

      {/* Poster */}
      <div className={`basis-full md:basis-1/2 ${posterOrder} flex justify-center items-center m-6 border-4 border-jujube relative`}>
        <Image
          src={event.poster}    // string path from /public
          alt={`${event.name} poster`}
          height={800}
          width={600}
          className="object-cover"
          priority={false}
        />
      </div>
    </section>
  );
}

export default function Events() {
  const data = events as EventItem[];
  return (
    <div className="flex flex-col min-h-screen">
      {[...data].reverse().map((ev, index) => (
        <EventCard key={ev.name} event={ev} isEven={index % 2 === 0} />
      ))}
    </div>
  );
}