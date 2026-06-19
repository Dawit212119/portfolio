"use client";

import { motion } from "framer-motion";
import { Github, Mail, MapPin } from "lucide-react";

interface Props {
  profile: {
    name: string;
    title: string;
    bio: string;
    email: string;
    location?: string | null;
    github?: string | null;
    linkedin?: string | null;
  };
}

export function Hero({ profile }: Props) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-3xl text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-8"
        >
          <span className="text-3xl font-bold text-primary">
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-medium mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          {profile.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-6"
        >
          {profile.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Mail size={18} />
            Get in Touch
          </a>
          {profile.github && (
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border hover:border-primary text-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Github size={18} />
              GitHub
            </a>
          )}
        </motion.div>

        {profile.location && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-1"
          >
            <MapPin size={14} />
            {profile.location}
          </motion.p>
        )}
      </div>
    </section>
  );
}
