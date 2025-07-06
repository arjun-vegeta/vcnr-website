import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './ui/SplitText';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const emailTextRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade-in animation (happens before SplitText animation)
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 70%",
            once: true
          }
        }
      );

      // Button animation
      gsap.fromTo(buttonRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 70%",
            once: true
          }
        }
      );

      // Email text animation - triggered after button with 100ms delay
      gsap.fromTo(emailTextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 70%",
            once: true
          }
        }
      );

      // Copyright text animation - triggered after button with 200ms delay
      gsap.fromTo(copyrightRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 70%",
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-black font-sans">
      <div className="flex items-center justify-center p-4 md:p-16">
        <div className="relative w-full h-[75vh] md:h-[500px] rounded-3xl overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/gradient2.mp4"
          >
            Your browser does not support the video tag.
          </video>

          {/* Overlay with content */}
          <div className="relative z-10 flex flex-col items-left justify-center h-full text-white p-8 md:p-16">
            <div ref={titleRef} className="opacity-0">
              <SplitText
                text="Want to create something awesome together?"
                className="text-5xl md:text-7xl font-bold tracking-tight text-left max-w-3xl"
                splitType="words"
                delay={80}
                duration={0.6}
                ease="power3.out"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </div>

            <div ref={buttonRef} className="mt-12 text-right opacity-0">
              <a
                href="mailto:contact@davidhaz.com"
                className="inline-flex items-center justify-center px-6 py-3 text-xl text-right bg-white text-black font-semibold rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
              >
                Let's Discuss
                <ArrowUpRight className="stroke-3 w-4 h-4 ml-2" />
              </a>
            </div>

            <p ref={emailTextRef} className="mt-6 text-base text-gray-100 text-right opacity-0">
              Or reach out at{' '}
              <a href="mailto:contact@davidhaz.com" className="underline hover:text-white">
                contact@vcnr.com
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t mt-10 border-gray-800 py-10 px-4 md:px-16">
        <div ref={copyrightRef} className="text-center text-gray-300 text-base opacity-0">
          © 2024 VCNR. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
