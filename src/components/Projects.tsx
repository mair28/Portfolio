"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Folder, Code, Calendar } from "lucide-react";
import { projects, Project } from "@/data/config";
import CodeModal from "./CodeModal";

function ProjectCard({ 
  project, 
  index,
  onViewCode 
}: { 
  project: Project; 
  index: number;
  onViewCode: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow group flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <Folder className="text-slate-400 group-hover:text-slate-600 transition-colors" size={40} />
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="View on GitHub"
            >
              <Github size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="View live site"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-slate-900">
        {project.title}
      </h3>
      
      <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
        <Calendar size={14} />
        <span>{project.duration}</span>
      </div>
      
      <p className="text-slate-600 mb-4 leading-relaxed flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.codeSnippet && (
        <button
          onClick={onViewCode}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
        >
          <Code size={16} />
          View Code
        </button>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <>
      <section id="projects" className="py-20 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Projects
            </h2>
            <div className="w-20 h-1 bg-slate-800 mb-4"></div>
            <p className="text-slate-600 mb-12 max-w-2xl">
              A selection of projects showcasing my expertise in Python, web scraping, 
              and my growing full-stack development skills. Click &quot;View Code&quot; to see sample implementations.
            </p>

            {isInView && (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.title} 
                      project={project} 
                      index={index}
                      onViewCode={() => setSelectedProject(project)}
                    />
                  ))}
                </div>

                {otherProjects.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-slate-700 mb-6">
                      Other Projects
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherProjects.map((project, index) => (
                        <ProjectCard
                          key={project.title}
                          project={project}
                          index={index + featuredProjects.length}
                          onViewCode={() => setSelectedProject(project)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {selectedProject?.codeSnippet && (
        <CodeModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          snippet={selectedProject.codeSnippet}
        />
      )}
    </>
  );
}
