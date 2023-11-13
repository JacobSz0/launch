import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AccountSignupForm from "./AccountSignupForm.js";
import Nav from "./Nav.js";
import { useToken, AuthProvider } from "./Authentication.js";
import MainPage from "./MainPage.js";
import AccountLoginForm from "./AccountLoginForm.js";
import Training from "./Training.js";
import Congrats from "./Congrats.js";
import Foot from "./Foot"
import React from 'react';

function GetToken() {
  useToken();
  return null;
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <div className="bg">
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="silly">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="account" element={<AccountSignupForm />} />
            <Route path="/login" element={<AccountLoginForm />} />
            <Route path="training" element={<Training />} />
            <Route path="congrats" element={<Congrats />} />
          </Routes>
        </div>
        <Foot/>
      </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
