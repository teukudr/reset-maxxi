/* eslint-disable @next/next/no-img-element */
"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Maskapai from "@/assets/logo-maskapai.svg";
import Image from "next/image";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import PaymentOption from "@/assets/payment-options.svg";
import LogoBRI from "@/assets/Logo_BRI.svg";
import LogoMandiri from "@/assets/Logo_Mandiri.svg";
import LogoBCA from "@/assets/Logo_BCA.svg";
import LogoBNI from "@/assets/Logo_BNI.svg";
import {
  getBookingId,
  getToken,
  getMoneyFormat,
  getDateFormat,
} from "@/utils/helper";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import BreadCrumb from "./common/BreadCrumb";
import SuccessSection from "@/components/Section/Success/Success";

async function postPaymentTicket(token, data) {
  const res = await fetch(`https://example-backend.up.railway.app/api/v1/payment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function getTicketId(bookingId) {
  const ticketPromises = bookingId.map(async (flight) => {
    console.log("get id", flight.id);
    const res = await fetch(
      `https://example-backend.up.railway.app/api/v1/tickets/${flight.id}`
    );
    return res.json();
  });

  const ticketData = await Promise.all(ticketPromises);

  if (bookingId.length === 1 || !bookingId[1].id) {
    return [ticketData[0]];
  } else {
    return ticketData;
  }
}

