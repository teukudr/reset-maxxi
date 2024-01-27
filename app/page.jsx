import Navbar from "@/components/Navbar";
import Image from "next/image";
import HeroImage from "@/assets/images/hero-image.png";
import FormTicket from "@/components/FormTicket/Form";
import { FiSearch } from "react-icons/fi";
import { Categories, Favorite, Favorites } from "@/constants";
// import CardFavorite from "@/components/Card/CardFavorite";
import Logo from "@/assets/images/logo-tiketku.svg";
import Banner from "@/assets/images/banner.svg";

import Dubai from "@/assets/images/dubai.webp";
import Etihad from "@/assets/images/etihad.webp";
import Emirates from "@/assets/images/emirates.webp";
import Garuda from "@/assets/images/garuda.webp";
import RoyalJordan from "@/assets/images/royaljordan.webp";
import SuperAir from "@/assets/images/superairjet.webp";
import AirAsia from "@/assets/images/airasia.webp";
import BatikAir from "@/assets/images/batikair.webp";
import LionAir from "@/assets/images/Lion Air.png";
import Sriwijaya from "@/assets/images/sriwijaya.webp";
import Vietnam from "@/assets/images/vietnam.webp";
import Wings from "@/assets/images/wings.webp";
import Citylink from "@/assets/images/citylink.webp";

import Klm from "@/assets/images/klm.webp";
import Alaska from "@/assets/images/alaska.webp";
import Apg from "@/assets/images/apg.webp";
import Copa from "@/assets/images/copa.webp";
import Vistara from "@/assets/images/vistara.webp";
import Brunei from "@/assets/images/brunei.webp";



import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen md:max-w-full">
        <div className="relative z-10 flex items-center justify-center sm:h-1/2">
          <div className="flex md:w-full h-[150px]">
            <div className="hidden w-1/2 bg-[#B792D9] md:block"></div>
            <div className="hidden w-1/2 bg-[#E2D4F0] md:block"></div>
          </div>
          <div className="hidden absolute z-20 w-[80%] min-h-56 justify-end md:block ">
            <Image
              src={Banner}
              alt="hero-image"
              className="z-0 w-full h-full" />
          </div>
        </div>
        <div className="relative z-30 flex justify-center mb-10 sm:-mt-28">
          <FormTicket />
        </div>
        <div className="container flex flex-col w-full mx-auto min-h-fit">
          <h3 className="mx-2 mb-4 font-bold text-left md:px-64">Favorite Destinations</h3>

          <div className="pb-10 md:w-full">
            <div className="flex flex-wrap justify-center gap-4">
              {Categories.map((category) => (
                <div className="w-auto sm:w-auto md:w-auto flex items-center bg-[#E2D4F0] hover:bg-bnr-primary py-2 px-4 md:py-2 md:px-6 rounded-xl hover:text-white" key={category.id}>
                  <FiSearch className="mr-2 md:mr-3" />
                  <span className="">{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="pb-10 md:w-full">
            <div className="flex flex-wrap justify-center gap-4">
              {Favorites.map((favorite) => (
                <div className="w-auto sm:w-auto md:w-auto" key={favorite.id}>
                  <CardFavorite
                    from={favorite.from}
                    to={favorite.to}
                    airline={favorite.airline}
                    availableDate={favorite.availableDate}
                    price={favorite.price}
                  />
                </div>
              ))}
            </div>
          </div> */}

          <div className="w-full pb-10">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="mx-2 airline-partners">
                <div className="flex justify-center text-xl font-bold leading-7">
                  Airline Partners
                </div>
                <div className="flex justify-center mt-4 text-lg font-normal leading-5 text-center">
                  We collaborate with various airlines worldwide to fly you wherever you want to go!
                </div>

                <div className="flex justify-between gap-8 mt-8 airlines-1">
                  <div>
                    <Image
                      src={Dubai}
                      alt="Dubai Airline"
                      width={150}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Emirates}
                      alt="Emirates Airline"
                      width={150}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Etihad}
                      alt="Etihad Airline"
                      width={150}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={RoyalJordan}
                      alt="RoyalJordan Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Klm}
                      alt="KLM Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Brunei}
                      alt="Brunei Airline"
                      width={100}
                      height={40}
                    />
                  </div>


                </div>
                <div className="flex justify-between gap-10 mt-4 airlines-2">

                  <div>
                    <Image
                      src={Garuda}
                      alt="Garuda Indonesia Airline"
                      width={100}
                      height={30}
                    />
                  </div>

                  <div>
                    <Image
                      src={SuperAir}
                      alt="Super Air Jet Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={LionAir}
                      alt="Lion Air Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={BatikAir}
                      alt="Batik Air Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Copa}
                      alt="Copa Air Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Vistara}
                      alt="Vistara Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={AirAsia}
                      alt="Air Asia Airline"
                      width={100}
                      height={40}
                    />
                  </div>


                </div>
                <div className="flex justify-between mt-4 airlines-3">

                  <div>
                    <Image
                      src={Sriwijaya}
                      alt="Sriwijaya Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Apg}
                      alt="APG Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Citylink}
                      alt="Citylink Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Vietnam}
                      alt="Vietnam Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Alaska}
                      alt="Alaska Airline"
                      width={100}
                      height={40}
                    />
                  </div>

                  <div>
                    <Image
                      src={Wings}
                      alt="Wings Airline"
                      width={100}
                      height={40}
                    />
                  </div>



                </div>

              </div>


            </div>
          </div>


        </div>
        <Footer />

      </div>
    </>
  );
}
