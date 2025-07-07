import React, { useRef, useEffect } from 'react';
import { Leaf, Hammer, HeartPulse, Laptop, BriefcaseBusiness } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './ui/SplitText';
import GradientText from './ui/GradientText';
import CountUp from './ui/CountUp';
import Button from './ui/Button';

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
    cardsRef.current = []; // Ensure the array is reset on re-renders

    // Effect for initial page load animations (remains unchanged)
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

            // Title fade-in animation
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

    // --- MODIFIED: Simplified effect for hover animations ---
    useEffect(() => {
        const cards = cardsRef.current;
        if (cards.length === 0) return;

        const handleMouseEnter = (e) => {
            const card = e.currentTarget;
            const icon = card.querySelector('svg');
            
            gsap.to(card, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
            gsap.to(icon, { scale: 1.15, rotate: 10, duration: 0.3, ease: 'back.out(1.7)' });
        };

        const handleMouseLeave = (e) => {
            const card = e.currentTarget;
            const icon = card.querySelector('svg');

            gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(1.7)' });
        };

        // Attach event listeners to each card
        cards.forEach((card) => {
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup function
        return () => {
            cards.forEach((card) => {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
            gsap.killTweensOf(cards);
            const icons = cards.map(c => c.querySelector('svg')).filter(Boolean);
            if (icons.length) {
                gsap.killTweensOf(icons);
            }
        };
    }, []); 

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="relative z-20 bg-dark-bg text-white py-16 md:py-20 flex justify-center items-center min-h-[100vh]">
            <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-10 lg:gap-16 px-5 lg:px-8">
                {/* Right Panel - Core Businesses Info */}
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

                    <div ref={statsRef} className="flex flex-row gap-6 sm:gap-10 mb-10 justify-between sm:justify-start opacity-0">
                        <div className="flex flex-col items-start">
                            <span className="text-4xl sm:text-5xl font-bold text-white leading-none">
                                <CountUp to={17} duration={2.5} delay={0.2} />+
                            </span>
                            <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-tight mt-1">Yrs Experience</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-4xl sm:text-5xl font-bold text-white leading-none">
                                <CountUp to={300} duration={2.8} delay={0.4} />+
                            </span>
                            <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-tight mt-1">Verticals</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-4xl sm:text-5xl font-bold text-white leading-none">
                                <CountUp to={50} duration={2.2} delay={0.6} />+
                            </span>
                            <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-tight mt-1">Clients</span>
                        </div>
                    </div>

                    <Button 
                        ref={buttonRef}
                    >
                        Learn More
                    </Button>
                </div>

                {/* Left Panel - Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 w-auto md:min-w-[600px] order-2 lg:order-1">
                    {/* Agriculture Card */}
                    <div ref={addToRefs} className="core-card bg-black border border-white/15 rounded-3xl p-8 md:p-6 flex flex-col gap-3 shadow-md opacity-0 w-auto cursor-pointer">
                        <IconWrapper>
                            <Leaf size={24} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold text-white">Agriculture</h3>
                        <p className="text-gray-400 text-base leading-normal">
                            Implementing sustainable practices for agricultural growth and food security.
                        </p>
                    </div>

                    {/* Construction Card */}
                    <div ref={addToRefs} className="core-card bg-black border border-white/15 rounded-3xl p-8 md:p-6 flex flex-col gap-3 shadow-md opacity-0 w-auto cursor-pointer">
                        <IconWrapper>
                            <Hammer size={24} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold text-white">Construction</h3>
                        <p className="text-gray-400 text-base leading-normal">
                            Delivering robust infrastructure projects from residential to commercial.
                        </p>
                    </div>

                    {/* Healthcare Card */}
                    <div ref={addToRefs} className="core-card bg-black border border-white/15 rounded-3xl p-8 md:p-6 flex flex-col gap-3 shadow-md opacity-0 w-auto cursor-pointer">
                        <IconWrapper>
                            <HeartPulse size={24} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold text-white">Healthcare</h3>
                        <p className="text-gray-400 text-base leading-normal">
                            Advancing medical services and health tech to improve patient care.
                        _</p>
                    </div>

                    {/* Technology Card */}
                    <div ref={addToRefs} className="core-card bg-black border border-white/15 rounded-3xl p-8 md:p-6 flex flex-col gap-3 shadow-md opacity-0 w-auto cursor-pointer">
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