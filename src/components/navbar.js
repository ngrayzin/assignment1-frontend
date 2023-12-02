import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-transparent text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-transparent flex justify-between items-center p-4">
        {/* Hamburger Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Add SVG for hamburger menu icon */}
          </svg>
        </button>

        {/* User and Notification Icons */}
        <div className="flex items-center space-x-4">
          <div className="text-gray-300">
            {/* User Icon */}
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Add SVG for user icon */}
            </svg>
          </div>
          <div className="text-gray-300">
            {/* Notification Icon */}
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Add SVG for notification icon */}
            </svg>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 w-64 fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Content */}
        <div className="p-4">
          <h2 className="text-2xl font-bold">Ainori</h2>
          {/* Add sidebar menu links */}
          <svg
            className="h-12 w-12 text-teal-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Add SVG content */}
          </svg>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
