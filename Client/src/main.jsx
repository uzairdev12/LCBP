import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Referrals from "./pages/Referrals";
import UpdateProfile from "./pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,

        children: [
          {
            path: "/login/:id",
            element: <Login />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [],
      },
      {
        path: "/referrals",
        element: <Referrals />,
      },
      {
        path: "/updateprofile",
        element: <UpdateProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
