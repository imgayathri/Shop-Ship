// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import Home from "./Pages/Home/Home"; // 👈 create this component
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const [screen, setScreen] = useState("splash");

  if (screen !== "splash") {
    return (
      <div>
      
        <Routes>
          <Route
            path="/"
            element={<Login />}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      
    );
  }

  return <SplashScreen onFinish={() => setScreen("login")} />;
}

export default App;
