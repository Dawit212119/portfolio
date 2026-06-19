import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/public/navbar";
import { Hero } from "@/components/public/hero";
import { Skills } from "@/components/public/skills";
import { Experience } from "@/components/public/experience";
import { Projects } from "@/components/public/projects";
import { Contact } from "@/components/public/contact";

export const revalidate = 60;

export default async function Home() {
  const [profile, skills, experiences, projects] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio Not Set Up</h1>
          <p className="text-muted-foreground mb-6">
            Visit <code className="bg-muted px-2 py-1 rounded">/admin</code> to
            set up your portfolio or run the seed script.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <Hero profile={profile} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Contact profile={profile} />
    </main>
  );
}
