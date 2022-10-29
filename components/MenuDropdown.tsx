import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  InformationCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          as="div"
          className="
        inline-flex w-full justify-center rounded-sm  border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black
        focus-within:bg-blue-50
        hover:cursor-pointer
        hover:bg-gray-100 focus:bg-gray-100  focus:outline-none 
        active:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="
        absolute right-2 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl
        focus:outline-none
        "
        >
          <div className="divide-y py-2">
            <div className="main-sections h-40">
              <LinkItem
                href="/"
                label="Laman Utama"
                icon={<HomeIcon height={24} />}
              />
              <LinkItem
                href="/game"
                label="Main Permainan"
                icon={<PlayIcon height={24} />}
              />
            </div>

            <LinkItem
              href="/about"
              label="Tentang"
              icon={<InformationCircleIcon height={24} />}
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const LinkItem = ({ href, icon, label, ...rest }) => {
  return (
    <Menu.Item>
      <Link
        href={href}
        passHref
        legacyBehavior={false}
        className={classNames(
          `
        flex items-center px-4 py-2 text-sm text-gray-700
        hover:bg-gray-100
        `,
          rest?.className
        )}
        {...rest}
      >
        <span className="mr-1">{icon}</span>
        {label}
      </Link>
    </Menu.Item>
  );
};
