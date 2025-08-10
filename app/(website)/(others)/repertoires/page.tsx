"use client";

import { useState } from "react";
import Image from "next/image";
import repertoires from "@/data/repertoires.json";

type RawRepertoire = {
  ["name-eng"]: string;
  ["name-chi"]: string;
  style?: string;
  blurb?: string;
  director?: string;
  semester?: string; // e.g., "Sp25"
  poster: string; // public path
};

type RepertoireItem = {
  nameEng: string;
  nameChi: string;
  style?: string;
  blurb?: string;
  director?: string;
  semester?: string;
  poster: string;
};

function formatSemester(code?: string) {
  if (!code) return undefined;
  const m = code.match(/(Fa|Sp|Su)(\d{2})/i);
  if (!m) return code;
  const termMap: Record<string, string> = {
    fa: "Fall",
    sp: "Spring",
    su: "Summer",
  };
  const term = termMap[m[1].toLowerCase()] ?? m[1];
  const year = 2000 + Number(m[2]);
  return `${term} ${year}`;
}

function RepertoireCard({
  item,
  isEven,
}: {
  item: RepertoireItem;
  isEven: boolean;
}) {
  const [open, setOpen] = useState(false);

  const bgColor = isEven ? "bg-white" : "bg-jujube";
  const titleColor = isEven ? "text-jujube" : "text-white";
  const textColor = isEven ? "text-black" : "text-white";
  const textOrder = isEven ? "md:order-1" : "md:order-2";
  const posterOrder = isEven ? "md:order-2" : "md:order-1";

  return (
    <section
      className={`relative overflow-hidden flex flex-col md:flex-row ${bgColor} ${textColor} py-12`}
    >
      {/* Left details (stays underneath the overlay) */}
      <div
        className={`basis-full md:basis-1/2 ${textOrder} flex items-center justify-center p-4`}
      >
        <div className="w-full max-w-prose text-center">
          <h2 className={`${titleColor} text-4xl sm:text-5xl font-script mb-2`}>
            {item.nameEng}
          </h2>
          <p className={`${isEven ? "text-jujube/80" : "text-white/80"} mb-4`}>
            {item.nameChi}
          </p>
          <div className="space-y-1 text-sm sm:text-base">
            {item.style?.trim() && <p>Style: {item.style}</p>}
            {item.director?.trim() && <p>Director: {item.director}</p>}
            {item.semester?.trim() && (
              <p>Semester: {formatSemester(item.semester)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right poster (visible baseline, also toggles overlay) */}
      <div
        className={`basis-full md:basis-1/2 ${posterOrder} flex justify-center items-center m-6 cursor-pointer`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        role="button"
        tabIndex={0}
        title="Click to read description"
      >
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Image
            src={item.poster}
            alt={`${item.nameEng} poster`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p className="text-xs mt-2 opacity-80">
              Click to read description →
            </p>
          </div>
        </div>
      </div>

      {/* SLIDE-OVER OVERLAY (fixed direction) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden={!open}
      >
        {/* Dim background */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            open ? "opacity-40" : "opacity-0"
          }`}
        />
        <div
          className="absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: open
              ? "translate3d(0,0,0)"
              : isEven
                ? "translate3d(100%,0,0)" // even cards: start off to the right
                : "translate3d(-100%,0,0)", // odd cards: start off to the left
          }}
        >
          <div
            className={`h-full w-full p-6 md:p-10 flex items-center justify-center text-center ${
              isEven ? "bg-white text-black" : "bg-jujube text-white"
            }`}
            style={{ pointerEvents: open ? "auto" : "none" }}
            onClick={() => setOpen(false)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setOpen(false)
            }
            role="button"
            tabIndex={open ? 0 : -1}
            title="Click to close"
          >
            <div className="max-w-prose">
              <h4 className="text-2xl font-semibold mb-4">{item.nameEng}</h4>
              <p className="text-sm sm:text-base leading-relaxed">
                {item.blurb?.trim() || "No description available."}
              </p>
              <p className="text-xs mt-4 opacity-70">
                Click anywhere to go back ←
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RepertoiresPage() {
  // Normalize hyphenated keys -> camelCase
  const normalized: RepertoireItem[] = (repertoires as RawRepertoire[]).map(
    (r) => ({
      nameEng: r["name-eng"],
      nameChi: r["name-chi"],
      style: r.style,
      blurb: r.blurb,
      director: r.director,
      semester: r.semester,
      poster: r.poster,
    }),
  );

  // Optional: newest first by semester (Fa > Su > Sp within same year)
  const ordered = normalized.slice().sort((a, b) => {
    const score = (s?: string) => {
      if (!s) return -Infinity;
      const m = s.match(/(Fa|Sp|Su)(\d{2})/i);
      if (!m) return -Infinity;
      const termRank =
        { fa: 3, su: 2, sp: 1 }[m[1].toLowerCase() as "fa" | "su" | "sp"] ?? 0;
      return 2000 + Number(m[2]) + termRank / 10;
    };
    return score(b.semester) - score(a.semester);
  });

  return (
    <div className="flex flex-col min-h-screen">
      {ordered.map((item, index) => (
        <RepertoireCard
          key={`${item.nameEng}-${item.semester ?? index}`}
          item={item}
          isEven={index % 2 === 0}
        />
      ))}
    </div>
  );
}
