import React, { useState } from "react";
import "./index.scss";
import img from "../../../img/Google__G__logo.svg.png";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [none, setNone] = useState("input-container");

  function Timeout() {
    setNone("shake");
    setTimeout(() => {
      setNone("input-container");
    }, 600);
  }

  function onClick() {
    navigate("/");
  }
  function Google() {
    signInWithPopup(auth, provider)
      .then((user) => {
        console.log(user);
        onClick();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function logIn(e) {
    e.preventDefault();
    if(email === '' && password === '' && copyPassword === '' && name === '') {
      return ''
    }
    if (copyPassword !== password) {
      setError("Passwords didt't match!");
      Timeout();
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setEmail("");
        setPassword("");
        setCopyPassword("");
        setError("");
        onClick();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function Password(e) {
    setCopyPassword(e.target.value);
    setError("");
  }
  return (
    <>
      <div id="signUp">
        <div className="container">
          <div className="signUp">
            <div
              style={{
                display: error.length !== 0 ? "block" && "flex" : "none",
              }}
              className="block"
            >
              <h1>{error}</h1>
            </div>
            <h2>Sign Up</h2>
            <button onClick={Google}>
              <img src={img} alt="" />
              Continue with Google
            </button>
            <h3>or</h3>
            <form onSubmit={logIn}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <input
                className={`${none}`}
                value={copyPassword}
                onChange={Password}
                type="password"
                placeholder="Repeat Password"
              />
              <button className="home">Log in</button>
            </form>
            <NavLink to="/signIn">Already have an account? Log in</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
