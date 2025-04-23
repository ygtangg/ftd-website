import styles from "./page.module.css";
import Image from "next/image";
import group_pic from "@/public/image/group_pic_fa24.jpg";
import Link from "next/link";

export default function Join() {
    return(
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={group_pic} 
                    alt="Fei Tian Dancers group"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center text-white flex flex-col items-center px-4">
                <h1 className="text-6xl md:text-8xl mb-10">JOIN US!</h1>
                <p className="text-xl mb-10">We hold auditions at the beginning of each semester. Each performance 
                    piece have seperate auditions. Stay tuned for more information!</p>
                <Link 
                    href="https://forms.gle/yourformlink" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <div className="bg-gray-300/80 text-black py-6 px-12 max-w-lg cursor-pointer hover:bg-gray-200/80 transition-colors">
                        <p className="text-3xl md:text-4xl mb-2">Interest Form</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}