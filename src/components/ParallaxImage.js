import React, { useState, useEffect, useRef } from 'react';

const CornerSymbol = ({ position }) => (
  <div className={`absolute ${position} text-white text-3xl font-medium font-mono`}>+</div>
);

const ParallaxImage = () => {
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef(null);
  const [containerTop, setContainerTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0); // State to store the actual pixel height of the container
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
    
    // Function to update container dimensions
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        setContainerTop(containerRef.current.offsetTop);
        setContainerHeight(containerRef.current.offsetHeight); // Get actual height
      }
    };

    updateContainerDimensions(); // Initial set on mount
    window.addEventListener('resize', updateContainerDimensions); // Update on resize
    window.addEventListener('scroll', updateContainerDimensions); // Update on scroll (in case of layout shifts above)

    return () => {
      if (currentTextRef) {
        observer.unobserve(currentTextRef);
      }
      window.removeEventListener('resize', updateContainerDimensions);
      window.removeEventListener('scroll', updateContainerDimensions);
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax speed
  const parallaxSpeed = 0.2; 

  // Calculate the raw parallax transform based on scroll
  const rawParallaxTransform = (offsetY - containerTop) * parallaxSpeed;

  // --- Clamping Logic ---
  let finalTransformY = 0;
  if (containerHeight > 0) { // Ensure containerHeight is valid
    // The img element is 150% the height of its parent (containerRef.current)
    // This means there's 50% extra height (150% - 100%) for vertical movement.
    // This 50% extra height is distributed, so 25% for upward movement and 25% for downward movement
    // from the perfectly centered position.

    // 1. Calculate the initial 'centered' position for the 150% tall image
    //    relative to the 100% tall container.
    //    If the image is 150% tall, to center it, its top needs to be at -25% of the container's height.
    const initialCenteredOffset = -0.25 * containerHeight;

    // 2. Calculate the maximum possible movement range for the image.
    //    The total extra height is 0.5 * containerHeight.
    //    So, the image can move 0.25 * containerHeight pixels up from its center,
    //    and 0.25 * containerHeight pixels down from its center.

    // 3. Define the absolute clamping bounds for `transformY`:
    //    - `maxTranslateY`: When the top of the 150% image aligns with the top of the 100% container.
    //                       This means the image is pushed as far down as possible. `transformY` is 0.
    const maxTranslateY = 0; 
    
    //    - `minTranslateY`: When the bottom of the 150% image aligns with the bottom of the 100% container.
    //                       This means the image is pushed as far up as possible.
    //                       `transformY` needs to be `-(image_element_height - container_height)`
    //                       which is `-(1.5 * containerHeight - containerHeight) = -0.5 * containerHeight`.
    const minTranslateY = -0.5 * containerHeight;

    // 4. Apply initial offset and then clamp the total transform value
    //    The `rawParallaxTransform` is added to the `initialCenteredOffset` to get the desired movement.
    let calculatedTransformY = initialCenteredOffset + rawParallaxTransform;

    // 5. Clamp the `calculatedTransformY` between `minTranslateY` and `maxTranslateY`
    finalTransformY = Math.max(minTranslateY, Math.min(maxTranslateY, calculatedTransformY));
  }
  // --- End Clamping Logic ---

  return (
    <section ref={containerRef} className="relative z-20 bg-black p-4 md:p-16">
      <div className="relative h-[75vh] overflow-hidden bg-white">
        {/* Use an <img> tag for better control over sizing and object-fit */}
        <img
          src="/warehouse.png"
          alt="Warehouse"
          // h-[150%] gives the img element 50% extra vertical space relative to its parent's height
          // object-cover ensures it fills this 150% while maintaining aspect ratio, cropping if necessary.
          // object-position: center keeps the image's center in view.
          className="absolute left-0 top-0 w-full h-[150%] object-cover object-center" 
          style={{
            transform: `translateY(${finalTransformY}px)`, // Apply the clamped transform
            willChange: 'transform', // Optimize performance
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)',
          }}
        ></div>

        {/* Content and Corner Symbols */}
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