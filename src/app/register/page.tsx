// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useUser();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await register(form.name, form.email, form.password);
      router.push("/dashboard");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {err && <p className="text-red-500 mb-3">{err}</p>}
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} className="border p-2 rounded" />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} className="border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="border p-2 rounded" />
        <button className="bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
