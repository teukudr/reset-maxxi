"use client"

import { createContext, useContext, useEffect, useState } from "react";

const ComponentContext = createContext({})

export const CompContextProvider = ({ children }) => {
    const [showReturn, setShowReturn] = useState(false)
    // const [isDoubleClick, setIsDoubleClick] = useState(false);

    // useEffect(() => {
    //     // Load persisted data from local storage
    //     const persistedData = localStorage.getItem("componentContextData");
    //     if (persistedData) {
    //         const { showReturn: persistedShowReturn } = JSON.parse(persistedData);
    //         setShowReturn(persistedShowReturn);
    //     }
    // }, []);

    // useEffect(() => {
    //     // Persist the updated data to local storage
    //     localStorage.setItem(
    //         "componentContextData",
    //         JSON.stringify({ showReturn })
    //     );
    // }, [showReturn]);

    const handleToggle = () => {
        // if (isDoubleClick) {
        //     setShowReturn(!showReturn);
        //     setIsDoubleClick(false);
        // } else {
        //     setIsDoubleClick(true);
        //     setTimeout(() => {
        //         setIsDoubleClick(false);
        //     }, 300); //
        // }
        setShowReturn(!showReturn);
    }

    return (
        <ComponentContext.Provider value={{ handleToggle, showReturn }}>
            {children}
        </ComponentContext.Provider>
    )
}

export const useComponentContext = () => useContext(ComponentContext)
