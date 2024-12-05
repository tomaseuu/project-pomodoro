// src/MyApp.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Pomodoro from "./Pomodoro";

const API_PREFIX = "https://localhost:8000";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  function removeOneCharacter(index) {
    const character = characters[index];
    const id = character._id;

    fetch(`${API_PREFIX}/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        } else {
          console.log("Error deleting the user.");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((response) => response.json())
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    return fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader(),
    });
  }

  function postUser(person) {
    const promise = fetch("https://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function loginUser(creds) {
    fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            setToken(data.token);
            setMessage("Login successful!");
          });
        }
        setMessage(`Login Error: ${res.status}`);
      })
      .catch((err) => setMessage(`Login Error: ${err}`));
  }

  function signupUser(creds) {
    fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json().then((data) => {
            setToken(data.token);
            setMessage("Signup successful!");
          });
        }
        setMessage(`Signup Error: ${res.status}`);
      })
      .catch((err) => setMessage(`Signup Error: ${err}`));
  }

  function addAuthHeader(headers = {}) {
    return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setCharacters(json["users_list"]);
        } else {
          setCharacters(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      {message && <p>{message}</p>}
      <Routes>
        <Route path="/login" element={<Login handleSubmit={loginUser} />} />
        <Route
          path="/signup"
          element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
        />
        <Route path="/pomodoro.html" element={<Pomodoro />} />
      </Routes>
    </div>
  );
}

export default MyApp;
