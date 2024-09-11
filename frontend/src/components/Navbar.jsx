import React from "react";
import Logo from "../assets/mfulogo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div className="shadow-md bg-primary text-white duration-200">
        <div className="container py-3 sm:py-5">
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
              <ul className="hidden sm:flex items-center text-lg gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id} onClick={() => setnavmenu(menu.name)}>
                    <Link
                      to={menu.link}
                      className={`inline-block py-4 px-4 ${
                        navmenu === menu.name
                          ? "text-yellow-500"
                          : "hover:text-yellow-500"
                      }`}
                    >
                      {menu.name}
                    </Link>
                    {navmenu === menu.name ? (
                      <hr className="border-none w-full h-[3px] rounded-lg bg-yellow-500" />
                    ) : (
                      <></>
                    )}
                  </li>
                ))}
                <li>
                  <Link to={"/login"}>
                    <button className="inline-block py-4 px-4 hover:text-yellow-500">
                      Log in
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
