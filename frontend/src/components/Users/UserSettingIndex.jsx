import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import "./TabBars.css";
import Editprofile from "./Editprofile";

const UserSettingIndex = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [tabPosition, setTabPosition] = useState("left"); // Default tab position
  const [isEditing, setIsEditing] = useState(false);
  const items = [
    {
      key: "1",
      label: (
        <p className="font-semibold sm:text-[19px] text-red-900 h-[50px] flex items-center">
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
        <p className="font-semibold sm:text-[19px] text-red-900 h-[50px] flex items-center">
          Password
        </p>
      ),
      children: "hi",
    },
    {
      key: "3",
      label: (
        <p className="font-semibold sm:text-[19px] text-red-900 h-[50px] flex items-center">
          Booking history
        </p>
      ),
      children: "hi",
    },
    {
      key: "4",
      label: (
        <p className="font-semibold sm:text-[19px] text-red-900 h-[50px] flex items-center">
          Edit Profile
        </p>
      ),
      children: "hi",
    },
  ];

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  // Update tab position based on screen width
  const updateTabPosition = () => {
    if (window.innerWidth < 768) {
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
