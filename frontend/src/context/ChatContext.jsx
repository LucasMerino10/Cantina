import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);
const GlobalContext = createContext();

function ChatContextProvider({ children }) {
  const [messages, setMessages] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "HighGround",
      email: "obi.wan@email.com",
      avatar: "/src/assets/images/Obi-Wan.png",
      color: "blue",
    },
    {
      id: 2,
      username: "GreenGuy",
      email: "yoda@email.com",
      avatar: "/src/assets/images/Yoda.png",
      color: "green",
    },
    {
      id: 3,
      username: "ChokeMaster",
      email: "darth.vader@email.com",
      avatar: "/src/assets/images/Darth-Vader.png",
      color: "red",
    },
  ]);

  const [loggedUser, setLoggedUser] = useState(null);

  const contextValue = useMemo(() => {
    return {
      socket,
      messages,
      setMessages,
      users,
      setUsers,
      loggedUser,
      setLoggedUser,
    };
  }, [
    socket,
    messages,
    setMessages,
    users,
    setUsers,
    loggedUser,
    setLoggedUser,
  ]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};

export { ChatContextProvider, useGlobalContext };

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
