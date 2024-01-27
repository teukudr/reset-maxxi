/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";

import LogoMaskapai from "@/assets/logo-maskapai.svg";
import IconDrop from "@/assets/icon-drop.svg";
import LongArrow from "@/assets/icon_long-arrow.svg";
import IconTime from "@/assets/icon-time.svg";
import { useState } from "react";
import {
  getCode,
  getMoneyFormat,
  getFlightDuration,
  getDateFormat,
} from "@/utils/helper";
import Link from "next/link";
import { useEffect } from "react";

const TicketCard = ({ data, handleChoose }) => {
  const [isCollapsed, setIsCollapsed] = useState([]);

  useEffect(() => {
    setIsCollapsed(Array(data?.data?.length).fill(true));
  }, [data]);

  const toggleCollapse = (index) => {
    setIsCollapsed((prev) => {
      const updateState = [...prev];
      updateState[index] = !updateState[index];
      return updateState;
    });
  };

  const renderFlightData = (data) => {
    return data?.map((item, index) => (
      <div key={item.id} className="mx-2 ticket-card md:w-full ticket-search">
        <div className="pb-4 ">
          <div className="main border-[1px] rounded-lg border-[#D0D0D0] shadow bg-white select-none">
            <div className="md:w-full h-[127px] border-b-[#D0D0D0] mx-auto">
              <div
                className="flex mx-4 my-2.5 justify-between cursor-pointer"
                onClick={() => toggleCollapse(item.id)}
              >
                <div className="flex items-center">
                  <img
                    className="items-center mr-2"
                    src={item.logo}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <span className="text-xs font-medium leading-5 text-center">
                    {item.airlines}
                  </span>
                  <span className="mx-1 text-center">-</span>
                  <span className="text-xs font-medium leading-5 text-center">
                    {item.type_seat}
                  </span>
                </div>

                <button type="button" onClick={() => toggleCollapse(index)}>
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
                <div className="my-auto w-11">
                  <div className="text-sm font-bold leading-5">
                    {item.dateTakeoff}
                  </div>
                  <div className="text-xs font-medium leading-5">
                    {getCode(item.city_from)}
                  </div>
                </div>

                <div className="my-auto text-center w-60">
                  <div className="font-medium text-xs leading-5 text-[#8A8A8A]">
                    {getFlightDuration(item.dateTakeoff, item.dateLanding)}
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

                <div className="my-auto w-11">
                  <div className="text-sm font-bold leading-5">
                    {item.dateLanding}
                  </div>
                  <div className="text-xs font-medium leading-5">
                    {getCode(item.city_to)}
                  </div>
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

                <div className="w-48 my-auto">
                  <div className="flex justify-end font-bold text-base leading-6 text-[#7126B5] pb-1.5">
                    IDR {getMoneyFormat(item.price)}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="w-[100px] h-[32px] bg-[#4B1979] hover:bg-[#5d2f86] rounded-xl text-white font-medium text-base leading-6"
                      onClick={() =>
                        handleChoose(item.id, item.city_from, item.city_to, item.dateDeparture, item.dateReturn)
                      }
                    >
                      Choose
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {isCollapsed[item.id] ? (
              <div className="mx-4 my-5 ticket-detail">
                <div className="pb-1 detail-headings">
                  <h1 className="font-bold text-sm leading-5 text-[#4B1979]">
                    Flight Details
                  </h1>
                </div>

                <div className="flex justify-between departure">
                  <div className="konten">
                    <div className="text-base font-bold leading-6 time">
                      {item.dateTakeoff}
                    </div>
                    <div className="text-sm font-normal leading-5 date">
                      {getDateFormat(item.dateDeparture)}
                    </div>
                    <div className="text-sm font-medium leading-5 airport">
                      {item.airport_from}
                    </div>
                  </div>
                  <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                    Departure
                  </div>
                </div>

                <div className="line w-[328px] border-b-2 border-b-[#D0D0D0] mx-auto mt-4"></div>

                <div className="flex mt-2 detail-airline">
                  <div className="my-auto logo">
                    <img
                      className="items-center mr-2"
                      src={item.logo}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <div className="airline">
                      <div className="text-sm font-bold leading-5 name">
                        {item.airlines} - {item.type_seat}
                      </div>
                      <div className="text-sm font-bold leading-5 type">
                        {item.code}
                      </div>
                    </div>

                    <div className="text-sm font-bold leading-5">Information</div>
                    <div className="text-sm font-normal leading-5 baggage">
                      Baggage 20 kg
                    </div>
                    <div className="text-sm font-normal leading-5 cabin">
                      Cabin baggage 7 kg
                    </div>
                    <div className="text-sm font-normal leading-5">
                      In Flight Entertainment
                    </div>
                  </div>
                </div>

                <div className="line w-[328px] border-b-2 border-b-[#D0D0D0] mx-auto mt-4"></div>

                <div className="flex justify-between arrival">
                  <div className="konten">
                    <div className="text-base font-bold leading-6 time">
                      {item.dateLanding}
                    </div>
                    <div className="text-sm font-normal leading-5 date">
                      {getDateFormat(item.dateReturn)}
                    </div>
                    <div className="text-sm font-medium leading-5 airport">
                      {item.airport_to}
                    </div>
                  </div>
                  <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                    Arrival
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ));
  };

  return <>{data && renderFlightData(data.data)}</>;
};

export default TicketCard;
