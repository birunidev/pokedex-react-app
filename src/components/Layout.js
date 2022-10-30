import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
export default function Layout({ children }) {
  return (
    <div>
      <header className="relative z-20">
        <div>
          <div className="max-w-[90%] md:max-w-[80%] 2xl:max-w-[60%] mx-auto flex items-center justify-between py-6">
            <NavLink to="/">
              <img className="max-w-[141px]" src="/assets/logo.png" alt="" />
            </NavLink>
            <ul className="flex items-center space-x-[20px]">
              <li>
                <NavLink
                  end
                  style={({ isActive }) =>
                    isActive
                      ? {
                          fontWeight: "bold",
                        }
                      : undefined
                  }
                  className="text-[14px] md:text-[20px] outline-none"
                  to="/"
                >
                  All Pokemon
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          fontWeight: "bold",
                        }
                      : undefined
                  }
                  className={["text-[14px] md:text-[20px] outline-none"].join(
                    " "
                  )}
                  to="/favorites"
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="max-w-[80%] 2xl:max-w-[60%] mx-auto mt-5">
        <img
          src="/assets/bg.svg"
          className="fixed top-0 w-full h-full left-0 z-10"
          alt=""
        />
        <div className="relative z-30">{children}</div>
      </div>
    </div>
  );
}
