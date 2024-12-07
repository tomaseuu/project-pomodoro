import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarDays, setCalendarDays] = useState([]);

  const renderCalendar = (month, year) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ empty: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isToday:
          day === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    setCalendarDays(days);
  };

  useEffect(() => {
    renderCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    let month = currentMonth - 1;
    let year = currentYear;
    if (month < 0) {
      month = 11;
      year--;
    }
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleNextMonth = () => {
    let month = currentMonth + 1;
    let year = currentYear;
    if (month > 11) {
      month = 0;
      year++;
    }
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  return (
    <div className="calendar-page">
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
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Link to="/pomodoro">Pomodoro</Link>
          </li>
        </ul>
      </nav>

      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-button" onClick={handlePrevMonth}>
            &lt;
          </button>
          <h2 className="month-header">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button className="nav-button" onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day, index) =>
            day.empty ? (
              <div key={index} className="empty-cell"></div>
            ) : (
              <div
                key={index}
                className={`calendar-cell ${
                  day.isToday ? "current-date" : ""
                }`}
              >
                {day.date}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;