import React, { useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './ui/SplitText'; // Assuming you have this component
import Button from './ui/Button'; // Assuming you have this component

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const contactInfoRef = useRef([]);
    contactInfoRef.current = []; // Ensure the array is reset on re-renders
    const socialLinksRef = useRef([]);
    socialLinksRef.current = []; // Ensure the array is reset on re-renders
    const mapRef = useRef(null);
    const formRef = useRef(null);

    const addToContactInfoRefs = (el) => {
        if (el && !contactInfoRef.current.includes(el)) {
            contactInfoRef.current.push(el);
        }
    };

    const addToSocialLinksRefs = (el) => {
        if (el && !socialLinksRef.current.includes(el)) {
            socialLinksRef.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        once: true
                    }
                }
            );

            // Description animation
            gsap.fromTo(descriptionRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.3,
                    ease: "power3.out",
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: "top 85%",
                        once: true
                    }
                }
            );

            // Staggered animation for contact info items
            gsap.fromTo(contactInfoRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: contactInfoRef.current[0],
                        start: "top 80%",
                        once: true
                    }
                }
            );

            // Staggered animation for social links
            gsap.fromTo(socialLinksRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: socialLinksRef.current[0],
                        start: "top 90%",
                        once: true
                    }
                }
            );

            // Map and Form fade-in
            gsap.fromTo([mapRef.current, formRef.current],
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    stagger: 0.3,
                    scrollTrigger: {
                        // Change the trigger to titleRef.current and adjust start
                        trigger: titleRef.current, // <-- CHANGED
                        start: "top center",      // <-- ADJUSTED (or "top 70%" based on preference)
                        once: true
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative z-20 bg-dark-bg text-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div ref={titleRef} className="opacity-0">
                        <SplitText
                            text="Connect with VCNR"
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
                    <p ref={descriptionRef} className="text-gray-400 text-lg leading-normal max-w-3xl mx-auto opacity-0">
                        Whether you have a project in mind, a question about our services, or just want to say hello, we'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Information */}
                    <div className="flex flex-col gap-8">
                        <div ref={addToContactInfoRefs} className="flex items-start gap-4 opacity-0">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary-purple flex-shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Call Us</h3>
                                <p className="text-gray-400 text-base">
                                    <a href="tel:+918029511531" className="hover:text-primary-purple transition-colors duration-300">080 2951 1531</a><br />
                                    <a href="tel:+916364914086" className="hover:text-primary-purple transition-colors duration-300">+91 63649 14086</a>
                                </p>
                            </div>
                        </div>

                        <div ref={addToContactInfoRefs} className="flex items-start gap-4 opacity-0">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary-purple flex-shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Email Us</h3>
                                <p className="text-gray-400 text-base">
                                    <a href="mailto:contact@vcnr.com" className="hover:text-primary-purple transition-colors duration-300">contact@vcnr.com</a>
                                </p>
                            </div>
                        </div>

                        <div ref={addToContactInfoRefs} className="flex items-start gap-4 opacity-0">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary-purple flex-shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Visit Our Office</h3>
                                <address className="text-gray-400 text-base not-italic">
                                    #135, VCNR Towers, Vinayaka Nagar,<br />
                                    BH Road, Binnamangala Nursery,<br />
                                    Nelamangala Town, Karnataka 562123
                                </address>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Connect with us on Social Media</h3>
                            <div className="flex gap-4">
                                <a ref={addToSocialLinksRefs} href="https://facebook.com/vcnrgroup" target="_blank" rel="noopener noreferrer" className="opacity-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-primary-purple hover:bg-white/20 transition-all duration-300">
                                    <Facebook size={20} />
                                </a>
                                <a ref={addToSocialLinksRefs} href="https://twitter.com/vcnrgroup" target="_blank" rel="noopener noreferrer" className="opacity-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-primary-purple hover:bg-white/20 transition-all duration-300">
                                    <Twitter size={20} />
                                </a>
                                <a ref={addToSocialLinksRefs} href="https://linkedin.com/company/vcnrgroup" target="_blank" rel="noopener noreferrer" className="opacity-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-primary-purple hover:bg-white/20 transition-all duration-300">
                                    <Linkedin size={20} />
                                </a>
                                <a ref={addToSocialLinksRefs} href="https://instagram.com/vcnrgroup" target="_blank" rel="noopener noreferrer" className="opacity-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-primary-purple hover:bg-white/20 transition-all duration-300">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div ref={formRef} className="bg-black border border-white/15 rounded-3xl p-8 md:p-10 shadow-lg opacity-0">
                        <h2 className="text-3xl font-bold text-white mb-6">Send us a message</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-5 py-3 bg-dark-bg border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-purple transition-colors duration-300"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-5 py-3 bg-dark-bg border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-purple transition-colors duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-5 py-3 bg-dark-bg border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-purple transition-colors duration-300"
                                    placeholder="Briefly describe your inquiry"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="w-full px-5 py-3 bg-dark-bg border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-purple transition-colors duration-300 resize-y"
                                    placeholder="Type your message here..."
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full justify-center">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div ref={mapRef} className="mt-20 opacity-0">
    <h2 className="text-3xl font-bold text-white text-center mb-8">Find Us on the Map</h2>
    <div className="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden shadow-xl border border-white/15">
        <iframe
            // REPLACE THIS ENTIRE src VALUE with the one you copied from Google Maps
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5566.7803663224395!2d77.40710180054434!3d13.091201014290757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae250975fd93d9%3A0x4bd9c20253f54ed9!2sCNR%20Tower!5e0!3m2!1sen!2sin!4v1751885961865!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="VCNR Group Location"
        ></iframe>
    </div>
</div>
            </div>
        </section>
    );
};

export default ContactPage;

