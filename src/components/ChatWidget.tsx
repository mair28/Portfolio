"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Mail } from "lucide-react";
import { siteConfig } from "@/data/config";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  isForm?: boolean;
}

const faqResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    response: "Hello! I'm Omair's assistant. How can I help you today? You can ask about services, pricing, or availability.",
  },
  {
    keywords: ["service", "offer", "do you do", "what do you", "help with"],
    response: "Omair specializes in:\n• Web Scraping & Data Extraction\n• Anti-Bot Bypass Solutions\n• API Development (FastAPI)\n• Automation & Bots\n\nWould you like details on any specific service?",
  },
  {
    keywords: ["scraping", "scrape", "extract", "data extraction"],
    response: "Web scraping services include:\n• E-commerce price monitoring\n• Lead generation\n• Market research data\n• Competitor analysis\n\nProjects typically start at $200-500 depending on complexity.",
  },
  {
    keywords: ["price", "cost", "rate", "charge", "budget", "how much"],
    response: "Pricing depends on project complexity:\n• Simple scrapers: $200-500\n• Complex systems: $500-2000+\n• Ongoing maintenance: $50-200/month\n\nWould you like to discuss your specific project?",
  },
  {
    keywords: ["available", "availability", "free", "start", "timeline", "when"],
    response: "I'm currently available for new projects! Typical turnaround:\n• Simple projects: 3-7 days\n• Medium complexity: 1-2 weeks\n• Large systems: 2-4 weeks\n\nWant to discuss your timeline?",
  },
  {
    keywords: ["captcha", "cloudflare", "bot detection", "anti-bot", "bypass"],
    response: "I handle various anti-bot systems:\n• Cloudflare, DataDome, PerimeterX\n• reCAPTCHA, hCaptcha, Turnstile\n• Browser fingerprinting\n\nThese require stealth techniques and may cost more.",
  },
  {
    keywords: ["api", "backend", "fastapi", "endpoint"],
    response: "API development services:\n• FastAPI REST backends\n• Real-time data endpoints\n• Webhook integrations\n• Database design\n\nI can build APIs to serve your scraped data.",
  },
  {
    keywords: ["telegram", "bot", "automation", "automate"],
    response: "Automation services:\n• Telegram notification bots\n• Scheduled scraping jobs\n• Data pipeline automation\n• Social media tools\n\nTell me what you want to automate!",
  },
  {
    keywords: ["contact", "email", "reach", "talk", "human", "person", "omair", "call"],
    response: "I'll connect you with Omair directly. Please fill out the form below:",
  },
  {
    keywords: ["portfolio", "work", "example", "project", "experience"],
    response: "Check out the Projects section on this site! I've completed 50+ projects including:\n• Enterprise scraping systems\n• E-commerce price monitors\n• Amazon analytics tools\n\nScroll down or click 'Projects' in the menu.",
  },
  {
    keywords: ["location", "where", "country", "timezone"],
    response: "Omair is based in the Philippines (GMT+8) but works with clients globally - US, Australia, Canada, Singapore, and Europe. Remote collaboration works great!",
  },
];

const defaultResponse = "I'm not sure about that. You can ask about:\n• Services offered\n• Pricing\n• Availability\n• Specific technologies\n\nOr click 'Talk to Omair' to get in touch directly!";

function getResponse(input: string): { text: string; showForm: boolean } {
  const lower = input.toLowerCase();
  
  for (const faq of faqResponses) {
    if (faq.keywords.some(kw => lower.includes(kw))) {
      const showForm = faq.keywords.includes("contact") || faq.keywords.includes("human");
      return { text: faq.response, showForm };
    }
  }
  
  return { text: defaultResponse, showForm: false };
}

function ContactForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open email client with pre-filled data
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 bg-emerald-50 rounded-lg text-center">
        <p className="text-emerald-700 font-medium">Email client opened!</p>
        <p className="text-emerald-600 text-sm mt-1">Send the email to reach Omair.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-3 bg-slate-50 rounded-lg">
      <input
        type="text"
        placeholder="Your Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <input
        type="email"
        placeholder="Your Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <textarea
        placeholder="Tell me about your project..."
        required
        rows={3}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
      />
      <button
        type="submit"
        className="w-full py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Omair's assistant. Ask me about services, pricing, or availability. Or type 'contact' to reach Omair directly!", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    const { text, showForm: shouldShowForm } = getResponse(input);
    
    setTimeout(() => {
      const botMessage: Message = { id: Date.now() + 1, text, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
      if (shouldShowForm) setShowForm(true);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-700 transition-colors flex items-center justify-center"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-medium">Omair's Assistant</p>
                  <p className="text-xs text-slate-300">Usually replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-slate-700 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.isBot ? "" : "flex-row-reverse"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isBot ? "bg-slate-200" : "bg-slate-800"}`}>
                      {msg.isBot ? <Bot size={14} className="text-slate-600" /> : <User size={14} className="text-white" />}
                    </div>
                    <div className={`px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${msg.isBot ? "bg-white border border-slate-200 text-slate-700" : "bg-slate-800 text-white"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {showForm && <ContactForm onClose={() => setShowForm(false)} />}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about services, pricing..."
                  className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              <button
                onClick={() => {
                  setMessages((prev) => [...prev, { id: Date.now(), text: "I'd like to talk to Omair", isBot: false }]);
                  setTimeout(() => {
                    setMessages((prev) => [...prev, { id: Date.now() + 1, text: "I'll connect you with Omair directly. Please fill out the form below:", isBot: true }]);
                    setShowForm(true);
                  }, 500);
                }}
                className="w-full mt-2 py-2 text-sm text-slate-600 hover:text-slate-800 flex items-center justify-center gap-2"
              >
                <Mail size={14} />
                Talk to Omair directly
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
