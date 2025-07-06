import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreBusiness from './components/CoreBusiness';
import ParallaxImage from './components/ParallaxImage';
import './index.css';
import Brands from './components/Brands';
import ContactUs from './components/Contact';

const Homepage = () => {
  return (
    <div className="Homepage">
      <Navbar />
      <Hero />
      <CoreBusiness />
      <ParallaxImage /> 
      <Brands />
      <ContactUs />
    </div>
  );
};

export default Homepage;