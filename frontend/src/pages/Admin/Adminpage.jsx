import React, { useEffect, useState } from "react";
import Bookingdashboard from "../../components/admin/Bookingdashboard";
import UsersDashboard from "../../components/admin/UsersDashboard";
import CreateNews from "../../components/admin/CreateNews";
import ManageNews from "../../components/admin/ManageNews";
import { message, Tabs } from "antd";
import "../../custom.css";
import {
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getallBookings, getAllUsers } from "../../apiEndpoints/admin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Adminpage = () => {
  const navigate = useNavigate();
  const [allusers, setAllusers] = useState([]);
  const [allbookings, setAllbookings] = useState([]);
  const dispatch = useDispatch();
  const [isDataLoading, setIsDataLoading] = useState(true); // New state for initial data loading
  const fetchAllusers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setAllusers(response.allusers_DOC);
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchallbookings = async () => {
    try {
      setIsDataLoading(true);
      const response = await getallBookings();
      if (response.isSuccess) {
        setAllbookings(response.allBookings_doc);
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchAllusers();
    fetchallbookings();
  }, []);

  // Determine the screen size and adjust tab position
  const [tabPosition, setTabPosition] = useState("left");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 868) {
        setTabPosition("top");
      } else {
        setTabPosition("left");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <div className="sm:p-4 flex items-center sm:gap-2 text-[12px] sm:text-[14px] md:text-[16px] ">
          <ClipboardDocumentListIcon className="w-6 h-6  hidden md:block" />
          <p className="">Booking dashboard </p>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full hidden md:block">
            {allbookings.length}
          </span>
        </div>
      ),
      children: (
        <Bookingdashboard
          allbookings={allbookings}
          isDataLoading={isDataLoading}
          fetchallbookings={fetchallbookings}
        />
      ),
    },
    {
      key: "2",
      label: (
        <div className="sm:p-4 flex items-center sm:gap-2 text-[12px] sm:text-[14px] md:text-[16px] ">
          <UsersIcon className="w-6 h-6 hidden md:block" />
          <p>Manage Users</p>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full ml-8 hidden md:block">
            {allusers.length}
          </span>
        </div>
      ),
      children: (
        <UsersDashboard allusers={allusers} fetchAllusers={fetchAllusers} />
      ),
    },
    {
      key: "3",
      label: (
        <div className="sm:p-4 flex items-center sm:gap-2 text-[12px] sm:text-[14px] md:text-[16px] ">
          <InformationCircleIcon className="w-6 h-6 hidden md:block" />
          <p>Add News</p>
        </div>
      ),
      children: <CreateNews />,
    },
    {
      key: "4",
      label: (
        <div className="sm:p-4 flex items-center sm:gap-2 text-[12px] sm:text-[14px] md:text-[16px] ">
          <InformationCircleIcon className="w-6 h-6 hidden md:block" />
          <p>Manage News</p>
        </div>
      ),
      children: <ManageNews />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-10 sm:p-0">
      <h1 className="mx-3 my-3 sm:my-10 font-semibold text-md sm:text-lg">
        Admin dashboard
      </h1>
      <div className="mb-100 sm:mb-20 ">
        <Tabs items={items} className="font-medium" tabPosition={tabPosition} />
      </div>
    </section>
  );
};

export default Adminpage;
