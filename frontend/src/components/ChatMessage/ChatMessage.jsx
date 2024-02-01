import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/ChatContext";
import "./chatMessage.scss";

function ChatMessage({ date, message, messageUserId }) {
  const { dbUsers } = useLoaderData();
  const { currentUser } = useGlobalContext();
  const user = dbUsers.find((e) => e.id === messageUserId);
  return (
    <figure
      className={
        user.id === currentUser.id
          ? `chat__message chat__message--user`
          : `chat__message chat__message--other`
      }
    >
      <img src={user.avatar} alt="" className="chat__avatar" />
      <figcaption
        className={
          user.id === currentUser.id
            ? `chat__content chat__content--user`
            : `chat__content chat__content--other`
        }
      >
        <p
          className={`chat__content__username--${user.color}`}
        >{`${user.username} (${date}) :`}</p>
        <p
          className={`chat__content__text chat__content__text--${
            user.id === currentUser.id ? "user" : "other"
          } ${user.color}`}
        >
          {message}
        </p>
      </figcaption>
    </figure>
  );
}

ChatMessage.propTypes = {
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  messageUserId: PropTypes.number.isRequired,
};

export default ChatMessage;
