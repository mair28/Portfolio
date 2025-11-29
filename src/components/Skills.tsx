"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills, skillCategories, skillLevels, Skill } from "@/data/config";

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const levelConfig = skillLevels[skill.level];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-slate-700 font-medium">{skill.name}</span>
        <span className="text-sm text-slate-500">{levelConfig.label}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
          className={`h-full ${levelConfig.color} ${levelConfig.width} rounded-full`}
        />
      </div>
    </motion.div>
  );
}

function SkillCategory({ 
  category, 
  categorySkills 
}: { 
  category: keyof typeof skillCategories; 
  categorySkills: Skill[];
}) {
  const config = skillCategories[category];
  
  return (
    <div className="bg-slate-50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
        <h3 className="text-xl font-semibold text-slate-800">{config.label}</h3>
      </div>
      <div>
        {categorySkills.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryOrder: (keyof typeof skillCategories)[] = [
    "backend",
    "frontend", 
    "databases",
    "tools"
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-slate-800 mb-4"></div>
          <p className="text-slate-600 mb-12 max-w-2xl">
            My technical toolkit spans from expert-level Python and web scraping to 
            emerging full-stack capabilities. I&apos;m constantly learning and growing.
          </p>

          {isInView && (
            <div className="grid md:grid-cols-2 gap-8">
              {categoryOrder.map((category) => (
                groupedSkills[category] && (
                  <SkillCategory
                    key={category}
                    category={category}
                    categorySkills={groupedSkills[category]}
                  />
                )
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
