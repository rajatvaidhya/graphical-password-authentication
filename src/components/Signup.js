import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [red, setRed] = useState("");
  const [yellow, setYellow] = useState("");
  const [green, setGreen] = useState("");

  const redClicked = () => {
    setRed(red + "ey8");
  }
  const yellowClicked = () => {
    setYellow(yellow + "vr9");
  }
  const greenClicked = () => {
    setGreen(green + "zpd2");
  }

  let pattern = red+green+yellow;

    const [credentials, setCredentials] = useState({username:"", email:"", password:"", cpassword:"", rgbpattern:""});
    let navigate = useNavigate();
    credentials.rgbpattern = pattern;
 
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const {username, email, password, rgbpattern} = credentials;

        const response = await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username, email, password, rgbpattern})
        });

        const json = await response.json();
        console.log(json);

        if(json.success)
        {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }
        else
        {
            alert('Enter valid credentials.');
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }


  return (
    <>
    <h2 style={{'color':"white"}}>Create your account.</h2>
      <form onSubmit={handleSubmit} className="my-3">

<div className="form-floating mb-3">
        <input type="text" className="form-control" id="username" name="username" onChange={onChange} required placeholder="name@example.com"/>
        <label htmlFor="username">Username</label>
      </div>

<div className="form-floating mb-3">
        <input type="email" name="email" className="form-control" id="email" onChange={onChange} placeholder="name@example.com"/>
        <label htmlFor="email">Email</label>
      </div>

<div className="form-floating mb-3">
        <input type="password" className="form-control" id="password" required minLength={5} onChange={onChange} name="password" placeholder="name@example.com"/>
        <label htmlFor="password">Password</label>
      </div>

<div className="form-floating mb-3">
        <input type="password" className="form-control" id="password" required minLength={5} onChange={onChange} name="cpassword" placeholder="name@example.com"/>
        <label htmlFor="password">Confirm Password</label>
      </div>

<h6 style={{"color":"white"}}>Click on the buttons to set RYG Pattern : </h6>
      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" onClick={redClicked} className="btn btn-danger">Red</button>
  <button type="button" onClick={yellowClicked} className="btn btn-warning">Yellow</button>
  <button type="button" onClick={greenClicked} className="btn btn-success">Green</button>
</div>

<br/>

<div className="form-floating mb-0 my-3">
        <input type="password" className="form-control" onChange={onChange} value={pattern} placeholder="name@example.com"/>
        <label htmlFor="password">RYG Pattern</label>
      </div>

<br/>

<button type="submit" className="btn btn-outline-light">
          Register
        </button>

      </form>
    </>
  );
};

export default Signup;
