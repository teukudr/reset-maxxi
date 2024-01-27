import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const ModalDate = ({ name }) => {
  
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <>
      <div className="">
        
          <Datepicker
            value={value}
            onChange={handleValueChange}
            useRange={false}
            showFooter={true}
            popoverDirection="down"
            primaryColor={"violet"}
            showCancelButton={true}
            configs={{
              inputFormat: "",
              footer: {
                apply: "Simpan",
              },
            }}
          />
      </div>
    </>
  );
};

export default ModalDate;
