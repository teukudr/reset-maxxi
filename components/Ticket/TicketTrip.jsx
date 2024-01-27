import Image from "next/image";

import Box from "@/assets/fi_box.svg";
import ArrowRight from "@/assets/arrow_right.svg";
import { MdFlight } from "react-icons/md"
import { getDateFormat } from "@/utils/helper";

const TicketTrip = ({ flightOne, flightTwo }) => {
    console.log(flightOne);
    return (
        <>
            <div className="card-filter w-[268px] rounded-2xl mt-8 shadow-lg border-2 bg-white max-h-full">
                <div className="h-full mx-6 my-6 space-y-4">
                    <div className="inline-flex items-center mb-6 space-x-2">
                        <MdFlight className="text-xl text-bnr-primary" />
                        <h1 className="text-base font-medium leading-6">Your Flight</h1>
                    </div>
                    <div className="flex items-center p-5 space-x-2 border rounded-md border-bnr-primary">
                        <div className="inline px-3 py-1 text-white rounded-md bg-bnr-primary">1</div>
                        <div>
                            <p className="text-xs">
                                {flightOne.id ? getDateFormat(flightOne.departureDate) : null}
                            </p>
                            <p className="text-xs font-semibold">
                                {flightOne.city_from} {flightOne.id ? "→" : null} {flightOne.city_to}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-5 space-x-2 border rounded-md border-bnr-primary">
                        <div className="inline px-3 py-1 text-white rounded-md bg-bnr-primary">2</div>
                        <div>
                            <p className="text-xs">
                                {flightTwo.id ? getDateFormat(flightTwo.returnDate) : null}
                            </p>
                            <p className="text-xs font-semibold">
                                {flightTwo.city_to} {flightTwo.id ? "→" : null} {flightTwo.city_from}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketTrip