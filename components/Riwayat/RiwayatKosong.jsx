import Image from "next/image";
import Kosong from "@/assets/riwayat-kosong.svg";


const RiwayatKosong = () => {
  return (
    <>
      <div className="mx-auto mt-16 riwayat-kosong">

        <Image
          className="mx-auto"
          src={Kosong}
          width={204}
          height={208}
          alt=""
        />


        <div className="mx-auto mt-5 text-center content">
          <div className="font-medium text-sm leading-5 text-[#7126B5]">Oops! No order history found!</div>
          <div className="text-sm font-medium leading-5">You haven't made any flight bookings yet</div>
          <div className="mt-9">
            <button className="font-medium text-base leading-6 text-white w-[347px] h-[48px] bg-[#7126B5] rounded-xl">Search for Flights</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default RiwayatKosong;
