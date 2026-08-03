"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/account");
      router.refresh();
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-24">
      <h1 className="font-serif text-3xl font-light mb-2">Sign in</h1>
      <p className="text-sand text-sm mb-8">Access your De Lambora account.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-mono text-xs uppercase tracking-wider text-sand block mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wider text-sand block mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight"
          />
        </div>
        {error && <p className="text-wineLight text-xs">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-wine hover:bg-wineDeep py-3.5 text-sm tracking-wide disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-sand text-sm mt-6">
        New here? <Link href="/signup" className="underline">Create an account</Link>
      </p>
    </div>
  );
}
