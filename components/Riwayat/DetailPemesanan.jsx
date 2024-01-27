import Image from "next/image";
import LogoMaskapai from "@/assets/logo-maskapai.svg";
import { getDateFormat, getMoneyFormat, getToken } from "@/utils/helper";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const getTicket = async (token, id) => {
  const response = await fetch("https://example-backend.up.railway.app/api/v1/eticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      checkoutId: id
    })
  })
  return await response.json()
}

const DetailPemesanan = ({ key, data, idTicket }) => {
  const token = getToken();

  const handlePrintTiket = (e) => {
    e.preventDefault();
    getTicket(token, data?.id);
    toast.success(`Ticket successfully printed, check your email`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <>
      {idTicket === data.id ? (
        <div
          className="mx-3 transition-all duration-500 ease-in-out content"
          key={key}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
          <div className="detail">
            <div className="flex justify-between detail-pesanan">
              <div className="text-lg font-bold leading-7">Ticket Details</div>
              <div className="label w-[70px] h-[28px] bg-[#73CA5C] rounded-xl flex justify-center items-center">
                {" "}
                <span className="flex text-sm leading-5 text-white ticket-status">
                  Issued
                </span>{" "}
              </div>
            </div>

            <div className="text-lg font-normal leading-7 code">
              <div className="p-2 my-5 text-white rounded-lg bg-bnr-primary">
                Departure Ticket
              </div>
              Booking Code:{" "}
              <span className="font-bold text-lg leading-7 text-[#7126B5]">
                {data?.departureTicket?.booking_code}
              </span>{" "}
            </div>
          </div>

          <div className="pb-4 mt-3 border-b-2 info-keberangkatan">
            <div className="departure ">
              <div className="flex justify-between">
                <div className="text-base font-bold leading-6 time">
                  {data?.departureTicket?.dateTakeoff}
                </div>
                <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                  Departure
                </div>
              </div>

              <div className="text-sm font-normal leading-5 date">
                {getDateFormat(data?.departureTicket?.dateDeparture)}
              </div>
              <div className="text-sm font-medium leading-5 airport">
                {data?.departureTicket?.airport_from}
              </div>
            </div>
          </div>

          <div className="pb-4 mb-4 border-b-2 info-airline">
            <div className="flex mt-2 detail-airline">
              <div className="my-auto logo">
                <img
                  className="items-center mr-2"
                  src={data.departureTicket.logo}
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="info">
                <div className="mb-4 airline">
                  <div className="text-sm font-bold leading-5 name">
                    {data?.departureTicket?.airlines} -{" "}
                    {data?.departureTicket?.type_seat}
                  </div>
                  <div className="text-sm font-bold leading-5 type">
                    {data?.departureTicket?.code}
                  </div>
                </div>
                <div className="text-sm font-bold leading-5">Information</div>
                {data?.passengers.map((item, index) => (
                  <>
                    <div className="penumpang">
                      <div className="nama text-sm font-medium text-[#4B1979]">
                        <span>Passangers {index + 1}:</span>
                        <span> {item.name}</span>
                      </div>
                      <div className="text-sm id">
                        <span>ID :</span>
                        <span>{item.id}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="pb-4 border-b-2 info-kedatangan">
            <div className="arrive">
              <div className="flex justify-between">
                <div className="text-base font-bold leading-6 time">{data?.departureTicket?.dateLanding}</div>
                <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                  Arrival
                </div>
              </div>

              <div className="text-sm font-normal leading-5 date">
                {getDateFormat(data?.departureTicket?.dateDeparture)}
              </div>
              <div className="text-sm font-medium leading-5 airport">
                {data?.departureTicket?.airport_to}
              </div>
            </div>
          </div>
          {data?.returnTicket ? (
            <div className="detail">
              <div className="text-lg font-normal leading-7 code">
                <div className="p-2 my-5 text-white rounded-lg bg-bnr-primary">
                  Return Ticket
                </div>
                Booking Code:{" "}
                <span className="font-bold text-lg leading-7 text-[#7126B5]">
                  {data?.returnTicket?.booking_code}
                </span>{" "}
              </div>
              <div className="pb-4 mt-3 border-b-2 info-keberangkatan">
                <div className="departure ">
                  <div className="flex justify-between">
                    <div className="text-base font-bold leading-6 time">
                      {data?.returnTicket?.dateTakeoff}
                    </div>
                    <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                      Departure
                    </div>
                  </div>

                  <div className="text-sm font-normal leading-5 date">
                    {getDateFormat(data?.returnTicket?.dateReturn)}
                  </div>
                  <div className="text-sm font-medium leading-5 airport">
                    {data?.returnTicket?.airport_from}
                  </div>
                </div>
              </div>
              <div className="pb-4 mb-4 border-b-2 info-airline">
                <div className="flex mt-2 detail-airline">
                  <div className="my-auto logo">
                    <img
                      className="items-center mr-2"
                      src={data?.returnTicket?.logo}
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <div className="mb-4 airline">
                      <div className="text-sm font-bold leading-5 name">
                        {data?.returnTicket?.airlines} -{" "}
                        {data?.returnTicket?.type_seat}
                      </div>
                      <div className="text-sm font-bold leading-5 type">
                        {data?.returnTicket?.code}
                      </div>
                    </div>
                    <div className="text-sm font-bold leading-5">Informasi</div>
                    {data?.passengers.map((item, index) => (
                      <>
                        <div className="penumpang">
                          <div className="nama text-sm font-medium text-[#4B1979]">
                            <span>Passangers {index + 1}:</span>
                            <span> {item.name}</span>
                          </div>
                          <div className="text-sm id">
                            <span>ID :</span>
                            <span>{item.id}</span>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pb-4 border-b-2 info-kedatangan">
                <div className="arrive">
                  <div className="flex justify-between">
                    <div className="text-base font-bold leading-6 time">
                      {data?.returnTicket?.dateLanding}
                    </div>
                    <div className="text-xs font-bold leading-5 text-[#A06ECE]">
                      Arrival
                    </div>
                  </div>

                  <div className="text-sm font-normal leading-5 date">
                    {getDateFormat(data?.returnTicket?.dateReturn)}
                  </div>
                  <div className="text-sm font-medium leading-5 airport">
                    {data?.returnTicket?.airport_to}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="mt-2 info-harga">
            <div className="pb-2 border-b-2 rincian">
              <div className="text-sm font-bold leading-5">Price Details</div>
              <div className="flex justify-between text-sm leading-5 ticket-adults">
                <div>
                  <span>
                    {data?.total_passenger}
                    {data?.total_passenger > 1 ? " Passengers" : " Passenger"}
                  </span>
                </div>
                <div>IDR {getMoneyFormat(data?.total_price)}</div>
              </div>
            </div>
            <div className="flex justify-between mt-4 total-harga">
              <div className="text-base font-bold leading-6">Total</div>
              <div className="font-bold text-lg leading-7 text-[#7126B5]">
                IDR {getMoneyFormat(data?.total_price)}
              </div>
            </div>
          </div>
          <form onSubmit={handlePrintTiket}>
            <div className="mt-8 button">
              <button type="submit" className="w-full h-[62px] text-xl leading-7 text-white bg-[#7126B5] rounded-xl">
                Generate E-Ticket
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default DetailPemesanan;
