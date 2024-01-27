"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import FilterButton from "@/components/FilterButton";
import FilterCard from "@/components/FilterCard";

import BackArrow from "@/assets/fi_arrow.svg";
import Navbar from "@/components/Navbar";
import TicketFilter from "@/components/Ticket/TicketFilter";
import TicketDetail from "@/components/Ticket/TicketDetail";

import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import NoTicket from "@/assets/images/noTicketImage.png";
import Loading from "@/assets/images/loading.png";

import Draggable from "react-draggable";
import TicketCard from "@/components/Ticket/TicketCard";
import { getModal, getCode } from "@/utils/helper";
import TicketTrip from "@/components/Ticket/TicketTrip";
import { useComponentContext } from "@/app/context/store";
import ModalTicket from "@/components/Modal/ModalTicket";
import FormTicket from "@/components/FormTicket/Form";

import { useContext } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { addSearchFlight } from "@/store/auth/slice";
import { handleClientScriptLoad } from "next/script";
import Link from "next/link";

const getTicket = async (dateDeparture, city_from, city_to, type_seat) => {
  console.log("dattttttt", dateDeparture);
  try {
    const response = await fetch(
      `https://example-backend.up.railway.app/api/v1/tickets?dateDeparture=${dateDeparture}&city_from=${city_from}&type_seat=${type_seat}&city_to=${city_to}`
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const TicketPage = () => {
  const [value, setValue] = useState();
  const [isFetchFlight, setIsFetchFlight] = useState(false);
  const [oneWay, setOneWay] = useState({});
  const [flightOne, setFlightOne] = useState({
    id: "",
    price: "",
    city_from: "",
    city_to: "",
  });
  const [flightTwo, setFlightTwo] = useState({
    id: "",
    city_from: "",
    city_to: "",
  });
  const [twoWay, setTwoWay] = useState("");
  const [modalTicket, setModalTicket] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchFlight = useSearchParams();
  const dateDeparture = searchFlight.get("dateDeparture");
  const dateReturn = searchFlight.get("dateReturn");
  const city_from = searchFlight.get("city_from");
  const city_to = searchFlight.get("city_to");
  const type_seat = searchFlight.get("type_seat");

  const passengers = useSelector((state) => state.modal.modalInput);
  const index = passengers?.length - 1;
  const resultPassangers = passengers[index];
  const totalPassangers = resultPassangers?.total;

  const fetchData = async (dateDeparture, city_from, city_to, type_seat) => {
    setLoading(true);
    try {
      const data = await getTicket(
        dateDeparture,
        city_from,
        city_to,
        type_seat
      );
      console.log("datedeparture", data.data);
      setValue(data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 2000);
  //   fetchData(dateDeparture, city_from, city_to, type_seat);
  //   setLoading(false)
  // }, [])

  useEffect(() => {
    if (isFetchFlight) {
      setLoading(true); // Mengatur loading menjadi true saat permintaan data dimulai
      fetchData(dateReturn, city_to, city_from, type_seat)
        .then(() => setLoading(false)) // Mengatur loading menjadi false setelah permintaan data selesai
        .catch((error) => {
          console.error("An error occurred:", error);
          // Handle the error accordingly (e.g., show an error message)
          setLoading(false); // Mengatur loading menjadi false jika terjadi kesalahan
        });
    }
    setIsFetchFlight(false);
  }, [isFetchFlight]);

  useEffect(() => {
    setLoading(true);
    if (flightOne.id === "") {
      fetchData(dateDeparture, city_from, city_to, type_seat);
      setShowForm(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (flightOne.id === "") {
      fetchData(dateDeparture, city_from, city_to, type_seat);
    }
    setLoading(false);
  }, [dateDeparture, city_from, city_to, type_seat]);

  useEffect(() => {
    if (flightOne.id === "") {
      fetchData(dateDeparture, city_from, city_to, type_seat);
    }
  }, [flightOne.id, flightTwo.id]);

  const newdateDeparture = new Date(dateDeparture);
  const today = new Date();
  const dateData = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(newdateDeparture);
    date.setDate(date.getDate() + i);
    const day = getDayName(date.getDay());
    const formattedDate = formatDate(date);

    dateData.push({ day, date: formattedDate });
  }

  function getDayName(dayIndex) {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayNames[dayIndex];
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [maxDragX, setMaxDragX] = useState(0);

  const { showReturn } = useComponentContext();

  const handleChoose = (id, city_from, city_to, departureDate, returnDate) => {
    if (flightOne.id === "" && showReturn) {
      // console.log("id", flightTwo.id);
      setFlightOne({
        id: id,
        city_from: city_from,
        city_to: city_to,
        departureDate: departureDate,
        returnDate: returnDate
      }); //fligth 1
      // fetchData(dateReturn, city_to, city_from, type_seat);
      setIsFetchFlight(true);
      // setModalTicket(true)
      return;
    }
    if (flightOne.id && flightTwo.id === "" && showReturn) {
      //fligtht 2
      console.log(id);

      setFlightTwo({
        id: id,
        city_from: city_to,
        city_to: city_from,
        departureDate: departureDate,
        returnDate: returnDate
      });
      setModalTicket(true);
      return;
    }
    if (flightOne.id && flightTwo.id) {
      setModalTicket(true);
    }
    if (flightOne.id === "" && !showReturn) {
      setFlightOne({
        id: id,
      });
      setModalTicket(true);
    }
  };

  const closeModal = () => {
    setModalTicket(false);
    setFlightTwo({
      id: "",
      city_from: "",
      city_to: "",
    });
    setFlightOne({
      id: "",
      city_from: "",
      city_to: "",
    });
  };

  console.log("valueWayyyy", value);

  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      handleCloseForm();
    }
  };

  const [searchParams, setSearchParams] = useState({
    dateDeparture: "",
    dateReturn: "",
    city_from: "",
    city_to: "",
    type_seat: "",
    passengers: 1,
  });
  const router = useRouter();
  const handleSearch = () => {
    const searchQuery = `/ticket?dateDeparture=${searchParams.dateDeparture}&dateReturn=${searchParams.dateReturn}&city_from=${searchParams.city_from}&city_to=${searchParams.city_to}&type_seat=${searchParams.type_seat}&passengers=${searchParams.passengers}`;
    router.push(searchQuery);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter Ticket
  const handleFilterChange = (selectedOptions) => {
    setOptions(selectedOptions);
  };

  const handleFilterOptions = () => {
    const filteredData = flightData.filter((item) => {
      return (
        (options.find((option) => option.label === "Termurah") &&
          item.price ===
          Math.min(...flightData.map((flight) => flight.price))) ||
        (options.find((option) => option.label === "Terpendek") &&
          item.duration ===
          Math.min(...flightData.map((flight) => flight.duration))) ||
        (options.find(
          (option) => option.label === "Paling Awal - Keberangkatan"
        ) &&
          item.departure ===
          Math.min(
            ...flightData.map((flight) =>
              new Date(flight.departure).getTime()
            )
          )) ||
        (options.find(
          (option) => option.label === "Paling Akhir - Keberangkatan"
        ) &&
          item.departure ===
          Math.max(
            ...flightData.map((flight) =>
              new Date(flight.departure).getTime()
            )
          )) ||
        (options.find(
          (option) => option.label === "Paling Awal - Kedatangan"
        ) &&
          item.arrival ===
          Math.min(
            ...flightData.map((flight) => new Date(flight.arrival).getTime())
          )) ||
        (options.find(
          (option) => option.label === "Paling Akhir - Kedatangan"
        ) &&
          item.arrival ===
          Math.max(
            ...flightData.map((flight) => new Date(flight.arrival).getTime())
          )) ||
        true
      );
    });

    setFilteredFlightData(filteredData);
  };

  //Filter Date
  const handleDateSelect = (selectedDate) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      dateDeparture: selectedDate,
    }));

    handleDateSearch(selectedDate);
  };

  const handleDateSearch = (selectedDate) => {
    const [day, month, year] = selectedDate.split("/");
    const formattedDate = `${year}/${month}/${day}`;

    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      dateDeparture: formattedDate,
    }));
    const searchQuery = `/ticket?dateDeparture=${formattedDate}&city_from=${city_from}&city_to=${city_to}&type_seat=${type_seat}`;
    router.push(searchQuery);
  };

  const handleFilter = () => { };

  return (
    <div className={modalTicket ? "fixed" : ""}>
      {modalTicket && (
        <ModalTicket
          modal={modalTicket}
          closeModal={closeModal}
          data={value}
          flightOne={flightOne}
          flightTwo={flightTwo}
        />
      )}
      <Navbar />
      <div className="md:mx-36 max-w-7xl">
        <div className="mx-2 ticket-section">
          <div className="text-heading">
            <h1 className="mt-10 text-xl font-bold leading-8">
              Choose a Flight
            </h1>
          </div>

          <div className="flex flex-col gap-4 mt-4 md:flex-row search">
            <Link href={"/"}>
              <div className="md:w-[800px] flex bg-[#A06ECE] h-[50px] rounded-xl items-center text-white font-medium leading-6 gap-1">
                <Image
                  className="ml-3 md:mr-5"
                  src={BackArrow}
                  width={24}
                  height={24}
                  alt=""
                />
                <div className="flex w-full gap-1">
                  <div className="text-sm uppercase md:text-base">
                    {getCode(city_from)}
                  </div>
                  <div className="text-sm md:text-base">&gt;</div>
                  <div className="text-sm uppercase md:text-base">{getCode(city_to)}</div>
                  <div className="text-sm md:text-base">-</div>
                  <div className="text-sm md:text-base">
                    <span className="text-sm md:text-base">
                      {totalPassangers}
                    </span>
                    <span> Passangers</span>
                  </div>
                  <div className="text-sm md:text-base">-</div>
                  <div className="text-sm capitalize md:text-base">
                    {type_seat}
                  </div>
                </div>
              </div>
            </Link>
            <div className="hidden button-search md:block">
              <a href="#">
                {" "}
                <button
                  className="w-[220px] bg-[#73CA5C] hover:bg-[#67b552] h-[50px] rounded-xl text-white text-base font-bold leading-8"
                  onClick={() => setShowForm(true)}
                >
                  Change Search
                </button>{" "}
              </a>
            </div>
          </div>

          <div
            id="carousel"
            className="overflow-x-hidden mt-3.5 h-[96px] flex justify-between border-b-2 border-b-[#D0D0D0] content-center self-center my-auto pb-4"
          >
            <Draggable axis="x" bounds={{ left: -maxDragX, right: 0 }}>
              <div
                id="carousel-content"
                className="flex md:justify-between md:w-full"
              >
                {dateData.map((filter, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="content w-28 h-[55px] rounded-lg text-center hover:bg-[#A06ECE] active:bg-[#7126B5] hover:text-white active:text-white px-auto py-2 self-center"
                      onClick={() => handleDateSelect(filter.date)}
                    >
                      <div className="text-sm font-bold leading-5">
                        {filter.day}
                      </div>
                      <div className="w-full text-xs font-medium leading-5">
                        {filter.date}
                      </div>
                    </div>
                    {index !== dateData.length - 1 && (
                      <div className="garis w-[1px] h-6 bg-[#D0D0D0] self-center"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Draggable>
          </div>

          {showForm && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black modal-background bg-opacity-80 backdrop-blur-lg"
              onClick={handleModalClick}
            >
              <div className="relative p-2 bg-white rounded-md">
                <FormTicket
                  handleChange={handleChange}
                  handleSearch={handleSearch}
                  searchParams={searchParams}
                />
              </div>
            </div>
          )}
        </div>
        <div className="ticket-result">
          <div className="flex mx-auto filter-result">
            <div className="hidden w-full mx-auto sm:w-1/3 md:block">
              {showReturn ? (
                <TicketTrip flightOne={flightOne} flightTwo={flightTwo} />
              ) : null}
              <FilterCard
                handleChange={handleChange}
                handleSearch={handleSearch}
                searchParams={searchParams}
                handleFilter={handleFilter}
              />
            </div>

            <div className="justify-center w-full mt-8 search-result w-3/3">
              <TicketFilter />
              {loading ? (
                <div className="flex flex-col items-center justify-center transition-all ease-in animate-pulse">
                  <Image src={Loading} alt="loading" />
                </div>
              ) : (
                <>
                  {value?.status !== "Error" ? (
                    <TicketCard data={value} handleChoose={handleChoose} />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Image width={300} height={300} src={NoTicket} alt="sd" />
                      <div className="pt-10 text-center">
                        <p>Sorry, Tickets are Sold Out</p>
                        <p className="text-bnr-primary">
                          Please Try Searching for Another Journey!
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
