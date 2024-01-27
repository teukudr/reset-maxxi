import Image from "next/image";
import NotifBell from "@/assets/notif-bell.svg";
import EllipseSucces from "@/assets/ellipse_succes.svg";



const Notifikasi = () => {
  return (
    <>
      <div className="notifikasi mt-12 mx-2">

        <div className="notif-card flex sm:w-[800px] border-b-2 pb-2 cursor-pointer">
          <div className="notif-bell mr-5">
            <Image
                className=""
                src={NotifBell}
                width={24}
                height={24}
                alt=""
              />
          </div>

          <div className="message w-full">
            <div className="ket-message flex justify-between mb-2">
              <div className="info font-normal text-sm leading-3 text-[#8A8A8A]">Promosi</div>
              
              <div className="flex">
                <div className="tanggal font-normal text-sm leading-3 text-[#8A8A8A]">20 Maret, 14:04</div>
                <span className="status"> 
                <Image
                  className="ml-2"
                  src={EllipseSucces}
                  width={8}
                  height={8}
                  alt=""
                />
              </span>
              </div>

            </div>


            <div className="head-message font-normal text-base leading-5 mb-2">Dapatkan Potongan 50% Tiket!</div>
            <div className="add-message font-normal text-sm leading-3 text-[#8A8A8A] mb-px">Syarat dan Ketentuan berlaku!</div>
            
          </div>

          

        </div>
            

      </div>
    </>
  );
};

export default Notifikasi;
