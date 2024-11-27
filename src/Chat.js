import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import './Chat.css';

function Chat() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  var userName = 'user';
  const [level, setLevel] = useState(1);

  const handleUserInput = (value) => {
    //console.log(value);
    setUserInput(value.target.value);
  };
  const genAI = new GoogleGenerativeAI("AIzaSyDmO9qD-286-jWcXpTOzYrlUW9CvtMh94M");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async (messageText) => {
    if (messageText.trim() === "") return;

    try {
      const prompt = messageText + "(respond to this prompt as a spanish language tutor would)";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: messageText },
        { type: "bot", message: text },
      ]);
      setUserInput("");
      setLevel(level+1);
      console.log(text);
    } catch (e) {
      console.log("Error occurred while fetching", e);
    }
  };

  return (
    <div >
      <div className='window'>
            <table className="interactive">
                <thead>
                    <tr>
                        <td colSpan={2}>Welcome to LangChat, <b id="nameTop">{userName}</b></td>
                        <td>Lang LV: {level}</td>
                    </tr>
                </thead>
                <tbody className="window-body">
                    <tr>
                        <td colSpan="2">
                            <div id="chat">
                                {chatHistory.map((elt, i) => (
                                    <p key={i} style={{
                                        marginLeft: elt.type === "user" ? "auto": 0, 
                                        marginRight: elt.type === "user" ? 0 : "auto",
                                        backgroundColor: elt.type === "user" ? "white" : "lightgrey"
                                        }}>
                                            {elt.type + ": " + elt.message}
                                    </p>
                                ))}
                            </div>
                        </td>

                        <td className="controls" colSpan="1">
                            <b>Actions:</b><br></br>
                            <button>Lessons</button><br></br>
                            <button>Settings</button><br></br>
                            <button disabled>Goodbye</button><br></br>
                            
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">
                            <textarea id="write" placeholder="enter questions here"
                            type="text" onChange={(value) => handleUserInput(value)} value={userInput}
                            />
                        </td>
                        <td colSpan={1}>
                            <button onClick={() => sendMessage(userInput)}>Send</button><br></br>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
  );
};

export default Chat;