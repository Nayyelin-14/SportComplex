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
import ResponsiveMenu from "./ResponsiveMenu";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "News",
    link: `/news`,
  },
  {
    id: 3,
    name: "Booking",
    link: "/booking",
  },
  {
    id: 4,
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

  const profilepage = (userID) => {
    navigate(`/user-profile/${userID}`);
    setProfileMenu(!profileMenu);
  };
  const bookingpage = () => {
    navigate("/booking");
    setProfileMenu(!profileMenu);
  };
  const Adminprofilepage = () => {
    navigate("/admin");
    setProfileMenu(!profileMenu);
  };
  // console.log(user);
  return (
    <>
      <div className="shadow-md bg-primary text-white duration-200 py-2 relative z-50">
        <div className="py-1 sm:py-2 lg:px-10 px-4">
          <div className="flex justify-between items-center z-50">
            <div onClick={() => setnavmenu("Home")}>
              <Link
                to={Menu[0].link}
                className="justify-center items-center flex gap-2"
              >
                <img src={Logo} alt="Logo" className="w-12" />
                <div>
                  <h1 className="text-base sm:text-xl">MFU</h1>
                  <p className="text-sm sm:text-base text-yellow-500 font-bold">
                    Sports Complex
                  </p>
                </div>
              </Link>
            </div>

            {user &&
              ["Student", "Lecturer", "Staff", "Outsider"].includes(
                user.role
              ) && (
                <div className="flex justify-between items-center gap-4">
                  <ul className="hidden lg:flex items-center text-lg gap-4">
                    {Menu.map((menu) => (
                      <li key={menu.id} onClick={() => setnavmenu(menu.name)}>
                        <Link
                          to={menu.link}
                          className={`inline-block py-4 px-4 ${
                            navmenu === menu.name &&
                            location.pathname === menu.link
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
              )}

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
              {user &&
              user.role !== "Admin" &&
              user.profileImage &&
              user.profileImage.length > 0 ? (
                <div className="flex items-center gap-2 ">
                  <img
                    src={user.profileImage[user.profileImage.length - 1]}
                    alt=""
                    className="w-14 h-14 p-1 border-2 border-gray-600 rounded-full object-cover cursor-pointer "
                    onClick={openprofileMenu}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 ">
                  <UserIcon
                    className="w-8 h-8 cursor-pointer hover:text-gray-500"
                    onClick={openprofileMenu}
                  />
                </div>
              )}
            </div>

            {openmenu ? (
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer z-50"
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
        <div className="absolute right-4 bg-primary w-80 rounded-lg z-[9999] hidden lg:block">
          {/* / */}

          {user && user.role === "Admin" && (
            <div
              className="p-4 flex items-center gap-5 cursor-pointer hover:bg-red-900 "
              onClick={Adminprofilepage}
            >
              <UserCircleIcon className="w-7 text-white" />
              <p className="text-white font-semibold cursor-pointer">
                Dashboard
              </p>
            </div>
          )}
          {user &&
            ["Student", "Staff", "Lecturer", "Outsider"].includes(
              user.role
            ) && (
              <>
                <div
                  className="p-4 flex items-center gap-5 cursor-pointer hover:bg-red-900 "
                  onClick={() => profilepage(user._id)}
                >
                  <UserCircleIcon className="w-7 text-white" />
                  <p className="text-white font-semibold cursor-pointer">
                    Profile
                  </p>
                </div>
              </>
            )}
          <div
            className="p-4 flex items-center gap-5 hover:bg-red-900 cursor-pointer"
            onClick={bookingpage}
          >
            <ArrowPathIcon className="w-7 text-white " />
            <p className="text-white font-semibold cursor-pointer">Booking</p>
          </div>
          {/* //// */}
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
        <ResponsiveMenu
          openmenu={openmenu}
          setOpenmenu={setOpenmenu}
          Menu={Menu}
          user={user}
          profilepage={profilepage}
          Adminprofilepage={Adminprofilepage}
          LogoutHandler={LogoutHandler}
        />
      )}
    </>
  );
};

export default Navbar;
