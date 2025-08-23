import Image from "next/image";
import logo from "../public/image/ftd_logo.png";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-lightpink opacity-85 text-black py-6 mb-0">
      <div className="container mx-auto flex flex-col justify-center sm:justify-between items-center">
        <div className="flex flex-col items-center sm:items-center sm:w-1/2">
          <h5 className="font-bold mb-2">Contact Us</h5>
          <div className="flex space-x-4 mb-2">
            <a
              href="https://www.facebook.com/FeiTianDancers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/fei_tian_dancers/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/user/FeiTianUCB"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              YouTube
            </a>
          </div>
          <div className="text-sm text-center">Fei Tian Dancers is a student group acting independently of the University of California. 
            We take full responsibility for our organization and this web site. &copy; {new Date().getFullYear()} FTD</div>
        </div>
        <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end items-center gap-4 w-full sm:w-auto">
          <Image src={logo} height={100} alt="logo" />
          <Link href="https://www.ocf.berkeley.edu">
                <Image 
                    src="http://www.ocf.berkeley.edu/hosting-logos/ocf-hosted-penguin.svg"
                    alt="Hosted by the OCF"
                    width={100}
                    height={400} />
            </Link>
        </div>
      </div>
    </footer>
  );
};
