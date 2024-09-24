import React, { useState, useEffect } from "react";

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to format and get the current date
    const getCurrentDate = () => {
      const today = new Date();
      // console.log(today);
      const day = today.getDate();
      // console.log(day); // Get the current day
      const month = today.getMonth() + 1; // Get the current month (Months are 0-indexed)
      // console.log(month);
      const year = today.getFullYear(); // Get the current year
      // console.log(year);
      return `${day}/${month}/${year}`; // Format the date as DD/MM/YYYY
    };

    // Set the current date in state
    setCurrentDate(getCurrentDate());

    // Update the date at midnight to reflect the new day
    const timer = setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 1000 * 60 * 60 * 24); // Update every 24 hours (1 day)

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Today's Date: {currentDate}</h2>
    </div>
  );
};

export default DateDisplay;
