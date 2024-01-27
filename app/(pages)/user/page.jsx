"use client"
import Image from "next/image";
import IconEdit from "@/assets/fi_edit.svg";
import IconSetting from "@/assets/fi_settings.svg";
import IconLogOut from "@/assets/fi_log-out.svg";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BackArrow from "@/assets/fi_arrow.svg";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { unSetAuthUser } from "@/store/auth/slice";

const getWhoAmI = async (token) => {
  const response = await fetch("https://example-backend.up.railway.app/api/v1/whoami", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return await response.json()
}

const UserPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [formValues, setFormValues] = useState({});
  const token = getToken();
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const user = await getWhoAmI(token);
    setData(user)
  }

  useEffect(() => {
    fetchUser()
  }, [token])

  const handleToggle = () => {
    setIsEdit(true)
  }

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
  };



  const handleSubmit = async (values) => {
    try {
      const response = await fetch("https://example-backend.up.railway.app/api/v1/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.fullName || data.name,
          phone: values.phoneNumber || data.phone,
        }),
      });

      if (response.ok) {
        // Update the data state with the new values
        setData({
          ...data,
          name: values.fullName,
          phone: values.phoneNumber || data.phone,
        });
        setIsEdit(false);
      } else {
        // Handle error
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(unSetAuthUser());
    router.push("/login");
  };

  // const validateForm = (values) => {
  //   const errors = {};

  //   if (!values.fullName) {
  //     errors.fullName = 'Nama Lengkap harus diisi';
  //   }

  //   if (!values.phoneNumber) {
  //     errors.phoneNumber = 'No Telepon harus diisi';
  //   }

  //   if (!values.email) {
  //     errors.email = 'Email harus diisi';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email = 'Email tidak valid';
  //   }

  //   return errors;
  // };

  console.log("data", data);
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-[968px]">
        <div className="ticket-section pb-4 border-b-2 drop-shadow-md mx-2">
          <div className="text-heading">
            <h1 className="text-xl font-bold leading-8 mt-12">Account</h1>
          </div>
          <div className="search flex flex-col sm:flex-row gap-4 mt-4">
            <div className="sm:w-full flex bg-[#A06ECE] h-[50px] rounded-xl items-center text-white font-medium text-base leading-6 gap-1">
              <Link href={"/"}>
                <div className="flex">
                  <Image
                    className="ml-3 mr-5"
                    src={BackArrow}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span>Homepage</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="main flex flex-col sm:flex-row mx-auto">
          <div className="user-section mt-12 flex flex-col sm:flex-row gap-x-4">
            <div className="sm:w-[370px]">
              <div className="content mx-2">
                <div className="flex font-medium text-base leading-6 border-b-2 pb-4 mb-4">
                  <Image
                    className="mr-4"
                    src={IconEdit}
                    width={24}
                    height={24}
                    alt=""
                  />
                  Edit Profile
                </div>
                <div className="flex font-medium text-base leading-6 border-b-2 pb-4 mb-4">
                  <Image
                    className="mr-4"
                    src={IconSetting}
                    width={24}
                    height={24}
                    alt=""
                  />
                  Account Settings
                </div>
                <div className="flex font-medium text-base leading-6 border-b-2 pb-4 cursor-pointer" onClick={handleLogout}>
                  <Image
                    className="mr-4"
                    src={IconLogOut}
                    width={24}
                    height={24}
                    alt=""
                  />
                  Logout
                </div>
                <div className="version font-normal text-xs leading-4 text-[#8A8A8A] mt-4 text-center">Version 1.1.0</div>
              </div>
            </div>
            <div className="sm:w-[550px] mx-2">
              <div className="card-ubah mx-4 border-2 shadow rounded">
                <div className="wrapper mx-4 mt-10">
                  <div className="font-bold text-xl leading-8 my-4">Edit Profile Data</div>
                  <div className="content">
                    <div className="rounded-t-lg bg-[#A06ECE] h-[40px] text-justify font-medium text-base text-white leading-6 px-4 py-2 ">Personal Information</div>
                    <div className="form">
                      <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                      // validate={validateForm}
                      >
                        <Form className="bg-white rounded px-8 py-6">
                          <div className="mb-4">
                            <label className="block text-sm text-[#4B1979] font-bold mb-2" htmlFor="fullName">Full Name</label>
                            <Field
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="fullName"
                              type="text"
                              name="fullName"
                              placeholder="Enter Full Name"
                              value={isEdit ? formValues.fullName : data.name}
                            />
                            {/* <ErrorMessage
                              className="text-red-500 text-xs italic"
                              name="fullName"
                              component="div"
                            /> */}
                          </div>
                          <div className="mb-4">
                            <label className="block text-[#4B1979] text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
                            <Field
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="phoneNumber"
                              type="text"
                              name="phoneNumber"
                              placeholder="Enter Phone Number"
                              value={isEdit ? formValues.phoneNumber : data.phone}
                            />
                            {/* <ErrorMessage
                              className="text-red-500 text-xs italic"
                              name="phoneNumber"
                              component="div"
                            /> */}
                          </div>
                          <div className="mb-4">
                            <label className="block text-[#4B1979] text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <Field
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              type="email"
                              name="email"
                              placeholder="Enter Email"
                              value={data.email}
                              disabled
                            />
                            {/* <ErrorMessage
                              className="text-red-500 text-xs italic"
                              name="email"
                              component="div"
                            /> */}
                          </div>
                          <div className="flex justify-center mt-8">
                            {isEdit && (<button
                              className="w-[150px] h-[48px] bg-[#4B1979] rounded-xl text-white text-base leading-6"
                              type="simpan"
                            >
                              Submit
                            </button>)
                            }
                          </div>
                        </Form>
                      </Formik>
                      <div className="flex justify-center">
                        {isEdit ? null : <button
                          className="w-[150px] h-[48px] bg-[#4B1979] rounded-xl text-white text-base leading-6"
                          type="button" onClick={handleToggle}
                        >
                          Edit
                        </button>}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
