import Image from "next/image";
import Logo from "@/assets/images/logo-tiketku.svg";

import LogoBRI from "@/assets/Logo_BRI.svg";
import LogoMandiri from "@/assets/Logo_Mandiri.svg";
import LogoBCA from "@/assets/Logo_BCA.svg";
import LogoBNI from "@/assets/Logo_BNI.svg";

import Facebook from "@/assets/images/fb.svg";
import Instagram from "@/assets/images/instagram.svg";
import Twitter from "@/assets/images/twitter.svg";
import Tiktok from "@/assets/images/tiktok.svg";
import Youtube from "@/assets/images/youtube.svg";
import PlayStore from "@/assets/images/googleplay.svg";
import AppStore from "@/assets/images/appstore.svg";

const Footer = () => {

  return (

    <>
      <div className="footer bg-[#292332] md:h-[250px] w-full flex flex-col sm:flex-wrap justify-between gap-1 md:px-52 px-5">
        <div className="w-full sm:w-1/4">
          <Image
            src={Logo}
            className="mt-6 ml-4"
            alt="fromsvg"
            width={130}
            height={50}
          />
          <div className="ml-4 mt-8">
            <div className="text-white text-md font-bold leading-7">
              Payment Partners
            </div>
            <div className="flex justify-between1 gap-1 mt-2">
              <div className="bg-white w-[70px] h-[40px] flex items-center p-2 rounded-md">
                <Image
                  src={LogoBCA}
                  alt="fromsvg"
                  width={60}
                  height={40}
                />
              </div>

              <div className="bg-white w-[70px] h-[40px] flex items-center p-2 rounded-md">
                <Image
                  src={LogoBNI}
                  alt="fromsvg"
                  width={60}
                  height={40}
                />
              </div>

              <div className="bg-white w-[70px] h-[40px] flex items-center p-2 rounded-md">
                <Image
                  src={LogoBRI}
                  alt="fromsvg"
                  width={60}
                  height={40}
                />
              </div>

              <div className="bg-white w-[70px] h-[40px] flex items-center p-2 rounded-md">
                <Image
                  src={LogoMandiri}
                  alt="fromsvg"
                  width={60}
                  height={40}
                />
              </div>


            </div>
          </div>

        </div>

        <div className="w-full sm:w-1/4 mt-8 ml-4">
          <div className="text-white text-md font-bold leading-7">
            About TicketGo
          </div>

          <div>
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">About Us</a>
          </div>
          <div>
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Contact Us</a>
          </div>
          <div>
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Help Center</a>
          </div>
          <div>
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Privacy Policy</a>
          </div>
          <div>
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Terms and conditions</a></div>
        </div>

        <div className="w-full sm:w-1/4 mt-8 ml-4">
          <div className="text-white text-md font-bold leading-7">
            Follow Us on
          </div>
          <div className="flex">
            <Image
              src={Facebook}
              alt="fromsvg"
              className="mr-4"
            />
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Facebook</a>
          </div>

          <div className="flex">
            <Image
              src={Instagram}
              alt="fromsvg"
              className="mr-4"
            />
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Instagram</a>
          </div>

          <div className="flex">
            <Image
              src={Twitter}
              alt="fromsvg"
              className="mr-4"
            />
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Twitter</a>
          </div>

          <div className="flex">
            <Image
              src={Tiktok}
              alt="fromsvg"
              className="mr-4"
            />
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Tiktok</a>
          </div>

          <div className="flex">
            <Image
              src={Youtube}
              alt="fromsvg"
              className="mr-4"
            />
            <a href="#" className="text-[#69656f] tex-xs font-semibold leading-8 hover:text-white">Youtube</a>
          </div>
        </div>
      </div>
    </>

  );
};

export default Footer;
