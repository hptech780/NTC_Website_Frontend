import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = ({ toggleBlogVisibility }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="primary-bg p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-16">
        <img src="..\src\assets\NTC LOGO.png" alt="NTC Logo" className="h-14" />
        
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        <ul className={`md:flex md:space-x-5 text-white text-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
          <li><Link to="/" className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">Home</Link></li>
          <li><a href="#introduction" className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">About</a></li>
          <li><a href="#event-cards-container" className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">Events</a></li>
          <li><a href="#executives-container" className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">Team</a></li>
          <li><a href="#gallery" className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">Gallery</a></li>
          <li><a href="#contact" className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">Contact Us</a></li>
          <li>
            <Link to="/blog" className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">
              Blogs
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">
              <Link to="/logout">Logout</Link>
            </li>
            
          )}

{!isAuthenticated && (
            <li className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">
              <Link to="/login">Login</Link>
            </li>
            
          )}

          

<li className="nav-link hover:text-gray-300 transition duration-300 ease-in-out">
              <Link to="/login/admin">Admin</Link>
            </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
