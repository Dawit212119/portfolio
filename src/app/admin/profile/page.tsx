"use client";

import { AdminShell } from "@/components/admin/admin-shell";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

const empty = {
  name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  website: "",
  resumeUrl: "",
};

export default function ProfileAdmin() {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setForm({
            name: data.name || "",
            title: data.title || "",
            bio: data.bio || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            website: data.website || "",
            resumeUrl: data.resumeUrl || "",
          });
        }
      });
  }, []);

  const save = async () => {
    setSaving(true);
    const body = {
      ...form,
      phone: form.phone || null,
      location: form.location || null,
      github: form.github || null,
      linkedin: form.linkedin || null,
      website: form.website || null,
      resumeUrl: form.resumeUrl || null,
    };
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (label: string, key: keyof typeof form, opts?: { rows?: number; placeholder?: string }) => (
    <div className={opts?.rows ? "md:col-span-2" : ""}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {opts?.rows ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={opts.rows}
          placeholder={opts?.placeholder}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
        />
      ) : (
        <input
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={opts?.placeholder}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
        />
      )}
    </div>
  );

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("Full Name", "name")}
            {field("Title", "title", { placeholder: "Full-Stack Engineer" })}
            {field("Bio", "bio", { rows: 3 })}
            {field("Email", "email")}
            {field("Phone", "phone", { placeholder: "+251..." })}
            {field("Location", "location", { placeholder: "Addis Ababa" })}
            {field("GitHub Username", "github", { placeholder: "Dawit212119" })}
            {field("LinkedIn URL", "linkedin")}
            {field("Website URL", "website")}
            {field("Resume URL", "resumeUrl")}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
