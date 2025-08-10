"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import events from "@/data/events.json";

type EventItem = {
  name: string;
  blurb?: string;
  date: string;
  time: string;
  location: string;
  poster: string; // public path (e.g., "/image/xxx.jpg")
};

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -1000 : 1000, opacity: 0 }),
};

function Slide({ event, isEven }: { event: EventItem; isEven: boolean }) {
  const bg = isEven ? "bg-white text-black" : "bg-jujube text-white";
  const titleColor = isEven ? "text-jujube" : "text-white";

  return (
    <section className={`w-screen h-screen ${bg} flex`}>
      <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Details */}
        <div className="basis-full md:basis-1/2 flex items-center justify-center order-2 md:order-1">
          <div className="w-full max-w-prose text-center">
            <h2
              className={`${titleColor} text-4xl sm:text-5xl font-script mb-6`}
            >
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
        <div className="basis-full md:basis-1/2 flex items-center justify-center order-1 md:order-2">
          <div className="m-6 border-4 border-jujube rounded-lg overflow-hidden">
            <Image
              src={event.poster}
              alt={`${event.name} poster`}
              width={600}
              height={800}
              className="object-contain h-auto w-auto"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EventsDeck() {
  const data = (events as EventItem[]).slice().reverse(); // newest first
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, +1 right

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + data.length) % data.length);
    },
    [data.length],
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") go(1);
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Basic touch swipe (mobile)
  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [go]);

  const event = data[index];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={event.name}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 0.45 }}
          aria-live="polite"
        >
          <Slide event={event} isEven={index % 2 === 0} />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-black/40 text-white hover:bg-black/60 backdrop-blur"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-black/40 text-white hover:bg-black/60 backdrop-blur"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const dir = i > index ? 1 : -1;
              setDirection(dir);
              setIndex(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
