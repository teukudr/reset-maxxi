"use client"

import Navbar from "@/components/Navbar";
import BreadCrumb from "../common/Breadcumb";
import Image from "next/image";
import Link from "next/link";
import Success from "@/assets/images/success.png"
import { getToken } from "@/utils/helper";

const getTicket = async (token) => {
    const response = await fetch("https://example-backend.up.railway.app/api/v1/eticket", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}

const SuccessSection = () => {
    const token = getToken();

    const handlePrintTiket = (e) => {
        e.preventDefault();
        getTicket(token)
    }
    return (
        <>
            <div className="h-full max-w-full">
                <Navbar />
                <section>
                    <div className="flex items-center w-full h-32 px-5 bg-white shadow-md md:px-72">
                        <BreadCrumb />
                    </div>
                </section>
                <section className="flex flex-col items-center justify-center mt-20 space-y-10">
                    <Image src={Success} alt="succes" />
                    <div className="text-center">
                        <p className="font-medium text-bnr-primary">Congratulations!</p>
                        <h3 className="font-medium">Ticket Payment Transaction Successful!</h3>

                        <form onSubmit={handlePrintTiket}>
                            <button className="w-full py-2 mt-5 text-white rounded-lg bg-bnr-primary" type="submit">Generate E-Ticket</button>
                        </form>

                        <div>
                            <Link href={"/"}>
                                <button className="bg-[#D0B7E6] w-full text-white rounded-lg py-2 mt-2">Search for another flight</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SuccessSection;
