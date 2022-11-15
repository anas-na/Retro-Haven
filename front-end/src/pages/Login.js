import '../styles/Login.css'
import React from "react";
import useUser from "../hooks/useUser";
import { useHistory, Redirect } from "react-router";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

const LogIn = () => {
  const string = useContext(UserContext);
  const { user, logIn } = useUser();
  const history = useHistory();
  const handleLogIn = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await logIn(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <section className="formContainer">

      <h9 className="formTitle">LOGIN</h9>

      <div className="loginForm">

        <form onSubmit={handleLogIn}>

          {/* <h2>Please enter your email and password!</h2> */}
          
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
            />

          
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
              />
            
          <input type="submit" className="loginButton Button" />
          </div>
         
          <div className='signUp'>
            <p className='loginQuestion'>Don't have an account? </p>
            <a href="/signup" className='Button text-reset'>
              Sign Up
            </a>
      </div>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
