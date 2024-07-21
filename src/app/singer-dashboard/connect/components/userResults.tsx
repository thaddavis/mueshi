"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export function UserResults() {
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    async function anAsyncFunc() {
      const response = await fetch("/api/search-users");
      const { userResults } = await response.json();

      setUserResults(userResults);
    }

    anAsyncFunc();
  }, []);

  console.log("userResults", userResults);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {userResults.map((user, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {user?.email}
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <b>Genres: </b>&nbsp;
                  {user?.userToGenres?.map((genre, index) => {
                    console.log("genre?.genre?.name", genre?.genre?.name);
                    return (
                      <span key={index}>
                        {genre?.genre?.name}
                        {index !== user.userToGenres.length - 1 && ", "}
                      </span>
                    );
                  })}
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <b>Interests: </b>&nbsp;
                  {user?.userToInterests?.map((interest, index) => {
                    console.log(
                      "interest?.interest?.name",
                      interest?.interest?.name
                    );
                    return (
                      <span key={index}>
                        {interest?.interest?.name}
                        {index !== user.userToInterests.length - 1 && ", "}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{user?.role}</p>
              </div>
              <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                    >
                      Send Match Request
                      <span className="sr-only">, {user?.user?.email}</span>
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
