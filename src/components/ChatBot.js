import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Bot, Send, RefreshCw, X, Maximize, Minimize, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Toaster, toast } from 'react-hot-toast';

// --- Main Chatbot Component ---
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatboxRef = useRef(null);

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

    // --- Comprehensive VCNR Knowledge Base ---
    const vcnrInfoPrompt = `
    You are the official AI Assistant for VCNR. You must always respond clearly and professionally, using clean markdown formatting with:

    - **Bold** titles and labels
    - Bullet points for lists
    - [Links](https://example.com) for references
    - Avoid emojis or casual expressions

    ---

    ## LEADERSHIP
    - **Chairman:** Mr. N. Narasimhamurthy V
    - **CEO, VCNR Healthcare:** Mr. Vinay
    - **CEO, VCNR Technologies:** Mr. Rudramurthy
    - **CEO, VCNR Builders & Developers:** Mr. Santhosh

    ---

    ## CONTACT DETAILS
    - **Phone:** 080 2951 1531 / +91 63649 14086  
    - **Email:** contact@vcnr.com  
    - **Office Address:** VCNR Towers, Nelamangala, Bengaluru  
    - [Google Maps Location](https://maps.app.goo.gl/wE1y1a3bThM4AADS7)
    ---
    
    ## 🧱 CORE BUSINESS DETAILS
    
    ### 1. Construction (VCNR Builders & Developers)
    - **Projects:** 300+ total, including 164+ warehouses
    - **Clients:** 50+ across India
    - **Expertise:**
      - FM2 Industrial Flooring
      - Pre-Engineered Buildings (PEB)
      - Roof Monitors, Louvers
      - Fire Hydrant Systems
      - Concrete/Bitumen Roads, Fire Alarms, Sprinklers
    
    ---
    
    ### 2. Technology (VCNR Technologies)
    - **Services:**
      - Mobile & Web Development
      - Robotic Process Automation (RPA)
      - AI and IoT Integration
      - Modernization of Legacy Applications
      - Custom Construction Measurement Tool
    - **Track Record:** 200+ projects, 70+ clients across 6 domains
    
    ---
    
    ### 3. Healthcare (VCNR Healthcare)
    - **Flagship:** Karnataka’s 1st Integrated Hospital
    - **Centers:** 2 (Nelamangala and beyond)
    - **Facilities:**
      - Health Park
      - Integrated Hospital
      - Institute of Health Science
      - Laboratories
      - Integrated Pharma
    - **Reach:** 10,000+ patients served
    
    ---
    
    ### 4. Agriculture
    - **Focus:** Precision agriculture using advanced technology
    - **Key Solutions:**
      - Drone Surveillance & Sprayers
      - Wireless Sensor Networks (WSN)
      - Data-driven soil & plant health monitoring
    - **Impact:** 500+ acres managed, 1000+ farmers supported
    
    ---
    
    ## 🤝 BRANDS WE'VE WORKED WITH
    Nestlé, Godrej, Reliance, Britannia, ITC, Denso, Flipkart, Bajaj, Safexpress, Girias, FSC, JWL, Scope Logistics
    
    ---
    
    ## 💼 CAREERS
    VCNR is a platform to build meaningful careers.  
    We offer roles in:
    - Construction Project Management
    - Software & AI Development
    - Healthcare Administration
    - Agri-Tech Operations
    
    📩 To apply or inquire, reach out to [contact@vcnr.com](mailto:contact@vcnr.com)
    
    -If u dont know the answer, just say: I sorry, I don't know the answer to that question. Please contact .... , nothing else

    ---
    
    ✅ For any detailed query, always suggest:  
    “📩 _For more information, feel free to contact us at [contact@vcnr.com](mailto:contact@vcnr.com)_”
    `;

    // --- Effects & Handlers ---

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    const resetChat = () => {
        setMessages([]);
        setInput('');
    };

    const handleSendMessage = async (query) => {
        if (!query.trim() || isLoading) return;

        const userMessage = { text: query, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        // Add a placeholder for the bot's response to show loading state
        setMessages(prev => [...prev, { text: '...', sender: 'bot' }]); 

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
            const chat = model.startChat({
                history: [
                    { role: "user", parts: [{ text: vcnrInfoPrompt }] },
                    { role: "model", parts: [{ text: "Hello! I am the official VCNR AI assistant. How can I help you today?" }] }
                ]
            });

            const result = await chat.sendMessageStream(query);
            let streamedText = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                streamedText += chunkText;
                
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = streamedText;
                    return newMessages;
                });
            }

        } catch (error) {
            console.error("AI API error:", error);
            toast.error("An error occurred. Please try again.", { position: "top-center" });
            setMessages(prev => {
                const newMessages = [...prev];
                // Update the last message to show an error, or remove it
                newMessages[newMessages.length - 1].text = "Sorry, I ran into an issue. Please try again.";
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const suggestedQuestions = [
        "What are VCNR's four core businesses?",
        "Who are some major brands you've worked with?",
        "Tell me about your tech solutions in agriculture.",
        "What makes your construction business unique?",
    ];

    const chatboxStyles = isEnlarged 
        ? "top-0 left-0 right-0 bottom-0 w-full h-full rounded-none" 
        : "bottom-5 right-5 w-[calc(100%-2.5rem)] h-[75vh] sm:w-[450px] sm:h-[600px] sm:bottom-24 sm:right-5 rounded-2xl";

    // --- NEW: Style block for improved markdown formatting and scrollbar ---
    const ChatStyles = () => (
        <style>{`
            .prose-chat {
                font-size: 0.95rem; /* Slightly larger base font */
            }
            .prose-chat p {
                margin-bottom: 0.75rem; /* Vertical spacing for paragraphs */
            }
            .prose-chat ul {
                margin-bottom: 1rem; /* Vertical spacing for lists */
                padding-left: 1.5rem; /* Indent bullet points */
            }
            .prose-chat li {
                margin-bottom: 0.25rem; /* Spacing between list items */
            }
            .prose-chat a {
                color: #a855f7; /* Purple color for links */
                text-decoration: underline; /* Underline links */
            }
            .prose-chat a:hover {
                color: #c084fc; /* Lighter purple on hover */
            }
            .prose-chat strong {
                color: #ffffff; /* Make bold text white */
            }
            
            /* Dark scrollbar styling */
            .chat-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .chat-scrollbar::-webkit-scrollbar-track {
                background: #161b22;
                border-radius: 3px;
            }
            .chat-scrollbar::-webkit-scrollbar-thumb {
                background: #30363d;
                border-radius: 3px;
            }
            .chat-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #484f58;
            }
        `}</style>
    );

    // --- Render Component ---

    return (
        <>
            <Toaster />
            <ChatStyles /> {/* <-- Inject the custom styles here */}
            {/* Chat Window */}
            <div className={`fixed z-50 bg-black/85 border border-[#30363d] shadow-2xl flex flex-col transition-all duration-300 ease-in-out origin-bottom-right ${isOpen ? 'scale-100' : 'scale-0'} ${chatboxStyles}`}>
                {/* Header */}
                <div className="flex-shrink-0 flex items-center rounded-t-2xl justify-between p-3.5 bg-black border-b border-[#30363d]">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="bg-white p-1 rounded-full"><Bot size={28} className="text-black" /></div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white text-md">AI Assistant</h3>
                            <p className="text-xs text-gray-400">Official VCNR Assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={resetChat} className="text-white hover:text-white hover:bg-gray-700 p-2 rounded transition-colors"><RefreshCw size={18} /></button>
                        <button onClick={() => setIsEnlarged(!isEnlarged)} className="text-white hover:text-white hover:bg-gray-700 p-2 rounded transition-colors">
                            {isEnlarged ? <Minimize size={18} /> : <Maximize size={18} />}
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-white hover:bg-gray-700 p-2 rounded transition-colors"><X size={20} /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto chat-scrollbar">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center rounded-3xl justify-center h-full text-center">
                            <div className="p-3 bg-black rounded-full mb-4"><Bot size={32} className="text-gray-300" /></div>
                            <p className="text-lg text-gray-200">Hi! I'm the VCNR AI assistant.</p>
                            <p className="text-sm text-gray-400 mb-6 max-w-xs">Ask me anything about our work, businesses, or projects!</p>
                            <div className="w-full max-w-md space-y-3">
                                {suggestedQuestions.map((q, i) => (
                                    <button key={i} onClick={() => handleSendMessage(q)} className="w-full text-left text-sm text-gray-200 bg-[#161b22] border border-[#30363d] hover:bg-gray-700 transition-colors duration-200 rounded-lg p-3">{q}</button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender === 'bot' && <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center"><Bot size={20} className="text-white" /></div>}
                                    {/* --- UPDATED: Added 'prose-chat' class for custom styling --- */}
                                    <div className={`prose prose-chat prose-invert prose-sm max-w-xs md:max-w-md px-4 py-2 rounded-xl text-white ${msg.sender === 'user' ? 'bg-primary-purple rounded-br-none' : 'bg-gray-800 rounded-bl-none'}`}>
                                        <ReactMarkdown>{msg.text || '...'}</ReactMarkdown>
                                    </div>
                                    {msg.sender === 'user' && <div className="w-8 h-8 flex-shrink-0 bg-primary-purple rounded-full flex items-center justify-center"><User size={20} className="text-white" /></div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="flex-shrink-0 p-4 bg-black border-t border-[#30363d] rounded-b-2xl">
                    <div className="flex items-center gap-3">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)} placeholder="Ask me anything..." className="flex-1 w-full bg-transparent text-white py-2 px-4 rounded-full border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-primary-purple" disabled={isLoading}/>
                        <button onClick={() => handleSendMessage(input)} disabled={isLoading || !input.trim()} className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-black rounded-full transition-colors"><Send size={20} /></button>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-5 right-5 bg-white hover:bg-gray-200 transition-all duration-300 text-black rounded-full p-3 shadow-lg z-40 transform hover:scale-110">
                <Bot size={28} />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black"></div>
            </button>
        </>
    );
};

export default Chatbot;