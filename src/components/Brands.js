import React, { useState, useRef, useEffect } from 'react';
import { Aperture, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './ui/SplitText';
import GradientText from './ui/GradientText';
import Button from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

// --- Data for the brands ---
const brandsData = [
    {
        name: 'Nestlé',
        logoUrl: '/brands/nestle.png',
        websiteUrl: 'https://www.nestle.in/',
    },
    {
        name: 'Godrej',
        logoUrl: '/brands/godrej.png',
        websiteUrl: 'https://www.godrej.com/',
    },
    {
        name: 'Reliance Industries',
        logoUrl: '/brands/reliance.png',
        websiteUrl: 'https://www.ril.com/',
    },
    {
        name: 'Bajay',
        logoUrl: '/brands/bajaj.png',
        websiteUrl: 'https://www.bajajauto.com/',
    },
    {
        name: 'Safexpress',
        logoUrl: '/brands/SE.png',
        websiteUrl: 'https://www.safexpress.com/',
    },
    {
        name: 'Britannia',
        logoUrl: '/brands/Britania.png',
        websiteUrl: 'https://britannia.co.in/',
    },
    {
        name: 'FSC',
        logoUrl: '/brands/FSC.jpg',
        websiteUrl: 'https://fsc.org/en',
    },
    {
        name: 'Girias',
        logoUrl: '/brands/Giriyas.png',
        websiteUrl: 'https://www.giriasindia.com/',
    },
    {
        name: 'ITC',
        logoUrl: '/brands/ITC.png',
        websiteUrl: 'https://www.itcportal.com/',
    },
    {
        name: 'Denso',
        logoUrl: '/brands/Denso.png',
        websiteUrl: 'https://www.denso.com/',
    },
    {
        name: 'Flipkart',
        logoUrl: '/brands/Flipkart.png',
        websiteUrl: 'https://www.flipkart.com/',
    },
    {
        name: 'JWL',
        logoUrl: '/brands/JWL.png',
        websiteUrl: '#',
    },
    {
        name: 'Scope Logistics',
        logoUrl: '/brands/ScopeLogistics.png',
        websiteUrl: '#',
    },
];

const Brands = () => {
    const [showAllBrands, setShowAllBrands] = useState(false);
    
    const sectionRef = useRef(null);
    const customerStoriesRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const brandsGridRef = useRef(null);
    const showMoreButtonRef = useRef(null);
    
    const getBrandsToShow = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return showAllBrands ? brandsData : brandsData.slice(0, 4);
        }
        return brandsData;
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(customerStoriesRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: customerStoriesRef.current,
                        start: "top 70%",
                        once: true
                    }
                }
            );

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

            gsap.fromTo(descriptionRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: "top 75%", // Adjusted trigger
                        once: true
                    }
                }
            );

            // Brand cards animation - fade in with subtle scale
            gsap.fromTo(".brand-card",
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: {
                        each: 0.08,
                        from: "random",
                    },
                    scrollTrigger: {
                        trigger: brandsGridRef.current,
                        start: "top 70%",
                        once: true,
                    }
                }
            );
            
            if (showMoreButtonRef.current) {
                gsap.fromTo(showMoreButtonRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: showMoreButtonRef.current,
                            start: "top 90%",
                            once: true
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const brandsToShow = getBrandsToShow();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const hasMoreBrands = brandsData.length > 4;

    return (
        <div ref={sectionRef} className="bg-dark-bg relative z-20 text-white font-sans pt-20 w-full min-h-screen">
            <div className="max-w-7xl w-full px-5 lg:px-8 mx-auto">
                <div className="flex justify-between items-start flex-wrap gap-8 mb-16">
                    <div>
                        <div ref={customerStoriesRef} className="text-sm font-medium tracking-wider flex items-center mb-2 opacity-0">
                            <span className="flex items-center gap-2">
                                <Aperture className="text-primary-purple" size={14} />
                                <GradientText
                                    colors={["#6A41E7", "#6A41E7", "#c084fc", "#6A41E7"]}
                                    animationSpeed={2}
                                    className="text-sm font-medium"
                                >
                                    Customer Stories
                                </GradientText>
                            </span>
                        </div>
                        <div ref={titleRef} className="opacity-0">
                            <SplitText
                                text="Trusted by"
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
                    </div>
                    <p ref={descriptionRef} className="text-gray-400 max-w-lg pt-0 md:pt-10 text-left sm:text-right opacity-0">
                        We've had the privilege to serve a diverse range of companies, from industry giants to innovative startups.
                    </p>
                </div>

                <div ref={brandsGridRef} className="group/grid pointer-events-none grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                    {brandsToShow.map((brand) => (
                        <a
                        key={brand.name}
                        href={brand.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brand-card pointer-events-auto group/card transition-all duration-300 ease-in-out 
                                   md:group-hover/grid:opacity-60 md:group-hover/grid:blur-[2px]
                                   md:hover:!opacity-100 md:hover:!blur-none"
                    >
                        <div className="relative flex items-center justify-center h-44 p-6 rounded-2xl bg-dark-bg 
                            transition-all duration-300 border border-white/30 md:hover:border-primary-purple group">
                            <img
                                src={brand.logoUrl}
                                alt={`${brand.name} logo`}
                                className="max-h-[75px] max-w-[150px] object-contain transition-transform duration-300 md:group-hover:scale-110"
                            />
                            <p className="absolute bottom-[15px] left-1/2 -translate-x-1/2 text-sm text-center font-medium text-gray-300 opacity-0 
                             transition-opacity duration-300 md:group-hover/card:opacity-100 flex items-center gap-1">
                                <GradientText
                                    colors={["#FFFFFF", "#A39AC1", "#FFFFFF", "#FFFFFF"]}
                                    animationSpeed={2}
                                    className="text-sm font-medium"
                                >
                                    {brand.name}
                                </GradientText>
                                <span className="relative top-[1px]">
                                    <ArrowUpRight size={14} />
                                </span>
                            </p>
                        </div>
                    </a>
                    ))}
                </div>

                {isMobile && hasMoreBrands && (
                    <div ref={showMoreButtonRef} className="flex justify-center mt-8 opacity-0">
                        <Button
                            onClick={() => setShowAllBrands(!showAllBrands)}
                            className="flex items-center gap-2"
                        >
                            {showAllBrands ? (
                                <>
                                    Show Less
                                    <ChevronUp size={16} />
                                </>
                            ) : (
                                <>
                                    Show More ({brandsData.length - 4} more)
                                    <ChevronDown size={16} />
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Brands;