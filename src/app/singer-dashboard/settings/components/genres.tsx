import React, { useEffect } from "react";

import { useState } from "react";
import { genresList } from "@/src/app/singer-dashboard/shared-components/genresList";

export const Genres = () => {
  useEffect(() => {
    async function anAsyncFunc() {
      const response = await fetch("/api/genres");
      const { userGenres } = await response.json();

      const tmpList = new Array(genresList.length).fill(false);
      for (let genre in userGenres) {
        const genreIndex = genresList.findIndex(
          (genreItem) => genreItem.id === userGenres[genre].genreId
        );

        if (genreIndex !== -1) {
          tmpList[genreIndex] = true;
        }
      }

      setCheckedState(tmpList);
    }

    anAsyncFunc();
  }, []);

  const [checkedState, setCheckedState] = useState(
    new Array(genresList.length).fill(false)
  );

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <div>
      <h3 className="text-center text-lg font-bold">Select your genres</h3>
      <ul className="toppings-list list-none p-0 w-1/3 mx-auto sm:w-11/12">
        {genresList.map(
          (
            {
              name,
              id,
            }: {
              name: string;
              id: number;
            },
            index: number
          ) => {
            return (
              <li key={index} className="mb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`genres-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`genres-checkbox-${index}`}
                      className="ml-1"
                    >
                      {name}
                    </label>
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
      <button
        onClick={async () => {
          try {
            const selectedGenres = genresList.filter(
              (_, index) => checkedState[index]
            );

            const response = await fetch(`/api/genres`, {
              method: "POST",
              body: JSON.stringify({
                selectedGenres,
              }),
            });
          } catch (e) {}
        }}
        className="bg-blue-600 text-white rounded-md px-3 py-1.5 mt-4"
      >
        Save
      </button>
    </div>
  );
};
