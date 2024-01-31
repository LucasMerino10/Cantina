import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/ChatContext";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./cantinaChat.scss";

function CantinaChat() {
  const dbMessages = useLoaderData();
  const { messages, setMessages, users, userId } = useGlobalContext();
  const { avatar } = users.find((e) => e.id === userId);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setMessages(dbMessages);
  }, []);

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter") {
      const date = new Date().toISOString().slice(0, 16).replace("T", " ");
      const message = {
        content: e.target.value,
        message_date: date,
        user_id: userId,
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
    }
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
        <img src={avatar} alt="" className="chat__footer__avatar" />
        <input
          type="text"
          className="chat__footer__input"
          placeholder="Send a message"
          value={userMessage}
          onChange={handleChange}
          onKeyDown={sendMessage}
        />
      </footer>
    </section>
  );
}

export default CantinaChat;
