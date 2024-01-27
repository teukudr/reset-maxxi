import { getToken } from "@/utils/helper";
// import { useSearchParams } from "next/navigation";

const BASE_URL = "https://example-backend.up.railway.app/api/v1/";
const token = getToken();
// eslint-disable-next-line react-hooks/rules-of-hooks


const AuthAPI = {
    register: async ({ name, email, password, phone }) => {
        const response = await fetch(BASE_URL + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone
            })
        })
        return await response.json();
    },
    login: async ({ email, password }) => {
        const response = await fetch(BASE_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        return await response.json();
    },
    forgotPassword: async ({ email }) => {
        const response = await fetch(BASE_URL + "forget-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })
        return await response.json()
    },
    otpVerify: async ({ otp }) => {
        console.log("otp", otp);
        const response = await fetch(BASE_URL + "verify-user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                otp
            })
        })
        return await response.json();
    },
    resetPassword: async ({ password, confirmPassword }) => {
        const urlParams = new URLSearchParams(window.location.search);

        const resetToken = urlParams.get('token');

        const response = await fetch(BASE_URL + "reset-password", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${resetToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                confirmPassword
            })
        })
        return await response.json()
    },
    whoAmI: async () => {
        const response = await fetch(BASE_URL + "whoami", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return await response.json()
    }
}

export default AuthAPI