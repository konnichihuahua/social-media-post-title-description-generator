import logo from "./logo.svg";
import "./App.css";
import SocialMediaForm from "./components/SocialMediaForm";
import Results from "./components/Results";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_URL,
  });
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);

  const onSubmit = (data) => {
    getCaption(data);
    getTitle(data);
  };

  const getTitle = (data) => {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a youtube shorts title about ${data}. Make it only 5 words.`,
          },
        ],
      })
      .then((result) => {
        console.log(result.data.choices[0].message.content);
        const newTitle = result.data.choices[0].message.content;
        setTitle(newTitle);
      });
  };
  const getCaption = (data) => {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a 1 sentence tiktok caption about ${data}. Write like a native english speaker. Then add relevant hashtags. Hashtags must be in lowercase. Add the hashtag #degreefree, #college, #collegetips, #jobs, #jobsearch, #jobhunt, #jobhunting.`,
          },
        ],
      })
      .then((result) => {
        console.log(result.data.choices[0].message.content);
        const newCaption = result.data.choices[0].message.content;
        setCaption(newCaption);
      });
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
