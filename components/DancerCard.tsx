"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Dancer = {
    name: string;
    image: string;
    facts: string;
    style: string;
    role?: string;
}

type DancerCardProps = {
    dancer: Dancer;
};

export default function DancerCard({ dancer }: DancerCardProps) {
    return (
        <div className="text-center mb-8">
            <motion.div 
                className="relative w-[15vw] h-[15vw] mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <Image 
                    src={
                        dancer.image ||
                        `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(dancer.name)}`
                    }
                    alt={dancer.name}
                    fill
                    className="rounded-full aspect-square object-cover"
                />
            </motion.div>
            {dancer.role? (
                <div className="flex flex-col items-center justify-center mt-2 gap-2">
                    <h3 className="text-2xl mt-4">{dancer.name}</h3>
                    <p className="text-lg mb-0">{dancer.role}</p>
                    <p className="w-[80%] m-auto">Fav Chinese dance style: {dancer.style}</p>
                    <p className="w-[80%] m-auto">{dancer.facts}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-2 gap-2">
                    <h3 className="text-2xl mt-4">{dancer.name}</h3>
                    <p className="w-[80%] m-auto text-sm">Fav Chinese dance style: {dancer.style}</p>
                    <p className="w-[80%] m-auto text-sm">{dancer.facts}</p>
                </div>
            )}
        </div>
    )
}