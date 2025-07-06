// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Homepage from './Homepage';
import Chatbot from './components/ChatBot'

// Placeholder pages
const AboutPage = () => <div><h1>About Page</h1></div>;
const ServicesPage = () => <div><h1>Services Page</h1></div>;
const FAQPage = () => <div><h1>FAQ Page</h1></div>;
const ContactPage = () => <div><h1>Contact Page</h1></div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* 2. Add the Chatbot here */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;