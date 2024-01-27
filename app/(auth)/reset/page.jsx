"use client"

import Image from "next/image"
import SideBackground from "@/assets/sidebackground.png"
import InputAuth from "@/components/InputAuth"
import { Form, Formik } from "formik"
import { ResetPasswordSchema } from "@/utils/validation"
import { asyncResetPassword } from "@/store/auth/slice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ResetPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const users = useSelector((state) => state.auth);
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

    const handleReset = (values) => {
        dispatch(asyncResetPassword(values));
        setSubmitButtonClicked(true);
    }

    useEffect(() => {
        if (submitButtonClicked && users.status === "Success") {
            toast.success(`Password reset successful`, {
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
                router.push("/reset")
            }, 1000);
        }
        if (submitButtonClicked && users.status === "error") {
            toast.error(`Failed to reset password`, {
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
                <div className="flex h-full max-w-full ">
                <div className="hidden w-1/3 h-full md:block">
                        
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-screen px-4 md:px-15 md:w-1/3">
                        <h1 className="w-full pb-6 text-2xl font-bold text-start">Reset Password</h1>
                        <Formik
                            initialValues={{
                                password: "",
                                confirmPassword: ""
                            }}
                            onSubmit={(values, {
                                resetForm }) => {
                                handleReset(values)
                                resetForm()
                            }}
                            validationSchema={ResetPasswordSchema}
                        >
                            {props => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit
                                } = props;
                                return (
                                    <Form className="flex flex-col w-full space-y-4">
                                        <InputAuth
                                            name="password"
                                            type="password"
                                            placeholder="New Password"
                                            value={values.password}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched.password}
                                            errors={errors.password}
                                        >
                                            Enter New Password
                                        </InputAuth>
                                        <InputAuth
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Retype Password"
                                            value={values.confirmPassword}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched.passwordConfirmation}
                                            errors={errors.passwordConfirmation}
                                        >
                                            Retype New Password
                                        </InputAuth>
                                        <button type="submit" className="px-6 py-3 text-sm text-white rounded-2xl bg-[#6A76B9]" disabled={isSubmitting}>Submit</button>
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

export default ResetPage
