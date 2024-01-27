// "use client";

// import { addValue, auth } from "@/store/auth/slice";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Datepicker from "react-tailwindcss-datepicker";

// const InputDate = ({ name }) => {
//   const dispatch = useDispatch();
//   const valueSearch = useSelector(auth);
//   const [value, setValue] = useState({
//     startDate: null,
//     endDate: null,
//   });

//   const handleValueChange = (newValue) => {
//     // console.log("newValue:", newValue);
//     setValue(newValue);
//     dispatch(addValue(newValue))
//   };
//   return (
//     <>
//       {name === "inputDeparture" ? (
//         <div>
//           <Datepicker
//             name="inputDeparture"
//             placeholder={"Departure"}
//             asSingle={true}
//             inputClassName="border-b-2 border-b-bnr-secondary outline-none py-3 w-full"
//             value={value.startDate}
//             onChange={(newStartDate) =>
//               handleValueChange({ ...value, startDate: newStartDate })
//             }
//           />
//         </div>
//       ) : (
//         <div>
//           <Datepicker
//             name="inputReturn"
//             placeholder="Pilih tanggal"
//             asSingle={true}
//             inputClassName="border-b-2 border-b-bnr-secondary outline-none py-3 w-full"
//             value={value.endDate}
//             onChange={(newEndDate) =>
//               handleValueChange({ ...value, endDate: newEndDate })
//             }
//           />
//         </div>
//       )}
//     </>
//   );
// };
// export default InputDate;
