import React, { useState } from 'react';
import login from "../api/users/login";
import { useNavigate } from 'react-router-dom';
//import { toast } from 'react-toastify';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    pwd: '' 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner when starting login process

    try {
      const data = await login(loginData);
      if (data) {
        sessionStorage.setItem("user", JSON.stringify(data));
        // Redirect to home page or any other page after successful login
        navigate('/home');
      } else{
        alert("Invalid login credentials")
      }
    } catch (error) {
      //toast.error('Login failed. Please check your credentials.'); // Show toast message for login error
    } finally {
      setLoading(false); // Hide spinner after login attempt (whether success or failure)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="pwd" 
            value={loginData.pwd}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
        >
          
          {loading ? "Loging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

