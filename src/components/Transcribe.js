import React from "react";
import { useState } from "react";
function Transcribe({ setCaption, setTitle }) {
  const transcribeFile = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch("http://localhost:5000/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((data) => {
        setTitle(data.caption[0]);
        setCaption(data.caption[1]);
      });
  };

  return (
    <form
      id="transcription-form"
      encType="multipart/form-data"
      onSubmit={transcribeFile}
    >
      <div>
        <label>
          <b>Select file:</b>
        </label>
        <input id="file-upload" type="file" name="file" accept=".mp4" />
      </div>
      <input
        type="submit"
        className="p-5 bg-blue-500 rounded-2xl"
        value="transcribe"
      ></input>
    </form>
  );
}

export default Transcribe;
