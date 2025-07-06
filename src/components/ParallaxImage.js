import React, { useState, useEffect, useRef } from 'react';

const CornerSymbol = ({ position }) => (
  <div className={`absolute ${position} text-white text-3xl font-medium font-mono`}>+</div>
);

const ParallaxImage = () => {
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef(null);
  const [containerTop, setContainerTop] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const currentTextRef = textContainerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (currentTextRef) {
      observer.observe(currentTextRef);
    }
    
    if (containerRef.current) {
      setContainerTop(containerRef.current.offsetTop);
    }

    return () => {
      if (currentTextRef) {
        observer.unobserve(currentTextRef);
      }
    };
  }, []);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxSpeed = 0.2;
  const transformValue = (offsetY - containerTop) * parallaxSpeed;

  return (
    <section ref={containerRef} className="relative z-20 bg-black p-4 md:p-16">
      <div className="relative h-[75vh] overflow-hidden bg-white">
        <div
          className="absolute left-0 w-full h-[150%] bg-cover bg-center"
          style={{
            backgroundImage: "url('/warehouse.png')",
            top: '-25%',
            transform: `translateY(${transformValue}px)`,
            willChange: 'transform',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)',
          }}
        ></div>

        <div className="absolute inset-0 p-6 md:p-8">
          <CornerSymbol position="top-6 left-6" />
          <CornerSymbol position="top-6 right-6" />
          <CornerSymbol position="bottom-6 left-6" />

          <div
            ref={textContainerRef}
            className={`absolute bottom-8 right-4 md:bottom-16 md:right-16 text-right text-white transition-all duration-[2000ms] ease-out 
              ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter">We turn ideas into reality</h1>
            <p className="text-gray-300 max-w-[300px] md:max-w-lg mt-4 ml-auto">
              Innovating logistics with eco-friendly solutions for a greener future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxImage;