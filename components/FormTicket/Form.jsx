"use client"

import Image from "next/image";
import From from "@/assets/images/from.svg";
import To from "@/assets/images/to.svg";
import ToTwo from "@/assets/images/toTwo.svg";
import DateSvg from "@/assets/images/date.svg";
import { FiRepeat } from "react-icons/fi";
import Modal from "../Modal/Modal";
// import InputDate from "./InputDate";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addSearchFlight } from "@/store/auth/slice";
import { handleClientScriptLoad } from "next/script";
import ModalPassenger from "../Modal/ModalPassenger";
import { useComponentContext } from "@/app/context/store";
import { Switch } from "@headlessui/react";


import Select from "react-select";


const FormTicket = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const valueModal = useSelector((state) => state.modal)
  const [values, setValues] = useState(null);


  const { handleToggle, showReturn } = useComponentContext();

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSearch = (e) => {
    e.preventDefault();
    localStorage.setItem("passengerr", JSON.stringify(valueModal))
    // const { dateDeparture, dateReturn, city_from, type_seat, city_to } = values;
    if (showReturn) {
      router.push(`/ticket?dateDeparture=${values?.dateDeparture}&dateReturn=${values?.dateReturn}&city_from=${values?.city_from}&type_seat=${values?.type_seat}&city_to=${values?.city_to}`)
    } else {
      router.push(`/ticket?dateDeparture=${values?.dateDeparture}&city_from=${values?.city_from}&type_seat=${values?.type_seat}&city_to=${values?.city_to}`)
    }
    console.log(values);
  };

  console.log("showreturn", showReturn);


  // Kota
  const [isSearchable, setIsSearchable] = useState(true);
  // kota asal
  const [selectFrom, setSelectFrom] = useState(null);
  const [inputFrom, setInputFrom] = useState("");
  // kota tujuan
  const [selectTo, setSelectTo] = useState(null);
  const [inputTo, setInputTo] = useState("");
  // city options
  const city = [
    { value: "Jakarta", label: "Jakarta" },
    { value: "Yogyakarta", label: "Yogyakarta" },
    { value: "Surabaya", label: "Surabaya" },
    { value: "Tokyo", label: "Tokyo" },
    { value: "Medan", label: "Medan" },
    { value: "Singapore", label: "Singapore" },
  ];


  const handleChangeCityFrom = (selectFromCityFrom, actionMeta) => {
    setSelectFrom(selectFromCityFrom);
    handleChange({ target: { name: "city_from", value: selectFromCityFrom.value } });
  };

  const handleChangeCityTo = (selectToCityTo, actionMeta) => {
    setSelectTo(selectToCityTo);
    handleChange({ target: { name: "city_to", value: selectToCityTo.value } });
  };

  const handleInputFrom = (inputFrom) => {
    setInputFrom(inputFrom);
  };

  const handleInputTo = (inputTo) => {
    setInputTo(inputTo);
  };

  const handleSwapInputs = (event) => {
    event.preventDefault();

    // Swap the values of inputFrom and inputTo
    setInputFrom(inputTo);
    setInputTo(inputFrom);

    handleChange({ target: { name: "city_to", value: selectFrom.value } });
    handleChange({ target: { name: "city_from", value: selectTo.value } });

    // Swap the selected options of selectFrom and selectTo (if needed)
    if (selectFrom && selectTo) {
      // Swap the values directly without using the 'value' property
      setSelectFrom(selectTo);
      setSelectTo(selectFrom);
    }
  };


  // Seat
  const options = [
    { value: "economy", label: "Economy" },
    { value: "premium economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first class", label: "First Class" },
  ];
  const [selected, setSelected] = useState(null);

  const handleSelect = (selectedOption, { name }) => {
    setSelected(selectedOption);
    handleChange({ target: { name, value: selectedOption.value } });
  };

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#fff" : state.isFocused ? "white" : "black",
      backgroundColor: state.isSelected ? "#7400b8" : state.isFocused ? "#9d4edd" : "#fff",
      fontSize: "16px"
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      padding: "5px",
      border: "none",
      boxShadow: "none",
      width: "100%",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
  };

  return (
    <>
      <div className="relative z-30 flex justify-center form-section">
        <div className="mx-2 bg-white border-2 shadow-xl select-none main rounded-xl">
          <form onSubmit={handleSearch}>
            <div className="w-full md:w-[968px] mx-2">
              <div className="p-4 content">
                <h1 className="text-xl font-bold leading-7">
                  Choose Special Flight Schedule on <span className="text-[#7126B5]">TiketGo!</span>
                </h1>

                <div className="flex flex-col items-center justify-between w-full gap-2 py-2 pilih-kota md:flex-row">
                  <div className="flex justify-between w-full from">
                    <div className="flex w-full mr-2">
                      <Image src={From} alt="fromsvg" />
                      {/*<Select
                        options={city}
                        onChange={(selectFromCityFrom) => handleSelectCityFrom(selectFromCityFrom, { name: "city_from" })} value={selectFrom} autoFocus={true} styles={customStyles} isSearchable   />*/}

                      <Select
                        options={city}
                        onChange={handleChangeCityFrom}
                        onInputChange={handleInputFrom}
                        inputValue={inputFrom}
                        value={selectFrom}
                        isSearchable={isSearchable}
                        autoFocus={true}
                        styles={customStyles}
                        menuIsOpen={inputFrom.trim().length > 0}
                        className="w-full border-b-2"
                        placeholder={'City'}
                      />
                    </div>

                    <div className="relative inline-flex items-center cursor-pointer btn-swap">
                      <div className="p-2 my-2 text-white bg-black cursor-pointer rounded-xl">
                        <button type="button" onClick={handleSwapInputs}>
                          <FiRepeat />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full to">
                    <Image src={To} alt="fromsvg" />
                    {/*<Select options={city} onChange={(selectToCityTo) => handleSelectCityTo(selectToCityTo, { name: "city_to" })} value={selectTo} autoFocus={true} styles={customStyles} isSearchable  />*/}
                    <Select
                      options={city}
                      onChange={handleChangeCityTo}
                      onInputChange={handleInputTo}
                      inputValue={inputTo}
                      value={selectTo}
                      isSearchable
                      autoFocus={true}
                      styles={customStyles}
                      menuIsOpen={inputTo.trim().length > 0}
                      className="w-full border-b-2"
                      placeholder={'City'}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between w-full gap-2 py-2 md:flex-row">
                  <div className="flex w-full pilih-tanggal">
                    <Image src={DateSvg} className="mt-6 mr-4" alt="fromsvg" />

                    <div className="border-b-2 departure">
                      <label className="text-base leading-6 font-normal text-[#8A8A8A]" htmlFor="">Departure</label>
                      <div className="mt-2">
                        <input
                          type="date"
                          placeholder="Input Tanggal"
                          className="md:w-[160px] w-[100px] py-3 border-b-2 outline-none border-b-bnr-secondary"
                          name="dateDeparture"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full ml-4 return">
                      <label className="text-base leading-6 font-normal text-[#8A8A8A]" htmlFor="">Return</label>
                      {showReturn && (
                        <div className="mt-2">
                          <input
                            type="date"
                            placeholder="Input Tanggal"
                            className="md:w-[160px] w-[100px] py-3 border-b-2 outline-none border-b-bnr-secondary"
                            name="dateReturn"
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </div>
                    <Switch
                      checked={showReturn}
                      onChange={handleToggle}
                      className={`${showReturn ? 'bg-bnr-primary' : 'bg-bnr-secondary'}
          relative inline-flex h-[28px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${showReturn ? 'translate-x-5' : 'translate-x-0.5'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="flex items-center w-full">
                    <Image src={ToTwo} className="mt-6 mr-2" alt="fromsvg" />
                    <div className="relative w-1/2 ml-6 passengers">
                      <label className="text-base leading-6 font-normal text-[#8A8A8A]" htmlFor="tes">Passengers</label>
                      <ModalPassenger className="z-10" name={"passengers"} handleChange={handleChange} />
                    </div>
                    <div className="w-1/2 ml-4 border-b-2 seat-class border-b-bnr-secondary">
                      <label className="text-base leading-6 font-normal text-[#8A8A8A]" htmlFor="tes">Seat Class</label>
                      <div>
                        <div className="select">
                          <div className="m-auto w-50 ">
                            <Select options={options} onChange={(selectedOption) => handleSelect(selectedOption, { name: "type_seat" })} value={selected} autoFocus={true} styles={customStyles} placeholder={'Input Class'} />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <button type="submit" className="w-full py-3 font-semibold text-white bg-bnr-primary rounded-bl-xl rounded-br-xl">
              Search Flights
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default FormTicket;
