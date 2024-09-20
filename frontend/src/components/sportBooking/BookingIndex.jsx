import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import Session from "./Session";
import BookingFrom from "./BookingFrom";

const BookingIndex = () => {
  const session_time = [
    "8:00 - 10:00",
    "10:00 - 12:00",
    "1:00 - 3:00",
    "3:00 - 5:00",
    "5:00 - 7:00",
    "7:00 - 9::00",
  ];
  const [sportType, setSportType] = useState("");
  const [activetabKey, setActivetabKey] = useState("1");

  const updatesportType = (key) => {
    // console.log(key);
    const selectedItem = items.find((item) => {
      return item.key === key;
    });

    setSportType(selectedItem.label);
    setActivetabKey(key);
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
      children: <Session session_time={session_time} sportType={sportType} />,
    },
    {
      key: "2",
      label: "Swimming Pool",
      children: <Session session_time={session_time} sportType={sportType} />,
    },
    {
      key: "3",
      label: "Football",
      children: <Session session_time={session_time} sportType={sportType} />,
    },
    {
      key: "4",
      label: "Badminton",
      children: <Session session_time={session_time} sportType={sportType} />,
    },
    {
      key: "5",
      label: "Fitness",
      children: <Session session_time={session_time} sportType={sportType} />,
    },
  ];

  // console.log(sportType);

  return (
    <Tabs
      items={items}
      tabPosition="left"
      size="large"
      activeKey={activetabKey}
      onChange={(key) => handleTabChange(key)}
    />
  );
};

export default BookingIndex;
