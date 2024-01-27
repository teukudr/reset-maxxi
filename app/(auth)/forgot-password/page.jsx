"use client";

import Image from "next/image";
import SideBackground from "@/assets/sidebackground.png";
import InputAuth from "@/components/InputAuth";
import Link from "next/link";
import { Form, Formik } from "formik";
import { ForgotSchema } from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { asyncForget, asyncLogin, auth } from "@/store/auth/slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ForgotPage = () => {
    // const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.auth);

    const handleForgot = (formValue) => {
        dispatch(asyncForget(formValue));
        setSubmitButtonClicked(true);
    };

    useEffect(() => {
        if (submitButtonClicked && users.status === "Success") {
            toast.success(`Please check your email`, {
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
                router.push("/login")
            }, 1000);
        }
        if (submitButtonClicked && users.status === "error") {
            toast.error(`The email is not available`, {
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
    }, [users])

    console.log("errror", users.status);
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
                    <div className="hidden w-1/2 h-full md:block">
                        <Image src={SideBackground} alt="sidebackground" className="object-cover w-full h-screen" />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-screen px-4 md:px-32 md:w-1/2">
                        <h1 className="w-full pb-6 text-2xl font-bold text-start">Forgot Password</h1>
                        <Formik
                            initialValues={{
                                email: "",
                            }}
                            onSubmit={(values, { resetForm }) => {
                                handleForgot(values)
                                resetForm()
                            }}
                            validationSchema={ForgotSchema}
                        >
                            {props => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                } = props;
                                return (
                                    <Form className="flex flex-col w-full space-y-4">
                                        <InputAuth
                                            name="email"
                                            type="text"
                                            placeholder="Enter Email"
                                            value={values.email}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched.email}
                                            errors={errors.email}
                                        >
                                            Email
                                        </InputAuth>
                                        <button type="submit" className={!showAlert ? "px-6 py-3 text-sm text-white rounded-2xl bg-bnr-primary" : "px-6 py-3 text-sm text-slate-400 rounded-2xl bg-slate-300"} disabled={showAlert && false}>
                                            Submit
                                        </button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ForgotPage
