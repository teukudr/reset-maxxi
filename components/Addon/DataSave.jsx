import Image from "next/image";
import CloseCircle from "@/assets/x-circle.svg";


const DataSave = () => {
  return (
    <>
      <div className="flex justify-center w-full mx-auto data-save -mt-14">
        <div className="flex justify-center items-center w-[900px] h-[50px] rounded-lg bg-[#73CA5C] mx-2">
          <div className="flex items-center justify-center w-full p-2 font-medium text-white md:text-lg leading 7">
            Your data has been successfully saved
          </div>
        </div>

      </div>

    </>
  );
};

export default DataSave;
