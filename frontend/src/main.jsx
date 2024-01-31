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
