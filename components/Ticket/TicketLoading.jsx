import Image from "next/image";
import Loading from "@/assets/Loading.svg";

const TicketLoading = () => {
  return (
    <div className="ticket-loading justify-center w-full">
      <h1 className="font-medium text-sm leading-5 text-[#8A8A8A] text-center">
        Mencari penerbangan terbaik...
      </h1>
      <div className="flex justify-center items-center">
        <Image className="mt-8" src={Loading} width={238} height={100} alt="" />
      </div>
    </div>
  );
};

export default TicketLoading;
