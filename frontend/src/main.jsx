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
      const dbMessages = await messageResult.json();
      return dbMessages;
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChatContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChatContextProvider>
);
