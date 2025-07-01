// src/components/CustomNavbar.jsx
import React, { useState } from 'react';
import { Navbar, Container, Nav, Dropdown, Image, Form, FormControl,InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaPhoneAlt, FaEnvelope, FaFacebookF,
  FaInstagram, FaTwitter, FaGlobe
} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

import Logo from './../../assets/images/logo afri-trading.jpeg';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';


const CustomNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);
    const [searchText, setSearchText] = useState(''); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      alert(`Searching for "${searchText}"`);
      // Add navigation logic if needed
      setSearchText('');
    }
  };

  return (
    <Navbar className="custom-navbar" sticky="top" style={{padding:'10px 100px'}}>
      <Container fluid className="navbar-content-container">
        {/* Left: Logo */}
        <Navbar.Brand href="/" className="navbar-logo-container">
          <Image src={Logo} alt="Logo" className="navbar-logo" />
          <h1 style={{fontSize:'25px',color:'white', marginLeft:'15px'}}> Shop & Ship</h1>
        </Navbar.Brand>

        {/* Center: Top Info */}
        
     

<Form className="search-bar" onSubmit={handleSearch}>
  <InputGroup>
    <FormControl
      type="search"
      placeholder="Search products"
      className="search-input"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
    <Button type="submit" className='bg-white'>
      <FaSearch style={{color:'black'}}/>
    </Button>
  </InputGroup>
</Form>


        {/* Right: Orders, Profile, Language */}
        <div className="navbar-right-section">

          <div className="top-info">
            <FaPhoneAlt className="info-icon" /> +91 98765 43210
            <FaEnvelope className="info-icon ms-3" /> info@afritrading.com
          </div>

          <div className="myorders">
            <FontAwesomeIcon icon={faBox} /> My Orders
          </div>

          <Dropdown align="end" show={showLogout} onToggle={() => setShowLogout(!showLogout)}>
            <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 bg-transparent">
              <FaUserCircle size={32} className="profile-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
