import React from "react";
import Bookingdashboard from "../../components/admin/Bookingdashboard";
import UsersDashboard from "../../components/admin/UsersDashboard";
import CreateNews from "../../components/admin/CreateNews";
import { Tabs } from "antd";
import "../../custom.css";
import {
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
const Adminpage = () => {
  const items = [
    {
      key: "1",
      label: (
        <div className="p-4 flex items-center gap-2">
          <ClipboardDocumentListIcon className="w-6 h-6" />
          <p className="">Booking dashboard</p>
        </div>
      ),
      children: <Bookingdashboard />,
    },
    {
      key: "2",
      label: (
        <div className=" p-4 flex items-center gap-2">
          <UsersIcon className="w-6 h-6" />
          <p>Manage Users</p>
        </div>
      ),
      children: <UsersDashboard />,
    },

    {
      key: "3",
      label: (
        <div className=" p-4 flex items-center gap-2">
          <InformationCircleIcon className="w-6 h-6" />
          <p>Add News</p>
        </div>
      ),
      children: <CreateNews />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className=" my-10 font-semibold text-3xl">Admin dashboard</h1>
      <div className="mb-20">
        {" "}
        <Tabs items={items} className="font-medium" tabPosition="left"></Tabs>
      </div>
    </section>
  );
};

export default Adminpage;
