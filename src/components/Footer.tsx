"use client";

import { Mail, MapPin, Heart } from "lucide-react";
import { siteConfig } from "@/data/config";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/logo.png"
            alt="OM Logo"
            width={50}
            height={28}
            className="invert brightness-200"
          />
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>
            <span className="hidden sm:block">|</span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {siteConfig.location}
            </span>
          </div>

          <p className="flex items-center gap-1 text-sm">
            Built with <Heart size={14} className="text-red-500" /> using Next.js & Tailwind CSS
          </p>

          <p className="text-sm">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
