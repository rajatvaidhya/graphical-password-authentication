import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [red, setRed] = useState("");
  const [yellow, setYellow] = useState("");
  const [green, setGreen] = useState("");

  const redClicked = () => {
    setRed(red + "ey8");
  };
  const yellowClicked = () => {
    setYellow(yellow + "vr9");
  };
  const greenClicked = () => {
    setGreen(green + "zpd2");
  };

  let pattern = red + green + yellow;

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rgbpattern: "",
  });
  credentials.rgbpattern = pattern;
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        rgbpattern: credentials.rgbpattern,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/Welcomewindow");
    } else {
      alert("Invalid credentials.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 style={{ color: "white" }}>Please login to continue.</h2>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="form-floating mb-3">
          <input
            type="username"
            className="form-control"
            id="username"
            onChange={onChange}
            value={credentials.username}
            name="username"
            placeholder="name@example.com"
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <h6 style={{ color: "white" }}>
          Click on the buttons to generate RYG Pattern :{" "}
        </h6>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" onClick={redClicked} className="btn btn-danger">
            Red
          </button>
          <button
            type="button"
            onClick={yellowClicked}
            className="btn btn-warning"
          >
            Yellow
          </button>
          <button
            type="button"
            onClick={greenClicked}
            className="btn btn-success"
          >
            Green
          </button>
        </div>

        <br />

        <div className="form-floating mb-1 my-3">
          <input
            className="form-control"
            type="password"
            onChange={onChange}
            value={pattern}
            placeholder="name@example.com"
          />
          <label htmlFor="password">RYG Pattern</label>
        </div>

        <button type="submit" className="my-3 btn btn-outline-light">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
