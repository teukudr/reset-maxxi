"use client";
import React, { useState } from "react";
import Image from "next/image";

import LogoMaskapai from "@/assets/logo-maskapai.svg";
import IconDrop from "@/assets/icon-drop.svg";
import LongArrow from "@/assets/icon_long-arrow.svg";
import IconTime from "@/assets/icon-time.svg";

const TicketDetail = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="ticket-seacrh w-full pb-4 inline-block">
          <div className="main border-2 rounded-lg border-[#D0D0D0] shadow bg-white select-none hover:border-[#7126B5] mx-2">
            <div className="w-full md:[657px] h-[127px] mx-2">
              <div
                className="flex mx-4 my-2.5 justify-between cursor-pointer"
                onClick={toggleCollapse}
              >
                <div className="flex items-center">
                  <Image
                    className="items-center mr-2"
                    src={LogoMaskapai}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span className="font-medium text-xs leading-5 text-center">
                    Nama Maskapai
                  </span>
                  <span className="mx-1 text-center">-</span>
                  <span className="font-medium text-xs leading-5 text-center">
                    Class
                  </span>
                </div>

                <button type="button" onClick={toggleCollapse}>
                  <Image
                    className="items-center cursor-pointer"
                    src={IconDrop}
                    width={24}
                    height={24}
                    alt=""
                  />
                </button>
              </div>

              <div className="flex justify-between mx-4 my-auto">
                <div
                  className="w-11 my-auto cursor-pointer"
                  onClick={toggleCollapse}
                >
                  <div className="font-bold text-sm leading-5">07:00</div>
                  <div className="font-medium text-xs leading-5">JKT</div>
                </div>

                <div
                  className="w-60 text-center my-auto cursor-pointer"
                  onClick={toggleCollapse}
                >
                  <div className="font-medium text-xs leading-5 text-[#8A8A8A]">
                    4h 0m
                  </div>
                  <div>
                    <Image
                      className="items-center"
                      src={LongArrow}
                      width={232}
                      height={1}
                      alt=""
                    />
                  </div>
                  <div className="font-medium text-xs leading-5 text-[#8A8A8A]">
                    Direct
                  </div>
                </div>

                <div
                  className="w-11 my-auto cursor-pointer"
                  onClick={toggleCollapse}
                >
                  <div className="font-bold text-sm leading-5">11:00</div>
                  <div className="font-medium text-xs leading-5">MLB</div>
                </div>

                <div
                  className="w-5 my-auto cursor-pointer"
                  onClick={toggleCollapse}
                >
                  <Image
                    className="items-center"
                    src={IconTime}
                    width={18}
                    height={20}
                    alt=""
                  />
                </div>

                <div className="w-52 my-auto">
                  <div className="flex justify-end font-bold text-base leading-6 text-[#7126B5] pb-1.5">
                    IDR 4.950.000
                  </div>
                  <div className="flex justify-end">
                    <button className="w-[100px] h-[32px] bg-[#4B1979] hover:bg-[#5d2f86] rounded-xl text-white font-medium text-base leading-6">
                      Pilih
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {!isCollapsed && (
              <div className="ticket-detail mx-4 my-5">
                <div className="detail-headings pb-1 border-t-2">
                  <h1 className="font-bold text-sm leading-5 text-[#4B1979] mt-2">
                    Detail Penerbangan
                  </h1>
                </div>

                <div className="departure flex justify-between">
                  <div className="konten">
                    <div className="time font-bold text-base leading-6">
                      07:00
                    </div>
                    <div className="date font-normal text-sm leading-5">
                      3 Maret 2023
                    </div>
                    <div className="airport font-medium text-sm leading-5">
                      Soekarno Hatta - Terminal 1A Domestik
                    </div>
                  </div>
                  <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                    Keberangkatan
                  </div>
                </div>

                <div className="line w-[328px] border-b-2 border-b-[#D0D0D0] mx-auto mt-4"></div>

                <div className="detail-airline flex mt-2">
                  <div className="logo my-auto">
                    <Image
                      className="items-center mr-2"
                      src={LogoMaskapai}
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <div className="airline">
                      <div className="name font-bold text-sm leading-5">
                        Jet Air - Economy
                      </div>
                      <div className="type font-bold text-sm leading-5">
                        JT - 203
                      </div>
                    </div>

                    <div className="font-bold text-sm leading-5">Informasi</div>
                    <div className="baggage font-normal text-sm leading-5">
                      Baggage 20 kg
                    </div>
                    <div className="cabin font-normal text-sm leading-5">
                      Cabin baggage 7 kg
                    </div>
                    <div className="font-normal text-sm leading-5">
                      In Flight Entertainment
                    </div>
                  </div>
                </div>

                <div className="line w-[328px] border-b-2 border-b-[#D0D0D0] mx-auto mt-4"></div>

                <div className="arrival flex justify-between">
                  <div className="konten">
                    <div className="time font-bold text-base leading-6">
                      11:00
                    </div>
                    <div className="date font-normal text-sm leading-5">
                      3 Maret 2023
                    </div>
                    <div className="airport font-medium text-sm leading-5">
                      Melbourne International Airport
                    </div>
                  </div>
                  <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                    Kedatangan
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default TicketDetail;
