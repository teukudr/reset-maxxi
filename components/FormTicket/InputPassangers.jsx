"use client";

import Image from "next/image";
import DewasaIcon from "@/assets/images/dewasa.svg";
import AnakIcon from "@/assets/images/anak.svg";
import BayiIcon from "@/assets/images/bayi.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInput } from "@/store/auth/slice";
import { FiX } from "react-icons/fi"

const Counter = ({ count, decrease, increase }) => {
    return (
        <div className="flex items-center max-w-full space-x-2 item">
            <button
                className="w-10 h-10 text-2xl border rounded-md border-bnr-primary text-bnr-primary"
                onClick={decrease}
                type="button"
            >
                -
            </button>
            <input
                type="text"
                name=""
                id=""
                className="h-10 text-center border rounded-md outline-none border-bnr-primary w-14"
                value={count}
                readOnly
            />
            <button
                className="w-10 h-10 text-2xl border rounded-md border-bnr-primary text-bnr-primary"
                onClick={increase}
                type="button"
            >
                +
            </button>
        </div>
    );
};

const InputPassangers = ({ onClose, name }) => {
    const [dewasaCount, setDewasaCount] = useState(0);
    const [bayiCount, setBayiCount] = useState(0);
    const [anakCount, setAnakCount] = useState(0);

    const dispatch = useDispatch();

    const decreaseHandler = (category) => {
        switch (category) {
            case "dewasa":
                setDewasaCount((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case "anak":
                setAnakCount((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case "bayi":
                setBayiCount((prev) => (prev > 0 ? prev - 1 : 0));
                break;
        }
    };

    const increaseHandler = (category) => {
        switch (category) {
            case "dewasa":
                setDewasaCount((prev) => prev + 1);
                break;
            case "anak":
                setAnakCount((prev) => prev + 1);
                break;
            case "bayi":
                setBayiCount((prev) => prev + 1);
                break;
        }
    };
    const handleSave = (e) => {
        e.preventDefault()
        const total = dewasaCount + anakCount + bayiCount;
        const data = {
            dewasaCount,
            anakCount,
            bayiCount,
            total
        };
        dispatch(addInput(data));
        onClose();
    };

    return (
        <div className="absolute px-5 py-2 bg-white border rounded-xl drop-shadow-md border-bnr-primary">
            <div onClick={onClose} className="inline-flex justify-end w-full text-xl cursor-pointer">
                <FiX />
            </div>
            <div className="flex items-center justify-between space-x-10 border-b-2">
                <div className="flex items-start space-x-4">
                    <Image src={DewasaIcon} alt="dewasa" width={12} height={12} />
                    <div>
                        <p className="text-sm font-bold">Dewasa</p>
                        <span className="text-xs text-[#8A8A8A]">(12 tahun keatas)</span>
                    </div>
                </div>
                <div className="flex items-center max-w-full space-x-2 item">
                    <Counter
                        count={dewasaCount}
                        decrease={() => decreaseHandler("dewasa")}
                        increase={() => increaseHandler("dewasa")}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between space-x-10 border-b-2">
                <div className="flex items-start space-x-4">
                    <Image src={AnakIcon} alt="anak" width={12} height={12} />
                    <div>
                        <p className="text-sm font-bold">Anak</p>
                        <span className="text-xs text-[#8A8A8A]">
                            (2 - 11 tahun keatas)
                        </span>
                    </div>
                </div>
                <div className="flex items-center max-w-full space-x-2 item">
                    <Counter
                        count={anakCount}
                        decrease={() => decreaseHandler("anak")}
                        increase={() => increaseHandler("anak")}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between space-x-10 border-b-2">
                <div className="flex items-start space-x-4">
                    <Image src={BayiIcon} alt="bayi" width={12} height={12} />
                    <div>
                        <p className="text-sm font-bold">Bayi</p>
                        <span className="text-xs text-[#8A8A8A]">(Dibawah 2 tahun)</span>
                    </div>
                </div>
                <div className="flex items-center max-w-full space-x-2 item">
                    <Counter
                        count={bayiCount}
                        decrease={() => decreaseHandler("bayi")}
                        increase={() => increaseHandler("bayi")}
                    />
                </div>
            </div>
            <div className="inline-flex justify-end w-full">
                <button
                    type="button"
                    className="px-4 py-2 mt-4 text-sm text-white border-transparent rounded-md font-mediumborder bg-bnr-primary hover:bg-purple-400 focus:outline-none focus-visible:ring-2"
                    onClick={handleSave}
                >
                    Simpan
                </button>
            </div>
        </div>
    );
};

export default InputPassangers;
