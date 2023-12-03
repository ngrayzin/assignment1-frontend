import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Login />} /> {/* Set Login as the initial route */}
          <Route exact path="/home" element={<Home />} /> 
          <Route exact path="/signup" element={<SignUp />} />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;