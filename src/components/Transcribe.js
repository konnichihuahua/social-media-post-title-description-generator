import React from "react";
import { useState } from "react";
import FileUpload from "./FileUpload";

function Transcribe({ setCaption, setTitle, setResultIsLoaded }) {
  const [file, setFile] = useState(null);
  const transcribeFile = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    setResultIsLoaded(false);
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
      <FileUpload
        setCaption={setCaption}
        file={file}
        setFile={setFile}
        setTitle={setTitle}
        setResultIsLoaded={setResultIsLoaded}
      />
    </div>
  );
}

export default Transcribe;
