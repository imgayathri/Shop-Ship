import React from 'react';
import { Modal, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from './../../assets/images/logo afri-trading.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const WelcomeModal = ({ show, onHide }) => {
  const handleClose = () => {
    navigate('/home');
    setShowRegister(false);
  };
  return (

    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="welcome-modal"
    >

      <Link to="/">
        <FontAwesomeIcon
          icon={faTimes}
          className="position-absolute"
          style={{ top: '15px', right: '15px', cursor: 'pointer' }}
          onClick={handleClose}
        />
      </Link>

      <Modal.Body className="text-center p-5 position-relative">
        {/* Background circle with checkmark */}
        <div className="checkmark-circle position-relative mx-auto mb-4">
          <div className="circle-bg"></div>
          <img src={Logo} style={{ height: "80px", width: "80px" }} />
        </div>

        <h2 className="fw-bold mb-3" >Congratulations</h2>
        <p className="fs-5 mb-4">Welcome to Shop & Ship</p>
        <Link to="/home">
          <Button

            className="w-100 py-2 fs-5"
            onClick={onHide}
            style={{ backgroundColor: "#E05C0B", border: "none" }}
          >
            Continue Shopping
          </Button>
        </Link>

      </Modal.Body>
    </Modal>
  );
};

export default WelcomeModal;