import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { useGlobalContext } from "../../context/ChatContext";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./cantinaChat.scss";

function CantinaChat() {
  const { dbMessages, dbUsers } = useLoaderData();
  const {
    socket,
    messages,
    setMessages,
    users,
    setUsers,
    currentUser,
    setLoggedUsers,
    userProfileDisplay,
    setUserProfileDisplay,
  } = useGlobalContext();
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setMessages(dbMessages);
    setUsers(dbUsers);
  }, []);

  useEffect(() => {
    socket.on("user_loggedIn", (data) => {
      setLoggedUsers(data);
    });

    socket.on("receive_message", (data) => {
      setMessages((previousMessages) => [...previousMessages, data]);
    });

    socket.on("user_loggedOut", (data) => {
      setLoggedUsers(data);
    });

    socket.on("fetch_users", async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`
      );
      const userResponse = await response.json();

      setUsers(userResponse);
    });
  }, [socket]);

  const sendMessage = async (e) => {
    const date = new Date().toISOString().slice(0, 16).replace("T", " ");
    const message = {
      content: e.target.value,
      message_date: date,
      user_id: currentUser.id,
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
      const data = await response.json();
      message.id = data;
      socket.emit("send_message", message);
    }
    setUserMessage("");
  };

  return (
    <section className={userProfileDisplay ? `chat chat--fade` : `chat`}>
      <section className="chat__messages">
        <ScrollToBottom className="chat__messages__container">
          {messages &&
            messages.map((e) => (
              <ChatMessage
                key={e.id}
                date={e.message_date}
                message={e.content}
                messageUserId={e.user_id}
                users={users}
                setUsers={setUsers}
              />
            ))}
        </ScrollToBottom>
      </section>
      <footer className="chat__footer">
        <button
          type="button"
          className="chat__footer__button"
          aria-label="toggle profile section"
          onClick={() => setUserProfileDisplay(!userProfileDisplay)}
        >
          <img
            src={currentUser && currentUser.avatar}
            alt=""
            className="chat__footer__avatar"
          />
        </button>
        <label htmlFor="sendMessage" className="chat__footer__label">
          Send a message
        </label>
        <input
          id="sendMessage"
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
