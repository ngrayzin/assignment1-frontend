import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} /> {/* Set Login as the initial route */}
        <Route exact path="/home" element={<Home />} /> {/* Define the route for Home */}
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}
export default App;