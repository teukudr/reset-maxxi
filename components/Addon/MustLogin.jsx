import React, { useEffect } from "react";
import Image from "next/image";
import CloseCircle from "@/assets/x-circle.svg";




const MustLogin = ({ token, onClose }) => {

  return (
    <div className="relative">
      <div className={`fixed inset-0 flex justify-center h-screen mx-auto z-50 overflow-hidden pt-28 backdrop-blur ${token ? "translate-x-0" : "md:hidden translate-y-full"}`}>
        <div className="flex justify-center items-center w-[936px] h-[50px] mx-2 rounded-lg bg-[#FF0000]">
          <div className="flex items-center justify-center w-full text-lg font-medium text-white leading 7">
            You must log in first!
          </div>
          <div className="flex items-end mr-2">
            <button onClick={onClose}>
              <Image
                src={CloseCircle}
                width={36}
                height={36}
                alt=""
              />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MustLogin;
