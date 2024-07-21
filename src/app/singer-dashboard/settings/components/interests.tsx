import React, { useEffect } from "react";

import { useState } from "react";
import { interestsList } from "@/src/app/singer-dashboard/shared-components/interestsList";

export const Interests = () => {
  useEffect(() => {
    async function anAsyncFunc() {
      const response = await fetch("/api/interests");
      const { userInterests } = await response.json();

      const tmpList = new Array(interestsList.length).fill(false);
      for (let interest in userInterests) {
        console.log("interest", interest);

        const interestIndex = interestsList.findIndex(
          (item) => item.id === userInterests[interest].interestId
        );

        if (interestIndex !== -1) {
          tmpList[interestIndex] = true;
        }
      }

      console.log("tmpList", tmpList);

      setCheckedState(tmpList);
    }

    anAsyncFunc();
  }, []);

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

          const selectedInterests = interestsList.filter(
            (_, index) => checkedState[index]
          );

          const response = await fetch(`/api/interests`, {
            method: "POST",
            body: JSON.stringify({
              selectedInterests,
            }),
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
