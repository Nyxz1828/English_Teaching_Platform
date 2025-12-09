import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header-container">
      <nav className="header-nav">

        <div className="header-logo">
          MyWebsite
        </div>

        <div className="header-buttons">
          <a href="/" className="header-link">Home</a>
          <a href="/lesson" className="header-link">Lesson</a>
          <a href="/teachers" className="header-link">Teachers</a>
          <a href="/profile" className="header-link">My Profile</a>
        </div>

      </nav>
    </header>
  );
}
