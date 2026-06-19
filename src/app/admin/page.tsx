"use client";

import { AdminShell } from "@/components/admin/admin-shell";
import { FolderKanban, Briefcase, Wrench, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  projects: number;
  experiences: number;
  skills: number;
  hasProfile: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/experience").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/profile").then((r) => r.json()),
    ]).then(([projects, experiences, skills, profile]) => {
      setStats({
        projects: projects.length,
        experiences: experiences.length,
        skills: skills.length,
        hasProfile: !!profile,
      });
    });
  }, []);

  const cards = [
    {
      label: "Projects",
      count: stats?.projects ?? "—",
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-blue-400",
    },
    {
      label: "Experience",
      count: stats?.experiences ?? "—",
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-green-400",
    },
    {
      label: "Skills",
      count: stats?.skills ?? "—",
      icon: Wrench,
      href: "/admin/skills",
      color: "text-yellow-400",
    },
    {
      label: "Profile",
      count: stats?.hasProfile ? "Set up" : "Not set",
      icon: User,
      href: "/admin/profile",
      color: "text-purple-400",
    },
  ];

  return (
    <AdminShell>
      <div>
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <card.icon size={24} className={card.color} />
              </div>
              <p className="text-2xl font-bold">{card.count}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
