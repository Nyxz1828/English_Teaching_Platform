import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md dark:bg-gray-900">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo / Title */}
        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
          MyWebsite
        </div>

        {/* Buttons */}
        <div className="flex gap-4 text-sm font-medium">
          <a
            href="/"
            className="px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700"
          >
            Home
          </a>

          <a
            href="/lesson"
            className="px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700"
          >
            Lesson
          </a>

          <a
            href="/teachers"
            className="px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700"
          >
            Teachers
          </a>

          <a
            href="/profile"
            className="px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700"
          >
            My Profile
          </a>
        </div>
      </nav>
    </header>
  );
}
