// src/pages/LoginRegister.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import './Login.css';
import Logo from './../../assets/images/logo afri-trading.jpeg';
import OtpVerification from '../Otp/OtpVerification';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { API_URL } from '../../services/apiServices';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(true);
    const [showOtp, setShowOtp] = useState(false);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        country: '',
        city: '',
        emailOrPhone: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch(API_URL.Countries)
            .then((res) => res.json())
            .then((data) => setCountries(data.data || []))
            .catch((err) => console.error("Error fetching countries:", err));

        fetch(API_URL.Cities)
            .then((res) => res.json())
            .then((data) => setCities(data.data || []))
            .catch((err) => console.error("Error fetching cities:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'country') {
            setFormData((prev) => ({
                ...prev,
                country: value,
                city: '',
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleRegisterSubmit = async () => {
        const { name, phone, email, password, country, city } = formData;
        if (!name || !phone || !email || !password || !country || !city) {
            alert("Please fill in all the fields");
            return;
        }

        try {
            const response = await fetch(API_URL.Register, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
                alert("Registration failed. Please try again.");
                return;
            }

            setShowRegister(false);
            setShowOtp(true);
        } catch (err) {
            console.error("Error during registration:", err);
            alert("Something went wrong. Please try again later.");
        }
    };

    const handleLogin = async () => {
        const { emailOrPhone, password } = formData;
        if (!emailOrPhone || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(API_URL.Login, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrPhone, password })
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Login failed");
                return;
            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("name", result.name);
            localStorage.setItem("phone", result.phone);
            localStorage.setItem("email", result.email);

            alert("Login successful!");
            navigate('/home');
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    const renderFormCard = () => (
        <Card className="auth-card p-4 shadow w-100">
            <h3 className="text-center mb-3">{isLogin ? 'Login' : 'Register'}</h3>
            <Form onSubmit={(e) => {
                e.preventDefault();
                isLogin ? handleLogin() : handleRegisterSubmit();
            }}>
                {!isLogin && (
                    <>
                        <Form.Group className="mb-3" controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Select name="country" value={formData.country} onChange={handleChange}>
                                <option value="">Select your country</option>
                                {countries.map((country) => (
                                    <option key={country._id} value={country._id}>{country.countryName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={!formData.country}
                            >
                                <option value="">Select your city</option>
                                {cities
                                    .filter((city) => city.countryId === formData.country)
                                    .map((city) => (
                                        <option key={city._id} value={city.cityName}>{city.cityName}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContact">
                            <Form.Label>Contact</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>+91</InputGroup.Text>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your mobile number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label>Create Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </>
                )}

                {isLogin && (
                    <>
                        <Form.Group className="mb-3" controlId="formEmailOrPhone">
                            <Form.Label>Email or Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="emailOrPhone"
                                placeholder="Enter your email or phone"
                                value={formData.emailOrPhone || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </>
                )}

                <Button
                    // variant={isLogin ? "success" : "success"}
                    type="submit"
                    className={`w-100 ${!isLogin ? 'rounded-pill fw-bold signup-button' : 'signin-button'} mb-2`}
                >
                    {isLogin ? "Sign in" : "CONTINUE & GET OTP"}
                </Button>

               

                <div className="text-center">
                    <small>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <span
                            className="text-success fw-bold pointer"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setFormData({
                                    name: '',
                                    phone: '',
                                    email: '',
                                    password: '',
                                    country: '',
                                    city: '',
                                    emailOrPhone: '',
                                });
                            }}
                        >
                            {isLogin ? 'Sign up here' : 'Sign in here'}
                        </span>
                    </small>
                </div>
            </Form>
        </Card>
    );

    return (
        <Row className="auth-container vw-100 vh-100">
            {isLogin ? (
               <>
  <Col lg={6} className="auth-left d-flex flex-column align-items-center justify-content-center">
    <div className="d-flex flex-column align-items-center justify-content-center text-center">
      <img
        src={Logo}
        alt="Company Logo"
        className="mb-3"
        style={{ width: '150px', height: '150px' }}
      />
      <h1 className="text-white" style={{ fontSize: '24px' }}>Welcome to Shop & Ship</h1>
      <p className="text-white" style={{ fontSize: '14px' }}>
        We receive your packages at our warehouse, consolidate and shiped to you safely.
      </p>
    </div>

    <div className="d-flex justify-content-center mt-4 w-100" style={{marginRight:'64px'}}>
      <Card
        className="p-4 shadow-sm "
        style={{ maxWidth: '300px', width: '100%', borderRadius: '12px' }}
      >
        <h4 className="mb-3" style={{fontSize:'20px'}}>Contact Us</h4>
        <p>
          <FaPhoneAlt className="me-2 text-primary" /> +91 8121927536
        </p>
        <p>
          <FaEnvelope className="me-2 text-primary" /> Contact@afri-trading.com
        </p>
      </Card>
    </div>
  </Col>

  <Col lg={6} className="auth-right d-flex align-items-center justify-content-center">
    {renderFormCard()}
  </Col>
</>

            ) : (
                <>
                    <Col lg={6} className="auth-right d-flex align-items-center justify-content-center">
                        {renderFormCard()}
                    </Col>

                    <Col
                        lg={6}
                        className="auth-left d-flex flex-column align-items-center justify-content-center join-with-style text-center"
                    >
                        <div className="text-center px-4">
                            <img
                                src={Logo}
                                alt="Company Logo"
                                className="mb-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <h1 className="text-white" style={{ fontSize: '28px' }}>
                                Join With Us Africa Trading Market
                            </h1>

                            <p
                                className="text-white"
                                style={{ fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}
                            >
                                We receive your packages at our warehouse, consolidate and shiped to you safely.
                            </p>



                            {/* Card Wrapper to Center */}
                            <div className="d-flex justify-content-center mt-4 w-100">
                                <Card
                                    className="p-4 shadow-sm"
                                    style={{ maxWidth: '350px', width: '100%', borderRadius: '12px' }}
                                >
                                    <h4 className="mb-3" style={{fontSize:'20px'}}>Contact Us</h4>
                                    <p>
                                        <FaPhoneAlt className="me-2 text-primary" /> +91 8121927536
                                    </p>
                                    <p>
                                        <FaEnvelope className="me-2 text-primary" /> contact@afri-trading.com
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </Col>

                </>

            )}

            {formData.email && (
                <OtpVerification
                    show={showOtp}
                    onHide={() => setShowOtp(false)}
                    email={formData.email}
                    phone={formData.phone}
                />
            )}
        </Row>
    );
};

export default Login;
