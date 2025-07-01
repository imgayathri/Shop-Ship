import React, { useEffect } from "react";
import "./SplashScreen.css";
import Logo from './../../assets/images/logo afri-trading.jpeg';

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container zoom-in">
     <img src={Logo} alt="Logo" height="200px" width="200px"/>
      <h1>Shop & Ship</h1>
    </div>
  );
}

export default SplashScreen;
