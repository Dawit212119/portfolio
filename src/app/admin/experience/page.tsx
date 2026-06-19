"use client";

import { AdminShell } from "@/components/admin/admin-shell";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Exp {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  bullets: string[];
  location?: string | null;
  current: boolean;
  order: number;
}

const empty = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
  bullets: [] as string[],
  location: "",
  current: false,
  order: 0,
};

export default function ExperienceAdmin() {
  const [items, setItems] = useState<Exp[]>([]);
  const [editing, setEditing] = useState<Exp | null>(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [bulletInput, setBulletInput] = useState("");

  const load = () =>
    fetch("/api/experience")
      .then((r) => r.json())
      .then(setItems);

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, order: items.length });
    setBulletInput("");
    setShowForm(true);
  };

  const openEdit = (e: Exp) => {
    setEditing(e);
    setForm({
      company: e.company,
      role: e.role,
      startDate: e.startDate,
      endDate: e.endDate || "",
      description: e.description || "",
      bullets: e.bullets,
      location: e.location || "",
      current: e.current,
      order: e.order,
    });
    setBulletInput("");
    setShowForm(true);
  };

  const addBullet = () => {
    const val = bulletInput.trim();
    if (val) {
      setForm({ ...form, bullets: [...form.bullets, val] });
      setBulletInput("");
    }
  };

  const removeBullet = (i: number) => {
    setForm({ ...form, bullets: form.bullets.filter((_, idx) => idx !== i) });
  };

  const save = async () => {
    const body = {
      ...form,
      endDate: form.endDate || null,
      description: form.description || null,
      location: form.location || null,
    };
    if (editing) {
      await fetch(`/api/experience/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Experience</h1>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-4">
              {editing ? "Edit Experience" : "New Experience"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company
                </label>
                <input
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  placeholder="03/2026"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  value={form.endDate || ""}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                  placeholder="Leave empty for current"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  value={form.location || ""}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
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
                  value={form.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Bullet Points
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={bulletInput}
                    onChange={(e) => setBulletInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addBullet())
                    }
                    placeholder="Type and press Enter..."
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={addBullet}
                    className="px-3 py-2 bg-muted rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1">
                  {form.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm bg-muted px-3 py-2 rounded-lg"
                    >
                      <span className="flex-1">{b}</span>
                      <button onClick={() => removeBullet(i)}>
                        <X size={14} className="text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.current}
                    onChange={(e) =>
                      setForm({ ...form, current: e.target.checked })
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm">Currently working here</span>
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
          {items.map((e) => (
            <div
              key={e.id}
              className="bg-card border border-border rounded-xl p-5 flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{e.role}</h3>
                  {e.current && (
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-primary">{e.company}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {e.startDate} — {e.endDate || "Present"}
                  {e.location && ` · ${e.location}`}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => openEdit(e)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Pencil size={16} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => remove(e.id)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-destructive" />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No experience added yet.
            </p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
