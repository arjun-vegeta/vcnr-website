import React, { useRef, useEffect } from 'react';
import { Leaf, Hammer, HeartPulse, Laptop, BriefcaseBusiness } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './ui/SplitText';
import GradientText from './ui/GradientText';
import CountUp from './ui/CountUp';

gsap.registerPlugin(ScrollTrigger);

const IconWrapper = ({ children }) => (
    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 text-primary-purple">
        {children}
    </div>
);

const CoreBusiness = () => {
    const sectionRef = useRef(null);
    const businessLabelRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const statsRef = useRef(null);
    const buttonRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Business label fade-in animation
            gsap.fromTo(businessLabelRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: businessLabelRef.current,
                        start: "top 70%",
                        once: true
                    }
                }
            );

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

            // Description animation
            gsap.fromTo(descriptionRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: "top 70%",
                        once: true
                    }
                }
            );

            // Stats animation
            gsap.fromTo(statsRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                        once: true
                    }
                }
            );

            // Button animation
            gsap.fromTo(buttonRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: buttonRef.current,
                        start: "top 90%",
                        once: true
                    }
                }
            );

            // Cards staggered animation
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: cardsRef.current[0],
                        start: "top 70%",
                        once: true
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        // Added relative and a higher z-index (e.g., z-20)
        // Ensure bg-dark-bg is a solid color, not transparent
        <section ref={sectionRef} className="relative z-20 bg-dark-bg text-white py-16 md:py-20 flex justify-center items-center min-h-[100vh]">
            <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-10 lg:gap-16 px-5 lg:px-8">
                {/* Right Panel - Core Businesses Info (moved up for small screens) */}
                <div className="flex-1 flex flex-col justify-center text-left min-w-[300px] lg:min-w-[400px] lg:pl-10 order-1 lg:order-2">
                    <div ref={businessLabelRef} className="text-sm font-medium tracking-wider flex items-center mb-2 opacity-0">
                        <span className="flex items-center gap-2">
                            <BriefcaseBusiness className="text-primary-purple" size={14} />
                            <GradientText
                                colors={["#6A41E7", "#6A41E7", "#c084fc", "#6A41E7"]}
                                animationSpeed={2}
                                className="text-sm font-medium"
                            >
                                Business
                            </GradientText>
                        </span>
                    </div>
                    <div ref={titleRef} className="opacity-0">
                        <SplitText
                            text="Core Businesses"
                            className="text-5xl md:text-6xl font-bold leading-tight mb-5"
                            delay={80}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                    </div>
                    <p ref={descriptionRef} className="text-gray-400 text-lg leading-normal mb-8 opacity-0">
                        We specialize in diverse sectors, leveraging expertise and innovation to drive growth and deliver exceptional value. Our commitment to excellence ensures robust solutions tailored to each industry's unique demands.
                    </p>

                    <div ref={statsRef} className="flex flex-row gap-6 sm:gap-10 mb-10 justify-between sm:justify-start opacity-0"> {/* Changed to flex-row for all screen sizes */}
                        {/* Stat Item */}
                        <div className="flex flex-col items-start">
                            <span className="text-4xl sm:text-5xl font-bold text-white leading-none">
                                <CountUp 
                                    to={17} 
                                    duration={2.5} 
                                    delay={0.2}
                                    className="text-4xl sm:text-5xl font-bold text-white leading-none"
                                />+
                            </span>
                            <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-tight mt-1">Yrs Experience</span>
                        </div>
                        {/* Stat Item */}
                        <div className="flex flex-col items-start">
                            <span className="text-4xl sm:text-5xl font-bold text-white leading-none">
                                <CountUp 
                                    to={300} 
                                    duration={2.8} 
                                    delay={0.4}
                                    className="text-4xl sm:text-5xl font-bold text-white leading-none"
                                />+
                            </span>
                            <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-tight mt-1">Verticals</span>
                        </div>
                        {/* Stat Item */}
                        <div className="flex flex-col items-start">
                            <span className="text-4xl sm:text-5xl font-bold text-white leading-none">
                                <CountUp 
                                    to={50} 
                                    duration={2.2} 
                                    delay={0.6}
                                    className="text-4xl sm:text-5xl font-bold text-white leading-none"
                                />+
                            </span>
                            <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-tight mt-1">Clients</span>
                        </div>
                    </div>

                    {/* Learn More Button - Styling refined to match original image's button (with purple accent) */}
                    <button ref={buttonRef} className="bg-black border-[0.5px] border-white text-white px-10 py-2.5 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300 self-start opacity-0">
                        Learn More
                    </button>
                </div>

                {/* Left Panel - Cards (moved down for small screens) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 min-w-[350px] lg:min-w-[600px] order-2 lg:order-1"> {/* Adjusted order */}
                    {/* Agriculture Card */}
                    <div ref={el => cardsRef.current[0] = el} className="bg-black border border-white border-opacity-15 rounded-3xl p-6 flex flex-col gap-3 shadow-md opacity-0">
                        <IconWrapper>
                            <Leaf size={24} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold text-white">Agriculture</h3>
                        <p className="text-gray-400 text-base leading-normal">
                            Implementing sustainable practices for agricultural growth and food security.
                        </p>
                    </div>

                    {/* Construction Card */}
                    <div ref={el => cardsRef.current[1] = el} className="bg-black border border-white border-opacity-15 rounded-3xl p-6 flex flex-col gap-3 shadow-md opacity-0">
                        <IconWrapper>
                            <Hammer size={24} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold text-white">Construction</h3>
                        <p className="text-gray-400 text-base leading-normal">
                            Delivering robust infrastructure projects from residential to commercial.
                        </p>
                    </div>

                    {/* Healthcare Card */}
                    <div ref={el => cardsRef.current[2] = el} className="bg-black border border-white border-opacity-15 rounded-3xl p-6 flex flex-col gap-3 shadow-md opacity-0">
                        <IconWrapper>
                            <HeartPulse size={24} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold text-white">Healthcare</h3>
                        <p className="text-gray-400 text-base leading-normal">
                            Advancing medical services and health tech to improve patient care.
                        </p>
                    </div>

                    {/* Technology Card */}
                    <div ref={el => cardsRef.current[3] = el} className="bg-black border border-white border-opacity-15 rounded-3xl p-6 flex flex-col gap-3 shadow-md opacity-0">
                        <IconWrapper>
                            <Laptop size={24} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold text-white">Technology</h3>
                        <p className="text-gray-400 text-base leading-normal">
                            Developing cutting-edge software, driving digital transformation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoreBusiness;