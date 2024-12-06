import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(25 * 60); 
  const [tasks, setTasks] = useState([]); 
  const [taskInput, setTaskInput] = useState(""); 

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(selectedTime); 
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            playAudio();
            alert("Time's up!");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); 
  }, [isRunning]);

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      const customMinutes = prompt("Enter custom time in minutes (1–300):");
      if (customMinutes && !isNaN(customMinutes) && customMinutes > 0 && customMinutes <= 300) {
        const customSeconds = customMinutes * 60;
        setTime(customSeconds);
        setSelectedTime(customSeconds);
      } else {
        alert("Invalid input. Please enter a number between 1 and 300.");
      }
    } else {
      const seconds = parseInt(value, 10) * 60;
      setTime(seconds);
      setSelectedTime(seconds);
    }
  };

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  function playAudio() {
    const audio = document.getElementById("timerEndAudio");
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 10000);
  }

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="pomodoro-page">
      {/* Header */}
      <nav className="navbar">
        <a href="/" className="logo-link">
          <div className="logo-container">
            <img
              src="focus-fruit-logo.png"
              alt="Focus-Fruit Logo"
              className="logo-image"
            />
            <span className="logo-text">FocusFruit</span>
          </div>
        </a>
        <ul className="nav-list">
          <li><a href="/">Home</a></li>
          <li><Link to="/calendar">Calendar</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="todolist-container">
          <h2 className="todolist-header">To-Do List</h2>
          <div className="add-task-container">
            <input
              type="text"
              id="taskInput"
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a new task"
            />
            <button className="add-task-button" onClick={addTask}>Add</button>
          </div>
          <ul className="todo-items">
            {tasks.map((task, index) => (
              <li key={index} className={`todo-item ${task.completed ? "completed" : ""}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span>{task.text}</span>
                <button className="remove-task-button" onClick={() => removeTask(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="timer-guide-column">
          {/* Timer Display */}
          <div className="timer-container">
            <form>
              <select className="timer-dropdown" onChange={handleDropdownChange}>
                <option value="25">Pomodoro</option>
                <option value="5">Short Break</option>
                <option value="30">Long Break</option>
                <option value="custom">Custom</option>
              </select>
            </form>
            <div className="timer-display">{formatTime(time)}</div>
            <div className="timer-controls">
              <button onClick={startTimer}>Start</button>
              <button onClick={stopTimer}>Stop</button>
              <button onClick={resetTimer}>Reset</button>
            </div>
          </div>

          {/* Guide Section */}
          <div className="guide-container">
            <h3 className="guide-header">Pomodoro Guide</h3>
            <p>→ Set a timer for 25 minutes to focus on a task.</p>
            <p>→ When the timer ends, take a 5-minute break.</p>
            <p>→ Repeat this cycle 3 more times.</p>
            <p>→ After completing 4 cycles, take a longer 30-minute break.</p>
            <p>OR MAKE YOUR OWN RULES!!</p>
          </div>
        </div>
      </main>
      
      <audio id="timerEndAudio" src="timer-end-sound.mp3" preload="auto"></audio>
      <footer className="footer">
        <p>
          <Link to="/contact">Contact Us</Link>
        </p>
      </footer>
    </div>
  );
};

export default Pomodoro;
