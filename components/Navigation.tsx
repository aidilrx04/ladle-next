import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/Navigation.module.scss";
import { Menu } from "@headlessui/react";
import MenuDropdown from "./MenuDropdown";
import AppName from "./AppName";
import Viewidth from "./Viewidth";

function Navigation() {
  return (
    <div className="z-50 shadow-sm">
      <Viewidth>
        <nav className="flex items-center justify-between py-2 px-2 ">
          <Link href="/">
            <a>
              <AppName />
            </a>
          </Link>
          <MenuDropdown />
          {/* <div className="nav-dropdown">
        <ul className="nav">
          <li>
            <Link href="/">Home</Link>
            <Link href="/game">Play Game</Link>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div> */}
        </nav>
      </Viewidth>
    </div>
  );
}

const LinkItem = ({ href, ...rest }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link className={`${active && "bg-blue-500"}`} href={href}>
          {rest.children}
        </Link>
      )}
    </Menu.Item>
  );
};
export default Navigation;
