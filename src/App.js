import logo from "./logo.svg";
import "./App.css";
import SocialMediaForm from "./components/SocialMediaForm";
import Results from "./components/Results";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const onSubmit = (data) => {
    getCaption(data);
    getTitle(data);
  };

  const getTitle = (data) => {
    fetch(`http://localhost:5000/get/title/${data}`)
      .then((response) => response.json())
      .then((data) => setTitle(data.title));
  };
  const getCaption = (data) => {
    fetch(`http://localhost:5000/get/description/${data}`)
      .then((response) => response.json())
      .then((data) => setCaption(data.description));
  };
  return (
    <div className="App flex flex-col justify-center align-center p-5 ">
      <img src={logo} className="App-logo" alt="logo" />
      <SocialMediaForm onSubmit={onSubmit} />
      <Results title={title} caption={caption} />
    </div>
  );
}

export default App;
