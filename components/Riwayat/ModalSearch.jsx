import React, { useState } from "react";
import Image from 'next/image';
import { Formik, Form, Field } from "formik";

import ButtonClose from "@/assets/button-close.svg";
import FiSearch from "@/assets/fi-search.svg";
import ClearBtn from "@/assets/clear-btn.svg";

const ModalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Simulasikan pencarian dengan contoh data
    const results = [
      "Result 1",
      "Result 2",
      "Result 3",
    ].filter((result) => result.includes(term));

    setSearchResults(results);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (values, { resetForm }) => {
    addToSearchHistory(values.searchTerm);
    setShowSuggestions(false);
    resetForm();
  };

  const addToSearchHistory = (term) => {
    if (!searchHistory.includes(term)) {
      setSearchHistory((prevHistory) => [...prevHistory, term]);
    }
  };

  const handleResultClick = (result) => {
    setSearchTerm(result);
    setShowSuggestions(false);
    addToSearchHistory(result);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const removeFromSearchHistory = (index) => {
    setSearchHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  return (
    <div className="mt-12">
      <div className="modal rounded-xl bg-white w-[400px] h-[348px] border-2 shadow ">
        <div className="modal-content mx-4 mt-5">

          <div className="input-search flex border-b-2 pb-5">
            <div className="w-[340px] h-[40px] border-2 shadow flex items-center rounded">
            <Image
                className="ml-4 "
                src={FiSearch}
                width={20}
                height={20}
                alt=""
              />

          <Formik initialValues={{ searchTerm: "" }} onSubmit={handleSearchSubmit}>
            <Form>
              <Field
                type="text"
                name="searchTerm"
                placeholder="Enter Booking Code"
                value={searchTerm}
                onChange={handleSearchChange}
                className="ml-2.5 w-[280px] h-[20px]"
              />
            </Form>
          </Formik>

            </div>

            <button>
            <Image
                className="ml-2.5"
                src={ButtonClose}
                width={16}
                height={16}
                alt=""
              />
              </button>

          </div>





          {showSuggestions && (
            <div className="mt-4">
              <h3 className="font-medium text-base leading-6">Search Suggestions:</h3>
              <ul>
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="cursor-pointer"
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-base leading-6">Recent Search</h3>
              <button
                className="text-[#FF0000] font-medium"
                onClick={handleClearHistory}
              >
                delete
              </button>
            </div>

          <ul>
            {searchHistory.map((term, index) => (
              <li key={index} onClick={() => handleResultClick(term)} className="mt-4 cursor-pointer flex justify-between w-full h-[40px] my-auto border-b-2">
                <div className="flex items-center">{term}</div>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => removeFromSearchHistory(index)}
                >
                <Image
                  className="ml-4 "
                  src={ClearBtn}
                  width={12}
                  height={12}
                  alt=""
                />
                </button>
              </li>
            ))}
          </ul>


          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalSearch;
