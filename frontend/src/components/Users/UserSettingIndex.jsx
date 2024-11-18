import { Tabs } from "antd";
import React, { useState, useEffect } from "react";

import Editprofile from "./Editprofile";
import BookingHistory from "./BookingHistory";
import Userimages from "./userimages";
import Resetpassword from "./Resetpassword";

const UserSettingIndex = ({ bookingshistory, fetchHistory }) => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [tabPosition, setTabPosition] = useState("left"); // Default tab position
  const [isEditing, setIsEditing] = useState(false);
  const items = [
    {
      key: "1",
      label: (
        <p className="text-[13px] sm:text-[15px] md:text-[18px] h-[50px] flex items-center">
          Edit Profile
        </p>
      ),
      children: (
        <div>
          <Editprofile setIsEditing={setIsEditing} />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p className="text-[13px] sm:text-[15px] md:text-[18px] h-[50px] flex items-center">
          Reset Password
        </p>
      ),
      children: (
        <div>
          <Resetpassword />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <p className="text-[13px] sm:text-[15px] md:text-[18px] h-[50px] flex items-center">
          Booking history
        </p>
      ),
      children: (
        <div>
          <BookingHistory
            bookingshistory={bookingshistory}
            setActiveTabKey={setActiveTabKey}
            fetchHistory={fetchHistory}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <p className="text-[13px] sm:text-[15px] md:text-[18px] h-[50px] flex items-center">
          Photos
        </p>
      ),
      children: (
        <div>
          <Userimages setActiveTabKey={setActiveTabKey} />
        </div>
      ),
    },
  ];

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  // Update tab position based on screen width
  const updateTabPosition = () => {
    if (window.innerWidth < 668) {
      setTabPosition("top"); // Use top position for smaller screens
    } else {
      setTabPosition("left"); // Use left position for larger screens
    }
  };

  useEffect(() => {
    updateTabPosition(); // Set initial position
    window.addEventListener("resize", updateTabPosition); // Update on resize

    return () => {
      window.removeEventListener("resize", updateTabPosition); // Clean up
    };
  }, []);

  return (
    <div>
      <Tabs
        items={items}
        tabPosition={tabPosition} // Use dynamic tab position
        size="large"
        activeKey={activeTabKey}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default UserSettingIndex;
