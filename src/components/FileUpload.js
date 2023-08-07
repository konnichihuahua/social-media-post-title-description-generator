import React, { useState } from "react";

const FileUpload = ({ transcribeFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      id="transcription-form"
      encType="multipart/form-data"
      onSubmit={transcribeFile}
    >
      <label className="drop-container" id="dropcontainer">
        <span className="drop-title">Drop files here</span>
        or
        <input
          id="file-upload"
          type="file"
          name="file"
          accept=".mp4,.mp3"
          onChange={handleFileChange}
        />
        <input
          type="submit"
          value="Generate"
          className="text-xl min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </label>
    </form>
  );
};

export default FileUpload;
