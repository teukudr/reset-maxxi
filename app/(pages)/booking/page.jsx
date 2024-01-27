/* eslint-disable @next/next/no-img-element */
"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import BreadCrumb from "./common/BreadCrumb";
import Maskapai from "@/assets/logo-maskapai.svg";
import Image from "next/image";
import {
  getBookingId,
  getDateFormat,
  getModal,
  getMoneyFormat,
  getToken,
} from "@/utils/helper";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Unauthorized from "@/components/Unauthorized";
import { input, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FiCheck } from "react-icons/fi"

import MustLogin from "@/components/Addon/MustLogin";
import DataSave from "@/components/Addon/DataSave";
import ModalNotif from "@/components/Addon/ModalNotif";

async function getTicketId(bookingId) {
  const ticketPromises = bookingId.map(async (flight) => {
    const res = await fetch(
      `https://example-backend.up.railway.app/api/v1/tickets/${flight.id}`
    );
    return res.json();
  });

  const ticketData = await Promise.all(ticketPromises);

  if (bookingId.length === 1 || !bookingId[1]?.id) {
    return [ticketData[0]];
  } else {
    return ticketData;
  }
}

async function postCheckoutTicket(token, data) {
  const res = await fetch(`checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

const CheckoutPage = () => {
  const token = getToken();
  const bookingId = getBookingId();
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [tokenExist, setTokenExist] = useState(false);
  const router = useRouter();

  const totalPrice = useSelector((state) => state.modal.totalPrice);

  useEffect(() => {
    if (!token) {
      setTokenExist(false);
    } else {
      setTokenExist(true);
    }
  }, [token]);

  const fetchTicketDetail = async () => {
    console.log("bookignIdf", bookingId);
    const data = await getTicketId(bookingId);
    setData(data);
  };

  console.log("tesssssss", data);
  console.log("tesdadnsjkfhsk", bookingId);

  const passengers = useSelector((state) => state.modal.modalInput);
  const index = passengers?.length - 1;
  const resultPassangers = passengers[index];
  const length = resultPassangers?.total;
  const dataPassangers = Array.from({ length });

  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     postCheckoutTicket(token, ticketData)
  //     console.log(value);
  // }

  // const handleChange = (e) => {
  //     const { name, value } = e.target
  //     setValue((prev) => {
  //         return {
  //             ...prev,
  //             [name]: value
  //         }
  //     })
  // }

  useEffect(() => {
    fetchTicketDetail();
  }, []);

  const initialValue = dataPassangers.reduce((acc, _, index) => {
    return {
      ...acc,

      [`fullName${index}`]: "",
      [`title${index}`]: "",
      [`familyName${index}`]: "",
      [`phoneNumber${index}`]: "",
      [`email${index}`]: "",
    };
  }, {});

  const validationSchema = Yup.object().shape(
    dataPassangers.reduce((acc, _, index) => {
      return {
        ...acc,

        [`fullName${index}`]: Yup.string().required("Full name must be filled in"),
        [`title${index}`]: Yup.string().required("Title must be filled in"),
        [`familyName${index}`]: Yup.string().required(
          "Family name must be filled in"
        ),
        [`phoneNumber${index}`]: Yup.string()
          .required("Phone number must be filled in")
          .matches(
            /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
            "The phone number is not correct"
          ),
        [`email${index}`]: Yup.string()
          .email("The email format is not correct")
          .required("Email must be filled in"),
      };
    }, {})
  );

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setValue(values);
      setIsSubmitting(true);
      setIsSaved(true);
    },
  });

  console.log(bookingId);

  const ticketData = {
    departureTicketsId: bookingId[0]?.id,
    returnTicketsId: bookingId[1]?.id,
    passengers: dataPassangers?.map((passenger, index) => ({
      name: value?.[`fullName${index}`],
      email: value?.[`email${index}`],
      phone: value?.[`phoneNumber${index}`],
      familyName: value?.[`familyName${index}`],
      title: value?.[`title${index}`],
    })),
    total_passenger: resultPassangers?.total,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCheckoutTicket(token, ticketData);
    router.push(`/payment`);
    console.log(value);
  };

  // Modal MustLogin
  const [showModal, setShowModal] = useState(false);

  const handleDirectLogin = () => {
    setShowModal(false);
    router.push("/login")
  }

  return (
    <>
      <div className={`${!token ? `fixed max-w-full` : "h-full max-w-full"}`}>
        <Navbar />
        <section>
          <div className="flex items-center w-full px-5 bg-white shadow-md h-36 md:px-72">
            <BreadCrumb />
          </div>
        </section>
        {
          isSubmitting ?
            <DataSave /> : null
        }
        <main className="flex flex-col w-full gap-6 px-5 py-3 mt-4 md:flex-row md:px-80">
          {!tokenExist && <MustLogin token={!token} onClose={handleDirectLogin} />}
          <section className="max-w-full space-y-10 md:w-[600px] ">
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full px-4 border border-[#8A8A8A] rounded-md mb-6">
                <h1 className="py-5 text-xl font-bold">Provide Booking Details</h1>
                <div className="bg-[#3C3C3C] text-base text-white py-2 px-4 rounded-t-xl">
                  Booker's Personal Details
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="font-bold text-[#4B1979]"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id=""
                      className="w-full h-10 px-3 border rounded border-bnr-secondary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // value={formik.values.fullName}
                    // {...formik.getFieldProps("fullName")}
                    />
                    {formik.errors.fullName && formik.touched.fullName ? (
                      <span>{formik.errors.fullName}</span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="familyName"
                      className="font-bold text-[#4B1979]"
                    >
                      Family Name
                    </label>
                    <input
                      type="text"
                      name="familyName"
                      id=""
                      className="w-full h-10 px-3 border rounded border-bnr-secondary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // value={formik.values.familyName}
                    // {...formik.getFieldProps("familyName")}
                    />
                    {formik.errors.familyName && formik.touched.familyName ? (
                      <span>{formik.errors.familyName}</span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="font-bold text-[#4B1979]"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id=""
                      className="w-full h-10 px-3 border rounded border-bnr-secondary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // value={formik.values.phoneNumber}
                    // {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.errors["phoneNumber"] &&
                      formik.touched["phoneNumber"] ? (
                      <span>{formik.errors["phoneNumber"]}</span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="font-bold text-[#4B1979]"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id=""
                      className="w-full h-10 px-3 border rounded border-bnr-secondary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // value={formik.values.email}
                    // {...formik.getFieldProps("email")}
                    />
                    {formik.errors["email"] && formik.touched["email"] ? (
                      <span>{formik.errors["email"]}</span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="w-full px-4 border border-[#8A8A8A] rounded-md ">
                <h1 className="py-5 text-xl font-bold">Provide Passenger Details</h1>
                {dataPassangers?.map((passanger, index) => (
                  <div key={index}>
                    <div className="bg-[#3C3C3C] text-base text-white py-2 px-4 rounded-t-xl flex justify-between items-center">
                      <span>Passenger's Personal Details - {index + 1}</span>
                      {isSubmitting
                        ? (
                          <div className="bg-[#73CA5C] text-xl rounded-full text-[#3C3C3C] font-bold">
                            <FiCheck />
                          </div>
                        ) :
                        null
                      }
                    </div>
                    <div className="p-6 space-y-3">
                      <div>
                        <label
                          htmlFor={`fullName${index}`}
                          className="font-bold text-[#4B1979]"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name={`fullName${index}`}
                          id=""
                          className="w-full h-10 px-3 border rounded border-bnr-secondary"
                          onChange={formik.handleChange}
                          // value={formik.values[`fullName${index}`]}
                          onBlur={formik.handleBlur}
                          {...formik.getFieldProps(`fullName${index}`)}
                        />
                        {formik.errors[`fullName${index}`] &&
                          formik.touched[`fullName${index}`] ? (
                          <span className="text-sm text-red-500">{formik.errors[`fullName${index}`]}</span>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor={`title${index}`}
                          className="font-bold text-[#4B1979]"
                        >
                          Title
                        </label>
                        <select
                          name={`title${index}`}
                          id=""
                          className="w-full h-10 px-3 border rounded border-bnr-secondary"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          {...formik.getFieldProps(`title${index}`)}
                        >
                          <option defaultValue=""></option>
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                        </select>
                        {formik.errors[`title${index}`] &&
                          formik.touched[`title${index}`] ? (
                          <span className="text-sm text-red-500">{formik.errors[`title${index}`]}</span>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor={`familyName${index}`}
                          className="font-bold text-[#4B1979]"
                        >
                          Family Name
                        </label>
                        <input
                          type="text"
                          name={`familyName${index}`}
                          id=""
                          className="w-full h-10 px-3 border rounded border-bnr-secondary"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // value={formik.values[`familyName${index}`]}
                          {...formik.getFieldProps(`familyName${index}`)}
                        />
                        {formik.errors[`familyName${index}`] &&
                          formik.touched[`familyName${index}`] ? (
                          <span className="text-sm text-red-500">{formik.errors[`familyName${index}`]}</span>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor={`phoneNumber`}
                          className="font-bold text-[#4B1979]"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name={`phoneNumber${index}`}
                          id=""
                          className="w-full h-10 px-3 border rounded border-bnr-secondary"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // value={formik.values[`phoneNumber${index}`]}
                          {...formik.getFieldProps(`phoneNumber${index}`)}
                        />
                        {formik.errors[`phoneNumber${index}`] &&
                          formik.touched[`phoneNumber${index}`] ? (
                          <span className="text-sm text-red-500">{formik.errors[`phoneNumber${index}`]}</span>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor={`email`}
                          className="font-bold text-[#4B1979]"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name={`email${index}`}
                          id=""
                          className="w-full h-10 px-3 border rounded border-bnr-secondary"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // value={formik.values[`email${index}`]}
                          {...formik.getFieldProps(`email${index}`)}
                        />
                        {formik.errors[`email${index}`] &&
                          formik.touched[`email${index}`] ? (
                          <span className="text-sm text-red-500">{formik.errors[`email${index}`]}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className={`w-full py-3 mt-5 text-white rounded-lg ${isSubmitting ? "bg-[#D0D0D0]" : "bg-bnr-primary"
                  } drop-shadow-lg`}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          </section>
          <section className="h-full max-w-full md:w-[500px]">
            <form onSubmit={handleSubmit}>
              {data?.map((item, index) => (
                <div key={index} className="w-full min-h-full">
                  <div className="pt-10 border-b border-bnr-secondary">
                    <h1 className="text-xl font-bold">Flight Details</h1>
                    <div className="inline-flex justify-between w-full">
                      <p className="text-base font-bold">
                        {item?.data?.dateTakeoff}
                      </p>
                      <p className="text-xs font-bold text-bnr-primary">
                        Departure
                      </p>
                    </div>
                    <p className="text-sm">{getDateFormat(item?.data?.dateDeparture)}</p>
                    <p className="text-sm">{item?.data?.airport_from}</p>
                  </div>
                  <div className="inline-flex items-center w-full gap-2 py-2 border-b border-bnr-secondary">
                    <img src={item?.data?.logo} alt="maskapai" width={50} height={50} />
                    <div className="text-sm">
                      <h5 className="font-bold">{item?.data?.airlines}</h5>
                      {/* <h5 className="font-bold">JT - 203</h5> */}
                      <div className="mt-5">
                        <h5 className="font-bold">Information</h5>
                        <p className="w-36">{item?.data?.information}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 border-b border-bnr-secondary">
                    <div className="inline-flex justify-between w-full">
                      <p className="text-base font-bold">
                        {item?.data?.dateLanding}
                      </p>
                      <p className="text-xs font-bold text-bnr-primary">
                        Arrival
                      </p>
                    </div>
                    <p className="text-sm">{getDateFormat(item?.data?.dateEnd)}</p>
                    <p className="text-sm">{item?.data?.airport_to}</p>
                  </div>
                  <div className="py-2 border-b border-bnr-secondary">
                    <h1 className="text-base font-bold">Details</h1>
                    <div className="inline-flex justify-between w-full">
                      <p>{resultPassangers?.total} Passangers</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="py-3">
                <div className="inline-flex justify-between w-full">
                  <p className="text-lg font-bold">Total</p>
                  <p className="text-lg font-bold text-bnr-primary">
                    IDR {getMoneyFormat(totalPrice)}
                  </p>
                </div>
              </div>
              {isSaved ? (
                <button
                  type="submit"
                  className="w-full py-3 text-white bg-red-600 rounded-lg drop-shadow-lg"
                >
                  Proceed to Payment
                </button>
              ) : null}
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default CheckoutPage;
