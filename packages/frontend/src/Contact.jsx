import { Link } from "react-router-dom";
import "./index.css";

const Contact = () => {
  return (
    <div className="user-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <img
              src="focus-fruit-logo.png"
              alt="Focus-Fruit Logo"
              className="logo-image"
            />
            <span className="logo-text">FocusFruit</span>
          </div>
        </Link>
        <ul className="nav-list">
          <li>
            <Link to="/pomodoro">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="contact-container">
        <div className="contact-header">
          <p>Contact Us! Let us know any questions or inquiries you have!</p>
        </div>

        <div className="contact-form">
          <form id="contact-form">
            <div className="email-container">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <label htmlFor="message">Message:</label>
            <div className="message-container">
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
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

export default Contact;