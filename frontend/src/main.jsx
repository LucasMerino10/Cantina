import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ChatContextProvider } from "./context/ChatContext";
import App from "./App";
import Cantina from "./pages/Cantina/Cantina";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Cantina />,
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

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChatContextProvider>
    <RouterProvider router={router} />
  </ChatContextProvider>
);
