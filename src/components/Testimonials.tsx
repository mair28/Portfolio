"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/data/config";

function TestimonialCard({ 
  testimonial, 
  index 
}: { 
  testimonial: typeof testimonials[0]; 
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium text-sm">
          {testimonial.name[0]}
        </div>
        <div>
          <h4 className="font-medium text-slate-800 text-sm">{testimonial.name}</h4>
          <p className="text-xs text-slate-400">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
      
      <p className="text-slate-600 text-sm leading-relaxed">
        {testimonial.content}
      </p>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            What Clients Say
          </h2>
          <div className="w-20 h-1 bg-slate-800 mb-4"></div>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Feedback from clients I&apos;ve worked with on web scraping, automation, and development projects.
          </p>

          {isInView && (
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
