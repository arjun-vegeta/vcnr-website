import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const location = useLocation(); // Hook to get current URL location

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entry animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 200); // Small delay to ensure smooth animation
    return () => clearTimeout(timer);
  }, []);

  // Close drawer on link click (mobile)
  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  // Helper to determine if a link is active
  const isActive = (path) => {
    // For the home page, path is '/', so we handle it specifically
    if (path === '/') {
      return location.pathname === '/';
    }
    // For other pages, check if the current path starts with the link's path
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-1000 ease-in-out mx-auto transform
          ${hasEntered 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
          }
          ${scrolled
            ? 'bg-black bg-opacity-70 rounded-full shadow-xl py-4 px-6 mt-4 w-[90%] md:w-[80%] lg:w-[60%] border border-gray-800' // Border when scrolled
            : 'bg-black bg-opacity-20 py-6 px-8 shadow-md w-full' // No border when unscrolled
          }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1400px] transition-all duration-1000 ease-in-out">
        {/* Logo */}
        <div className="flex-shrink-0 relative">
            <Link to="/" onClick={handleLinkClick}>
              {/* Logo with company name - visible when not scrolled */}
              <img 
                src="/whitelogo.png" 
                alt="Logo" 
                className={`h-8 w-auto transition-all duration-700 ease-in-out absolute top-0 left-0 ${
                  scrolled 
                    ? 'opacity-0 scale-95 translate-y-1' 
                    : 'opacity-100 scale-100 translate-y-0'
                }`}
              />
              {/* Company icon - visible when scrolled */}
              <img 
                src="/logo.png" 
                alt="Company Icon" 
                className={`h-8 w-auto transition-all duration-700 ease-in-out ${
                  scrolled 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-1'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path} // Changed to 'to'
                className={`text-white hover:text-purple-200 text-base font-medium relative
                  ${isActive(item.path) ? 'text-primary-purple !text-primary-purple' : ''}
                `}
              >
                {/* Active indicator */}
                {isActive(item.path) && (
                  <span className="absolute left-[-1rem] top-1/2 -translate-y-1/2 w-1 h-3 bg-primary-purple rounded-full"></span>
                )}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle menu"
              aria-expanded={drawerOpen}
              className="text-white hover:text-purple-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {drawerOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-95 shadow-lg transform transition-transform duration-300 ease-in-out z-40 md:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          } p-6`}>
        <div className="flex justify-end mb-8"> {/* Close button container */}
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="text-black hover:text-purple-300 focus:outline-none"
          >
            <svg
              className="h-8 w-8" // Larger close icon
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-6"> {/* Adjusted top margin */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path} // Changed to 'to'
              onClick={handleLinkClick}
              className={`text-white text-lg font-semibold hover:text-purple-300 relative pl-6
                ${isActive(item.path) ? 'text-purple-500' : ''}
              `} // Added pl-6 for border
            >
              {/* Active indicator */}
              {isActive(item.path) && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-purple rounded-full"></span>
              )}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay when drawer open */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;