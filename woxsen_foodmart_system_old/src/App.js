import React, { useState } from "react";
import "./global.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Subscription from "./components/Subscription";
import FoodComponent from "./components/Food";
import SignInSignUpPage from "./components/SignInSignUpPage/SignInSignUpPage";
import FoodSelectionDisplay from "./components/FoodSelectionDisplay";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn && <SignInSignUpPage onLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && (
        <>
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Hero />
          <About />
          <FoodComponent />
          <FoodSelectionDisplay/>
          <Subscription />
          <Footer />
          
        </>
      )}
    </div>
  );
};

export default App;

