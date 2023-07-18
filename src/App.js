import logo from "./logo.svg";
import "./App.css";
import SocialMediaForm from "./components/SocialMediaForm";
import Results from "./components/Results";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_URL,
  });
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);
  const sendToGPT = (data) => {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: ``,
          },
        ],
      })
      .then((result) => {
        console.log(result.data.choices[0].message.content);
        const gptResponse = result.data.choices[0].message.content;
      });
  };
  return (
    <div className="App App-header">
      <div className="">
        <img src={logo} className="App-logo" alt="logo" />
        <SocialMediaForm sendToGPT={sendToGPT} />
        <Results />
      </div>
    </div>
  );
}

export default App;
