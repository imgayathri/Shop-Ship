import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './OtpVerification.css';
import WelcomeModal from '../WelcomeModal/WelcomeModal';
import { useNavigate } from 'react-router-dom';






const OtpVerification = ({ show, onHide, email, phone }) => {
  const inputs = Array.from({ length: 6 }, () => useRef());
  const [showWelcome, setShowWelcome] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

  // Move to next input
  const handleChange = (e, i) => {
    const value = e.target.value;
    if (value && i < inputs.length - 1) {
      inputs[i + 1].current.focus();
    }
  };

  // Handle OTP confirm
  // OTP Confirm
  const handleConfirm = async () => {
    const otp = inputs.map(ref => ref.current.value).join('');

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await fetch("https://auto-spare-parts-backend-gbsc.onrender.com/allusers/verifyUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, otp })
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "OTP verification failed.");
        return;
      }

      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('name', result.name);
      localStorage.setItem('phone', result.phone);
      localStorage.setItem('email', email);

      setShowWelcome(true);
      onHide();
    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  // Handle resend OTP
  // Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await fetch("https://auto-spare-parts-backend-gbsc.onrender.com/allusers/resendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone })
      });

      const result = await response.json();

      if (response.ok) {
        setResendMessage("OTP resent successfully!");
      } else {
        setResendMessage(result.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setResendMessage("Something went wrong while resending OTP.");
    }

    setTimeout(() => setResendMessage(''), 5000);
  };


  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center p-4">

          <button
            className="btn-close position-absolute"
            style={{ top: '15px', right: '15px' }}
            onClick={() => navigate('/')}
          />

          <h5 className="fw-bold mb-2">Verification Code</h5>
          <p className="text-muted mb-3">We have sent the verification code to your email address</p>

          <div className="d-flex justify-content-center gap-2 mb-3">
            {inputs.map((ref, i) => (
              <input
                key={i}
                maxLength={1}
                ref={ref}
                className="otp-box"
                onChange={(e) => handleChange(e, i)}
              />
            ))}
          </div>
          <div className="d-flex gap-2">
            <Button className="w-50 otp-confirm-btn" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button className="w-50 otp-confirm-btn" onClick={handleResendOtp}>
              Resend OTP
            </Button>
          </div>


          {resendMessage && (
            <div className="mt-2 text-muted small">{resendMessage}</div>
          )}
        </Modal.Body>
      </Modal>

      <WelcomeModal
        show={showWelcome}
        onHide={() => setShowWelcome(false)}
      />
    </>
  );
};

export default OtpVerification;
