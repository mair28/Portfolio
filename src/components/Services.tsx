"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Shield, Code, Bot, Server, Zap } from "lucide-react";

const services = [
  {
    icon: <Database size={32} />,
    title: "Web Scraping & Data Extraction",
    description: "Large-scale data extraction from any website. Handle complex structures, pagination, and dynamic content with high accuracy.",
    features: ["E-commerce data", "Price monitoring", "Lead generation", "Market research"],
  },
  {
    icon: <Shield size={32} />,
    title: "Anti-Bot Bypass Solutions",
    description: "Navigate through sophisticated bot protection systems including Cloudflare, DataDome, and PerimeterX.",
    features: ["CAPTCHA solving", "Fingerprint spoofing", "Proxy rotation", "Stealth browsing"],
  },
  {
    icon: <Server size={32} />,
    title: "API Development",
    description: "Build robust REST APIs to serve your scraped data. Real-time access, webhooks, and seamless integrations.",
    features: ["FastAPI backends", "Real-time endpoints", "Webhook integrations", "Documentation"],
  },
  {
    icon: <Bot size={32} />,
    title: "Automation & Bots",
    description: "Automate repetitive tasks and workflows. From social media to data pipelines, save hours of manual work.",
    features: ["Task automation", "Telegram bots", "Scheduled jobs", "Data pipelines"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Services
          </h2>
          <div className="w-20 h-1 bg-slate-800 mb-4"></div>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Specialized solutions to help you collect data, automate workflows, and scale your operations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="text-slate-400 group-hover:text-slate-700 transition-colors mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
