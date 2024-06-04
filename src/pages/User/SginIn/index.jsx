import React, { useEffect, useState } from "react";
import "./index.scss";
import img from "../../../img/Google__G__logo.svg.png";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
// ... (import statements remain unchanged)

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setEmail("");
        setPassword("");
        setError("");
        onClick();
      })
      .catch((error) => {
        console.log(error);
        setError("The password is wrong!");
        Timeout();
      });
  }

  function Password(e) {
    setPassword(e.target.value);
    setError("");
  }

  return (
    <div id="signIn">
      <div className="container">
        <div className="signIn">
          <div
            style={{ display: error.length !== 0 ? "block" && "flex" : "none" }}
            className="block"
          >
            <h1>{error}</h1>
          </div>
          <h2>Sign in</h2>
          <button onClick={Google}>
            <img src={img} alt="" /> Continue with Google
          </button>
          <h3>or</h3>
          <form>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              className={`${none}`}
              value={password}
              onChange={Password}
              type="password"
              placeholder="Password"
            />
            <button onClick={logIn} className="home">
              To come in
            </button>
          </form>
          <NavLink to="/signUp">No account? Create one</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
