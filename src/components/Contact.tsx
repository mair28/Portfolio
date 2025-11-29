"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-slate-800 mx-auto mb-8"></div>
          
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            I&apos;m currently looking for new opportunities and collaborations. 
            Whether you have a project in mind, want to discuss web scraping solutions, 
            or just want to say hi, feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail size={20} />
              <a 
                href={`mailto:${siteConfig.email}`}
                className="hover:text-slate-900 transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin size={20} />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          <motion.a
            href={`mailto:${siteConfig.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-700 transition-colors"
          >
            <Send size={20} />
            Send Message
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
