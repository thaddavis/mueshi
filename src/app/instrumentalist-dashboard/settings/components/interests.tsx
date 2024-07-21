import React from "react";

import { useState } from "react";
import { interestsList } from "@/src/app/instrumentalist-dashboard/shared-components/interestsList";

export const Interests = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(interestsList.length).fill(false)
  );

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <div>
      <h3 className="text-center text-lg font-bold">Select your interests</h3>
      <ul className="list-none p-0 w-1/3 mx-auto sm:w-11/12">
        {interestsList.map(
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
                      id={`interests-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`interests-checkbox-${index}`}
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
          console.log("checkedState", checkedState);

          const response = await fetch(`/api/interests`, {
            method: "POST",
            body: JSON.stringify({}),
          });

          console.log("response", response);
        }}
        className="bg-blue-600 text-white rounded-md px-3 py-1.5 mt-4"
      >
        Save
      </button>
    </div>
  );
};
