// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

function Pomodoro() {
  const API_PREFIX = "https://ashy-coast-0b352fa1e.5.azurestaticapps.net";
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);

      fetch(`${API_PREFIX}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user123", timerId: "pomodoro" }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Timer started successfully");
          } else {
            setMessage("Error starting timer");
          }
        })
        .catch((error) => {
          setMessage(`Error: ${error}`);
        });
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);

      fetch(`${API_PREFIX}/stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user123", timerId: "pomodoro" }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Timer stopped successfully");
          } else {
            setMessage("Error stoping timer");
          }
        })
        .catch((error) => {
          setMessage(`Error: ${error}`);
        });
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(1500);

    fetch(`${API_PREFIX}/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user123", timerId: "pomodoro" }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Timer reset successfully");
        } else {
          setMessage("Error resetting timer");
        }
      })
      .catch((error) => {
        setMessage(`Error: ${error}`);
      });
  };

  useEffect(() => {
    fetch(`${API_PREFIX}/elapsedTime?userId=user123&timerId=pomodoro`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch elapsed time.");
        }
      })
      .then((data) => {
        setTime(data.elapsedTime || 1500);
      })
      .catch((error) => {
        setMessage(`Error: ${error}`);
      });
  }, []);

  return (
    <div>
      {message && <p>{message}</p>}
      <h1>Pomodoro Timer</h1>
      <div>
        <span>
          {Math.floor(time / 60)}:{time % 60}
        </span>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Pomodoro;
