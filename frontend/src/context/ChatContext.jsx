import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);
const GlobalContext = createContext();

function ChatContextProvider({ children }) {
  const [messages, setMessages] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedUsers, setLoggedUsers] = useState(null);

  const contextValue = useMemo(() => {
    return {
      socket,
      messages,
      setMessages,
      currentUser,
      setCurrentUser,
      loggedUsers,
      setLoggedUsers,
    };
  }, [
    socket,
    messages,
    setMessages,
    currentUser,
    setCurrentUser,
    loggedUsers,
    setLoggedUsers,
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
