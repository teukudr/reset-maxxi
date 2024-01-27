"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import RiwayatKosong from "@/components/Riwayat/RiwayatKosong";
import Notifikasi from "@/components/Riwayat/Notifikasi";
import User from "@/components/Riwayat/User";
import ModalDate from "@/components/Riwayat/ModalDate";
import ModalSearch from "@/components/Riwayat/ModalSearch";
import RiwayatBulan from "@/components/Riwayat/RiwayatBulan";
import DetailPemesanan from "@/components/Riwayat/DetailPemesanan";

import BackArrow from "@/assets/fi_arrow.svg";
import IconFilter from "@/assets/icon-filter.svg";
import IconSearch from "@/assets/icon-search.svg";
import { getDateFormat, getToken } from "@/utils/helper";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MustLogin from "@/components/Addon/MustLogin";
import { useRouter } from "next/navigation";

const getTransaction = async (token) => {
  try {
    const res = await fetch(
      "https://example-backend.up.railway.app/api/v1/transaction",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const HistoryPage = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [detailTicket, setDetailTicket] = useState("");
  const [tokenExist, setTokenExist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter()
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchTransaction = async () => {
    const data = await getTransaction(token);
    setData(data);
  };

  useEffect(() => {
    if (!token) {
      setTokenExist(false);
    } else {
      setTokenExist(true);
    }
  }, [token]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleChooseTicket = (id) => {
    setDetailTicket(id);
  };

  const handleDirectLogin = () => {
    setShowModal(false);
    router.push("/login")
  }

  return (
    <div className={`${!token ? `fixed w-full` : ""}`}>
      <Navbar />
      <div className="container mx-auto max-w-[968px] z-0">
        {!tokenExist && <MustLogin token={!token} onClose={handleDirectLogin} />}
        <div className="pb-4 mx-2 border-b-2 ticket-section drop-shadow-md">
          <div className="text-heading">
            <h1 className="mt-12 text-xl font-bold leading-8">
              Booking History
            </h1>
          </div>
          <div className="z-0 flex flex-col gap-4 mt-4 search sm:flex-row">
            <div className="sm:w-[800px] flex bg-[#A06ECE] h-[50px] rounded-xl items-center text-white font-medium text-base leading-6 gap-1">
              <Link href={"/"}>
                <div className="flex">
                  <Image
                    className="ml-3 mr-5"
                    src={BackArrow}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span>Homepage</span>
                </div>
              </Link>
            </div>
            <div className="flex justify-between gap-x-4">
              <div className="items-center my-auto">
                <button
                  className="flex items-center rounded-2xl w-[90px] font-normal text-base leading-6 border-2 border-[#A06ECE]">
                  <div className="flex h-8 mx-auto ">
                    <Image
                      className="items-center mr-2.5"
                      src={IconFilter}
                      width={17}
                      height={17}
                      alt=""
                    />
                    <span className="self-center">Filter</span>
                  </div>
                </button>
              </div>

              <div className="my-auto">
                <Image
                  className=""
                  src={IconSearch}
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <ModalSearch
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
        )}

        <div className="flex flex-col mx-auto main sm:flex-row">
          <div className="section-pemesanan w-full sm:w-[518px] mx-auto">
            {data?.data?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="my-3 text-base font-bold leading-6 mx-2">
                    {getDateFormat(item.createdAt)}
                  </div>
                  <RiwayatBulan
                    data={item}
                    handleChooseTicket={handleChooseTicket}
                  />
                </div>
              );
            })}
          </div>

          <div className="section-detail w-full sm:w-[370px] mt-7 mx-auto">
            {data?.data?.map((item, index) => {
              // console.log("idddd", item.id);
              const id = item.id;
              return (
                <>
                  {id === detailTicket ? (
                    <DetailPemesanan
                      key={index}
                      data={item}
                      idTicket={detailTicket}
                    />
                  ) : null}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
