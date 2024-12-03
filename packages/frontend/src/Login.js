// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";

function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }

  return (
    <form>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={creds.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="pwd"
        id="password"
        value={creds.pwd}
        onChange={handleChange}
      />
      <input
        type="button"
        value={props.buttonLabel || "Log In"}
        onClick={submitForm}
      />
    </form>
  );
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // handleSubmit is a required function
  buttonLabel: PropTypes.string, // buttonLabel is an optional string
};

export default Login;
