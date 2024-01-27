"use client";

import Image from "next/image";
import React, { useState } from "react";

import ArrowUpDown from "@/assets/arrow_updown.svg";
import ButtonClose from "@/assets/button-close.svg";
import RoundCheck from "@/assets/round-check.svg";

import IconFilter from "@/assets/icon-filter.svg";
import Box from "@/assets/fi_box.svg";
import ArrowRight from "@/assets/arrow_right.svg";
import Heart from "@/assets/fi_heart.svg";
import Dollar from "@/assets/fi_dollar-sign.svg";


const TicketFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState("");

  const [options, setOptions] = useState([
    { id: 1, isChecked: false, filter: "Price", label: "Cheapest" },
    { id: 2, isChecked: false, filter: "Duration", label: "Shortest " },
    { id: 3, isChecked: false, filter: "Departure", label: "Earliest" },
    { id: 4, isChecked: false, filter: "Departure", label: "Latest" },
    { id: 5, isChecked: false, filter: "Arrival", label: "Earliest" },
    { id: 6, isChecked: false, filter: "Arrival", label: "Latest" },
  ]);

  const handleCheckboxChange = (id) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.id === id) {
          return {
            ...option,
            isChecked: true,
          };
        } else {
          return {
            ...option,
            isChecked: false,
          };
        }
      });
    });
  };

  const handleSelectOptions = () => {
    const selectedOption = options.find((option) => option.isChecked);
    setSelectedOptions(selectedOption ? selectedOption.label : "");
    setShowModal(false);
  };

  console.log("selected options", selectedOptions);


  return (
    <>

      <div className="flex justify-between mx-2 mt-4 mb-4 filter-drop xl:justify-end">
        <div className="xl:hidden xl:block">
          <div className="items-center my-auto" onClick={() => setShowFilter(true)}>
            <button className="flex items-center rounded-2xl w-[90px] font-normal text-base leading-6 border-2 border-[#A06ECE]">
              <div className="flex h-8 mx-auto ">
                <Image
                  className="items-center mr-2.5"
                  src={IconFilter}
                  width={17}
                  height={17}
                  alt=""
                />
                <span className="self-center" >Filter</span>
              </div>
            </button>
          </div>


          {showFilter && (
            <div className="card-filter w-[268px] h-[180px] rounded-2xl mt-2 shadow-lg border-2 bg-white z-50 inset-x-0 absolute top-auto mt-2">
              <div className="close-button h-[30px] flex justify-end">
                <button type="button" onClick={() => setShowFilter(false)}>
                  <Image
                    className="mt-4 mb-2 mr-4"
                    src={ButtonClose}
                    width={16}
                    height={16}
                    alt=""
                  />
                </button>
              </div>
              <div className="mx-6 filter-body">
                <div className="filter-type">
                  <div className="transit flex h-[40px] w-[220px] border-b-[1px] border-b-[#D0D0D0] mb-2 justify-between">
                    <div className="flex items-center ">
                      <Image
                        className="items-center mr-2"
                        src={Box}
                        width={24}
                        height={24}
                        alt=""
                      />
                      <h2 className="text-base font-normal leading-6">Transit</h2>
                    </div>

                    <Image
                      className="items-center ml-4"
                      src={ArrowRight}
                      width={8}
                      height={12}
                      alt=""
                    />
                  </div>
                  <div className="fasilitas flex h-[40px] w-[220px] border-b-[1px] border-b-[#D0D0D0] mb-2 justify-between">
                    <div className="flex items-center ">
                      <Image
                        className="items-center mr-2"
                        src={Heart}
                        width={24}
                        height={24}
                        alt=""
                      />
                      <h2 className="text-base font-normal leading-6">Facilities</h2>
                    </div>
                    <Image
                      className="items-center ml-4"
                      src={ArrowRight}
                      width={8}
                      height={12}
                      alt=""
                    />
                  </div>

                  <div className="harga h-[40px] w-[220px] flex justify-between">
                    <div className="flex items-center ">
                      <Image
                        className="items-center mr-2"
                        src={Dollar}
                        width={24}
                        height={24}
                        alt=""
                      />
                      <h2 className="text-base font-normal leading-6">Price</h2>
                    </div>
                    <Image
                      className="items-center ml-4"
                      src={ArrowRight}
                      width={8}
                      height={12}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

          )}


        </div>

        <div className="xl:justify-end">
          <button
            className="h-8 mb-2 flex gap-2.5 items-center justify-self-center rounded-2xl w-30 font-medium text-xs leading-5 text-[#7126B5] border-solid border-2 border-[#A06ECE]"
            onClick={() => setShowModal(true)}
          >
            <div className="flex mx-2 my-2">
              <Image
                className="items-center"
                src={ArrowUpDown}
                width={20}
                height={20}
                alt=""
              />
              <span>{selectedOptions}</span>
            </div>
          </button>

        </div>

      </div>

      {showModal && (
        <div className="absolute inset-x-0 top-auto z-50 flex justify-end -mt-4 outline-none modal-filter focus:outline-none">
          <div className="modal-card bg-white w-[350px] h-[400px] rounded-2xl shadow border-2">
            <div className="relative mx-0 kontent">
              <div className="close-button h-[44px] flex justify-end">
                <button type="button" onClick={() => setShowModal(false)}>
                  <Image
                    className="mt-2 mr-4"
                    src={ButtonClose}
                    width={16}
                    height={16}
                    alt=""
                  />
                </button>
              </div>

              {options.map((option) => (
                <div
                  key={option.id}
                  className={`option-2 pl-4 py-[2px] h-[48px] border-y-[1px] border-y-[#D0D0D0] font-medium text-sm leading-5 flex justify-between cursor-pointer select-none ${option.isChecked ? "bg-[#7126B5]" : "bg-transparent"
                    }`}
                >
                  <label
                    className={`container h-[40px] py-2 cursor-pointer select-none text-sm flex justify-between ${option.isChecked ? "text-white font-bold" : ""
                      }`}
                  >
                    <div className="flex justify-between">
                      <span
                        className={`font-bold text-sm leading-5 ${option.isChecked ? "text-white font-bold" : ""
                          }`}
                      >
                        {option.filter}
                      </span>
                      <span
                        className={`mx-2 ${option.isChecked ? "text-white font-bold" : ""
                          }`}
                      >
                        -
                      </span>
                      {option.label}
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={option.isChecked}
                        onChange={() => handleCheckboxChange(option.id)}
                      />
                    </div>
                    <span className="checkmark justify-self-end">
                      {option.isChecked && (
                        <Image
                          className="mr-2"
                          src={RoundCheck}
                          width={20}
                          height={20}
                          alt=""
                        />
                      )}
                    </span>
                  </label>
                </div>
              ))}

              <div className="flex justify-end mr-4 submit-button">
                <button
                  className="my-3 w-[100px] h-[40px] bg-[#4B1979] rounded-xl text-white font-medium text-base leading-6"
                  type="button"
                  onClick={handleSelectOptions}
                >
                  Choose
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketFilter;
