// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './Homepage';
import Chatbot from './components/ChatBot';
import ContactPage from './components/ContactPage'; // <--- Import the new ContactPage

// ScrollToTop component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Placeholder pages (you'll replace these with actual components later)
const AboutPage = () => <div><h1>About Page</h1></div>;
const ServicesPage = () => <div><h1>Services Page</h1></div>;
const FAQPage = () => <div><h1>FAQ Page</h1></div>;

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* <--- Use the new ContactPage here */}
        </Routes>

        {/* 2. Add the Chatbot here */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;