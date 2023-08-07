import logo from "./logo.svg";
import "./App.css";
import SocialMediaForm from "./components/SocialMediaForm";
import Results from "./components/Results";
import Transcribe from "./components/Transcribe";
import AtomicSpinner from "atomic-spinner";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useState, useRef } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [fromText, setFromText] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);
  const onSubmit = (data) => {
    getCaption(data);
    getTitle(data);
  };

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.1/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
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
  load();

  return (
    <div className="App flex flex-col justify-center align-center p-5 ">
      {loaded ? (
        <div className="main-content">
          <img src={logo} className="App-logo" alt="logo" />

          <ul className="flex gap-2">
            <li onClick={() => setFromText(true)}>From text</li>
            <li onClick={() => setFromText(false)}>From file</li>
          </ul>
          {fromText ? (
            <SocialMediaForm onSubmit={onSubmit} />
          ) : (
            <Transcribe setCaption={setCaption} setTitle={setTitle} />
          )}

          <Results title={title} caption={caption} />
        </div>
      ) : (
        <div className="loader-container">
          <AtomicSpinner />
        </div>
      )}
    </div>
  );
}

export default App;
