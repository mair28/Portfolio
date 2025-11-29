"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { siteConfig } from "@/data/config";
import { useEffect, useState } from "react";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("section");
      const contactSection = document.getElementById("contact");
      
      let shouldHide = false;
      
      // Hide when hero is visible
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        if (heroRect.bottom > 100) {
          shouldHide = true;
        }
      }
      
      // Hide when contact is visible
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        if (contactRect.top < window.innerHeight && contactRect.bottom > 0) {
          shouldHide = true;
        }
      }
      
      setIsVisible(!shouldHide);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={`mailto:${siteConfig.email}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-700 transition-colors"
        >
          <Mail size={20} />
          <span className="font-medium text-sm">Get in Touch</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
