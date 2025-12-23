import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ToastProvider } from "./contexts/ToastContext";
import Header from "./components/app_headers";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Teachers from "./pages/Teachers";
import Profile from "./pages/Profile";
import FileContent from "./pages/FileContent";

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="page-transition">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lesson" element={<Lesson />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/file-content" element={<FileContent />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;

