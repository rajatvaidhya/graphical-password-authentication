import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Welcomewindow from "./components/Welcomewindow";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Alert/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/welcomewindow" element={<Welcomewindow/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
