import Image from "next/image";

import Box from "@/assets/fi_box.svg";
import ArrowRight from "@/assets/arrow_right.svg";
import Heart from "@/assets/fi_heart.svg";
import Dollar from "@/assets/fi_dollar-sign.svg";

const FilterCard = () => {
  return (
    <>
      <div className="card-filter w-[268px] h-[248px] rounded-2xl mt-8 shadow-lg border-2 bg-white">
        <div className="filter-body mx-6 my-6">
          <div className="filter-heading mb-6">
            <h1 className="text-base font-medium leading-6">Filter</h1>
          </div>

          <div className="filter-type">
            <div className="transit flex h-[40px] w-[220px] border-b-[1px] border-b-[#D0D0D0] mb-6 justify-between">
              <div className=" flex items-center ">
                <Image
                  className="items-center mr-2"
                  src={Box}
                  width={24}
                  height={24}
                  alt=""
                />
                <h2 className="font-normal text-base leading-6">Transit</h2>
              </div>

              <Image
                className="items-center ml-4"
                src={ArrowRight}
                width={8}
                height={12}
                alt=""
              />
            </div>
            <div className="fasilitas flex h-[40px] w-[220px] border-b-[1px] border-b-[#D0D0D0] mb-6 justify-between">
              <div className=" flex items-center">
                <Image
                  className="items-center mr-2"
                  src={Heart}
                  width={24}
                  height={24}
                  alt=""
                />
                <h2 className="font-normal text-base leading-6">Facilities</h2>
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
              <div className=" flex items-center">
                <Image
                  className="items-center mr-2"
                  src={Dollar}
                  width={24}
                  height={24}
                  alt=""
                />
                <h2 className="font-normal text-base leading-6">Price</h2>
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
    </>
  );
};

export default FilterCard;
