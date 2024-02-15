import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";

import { ChatContextProvider, useGlobalContext } from "./context/ChatContext";
import App from "./App";
import Cantina from "./pages/Cantina/Cantina";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <Cantina />
      </PrivateRoute>
    ),
    loader: async () => {
      const messageResult = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages`
      );
      const userResult = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`
      );
      const dbMessages = await messageResult.json();
      const dbUsers = await userResult.json();
      return { dbMessages, dbUsers };
    },
  },
]);

function PrivateRoute({ children }) {
  const { currentUser } = useGlobalContext();

  if (currentUser) {
    return children;
  }
  return <Navigate to="/" />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChatContextProvider>
    <RouterProvider router={router} />
  </ChatContextProvider>
);

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
