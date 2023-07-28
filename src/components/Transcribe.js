import React from "react";

function Transcribe() {
  const transcribeFile = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log(formData);
    const response = await fetch("http://localhost:5000/transcribe", {
      method: "POST",
      body: formData,
    });

    console.log(response);
    const data = await response.json();

    if (data.transcription) {
      localStorage.setItem("transcription", data.transcription);
      localStorage.setItem("audioFileName", data.audioFileName);
      window.location.href = "/transcribe.html";
    } else {
      console.error("Error:", data.message);
    }
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
