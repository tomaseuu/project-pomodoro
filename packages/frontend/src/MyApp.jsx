import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Pomodoro from "./Pomodoro";
import Calendar from "./Calendar";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="user-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <img src="focus-fruit-logo.png" alt="Focus-Fruit Logo" className="logo-image" />
            <span className="logo-text">FocusFruit</span>
          </div>
        </Link>
        <ul className="nav-list">
          <li>
            <Link to="/pomodoro">Pomodoro</Link>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
      </nav>

      <main className="user-container">
        <div className="user-wrapper">
          {/* Login Form */}
          <div className="user-left">
            <h1>Login</h1>
            <p>For Existing Members</p>
            <form id="login-form" action="/pomodoro">
              <label htmlFor="login-name">Username</label>
              <input type="text" id="login-name" name="name" required />
              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" name="password" required />
              <input type="submit" value="Submit" />
            </form>
          </div>

          {/* Signup Form */}
          <div className="user-right">
            <h1>Sign Up</h1>
            <p>For New Members</p>
            <form id="signup-form" action="/signup-handler.html" method="POST">
              <label htmlFor="signup-name">Username</label>
              <input type="text" id="signup-name" name="name" required />
              <label htmlFor="signup-password">Password</label>
              <input type="password" id="signup-password" name="password" required />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          <Link to="/contact">Contact Us</Link>
        </p>
      </footer>
    </div>
  );
};

const PomodoroPage = () => {
  return (
    <div className="pomodoro-page">
      {/* Pomodoro Main Content */}
      <main>
        <Pomodoro />
      </main>
    </div>
  );
};

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      {/* Pomodoro Main Content */}
      <main>
        <Calendar />
      </main>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Pomodoro Main Content */}
      <main>
        <Contact />
      </main>
    </div>
  );
};

const MyApp = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes explicitly */}
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default MyApp;
