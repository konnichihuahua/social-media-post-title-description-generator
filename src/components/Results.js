import React from "react";
import { AiFillCopy } from "react-icons/ai";
function Results({ title, caption }) {
  const copyContent = async (target) => {
    try {
      await navigator.clipboard.writeText(target);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="results p-10 flex flex-col gap-2">
      <div className="flex flex-col gap-2 items-center justify-center result">
        <h3 className="text-md min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Title:
        </h3>{" "}
        <div className="flex justify-center items-center">
          <div>{title}</div>
          <AiFillCopy
            className="h-10 w-10"
            onClick={() => copyContent(title)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center p-10 result">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-md min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Description:
          </h3>
          <div className="flex justify-center items-center">
            <div>{caption}</div>
            <div>
              <AiFillCopy
                className="h-10 w-10"
                onClick={() => copyContent(caption)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
