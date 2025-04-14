import Image from "next/image";
import homcom from "@/public/image/homcom.png";
import { createClient } from "@/lib/supabase/server";

type Dancer = {
    first_name: string;
    last_name: string;
    picture: string;
    fav_dance_style: string;
    facts: string;
    role: string;
  };
  

export default async function About() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('dancers')
        .select('*')
        .order('last_name', { ascending: true })
        
    if (error) {
        console.error('Error fetching dancers:', error);
        return;
    }

    const boardMem = data
        .filter((dancer) => dancer.role !== 'member')
        .map((dancer: Dancer) => ({
            name: `${dancer.first_name} ${dancer.last_name}`,
            role: dancer.role,
            image: dancer.picture,
            facts: dancer.facts,
            style: dancer.fav_dance_style,
        }));

    const dancersList = data
        .filter((dancer) => dancer.role === 'member')
        .map((dancer: Dancer) => ({
            name: `${dancer.first_name} ${dancer.last_name}`,
            image: dancer.picture,
            facts: dancer.facts,
            style: dancer.fav_dance_style,
        }));
    
    // Placeholder dancers data - replace with actual data
    const dancers = Array(10).fill(null).map((_, i) => ({
        name: "Name",
        image: "/path/to/dancer-image.jpg"
    }));

    return(
        <div className="flex flex-col">
            {/* About Us Section */}
            <section className="flex flex-col md:flex-row py-8 px-4 md:px-8">
                <div className="md:w-1/2 p-10">
                    <div className="w-full max-w-xs mx-auto mb-6">
                        <h1 className="text-5xl font-script text-center text-jujube border-b-2 border-jujube pb-2 mb-8">
                            About Us
                        </h1>
                    </div>
                    <p className="text-center leading-relaxed mb-6">
                        We are the one & only Chinese dance team at UC Berkeley. 
                        Established in 2003 as a Registered Student Organization, FTD 
                        supports dancers of all backgrounds in developing their Chinese 
                        dance skill & technique, enhancing their comprehension of 
                        traditional Chinese culture, & in spreading greater awareness of 
                        Chinese classical & ethnic cultures to the bigger community. FTD 
                        incorporates classical, ethnic, & modern Chinese dances into its 
                        repertoire through creating original choreography & learning 
                        traditional works, performing on campus & throughout the Bay Area.
                    </p>
                </div>
                <div className="md:w-1/2 py-6 px-10 flex justify-center items-center">
                    <div className="w-full h-80 bg-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <Image 
                                src={homcom} 
                                alt="homcom" 
                                fill
                                className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Board Section */}
            <section className="py-12 px-4 md:px-8 bg-jujube text-white">
                <h2 className="text-5xl font-script text-center mb-6">Board</h2>
                <div className="w-[70vw] m-auto flex flex-wrap justify-evenly gap-8 md:gap-20">
                    {boardMem.map((board, index) => (
                        <div key={index} className="text-center mb-8">
                            <div className="relative w-[15vw] h-[15vw] mx-auto">
                                <Image 
                                    src={
                                        board.image ||
                                        `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(board.name)}`
                                    }
                                    alt={board.name}
                                    fill
                                    className="rounded-full aspect-square object-cover"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center mt-2 gap-2">
                                <h3 className="text-2xl mt-4">{board.name}</h3>
                                <p className="text-lg mb-0">{board.role}</p>
                                <p className="w-[80%] m-auto">Fav Chinese dance style: {board.style}</p>
                                <p className="w-[80%] m-auto">{board.facts}</p>
                            </div>
                      </div>
                    ))}
                </div>
            </section>

            {/* Dancers Section */}
            <section className="w-[90vw] m-auto py-12 px-4 md:px-8">
                <div className="relative border border-jujube p-6 pt-10 mt-8">
                    <h2 className="text-5xl text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8">Dancers</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {dancersList.map((dancer, index) => (
                            <div key={index} className="text-center mb-8">
                                <div className="relative w-[200px] h-[200px] mx-auto">
                                    <Image 
                                        src={
                                            dancer.image ||
                                            `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(dancer.name)}`
                                        }
                                        alt={dancer.name}
                                        fill
                                        className="rounded-full aspect-square object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl mt-4">{dancer.name}</h3>
                                <p className="w-[80%] m-auto text-sm">Fav Chinese dance style: {dancer.style}</p>
                                <p className="w-[80%] m-auto text-sm">{dancer.facts}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}