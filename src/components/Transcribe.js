import React from "react";

function Transcribe() {
  const transcribeFile = async (event) => {
    event.preventDefault();
    const fileElement = document.getElementById("file-upload");
    const file = fileElement.files[0];
    console.log(file);
    const formData = new FormData(event.target);
    const response = await fetch("http://localhost:5000/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((data) => console.log(data));
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
        <input id="file-upload" type="file" name="file" accept=".mp3" />
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
