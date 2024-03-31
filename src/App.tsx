import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="w-full">
      <Header />
      <ToastContainer position="bottom-center" limit={1} />
      <main className="w-full">
        <div className="flex flex-col justify-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
