import Image from "next/image";
import IconLocation from "@/assets/icon-location.svg";
import ArrowLong from "@/assets/long-arrow.svg";
import { getDateFormat, getMoneyFormat, getFlightDuration } from "@/utils/helper";

const RiwayatBulan = ({ data, handleChooseTicket }) => {
  return (
    <>
      <div className="riwayat-month mx-2">
        {/* <div className="font-bold text-base leading-6 my-3">Bulan 2023</div> */}
        <div
          className="card-riwayat sm:w-[468px] h-full border-2 rounded-xl shadow cursor-pointer hover:border-[#7126B5] my-3"
          onClick={() => handleChooseTicket(data.id)}
        >
          <div className="content mx-3.5 my-3">
            <div className="label w-[70px] h-[28px] bg-[#73CA5C] rounded-xl flex justify-center items-center">
              {" "}
              <span className="ticket-status flex text-white text-sm leading-5">
                Issued
              </span>{" "}
            </div>
            <h1 className="mt-2 text-sm font-semibold text-bnr-primary">
              Departure Ticket
            </h1>
            <div className="info flex mt-2 justify-between border-b-2 pb-4">
              <div className="keberangkatan flex">
                <div className="mr-3">
                  <Image
                    className=""
                    src={IconLocation}
                    width={16}
                    height={20}
                    alt=""
                  />
                </div>
                <div>
                  <div className="font-bold text-sm leading-5">
                    {data?.departureTicket?.city_from}
                  </div>
                  <div className="font-medium text-xs">
                    {getDateFormat(data?.departureTicket?.dateDeparture)}
                  </div>
                  <div className="font-medium text-xs">
                    {data?.departureTicket?.dateTakeoff}
                  </div>
                </div>
              </div>
              <div className="time justify-center items-center my-auto">
                <div className="font-medium text-xs text-[#3C3C3C] my-auto text-center">
                  {getFlightDuration(data?.departureTicket?.dateTakeoff, data?.departureTicket?.dateLanding)}
                </div>
                <div>
                  <Image
                    className="h-4"
                    src={ArrowLong}
                    width={164}
                    height={3}
                    alt=""
                  />
                </div>
              </div>
              <div className="destination flex">
                <div className="mr-3">
                  <Image
                    className=""
                    src={IconLocation}
                    width={16}
                    height={20}
                    alt=""
                  />
                </div>
                <div>
                  <div className="font-bold text-sm leading-5">
                    {data?.departureTicket?.city_to}
                  </div>
                  <div className="font-medium text-xs">
                    {getDateFormat(data?.departureTicket?.dateEnd)}
                  </div>
                  <div className="font-medium text-xs">
                    {data?.departureTicket?.dateLanding}
                  </div>
                </div>
              </div>
            </div>
            {/* return ticket */}
            {data?.returnTicket ? (
              <>
                <h1 className="mt-2 text-sm font-semibold text-bnr-primary">
                  Return Ticket
                </h1>
                <div className="info flex mt-2 justify-between border-b-2 pb-4">
                  <div className="keberangkatan flex">
                    <div className="mr-3">
                      <Image
                        className=""
                        src={IconLocation}
                        width={16}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="font-bold text-sm leading-5">
                        {data?.returnTicket?.city_from}
                      </div>
                      <div className="font-medium text-xs">
                        {getDateFormat(data?.returnTicket?.dateDeparture)}
                      </div>
                      <div className="font-medium text-xs">
                        {data?.returnTicket?.dateTakeoff}
                      </div>
                    </div>
                  </div>
                  <div className="time justify-center items-center my-auto">
                    <div className="font-medium text-xs text-[#3C3C3C] my-auto text-center">
                      {getFlightDuration(data?.returnTicket?.dateTakeoff, data?.returnTicket?.dateLanding)}
                    </div>
                    <div>
                      <Image
                        className="h-4"
                        src={ArrowLong}
                        width={164}
                        height={3}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="destination flex">
                    <div className="mr-3">
                      <Image
                        className=""
                        src={IconLocation}
                        width={16}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="font-bold text-sm leading-5">
                        {data?.returnTicket?.city_to}
                      </div>
                      <div className="font-medium text-xs">
                        {getDateFormat(data?.returnTicket?.dateEnd)}
                      </div>
                      <div className="font-medium text-xs">
                        {data?.returnTicket?.dateLanding}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            <div className="info flex justify-between mt-2">
              <div className="booking-code">
                <div className="text-xs font-bold mb-px">Booking Code:</div>
                <div className="text-xs font-normal">
                  {data?.departureTicket?.booking_code}
                </div>
              </div>
              <div className="class">
                <div className="text-xs font-bold mb-px">Class:</div>
                <div className="text-xs font-normal">
                  {data?.departureTicket?.type_seat}
                </div>
              </div>
              <div className="price my-auto">
                <div className="text-sm font-bold text-[#4B1979]">
                  IDR {getMoneyFormat(data?.departureTicket?.price)}
                </div>
              </div>
            </div>
            {data?.returnTicket ? (
              <div className="info flex justify-between mt-2">
                <div className="booking-code">
                  <div className="text-xs font-bold mb-px">Booking Code:</div>
                  <div className="text-xs font-normal">
                    {data?.returnTicket?.booking_code}
                  </div>
                </div>
                <div className="class">
                  <div className="text-xs font-bold mb-px">Class:</div>
                  <div className="text-xs font-normal">
                    {data?.returnTicket?.type_seat}
                  </div>
                </div>
                <div className="price my-auto">
                  <div className="text-sm font-bold text-[#4B1979]">
                    IDR {getMoneyFormat(data?.returnTicket?.price)}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default RiwayatBulan;
