import styles from "./page.module.css";
import Image from "next/image"; 
import zellerbach from "../../public/image/zellerbach_23.png"

export default function Home() {
    return(
        <div className="p-4 sm:p-6 md:flex flex-col md:justify-between md:items-center">
            <div className="relative h-screen">
                <Image src={zellerbach} 
                       objectFit="cover" 
                       alt="zellerbach_fa23" />
            </div>
            <h1>Home</h1>
        </div>
    )
}