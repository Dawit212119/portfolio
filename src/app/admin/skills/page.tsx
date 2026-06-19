"use client";

import { AdminShell } from "@/components/admin/admin-shell";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

const categories = [
  "Frontend",
  "Backend",
  "Languages",
  "Database",
  "Tools & Libraries",
  "DevOps",
  "Architecture",
];

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState({ name: "", category: categories[0], order: 0 });
  const [showForm, setShowForm] = useState(false);

  const load = () =>
    fetch("/api/skills")
      .then((r) => r.json())
      .then(setSkills);

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", category: categories[0], order: skills.length });
    setShowForm(true);
  };

  const openEdit = (s: Skill) => {
    setEditing(s);
    setForm({ name: s.name, category: s.category, order: s.order });
    setShowForm(true);
  };

  const save = async () => {
    if (editing) {
      await fetch(`/api/skills/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    load();
  };

  const grouped = skills.reduce(
    (acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Skills</h1>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Skill
          </button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-4">
              {editing ? "Edit Skill" : "New Skill"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
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

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <div
                  key={s.id}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg"
                >
                  <span className="text-sm">{s.name}</span>
                  <button
                    onClick={() => openEdit(s)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil size={12} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => remove(s.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} className="text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No skills added yet.
          </p>
        )}
      </div>
    </AdminShell>
  );
}
