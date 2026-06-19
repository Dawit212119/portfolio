"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  bullets: string[];
  location?: string | null;
  current: boolean;
}

interface Props {
  experiences: ExperienceItem[];
}

export function Experience({ experiences }: Props) {
  return (
    <section id="experience" className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Experience
        </motion.h2>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-8 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-2 z-10" />

              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.role}</h3>
                      <p className="text-primary flex items-center gap-1">
                        <Briefcase size={14} />
                        {exp.company}
                      </p>
                    </div>
                    {exp.current && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span>
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {exp.description}
                    </p>
                  )}

                  {exp.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
