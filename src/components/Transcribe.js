import React from "react";
import { useState } from "react";
import FileUpload from "./FileUpload";

function Transcribe({ setCaption, setTitle, setResultIsLoaded }) {
  const transcribeFile = async (event) => {
    event.preventDefault();
    setResultIsLoaded(false);
    const formData = new FormData(event.target);
    const response = await fetch("http://localhost:5000/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((data) => {
        setTitle(data.caption[0]);
        setCaption(data.caption[1]);
        setResultIsLoaded(true);
      });
  };

  return (
    <div>
      <FileUpload transcribeFile={transcribeFile} />
    </div>
  );
}

export default Transcribe;
