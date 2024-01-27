import { useSearchParams } from "next/navigation";

export const getMoneyFormat = (number) => {
    return Number(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getDateFormat = (originalDate) => {
    const dateString = originalDate;
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate
}

export const getToken = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token")
        return token;
    }
}

export const getEmail = () => {
    if (typeof window !== "undefined") {
        const email = JSON.parse(localStorage.getItem("email"))
        return email;
    }
}

export const getBookingId = () => {
    if (typeof window !== "undefined") {
        const ticketId = JSON.parse(localStorage.getItem("booking"))
        return ticketId;
    }
}

export const getModal = () => {
    if (typeof window !== "undefined") {
        const passengerr = JSON.parse(localStorage.getItem("passengerr"))
        return passengerr;
    }
}

export const getCode = (value) => {
    let even = [];
    for (var i = 0; i < value.length; i++) {
        i % 2 === 0 && even.push(value[i])
    }
    return even.join("")
}

export const formatEmail = (email) => {
    const baseEmail = email.split("@");
    const firstCharacter = baseEmail[0].charAt(0);
    const leftCharacter = baseEmail[0].replace(`${baseEmail[0]}`, "*****")
    return `${firstCharacter}${leftCharacter}@${baseEmail[1]}`
}

export const getDurationFlight = (dateTakeoff, dateLanding) => {
    const takeoffTime = dateTakeoff;
    const landingTime = dateLanding;
    // Get current date
    const currentDate = new Date();

    // Extract hour and minute from the takeoff time
    const [takeoffHour, takeoffMinute] = takeoffTime.split(":").map(Number);

    // Create new date object for takeoff time
    const takeoffDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), takeoffHour, takeoffMinute, 0);

    // Format the takeoff date string as "YYYY-MM-DDTHH:MM:SS"
    const formattedTakeoffDateTime = takeoffDate.toISOString();

    // Extract hour and minute from the landing time
    const [landingHour, landingMinute] = landingTime.split(":").map(Number);

    // Create new date object for landing time
    const landingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), landingHour, landingMinute, 0);

    // Format the landing date string as "YYYY-MM-DDTHH:MM:SS"
    const formattedLandingDateTime = landingDate.toISOString();

    const takingOffConvert = new Date(formattedTakeoffDateTime);
    const landingConvert = new Date(formattedLandingDateTime);

    const durationInMilliseconds = landingConvert - takingOffConvert;
    const durationInMinutes = Math.floor(durationInMilliseconds / 60000);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const duration = `${hours} jam ${minutes} menit`;
}


export const getFlightDuration = (dateTakeoff, dateLanding) => {
    const takeoffTime = dateTakeoff;
    const landingTime = dateLanding;

    const currentDate = new Date();


    const [takeoffHour, takeoffMinute] = takeoffTime.split(":").map(Number);


    const takeoffDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), takeoffHour, takeoffMinute, 0);


    const formattedTakeoffDateTime = takeoffDate.toISOString();


    const [landingHour, landingMinute] = landingTime.split(":").map(Number);


    const landingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), landingHour, landingMinute, 0);


    const formattedLandingDateTime = landingDate.toISOString();

    const takingOffConvert = new Date(formattedTakeoffDateTime);
    const landingConvert = new Date(formattedLandingDateTime);

    const durationInMilliseconds = landingConvert - takingOffConvert;
    const durationInMinutes = Math.floor(durationInMilliseconds / 60000);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours} h ${minutes} m`;
};
