import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ResponsiveMenu = ({ openmenu, setOpenmenu, Menu, user, LogoutHandler }) => {
  const [navmenu, setnavmenu] = useState(null);
  const location = useLocation();

  const handleNavigation = (link) => {
    setnavmenu(link);
    setOpenmenu(false); 
  };

  return (
    <>

      <div
        className={`${
          openmenu ? "top-20 opacity-100" : "top-[-100%] opacity-0"
        } h-auto w-full bg-white/40 backdrop-blur-md fixed top-0 z-40 transition-all duration-300 ease-in-out`}
      >
        <nav className="my-10 text-center text-lg ">
          <ul className="space-y-10">
            {Menu.map((menu) => (
              <li key={menu.id} onClick={() => handleNavigation(menu.name)}>
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
              {user === null ? (
                <div className="flex items-center justify-center">
                  <Link to={"/login"} onClick={() => setOpenmenu(false)}>
                    <button className="inline-block py-1 px-1 hover:text-yellow-500 ">
                      Sign in
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  className="inline-block py-4 px-4 hover:text-yellow-500"
                  onClick={LogoutHandler}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ResponsiveMenu;

