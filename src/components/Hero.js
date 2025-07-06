import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const videoRef = useRef(null);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for the entry fade-in and video playback
  useEffect(() => {
    // After the component mounts, wait a moment, then start the fade AND play the video
    const timer = setTimeout(() => {
      // Start the fade-out
      setIsFadingIn(false);
      
      // Play the video at the same time the fade begins
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100); // A short delay to ensure elements are ready

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <section
      className="relative w-full h-screen bg-black pt-[10px] overflow-hidden"
      style={{
        transform: `translateY(${offsetY * 0.65}px)`,
        zIndex: 10,
      }}
    >
      {/* Black Fade-In Overlay */}
      <div
        // The onTransitionEnd handler has been removed
        className={`absolute inset-0 bg-black transition-opacity duration-[2000ms] ease-in-out z-50 ${
          isFadingIn ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Grid Lines Behind Everything */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-4 md:left-6 top-0 h-full w-px bg-white bg-opacity-15"></div>
        <div className="hidden md:block absolute top-0 h-full w-px bg-white bg-opacity-15" style={{ left: 'calc(23% + 46px)' }}></div>
        <div className="hidden md:block absolute top-0 h-full w-px bg-white bg-opacity-15" style={{ left: 'calc(23% + 66px)' }}></div>
        <div className="hidden md:block absolute top-0 h-full w-px bg-white bg-opacity-15" style={{ left: 'calc(50% - 10px)' }}></div>
        <div className="hidden md:block absolute top-0 h-full w-px bg-white bg-opacity-15" style={{ left: 'calc(50% + 10px)' }}></div>
        <div className="hidden md:block absolute top-0 h-full w-px bg-white bg-opacity-15" style={{ right: 'calc(23% + 66px)' }}></div>
        <div className="hidden md:block absolute top-0 h-full w-px bg-white bg-opacity-15" style={{ right: 'calc(23% + 46px)' }}></div>
        <div className="absolute right-4 md:right-6 top-0 h-full w-px bg-white bg-opacity-15"></div>
      </div>

      {/* Main Title at Top */}
      <div className="relative z-20 h-[25dvh] md:h-[30dvh] lg:h-[35dvh] flex items-center justify-center px-4">
        <h1 className="text-white text-5xl md:text-8xl lg:text-7xl xl:text-[160px] font-medium tracking-normal m-0" style={{ fontFamily: 'Prompt, sans-serif' }}>
          VCNR Group<span style={{ color: '#6A41E7' }}>.</span>
        </h1>
      </div>

      {/* Video Section with Padding */}
      <div className="relative z-10 px-4 md:px-6 pb-4 md:pb-8 h-[75dvh] md:h-[70dvh] lg:h-[65dvh]">
        <div className="relative w-full h-full">
          {/* Background Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-center"
            loop
            muted
            playsInline
            // autoPlay is still removed, as we are controlling playback manually
          >
            <source src="/landing.mp4" type="video/mp4" />
            <img
              src="/path-to-your-fallback-image.jpg"
              alt="SkyRice Co. Building"
              className="w-full h-full object-cover"
            />
          </video>

          {/* Dark Overlay on Video */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Bottom Text Overlay */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
            <p className="text-white/80 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xs md:max-w-lg whitespace-nowrap">
              Redefining warehousing with <br /> sustainable, innovative and scalable solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;