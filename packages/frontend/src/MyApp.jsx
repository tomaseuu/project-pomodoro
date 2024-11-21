// src/MyApp.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";
import Login from "./Login";

const API_PREFIX = "http://localhost:8000";

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
    const promise = fetch("Http://localhost:8000/users", {
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
        <Route
          path="/"
          element={
            <>
              <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
              />
              <Form handleSubmit={updateList} />
            </>
          }
        />
        <Route path="/login" element={<Login handleSubmit={loginUser} />} />
        <Route
          path="/signup"
          element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
        />
      </Routes>
    </div>
  );
}

export default MyApp;
