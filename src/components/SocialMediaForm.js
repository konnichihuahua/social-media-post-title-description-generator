import React, { useState } from "react";

const SocialMediaForm = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() !== "") {
      onSubmit(description);
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="description">Write a caption and title about:</label>
        <input
          type="text"
          id="description"
          className="text-black p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mt-3">
        <button className="bg-blue-500 rounded-md px-5 py-3" type="submit">
          Generate
        </button>
      </div>
    </form>
  );
};

export default SocialMediaForm;
