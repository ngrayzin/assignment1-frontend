import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Profile from './pages/profile';
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppSidebar from './components/navbar';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === 'user') {
        const userFromSessionStorage = JSON.parse(event.newValue);
        setUserInfo(userFromSessionStorage);
      }
    }

    window.addEventListener('storage', handleStorageChange);

    // Initial state from sessionStorage on component mount
    const userFromSessionStorage = JSON.parse(window.sessionStorage.getItem('user'));
    if (userFromSessionStorage) {
      setUserInfo(userFromSessionStorage);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginIn = (loginData) => {
    sessionStorage.setItem("user", loginData);
    setUserInfo(loginData);
  }

  const handleUpdate = (updatedData) => {
    sessionStorage.setItem("user", updatedData);
    setUserInfo(updatedData);
  }

  const handleLogout = () => {
    window.sessionStorage.clear();
    setUserInfo(null);
    // Redirect to the login page or perform any other necessary actions after logout
  };

  return (
    <Router>
      <div className='flex h-screen'>
        {/* Sidebar */}
        {userInfo && <AppSidebar logout={handleLogout} isCarOwner={userInfo?.isCarOwner}/>}
        {/* Content */}
        <div className="flex-1 h-screen overflow-y-auto ml-12">
          <ToastContainer /> {/* Place the toast container outside the Routes */}
          <Routes>
            <Route exact path="/" element={<Login setLogin={handleLoginIn}/>} /> Set Login as the initial route
            <Route exact path="/home" element={<Home />} /> 
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/profile" element={<Profile updateSession={handleUpdate}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;