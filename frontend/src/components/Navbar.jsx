import React from "react";
import Logo from "../assets/mfulogo.png";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { message } from "antd";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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
  {
    id: 4,
    name: "Events",
    link: "/events",
  },
];

const Navbar = () => {
  const [navmenu, setnavmenu] = useState("Home");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openmenu, setOpenmenu] = useState(false);
  const LogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate(" ");
    message.success("Your account has logged out");
  };

  const menuhandler = () => {
    setOpenmenu(!openmenu);
    // console.log(openmenu);
  };
  // console.log(user);
  return (
    <>
      <div className="shadow-md bg-primary text-white duration-200">
        <div className="container py-1 sm:py-2">
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
                <li>
                  {user === null && (
                    <Link to={"/login"}>
                      <button className="inline-block py-4 px-4 hover:text-yellow-500 ">
                        Sign in
                      </button>
                      {location.pathname === "/login" && (
                        <hr className="border-none w-full h-[3px] rounded-lg bg-yellow-500" />
                      )}
                    </Link>
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

            {/* /// */}

            {openmenu ? (
              <XMarkIcon className="h-6 w-6 text-white" onClick={menuhandler} />
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
    </>
  );
};

export default Navbar;
