import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);
const GlobalContext = createContext();

function ChatContextProvider({ children }) {
  const [messages, setMessages] = useState(null);
  const [users, setUsers] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedUsers, setLoggedUsers] = useState(null);

  const colors = ["blue", "green", "red", "purple", "orange"];

  const avatars = [
    "/src/assets/images/Boba-Fett.png",
    "/src/assets/images/C3PO.png",
    "/src/assets/images/Chewbacca.png",
    "/src/assets/images/Darth-Vader.png",
    "/src/assets/images/Emperor.png",
    "/src/assets/images/Han-Solo.png",
    "/src/assets/images/Leia.png",
    "/src/assets/images/Luke-Skywalker.png",
    "/src/assets/images/Obi-Wan.png",
    "/src/assets/images/R2D2.png",
    "/src/assets/images/Stormtrooper.png",
    "/src/assets/images/Yoda.png",
  ];

  const contextValue = useMemo(() => {
    return {
      socket,
      messages,
      setMessages,
      users,
      setUsers,
      currentUser,
      setCurrentUser,
      loggedUsers,
      setLoggedUsers,
      avatars,
      colors,
    };
  }, [
    socket,
    messages,
    setMessages,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    loggedUsers,
    setLoggedUsers,
    avatars,
    colors,
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
