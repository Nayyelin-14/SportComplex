import React, { useEffect, useRef } from "react";
import Logo from "../assets/mfulogo.png";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTime, setUser } from "../store/userSlice";
import { message } from "antd";
import {
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ResponsiveMenu from "./ResponsiveMenu";
import usericon from "./Users/images/usericon.jpg";
const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "News", link: "/news" },

  { id: 3, name: "About", link: "/about" },
];

const Navbar = () => {
  const [navmenu, setnavmenu] = useState("Home");
  const { user } = useSelector((state) => state.user);

  const userImages = user?.profileImage || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);
  const [openmenu, setOpenmenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeTime");
    dispatch(setActiveTime(null));
    dispatch(setUser(null));
    navigate("/");
    message.success("Your account has logged out");
    setProfileMenu(false);
  };

  const menuhandler = () => {
    setOpenmenu(!openmenu);
  };

  const openprofileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  const profilepage = (userID) => {
    navigate(`/user-profile/${userID}`);
    setProfileMenu(false);
  };

  const bookingpage = () => {
    navigate("/booking");
    setProfileMenu(false);
  };

  const Adminprofilepage = () => {
    navigate("/admin");
    setProfileMenu(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="shadow-md bg-primary text-white duration-200 py-2 relative z-50">
        <div className="py-1 sm:py-2 lg:px-10 px-4">
          <div className="flex justify-between items-center">
            <div onClick={() => setnavmenu("Home")}>
              <Link to="/" className="justify-center items-center flex gap-2">
                <img src={Logo} alt="Logo" className="w-12" />
                <div>
                  <h1 className="text-base sm:text-xl">MFU</h1>
                  <p className="text-sm sm:text-base text-yellow-500 font-bold">
                    Sports Complex
                  </p>
                </div>
              </Link>
            </div>
            {user && (
              <div className="flex items-center gap-4">
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
            {/* User Profile / Login / Register */}

            <div className="hidden lg:block">
              {!user && (
                <>
                  {location.pathname === "/" ||
                  location.pathname === "/register" ? (
                    <Link to="/login">
                      <button className="rounded-md px-3.5 py-2 m-1 border-2 font-medium border-red-900 bg-white text-red-900">
                        Log In
                      </button>
                    </Link>
                  ) : location.pathname === "/login" ? (
                    <Link to="/register">
                      <button className="rounded-md px-3.5 py-2 m-1 border-2 font-medium border-red-900 bg-white text-red-900">
                        Sign Up
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </>
              )}

              {user && (
                <div ref={profileMenuRef}>
                  {userImages && userImages.length > 0 ? (
                    <img
                      src={userImages[userImages.length - 1]}
                      alt="Profile"
                      className="w-14 h-14 p-1 border-2 border-gray-600 rounded-full object-cover cursor-pointer"
                      onClick={openprofileMenu}
                    />
                  ) : (
                    <img
                      src={usericon}
                      alt="Profile"
                      className="w-14 h-14 p-1 border-2 border-gray-600 rounded-full object-cover cursor-pointer"
                      onClick={openprofileMenu}
                    />
                  )}
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
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      {user && profileMenu && (
        <div
          className="absolute right-4 bg-primary w-80 rounded-lg z-[9999] hidden lg:block"
          ref={profileMenuRef}
        >
          {user.role === "Admin" && (
            <div
              className="p-4 flex items-center gap-5 cursor-pointer hover:bg-red-900"
              onClick={Adminprofilepage}
            >
              <UserCircleIcon className="w-7 text-white" />
              <p className="text-white font-semibold">Dashboard</p>
            </div>
          )}
          {["Student", "Staff", "Lecturer", "Outsider"].includes(user.role) && (
            <div
              className="p-4 flex items-center gap-5 cursor-pointer hover:bg-red-900"
              onClick={() => profilepage(user._id)}
            >
              <UserCircleIcon className="w-7 text-white" />
              <p className="text-white font-semibold">Profile</p>
            </div>
          )}
          <div
            className="p-4 flex items-center gap-5 hover:bg-red-900 cursor-pointer"
            onClick={bookingpage}
          >
            <ArrowPathIcon className="w-7 text-white" />
            <p className="text-white font-semibold">Booking</p>
          </div>
          <hr className="w-[90%] mx-auto" />
          <div
            className="p-4 flex items-center gap-5 hover:bg-red-900 cursor-pointer"
            onClick={LogoutHandler}
          >
            <ArrowRightStartOnRectangleIcon className="w-7 text-white" />
            <button className="font-semibold text-white">Log out</button>
          </div>
        </div>
      )}

      {/* Responsive Sidebar */}
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
