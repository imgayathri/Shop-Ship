// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import Home from "./Pages/Home/Home"; // 👈 create this component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [screen, setScreen] = useState("splash");

  if (screen !== "splash") {
    return (
      
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login switchToRegister={() => setScreen("register")} />}
          />
          <Route
            path="/register"
            element={<Register switchToLogin={() => setScreen("login")} />}
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      
    );
  }

  return <SplashScreen onFinish={() => setScreen("login")} />;
}

export default App;
