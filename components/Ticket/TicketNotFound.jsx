import Image from "next/image";
import NotFound from "@/assets/empty_img.svg";

const TicketNotFound = () => {
  return (
    <div className="ticket-empty">
      <div className="flex justify-center pb-6">
        <Image
          className="items-center mt-8"
          src={NotFound}
          width={238}
          height={100}
          alt=""
        />
      </div>

      <h1 className="font-medium text-sm leading-5 text-center">
        Maaf, pencarian Anda tidak ditemukan
      </h1>
      <h1 className="font-medium text-sm leading-5 text-[#7126B5] text-center">
        Coba cari perjalanan lainnya!
      </h1>
    </div>
  );
};

export default TicketNotFound;
