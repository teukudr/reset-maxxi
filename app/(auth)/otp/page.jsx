"use client";

import Image from "next/image";
import SideBackground from "@/assets/sidebackground.png";
import InputAuth from "@/components/InputAuth";
import Link from "next/link";
import { Form, Formik } from "formik";
import { LoginSchema, OtpSchema } from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { asyncOtpVerify } from "@/store/auth/slice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { formatEmail, getEmail } from "@/utils/helper";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";

const OtpPage = () => {
    const dispatch = useDispatch();
    const [submit, setSubmit] = useState(false)
    const router = useRouter();
    const users = useSelector((state) => state.auth);
    const email = getEmail();

    const handleOtp = (value) => {
        console.log(value.otp);
        dispatch(asyncOtpVerify(value.otp));
        setSubmit(true)
    }

    useEffect(() => {
        if (submit && users.status === "Success") {
            toast.success(`Registration Successful`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                localStorage.removeItem("email")
                router.push("/login")
            }, 1000);
            return;
        }
        if (submit && users.status === "error") {
            toast.error(`Sorry, the OTP code is incorrect`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        // setSubmit(false)
    }, [users])

    return (
        <main>
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
            <section>
                <div className="flex h-full max-w-full">
                    <div className="flex flex-col items-center justify-center w-full h-screen px-4 md:px-32 space-y-10">
                        <h1 className="w-full pb-6 text-2xl font-bold text-center">Enter the OTP</h1>
                        <p className="text-center">Type the 6-digit code that was sent to <span className="font-bold">{formatEmail(email)}</span></p>
                        <Formik
                            initialValues={{
                                otp: ""
                            }}
                            validationSchema={OtpSchema}
                            onSubmit={(values) => {
                                handleOtp(values)
                            }}
                        >
                            {
                                ({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit
                                }) => (
                                    <form onSubmit={handleSubmit} className="">
                                        <OTPInput
                                            inputStyle={touched.otp && errors.otp ? "input-otp__error" : "input-otp"}
                                            value={values.otp}
                                            numInputs={6}
                                            renderInput={(props) => <input {...props} />}
                                            containerStyle="input-otp__container"
                                            onChange={handleChange('otp')}
                                            onBlur={handleBlur('otp')}

                                        />
                                        <button className="w-full bg-bnr-primary text-white py-2 rounded-lg mt-20" type="submit">Submit</button>
                                    </form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </section>
        </main >
    )
}

export default OtpPage
