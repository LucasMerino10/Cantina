import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/ChatContext";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./cantinaChat.scss";

function CantinaChat() {
  const dbMessages = useLoaderData();
  const { messages, setMessages, loggedUser } = useGlobalContext();
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setMessages(dbMessages);
  }, []);

  const sendMessage = async (e) => {
    const date = new Date().toISOString().slice(0, 16).replace("T", " ");
    const message = {
      content: e.target.value,
      message_date: date,
      user_id: loggedUser.id,
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      }
    );
    if (response.status === 202) {
      message.id = messages[messages.length - 1].id + 1;
      setMessages([...messages, message]);
    }
    setUserMessage("");
  };

  return (
    <section className="chat">
      <section className="chat__messages">
        {messages &&
          messages.map((e) => (
            <ChatMessage
              key={e.id}
              date={e.message_date}
              message={e.content}
              messageUserId={e.user_id}
            />
          ))}
      </section>
      <footer className="chat__footer">
        <img
          src={loggedUser && loggedUser.avatar}
          alt=""
          className="chat__footer__avatar"
        />
        <input
          type="text"
          className="chat__footer__input"
          placeholder="Send a message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
        />
      </footer>
    </section>
  );
}

export default CantinaChat;
