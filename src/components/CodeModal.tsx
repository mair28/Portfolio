"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { CodeSnippet } from "@/data/config";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  snippet: CodeSnippet;
}

export default function CodeModal({ isOpen, onClose, title, snippet }: CodeModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 mt-1">{snippet.explanation}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Code
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-900">
              <Highlight
                theme={themes.nightOwl}
                code={snippet.code.trim()}
                language={snippet.language as "python" | "typescript"}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={`${className} text-sm leading-relaxed`}
                    style={{ ...style, background: "transparent" }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })} className="table-row">
                        <span className="table-cell pr-4 text-slate-500 text-right select-none w-10">
                          {i + 1}
                        </span>
                        <span className="table-cell">
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <p className="text-xs text-slate-500">
                <span className="font-medium">Note:</span> All credentials and API keys are loaded from environment variables for security.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
