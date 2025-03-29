import Image from "next/image"; 
import logo from "../public/image/ftd_logo.png"

export const Footer = () => {
    return (
        <footer className="bg-lightpink opacity-85 text-black py-6">
            <div className="container mx-auto flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <h5 className="font-bold mb-2">Contact Us</h5>
                    <div className="flex space-x-4 mb-2">
                        <a href="#" className="hover:underline">Facebook</a>
                        <a href="#" className="hover:underline">Twitter</a>
                        <a href="#" className="hover:underline">Instagram</a>
                    </div>
                    <div className="text-sm">
                            &copy; {new Date().getFullYear()} FTD
                    </div>
                </div>
                <div className="absolute right-20 flex flex-col items-end">
                    <Image src={logo} height={100} alt="logo" />
                </div>
            </div>
        </footer>
    )
}
