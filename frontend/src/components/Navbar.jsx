import React from "react";
import Logo from "../assets/mfulogo.png";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { message } from "antd";
import {
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "News",
    link: "/news",
  },
  {
    id: 3,
    name: "About",
    link: "/about",
  },
];

const Navbar = () => {
  const [navmenu, setnavmenu] = useState("Home");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openmenu, setOpenmenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const LogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate(" ");
    message.success("Your account has logged out");
    setProfileMenu(false);
  };

  const menuhandler = () => {
    setOpenmenu(!openmenu);
    // console.log(openmenu);
  };
  const openprofileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  const profilepage = () => {
    navigate("/user-profile");
    setProfileMenu(!profileMenu);
  };
  const bookingpage = () => {
    navigate("/booking");
    setProfileMenu(!profileMenu);
  };
  // console.log(user);
  return (
    <>
      <div className="shadow-md bg-primary text-white duration-200">
        <div className="py-1 sm:py-2 lg:px-10 px-4">
          <div className="flex justify-between items-center">
            <div onClick={() => setnavmenu("Home")}>
              <Link
                to={Menu[0].link}
                className="text-base justify-center items-center sm:text-xl flex gap-2"
              >
                <img src={Logo} alt="Logo" className="w-11" />
                MFU
                <br /> Sports Complex
              </Link>
            </div>

            <div className="flex justify-between items-center gap-4">
              <ul className="hidden lg:flex items-center text-lg gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id} onClick={() => setnavmenu(menu.name)}>
                    <Link
                      to={menu.link}
                      className={`inline-block py-4 px-4 ${
                        navmenu === menu.name && location.pathname === menu.link
                          ? "text-yellow-500"
                          : "hover:text-yellow-500"
                      }`}
                    >
                      {menu.name}
                    </Link>
                    {navmenu === menu.name &&
                      location.pathname === menu.link && (
                        <hr className="border-none w-full h-[3px] rounded-lg bg-yellow-500" />
                      )}
                  </li>
                ))}
              </ul>
            </div>

            {/* /// */}
            <div className="hidden lg:flex">
              {user === null && (
                <Link to={"/login"}>
                  <button
                    className={`inline-block p-2 order-1 text-md font-semibold rounded-md px-4 cursor-pointer ${
                      location.pathname === "/login"
                        ? "bg-black text-white"
                        : "text-red-900 bg-white hover:text-red-700"
                    }`}
                  >
                    Sign in
                  </button>
                </Link>
              )}
              {/* {user && (
                <button
                  className="inline-block py-4 px-4 hover:text-yellow-500"
                  onClick={LogoutHandler}
                >
                  Logout
                </button>
              )} */}
              {user && (
                <div className="flex items-center gap-2 ">
                  <UserIcon
                    className="w-8 h-8 cursor-pointer hover:text-gray-500"
                    onClick={openprofileMenu}
                  />
                  {/* <p>{user.username}</p> */}
                </div>
              )}
            </div>

            {openmenu ? (
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={menuhandler}
              />
            ) : (
              <Bars3Icon
                className="text-white lg:hidden w-[30px] cursor-pointer"
                onClick={menuhandler}
              />
            )}
            {/* /// */}
          </div>
        </div>
      </div>

      {/* /tags for profile/ */}
      {user && profileMenu && (
        <div className="absolute right-4 bg-red-800 w-80 rounded-lg">
          {/* / */}
          <div
            className="p-4 flex items-center gap-5 cursor-pointer hover:bg-red-900 "
            onClick={profilepage}
          >
            <UserCircleIcon className="w-7 text-white" />
            <p className="text-white font-semibold cursor-pointer">Profile</p>
          </div>
          {/* / */}
          <div
            className="p-4 flex items-center gap-5 hover:bg-red-900 cursor-pointer"
            onClick={bookingpage}
          >
            <ArrowPathIcon className="w-7 text-white " />
            <p className="text-white font-semibold cursor-pointer">Booking</p>
          </div>
          {/*  */}
          <hr className="w-[90%] mx-auto" />
          <div
            className="p-4 flex items-center gap-5 hover:bg-red-900 cursor-pointer"
            onClick={LogoutHandler}
          >
            <ArrowRightStartOnRectangleIcon className="w-7 text-white" />
            <button className="font-semibold  text-white">Log out</button>
          </div>
        </div>
      )}
      {/* //// */}
      {/* sidebar */}
      {openmenu && (
        <div className="absolute bg-red-600 h-screen w-fit right-0 z-100">
          <div className="flex justify-between items-center gap-4">
            <ul className=" lg:flex items-center text-sm gap-4">
              {Menu.map((menu) => (
                <li key={menu.id} onClick={() => setnavmenu(menu.name)}>
                  <Link
                    to={menu.link}
                    className={`inline-block py-1 px-4 ${
                      navmenu === menu.name && location.pathname === menu.link
                        ? "text-yellow-500"
                        : "hover:text-yellow-500"
                    }`}
                  >
                    {menu.name}
                  </Link>
                  {navmenu === menu.name && location.pathname === menu.link && (
                    <hr className="border-none w-full h-[3px] rounded-lg bg-yellow-500" />
                  )}
                </li>
              ))}
              <li>
                {user === null && (
                  <div className="flex items-center justify-center">
                    <Link to={"/login"}>
                      <button className="inline-block py-1 px-1 hover:text-yellow-500 ">
                        Sign in
                      </button>
                      {location.pathname === "/login" && (
                        <hr className="border-none w-full h-[3px] rounded-lg bg-yellow-500" />
                      )}
                    </Link>
                  </div>
                )}
                {user && (
                  <button
                    className="inline-block py-4 px-4 hover:text-yellow-500"
                    onClick={LogoutHandler}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
