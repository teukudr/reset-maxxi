import React from "react";
import Image from "next/image";

import TiketHabis from "@/assets/ticket-habis.svg";

const TicketHabis = () => {
  return (
    <>
      <div className="ticket-habis justify-center w-full">
        <div className="flex justify-center items-center">
          <Image
            className="mt-24"
            src={TiketHabis}
            width={238}
            height={154}
            alt=""
          />
        </div>

        <h1 className="font-medium text-sm leading-5 text-center">
          Maaf, Tiket terjual habis!
        </h1>
        <h1 className="font-medium text-sm leading-5 text-[#7126B5] text-center">
          Coba cari perjalanan lainnya!
        </h1>
      </div>
    </>
  );
};

export default TicketHabis;
