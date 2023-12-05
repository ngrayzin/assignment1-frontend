// SignUp.js (Sign Up Page)
import React, { useState } from 'react';
import signup from '../api/users/signup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: '',
    pwd: '',
    firstName: '',
    lastName: '',
    number: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'number') {
      const phoneNumber = value.replace(/\D/g, ''); 
      if (phoneNumber.length <= 8) {
        setSignUpData({ ...signUpData, [name]: parseInt(phoneNumber, 10) || '' });
      }
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-up logic with signUpData
    console.log('Sign-up data:', signUpData);
    // Perform API call or other actions
    const res =  await signup(signUpData);
    if(res.ok){
        toast.success("Account made!");
        navigate('/');
    } else if(res.status === 409){
        toast.error("Email taken, please use another one.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md">
        <Link to="/" className='flex'>
            <svg class="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="8" y1="12" x2="16" y2="12" />  <line x1="8" y1="12" x2="12" y2="16" />  <line x1="8" y1="12" x2="12" y2="8" /></svg>
            <p>Back to login</p>
        </Link>
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} >
          {/* Sign-up form fields */}
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={signUpData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
             <label>Password:</label>
             <input type="password" name="pwd" value={signUpData.pwd} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"/>
            </div>
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={signUpData.firstName} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={signUpData.lastName} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"/>
            </div>
            <div>
                <label>Mobile Number:</label>
                <input type="text" name="number" value={signUpData.number} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"/>
            </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