const PaymentPage = () => {
  const token = getToken();
  const bookingId = getBookingId();
  const [success, setSuccess] = useState(false)
  const [value, setValue] = useState({});
  const [data, setData] = useState();

  const router = useRouter();

  const totalPrice = useSelector((state) => state.modal.totalPrice);
  const passengers = useSelector((state) => state.modal.modalInput);

  const index = passengers?.length - 1;
  const resultPassangers = passengers[index].total;

  const fetchTicketDetail = async () => {
    const data = await getTicketId(bookingId);
    setData(data);
  };

  useEffect(() => {
    fetchTicketDetail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(token);

  console.log("dataaa", data);

  const dataPayment = {
    cardNumber: value.cardNumber,
    cardHolderName: value.cardHolder,
    cvc: value.cvc,
    expiration: value.expiration,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postPaymentTicket(token, dataPayment);
      console.log("ressponse", response);
      if (response.status === "Success") {
        // router.push("/payment/success");
        setSuccess(true)
      } else {
        console.log("Payment Failed");
      }
    } catch (error) {
      console.log("An error occurred during payment:", error);
    }
  };
  return (
    <>
      {success ? <SuccessSection /> : (
        <div className="h-full max-w-full">
          <Navbar />
          <section>
            <div className="flex items-center w-full h-32 px-5 bg-white shadow-md md:px-72">
              <BreadCrumb />
            </div>
          </section>
          <main className="flex flex-col w-full gap-5 px-5 py-3 mt-8 md:flex-row md:px-80">
            <section className="max-w-full space-y-10 md:w-1/2">
              <div className="w-full px-2 rounded-md">
                <h1 className="py-2 text-xl font-bold">Provide Payment Details</h1>
                <div className="w-full pt-2">
                  <div className="w-full p-2 mx-auto bg-white rounded-2xl">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#3C3C3C] px-4 py-2 text-left text-sm font-medium text-white focus:bg-[#7126B5] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Gopay</span>
                            <ChevronUpIcon
                              className={`${open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-white`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                            <div className="mt-2">
                              <label
                                className="text-xm leading-6 font-medium text-[#151515]"
                                htmlFor=""
                              >
                                Enter your Gopay number
                              </label>
                              <input
                                type="text"
                                placeholder="+62 "
                                className="w-full py-2 border-b-2 outline-none border-b-bnr-secondary"
                              // name="cardHolder"
                              // onChange={handleChange}
                              />
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure as="div" className="mt-2">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#3C3C3C] px-4 py-2 text-left text-sm font-medium text-white focus:bg-[#7126B5] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Virtual Account</span>
                            <ChevronUpIcon
                              className={`${open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-white`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <div className="mt-2">
                              <div className="flex mb-4">
                                <input
                                  type="radio"
                                  // name="cardHolder"
                                  value="BRI"
                                // onChange={handleChange}
                                />
                                <label for="BRI">
                                  <Image
                                    className="ml-4"
                                    src={LogoBRI}
                                    width={127}
                                    height={30}
                                    alt=""
                                  />
                                </label>
                              </div>

                              <div className="flex mb-4">
                                <input
                                  type="radio"
                                  // name="cardHolder"
                                  value="Mandiri"
                                // onChange={handleChange}
                                />
                                <label for="BRI">
                                  <Image
                                    className="ml-4"
                                    src={LogoMandiri}
                                    width={127}
                                    height={30}
                                    alt=""
                                  />
                                </label>
                              </div>

                              <div className="flex mb-4">
                                <input
                                  type="radio"
                                  // name="cardHolder"
                                  value="BRI"
                                // onChange={handleChange}
                                />
                                <label for="BCA">
                                  <Image
                                    className="ml-4"
                                    src={LogoBCA}
                                    width={127}
                                    height={30}
                                    alt=""
                                  />
                                </label>
                              </div>

                              <div className="flex mb-4">
                                <input
                                  type="radio"
                                  // name="cardHolder"
                                  value="BRI"
                                // onChange={handleChange}
                                />
                                <label for="BNI">
                                  <Image
                                    className="ml-4"
                                    src={LogoBNI}
                                    width={127}
                                    height={20}
                                    alt=""
                                  />
                                </label>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <form onSubmit={handleSubmit}>
                      <Disclosure as="div" className="mt-2">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#3C3C3C] px-4 py-2 text-left text-sm font-medium text-white focus:bg-[#7126B5] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <span>Credit Card</span>
                              <ChevronUpIcon
                                className={`${open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-white`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              <div>
                                <Image
                                  className=""
                                  src={PaymentOption}
                                  width={296}
                                  height={20}
                                  alt=""
                                />
                              </div>
                              <div className="mt-4">
                                <label
                                  className="text-xm leading-6 font-medium text-[#151515]"
                                  htmlFor=""
                                >
                                  Card number
                                </label>
                                <input
                                  type="text"
                                  placeholder="4480 0000 0000 0000"
                                  className="w-full py-2 border-b-2 outline-none border-b-bnr-secondary"
                                  name="cardNumber"
                                  onChange={handleChange}
                                />

                                <div className="mt-4">
                                  <label
                                    className="text-xm leading-6 font-medium text-[#151515]"
                                    htmlFor=""
                                  >
                                    Card holder name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full py-2 border-b-2 outline-none border-b-bnr-secondary"
                                    name="cardHolder"
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="flex w-full mt-4">
                                  <div className="w-1/2">
                                    <label
                                      className="text-xm leading-6 font-medium text-[#151515]"
                                      htmlFor=""
                                    >
                                      CVV
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="000"
                                      className="w-full py-2 border-b-2 outline-none border-b-bnr-secondary"
                                      name="cvc"
                                      onChange={handleChange}
                                    />
                                  </div>

                                  <div className="w-1/2 ml-2">
                                    <label
                                      className="text-xm leading-6 font-medium text-[#151515]"
                                      htmlFor=""
                                    >
                                      Expiry date
                                    </label>
                                    <input
                                      type="date"
                                      placeholder="07/24"
                                      className="w-full py-2 border-b-2 outline-none border-b-bnr-secondary"
                                      name="expiration"
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <button
                        type="submit"
                        className="w-full rounded-xl text-white bg-[#7126B5] mt-4 py-2"
                      >
                        Proceed to Payment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            <section className="h-full max-w-full md:w-1/2">
              {data?.map((detail, index) => (
                <div
                  key={index}
                  className="w-full min-h-full p-5 my-5 border rounded-lg shadow-md border-bnr-secondary"
                >
                  <div className="border-b border-bnr-secondary">
                    <h1 className="text-lg font-bold">
                      Booking Code :{" "}
                      <span className="text-[#7126B5]">
                        {detail.data.booking_code}
                      </span>{" "}
                    </h1>
                    <div className="inline-flex justify-between w-full mt-4">
                      <p className="text-base font-bold">
                        {detail?.data.dateTakeoff}
                      </p>
                      <p className="text-xs font-bold text-bnr-primary">
                        Departure
                      </p>
                    </div>
                    <p className="text-sm">{getDateFormat(detail?.data?.dateDeparture)}</p>
                    <p className="text-sm">{detail?.data?.airport_from}</p>
                  </div>
                  <div className="inline-flex items-center w-full gap-2 py-2 border-b border-bnr-secondary">
                    <img src={detail?.data?.logo} alt="maskapai" width={50} height={50} />
                    <div className="text-sm">
                      <h5 className="font-bold">
                        {detail?.data?.airlines} - {detail?.data?.type_seat}
                      </h5>
                      <h5 className="font-bold">{detail?.data?.code}</h5>
                      <div className="mt-5">
                        <h5 className="font-bold">Information</h5>
                        <div className="w-32">{detail?.data?.information}</div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 border-b border-bnr-secondary">
                    <div className="inline-flex justify-between w-full">
                      <p className="text-base font-bold">
                        {detail?.data?.dateLanding}
                      </p>
                      <p className="text-xs font-bold text-bnr-primary">
                        Arrival
                      </p>
                    </div>
                    <p className="text-sm">{getDateFormat(detail?.data?.dateEnd)}</p>
                    <p className="text-sm">{detail?.data?.airport_to}</p>
                  </div>
                  <div className="py-2 border-b border-bnr-secondary">
                    <h1 className="text-base font-bold">Details</h1>
                    <div className="inline-flex justify-between w-full">
                      <p>
                        {resultPassangers}{" "}
                        {resultPassangers > 1 ? "Passanngers" : "Passanger"}
                      </p>
                      {/* <p>IDR 9.550.000</p> */}
                    </div>
                    {/* <div className="inline-flex justify-between w-full">
                    <p>1 Baby</p>
                    <p>IDR 0</p>
                  </div>
                  <div className="inline-flex justify-between w-full">
                    <p>Tax</p>
                    <p>IDR 300.000</p>
                  </div> */}
                  </div>
                </div>
              ))}
              <div className="px-5 py-3 rounded-lg bg-bnr-primary">
                <div className="inline-flex justify-between w-full">
                  <p className="text-lg font-bold text-white">Total</p>
                  <p className="text-lg font-bold text-white">
                    IDR {getMoneyFormat(totalPrice)}
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}

    </>
  );
};

export default PaymentPage;
