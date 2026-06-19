"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";

interface Props {
  profile: {
    email: string;
    phone?: string | null;
    location?: string | null;
    github?: string | null;
    linkedin?: string | null;
  };
}

export function Contact({ profile }: Props) {
  return (
    <section id="contact" className="py-24 px-6 bg-card/30">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-12"
        >
          I&apos;m always open to new opportunities and collaborations. Feel
          free to reach out!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <Mail size={18} />
            {profile.email}
          </a>
          {profile.phone && (
            <a
              href={`tel:${profile.phone}`}
              className="inline-flex items-center gap-2 border border-border hover:border-primary px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <Phone size={18} />
              {profile.phone}
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6"
        >
          {profile.github && (
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={24} />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={24} />
            </a>
          )}
          {profile.location && (
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <MapPin size={16} />
              {profile.location}
            </span>
          )}
        </motion.div>
      </div>

      <div className="text-center mt-16 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Dawit Workye. All rights reserved.
      </div>
    </section>
  );
}
