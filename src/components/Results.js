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
    <div className="results p-10">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h3 className="text-xl">Title:</h3>{" "}
        <div className="flex justify-center items-center">
          <div>{title}</div>
          <AiFillCopy
            className="h-10 w-10"
            onClick={() => copyContent(title)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center p-10">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl">Description:</h3>
          <div className="flex justify-center items-center">
            <div>{caption}</div>
            <AiFillCopy
              className="h-10 w-10"
              onClick={() => copyContent(caption)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
