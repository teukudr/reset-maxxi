/* eslint-disable @next/next/no-img-element */
"use client";

import { FiX } from "react-icons/fi";
import TicketDetailCard from "../Ticket/TicketDetailCard";
import { useState } from "react";
import { useEffect } from "react";
import { getMoneyFormat, getFlightDuration } from "@/utils/helper";
import Image from "next/image";

import LogoMaskapai from "@/assets/logo-maskapai.svg";
import LongArrow from "@/assets/icon_long-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { useComponentContext } from "@/app/context/store";
import { useRouter } from "next/navigation";
import { addTotal } from "@/store/auth/slice";

async function getTicketId(...flights) {
  const ticketPromises = flights.map(async (flight) => {
    const res = await fetch(
      `https://example-backend.up.railway.app/api/v1/tickets/${flight.id}`
    );
    return res.json();
  });

  const ticketData = await Promise.all(ticketPromises);

  if (flights.length === 1 || !flights[1].id) {
    return [ticketData[0]];
  } else {
    return ticketData;
  }
}

const ModalTicket = ({ modal, closeModal, data, flightOne, flightTwo }) => {
  const [dataTes, setDataTes] = useState();
  const passengers = useSelector((state) => state.modal.modalInput);
  const index = passengers?.length - 1;
  const resultPassangers = passengers[index];
  const totalPassangers = resultPassangers?.total;

  const router = useRouter();
  const dispatch = useDispatch();
  const { showReturn } = useComponentContext();

  const fetchDataTicket = async () => {
    try {
      const data = await getTicketId(flightOne, flightTwo);
      setDataTes(data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchDataTicket();
  }, []);

  const handleChooseTicket = (money) => {
    dispatch(addTotal(money));
    const oneWay = [
      {
        id: flightOne.id,
      },
    ];

    const twoWays = [
      {
        id: flightOne.id,
      },
      {
        id: flightTwo.id,
      },
    ];
    if (!showReturn) {
      localStorage.setItem("booking", JSON.stringify(oneWay));
      router.push("/booking");
      return;
    }
    if (showReturn) {
      localStorage.setItem("booking", JSON.stringify(twoWays));
      router.push("/booking");
      return;
    }
  };

  return (
    <div className="relative z-50">
      <div
        className={`fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 transition-all ease-in-out duration-700 transform w-full ${modal ? "translate-x-0" : "md:hidden translate-y-full"
          }`}
      >
        <div className="w-full h-full px-4 py-4 transition-all duration-500 bg-black bg-opacity-50 rounded-lg"></div>
        <div
          className={`fixed md:h-screen md:w-1/2 ${modal ? "bottom-0" : "right-0"
            } right-0 w-full  p-8 transition-all duration-500 ease-out bg-white rounded-tl-3xl rounded-bl-3xl transform ${modal ? "translate-y-0" : "translate-x-full md:translate-y-full"
            }`}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-md cursor-pointer text-bnr-primary"
            onClick={closeModal}
          >
            <FiX className="text-3xl" />
          </div>
          <div>
            {dataTes?.map((detail, index) => (
              <div
                key={index}
                className="flex justify-center w-full pt-5 space-y-5"
              >
                <div className="w-full h-[127px] bg-white drop-shadow-md border border-bnr-secondary rounded-lg p-5 mx-auto space-y-2">
                  <div className="flex items-center">
                    <img
                      className="items-center mr-2"
                      src={detail?.data?.logo}
                      width={50}
                      height={50}
                      alt=""
                    />
                    <span className="text-xs font-medium leading-5 text-center">
                      {detail.data?.type_seat}
                    </span>
                    <span className="mx-1 text-center">-</span>
                    <span className="text-xs font-medium leading-5 text-center">
                      {detail?.data.airlines}
                    </span>
                  </div>

                  <div className="flex justify-between mx-4 my-auto">
                    <div className="my-auto w-11">
                      <div className="text-sm font-bold leading-5">
                        {detail.data?.dateTakeoff}
                      </div>
                      <div className="text-xs font-medium leading-5">
                        {detail.data?.city_from}
                      </div>
                    </div>

                    <div className="my-auto text-center w-60">
                      <div className="font-medium text-xs leading-5 text-[#8A8A8A]">
                        {getFlightDuration(detail.data?.dateTakeoff, detail.data?.dateLanding)}
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
                        {detail.data?.dateLanding}
                      </div>
                      <div className="text-xs font-medium leading-5">
                        {detail.data?.city_to}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {dataTes?.map((item, index) => {
            if (index === 0) {
              return (
                <div
                  key={index}
                  className="w-full inline-flex justify-between items-center mt-40"
                >
                  <div>
                    <h3 className="text-base font-medium">Total</h3>
                    <h3 className="text-2xl font-semibold text-bnr-primary">
                      IDR
                      {getMoneyFormat(
                        totalPassangers *
                        (dataTes.length > 1
                          ? item.data.price + item.data.price
                          : item.data.price)
                      )}
                    </h3>
                  </div>
                  <button
                    className="px-5 py-3 text-white rounded-lg bg-bnr-primary"
                    onClick={() =>
                      handleChooseTicket(
                        totalPassangers *
                        (dataTes.length > 1
                          ? item.data.price + item.data.price
                          : item.data.price)
                      )
                    }
                  >
                    Proceed to Booking
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalTicket;
