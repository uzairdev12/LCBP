import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster richColors position="bottom-left" closeButton />
      <Outlet />
    </>
  );
};

export default App;
