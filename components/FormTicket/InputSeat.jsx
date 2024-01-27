"use client";

import { addInputSeat } from "@/store/auth/slice";
import { useEffect } from "react";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useDispatch } from "react-redux";

const packages = [
  { id: 1, name: "Economy", price: 4950000 },
  { id: 2, name: "Premium Economy", price: 7550000 },
  { id: 3, name: "Business", price: 29220000 },
  { id: 4, name: "First Class", price: 87620000 },
];

const InputSeat = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedPackages, setSelectedPackeges] = useState([]);

  const handleCheckboxChange = (selectedPackage) => {
    if (
      selectedPackages.length === 1 &&
      selectedPackages.includes(selectedPackage)
    ) {
      return;
    }

    const isPackageSelected = selectedPackages.some(
      (p) => p.id === selectedPackage.id
    );

    let updatedSelectedPackages;

    if (isPackageSelected) {
      updatedSelectedPackages = selectedPackages.filter(
        (p) => p.id !== selectedPackage.id
      );
    } else {
      updatedSelectedPackages = [...selectedPackages, selectedPackage];
    }

    setSelectedPackeges(updatedSelectedPackages);
  };

  useEffect(() => {
    dispatch(addInputSeat(selectedPackages));
  }, [dispatch, selectedPackages]);

  console.log(selectedPackages);
  return (
    <div className="w-full px-5 top-16">
      <div className="space-y-2">
        {packages.map((packege, packegeIdx) => (
          <div
            key={packegeIdx}
            className="flex items-center justify-between space-x-2 border-b-2 cursor-pointer"
            onClick={() => handleCheckboxChange(packege)}
          >
            <input
              type="checkbox"
              checked={selectedPackages.includes(packege)}
              className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={() => {}}
              disabled={
                selectedPackages.length > 1 &&
                selectedPackages.includes(packege)
              }
            />
            <div
              className={
                selectedPackages.includes(packege)
                  ? "flex flex-col text-white bg-bnr-primary w-full py-3 relative space-y-2 hover:text-white px-3"
                  : "flex flex-col text-gray-900 hover:bg-bnr-primary w-full py-3 relative space-y-2 hover:text-white px-3"
              }
            >
              <span>{packege.name}</span>
              <span>IDR {packege.price}</span>
            </div>
            <div className="absolute right-14">
              {selectedPackages.includes(packege) && (
                <FiCheck className="text-bnr-primary w-6 h-6 bg-[#73CA5C] rounded-full" />
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 mt-4"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default InputSeat;
