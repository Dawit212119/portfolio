"use client";

import { AdminShell } from "@/components/admin/admin-shell";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Github, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  order: number;
}

const empty: Omit<Project, "id"> = {
  title: "",
  description: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [techInput, setTechInput] = useState("");

  const load = () =>
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, order: projects.length });
    setTechInput("");
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      techStack: p.techStack,
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      featured: p.featured,
      order: p.order,
    });
    setTechInput("");
    setShowForm(true);
  };

  const addTech = () => {
    const val = techInput.trim();
    if (val && !form.techStack.includes(val)) {
      setForm({ ...form, techStack: [...form.techStack, val] });
      setTechInput("");
    }
  };

  const removeTech = (t: string) => {
    setForm({ ...form, techStack: form.techStack.filter((x) => x !== t) });
  };

  const save = async () => {
    const body = { ...form, liveUrl: form.liveUrl || null, githubUrl: form.githubUrl || null };
    if (editing) {
      await fetch(`/api/projects/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-4">
              {editing ? "Edit Project" : "New Project"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Live URL
                </label>
                <input
                  value={form.liveUrl || ""}
                  onChange={(e) =>
                    setForm({ ...form, liveUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  GitHub URL
                </label>
                <input
                  value={form.githubUrl || ""}
                  onChange={(e) =>
                    setForm({ ...form, githubUrl: e.target.value })
                  }
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Tech Stack
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    placeholder="Type and press Enter..."
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3 py-2 bg-muted rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.techStack.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-sm rounded-md"
                    >
                      {t}
                      <button onClick={() => removeTech(t)}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm">Featured project</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={save}
                className="px-6 py-2 bg-primary hover:bg-accent text-white rounded-lg text-sm font-medium transition-colors"
              >
                {editing ? "Update" : "Create"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-card border border-border rounded-xl p-5 flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{p.title}</h3>
                  {p.featured && (
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-1">
                    {p.techStack.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-muted text-xs rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Github size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Pencil size={16} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-destructive" />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No projects yet. Add your first one!
            </p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
