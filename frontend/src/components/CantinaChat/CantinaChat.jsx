import { useState } from "react";
import { useGlobalContext } from "../../context/ChatContext";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./cantinaChat.scss";

function CantinaChat() {
  const { messages, setMessages, users, userId } = useGlobalContext();
  const { avatar } = users.find((e) => e.id === userId);
  const [userMessage, setUserMessage] = useState("");

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      const date = new Date().toISOString().slice(0, 19).replace("T", " ");
      const message = {
        id: messages.length + 1,
        content: e.target.value,
        message_date: date,
        user_id: userId,
      };
      setMessages([...messages, message]);
      setUserMessage("");
    }
  };
  return (
    <section className="chat">
      {messages &&
        messages.map((e) => (
          <ChatMessage
            key={e.id}
            date={e.message_date}
            message={e.content}
            messageUserId={e.user_id}
          />
        ))}
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
