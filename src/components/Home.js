import React from "react";
import Welcomewindow from "./Welcomewindow";
import Login from "./Login";

const Home = () => {
  return (
    <div className="container">
      {localStorage.getItem("token") ? <div className="main-container">
          <Welcomewindow />
        </div> : <Login />}
    </div>
  );
};

export default Home;
