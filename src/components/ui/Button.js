import React, { forwardRef } from 'react';

const Button = forwardRef(({ children, className = '', ...props }, ref) => (
    <button
        ref={ref}
        className={`
            relative
            overflow-hidden 
            bg-black
            border-[0.5px]
            border-white
            text-white
            px-10 
            py-2.5 
            rounded-full 
            text-lg 
            font-semibold
            self-start
            transition-colors 
            duration-300
            ease-in-out
            hover:text-black  
            before:content-['']
            before:absolute
            before:bottom-0
            before:left-0
            before:w-full
            before:h-0       
            before:bg-white
            before:transition-all
            before:duration-300
            before:ease-in-out
            before:z-0       
            hover:before:h-full 
            ${className}
        `}
        {...props}
    >
        <span className="relative z-10 w-full h-full flex items-center justify-center">
            {children}
        </span>
    </button>
));

export default Button; 