"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, Clock, Zap, Globe } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <span>{count}</span>;
}

function StatItem({ icon, value, suffix, label, delay, inView }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-3">
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-slate-800 mb-1">
        <AnimatedCounter value={value} inView={inView} />
        {suffix}
      </div>
      <div className="text-slate-500 text-sm">{label}</div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: <Briefcase className="text-slate-600" size={24} />, value: 16, suffix: "+", label: "Projects Completed" },
    { icon: <Clock className="text-slate-600" size={24} />, value: 2, suffix: "+", label: "Years Experience" },
    { icon: <Zap className="text-slate-600" size={24} />, value: 99, suffix: "%", label: "Client Satisfaction" },
    { icon: <Globe className="text-slate-600" size={24} />, value: 10, suffix: "+", label: "Countries Served" },
  ];

  return (
    <section ref={ref} className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
