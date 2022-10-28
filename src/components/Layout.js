import React from "react";
import { Link } from "react-router-dom";
export default function Layout({ children }) {
  return (
    <div>
      <header className="relative z-20">
        <div>
          <div class="max-w-[90%] md:max-w-[80%] 2xl:max-w-[60%] mx-auto flex items-center justify-between py-6">
            <Link to="/">
              <img class="max-w-[141px]" src="/assets/logo.png" alt="" />
            </Link>
            <ul class="flex items-center space-x-[20px]">
              <li>
                <Link class="text-[14px] md:text-[20px] outline-none" to="/">
                  All Pokemon
                </Link>
              </li>
              <li>
                <Link
                  class="text-[14px] md:text-[20px] outline-none"
                  to="/favorites"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div class="max-w-[80%] 2xl:max-w-[60%] mx-auto mt-5">
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
