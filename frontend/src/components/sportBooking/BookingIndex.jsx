import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import Session from "./Session";
import BookingFrom from "./BookingFrom";
import { getdiff_Bookings } from "../../apiEndpoints/booking";

const BookingIndex = ({ bookings }) => {
  const session_time = [
    "8:00 - 10:00",
    "10:00 - 12:00",
    "1:00 - 3:00",
    "3:00 - 5:00",
    "5:00 - 7:00",
    "7:00 - 9:00",
  ];
  const [sportType, setSportType] = useState("");
  const [activetabKey, setActivetabKey] = useState("1");
  const [tabPosition, setTabPosition] = useState("left");
  const updatesportType = (key) => {
    // console.log(key);
    const selectedItem = items.find((item) => {
      return item.key === key;
    });

    setSportType(selectedItem.label);
    setActivetabKey(key);
    setSportType(selectedItem.label);
    setActivetabKey(key);
  };

  const [infos, setInfos] = useState([]);

  const fetchBookings = async (sportType) => {
    try {
      const response = await getdiff_Bookings(sportType);
      // console.log(response.bookings);
      // Clear any previous messages

      if (response.isSuccess) {
        // Check if message has been shown already
        // message.success(response.message);

        setInfos(response.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    updatesportType(activetabKey);
  }, [activetabKey]);

  const handleTabChange = (key) => {
    // console.log(key);

    updatesportType(key);
    setActivetabKey(key);
  };
  const items = [
    {
      key: "1",
      label: "Tennis",
      children: (
        <Session
          session_time={session_time}
          sportType={sportType}
          infos={infos}
          fetchBookings={fetchBookings}
        />
      ),
    },
    {
      key: "2",
      label: "Swimming Pool",
      children: (
        <Session
          session_time={session_time}
          sportType={sportType}
          infos={infos}
          fetchBookings={fetchBookings}
        />
      ),
    },
    {
      key: "3",
      label: "Football",
      children: (
        <Session
          session_time={session_time}
          sportType={sportType}
          fetchBookings={fetchBookings}
          infos={infos}
        />
      ),
    },
    {
      key: "4",
      label: "Badminton",
      children: (
        <Session
          session_time={session_time}
          sportType={sportType}
          fetchBookings={fetchBookings}
          infos={infos}
        />
      ),
    },
    {
      key: "5",
      label: "Fitness",
      children: (
        <Session
          session_time={session_time}
          sportType={sportType}
          fetchBookings={fetchBookings}
          infos={infos}
        />
      ),
    },
  ];

  const updateTabPosition = () => {
    if (window.innerWidth < 668) {
      setTabPosition("top"); // Use top position for smaller screens
    } else {
      setTabPosition("left"); // Use left position for larger screens
    }
  };
  useEffect(() => {
    updateTabPosition(); // Set initial tab position

    // Add event listener for window resizing
    window.addEventListener("resize", updateTabPosition);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateTabPosition);
    };
  }, []);
  return (
    <Tabs
      items={items}
      tabPosition={tabPosition}
      size="large"
      activeKey={activetabKey}
      tabBarStyle={{
        borderBottom: "4px solid #7d2923", // Bottom border for the entire tab bar
      }}
      onChange={(key) => handleTabChange(key)}
      className="custom-tabs p-5"
    />
  );
};

export default BookingIndex;
