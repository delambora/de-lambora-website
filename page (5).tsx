"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    });
    setLoading(false);
    if (error) setError(error.message);
    else setDone(true);
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-2xl font-light mb-3">Check your email</h1>
        <p className="text-sand text-sm">
          We've sent a confirmation link to {email}. Confirm it, then sign in.
        </p>
        <Link href="/login" className="underline text-sm mt-6 inline-block">Go to sign in</Link>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-24">
      <h1 className="font-serif text-3xl font-light mb-2">Create account</h1>
      <p className="text-sand text-sm mb-8">Join De Lambora.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-mono text-xs uppercase tracking-wider text-sand block mb-2">Full name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight"
          />
        </div>
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
            minLength={6}
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
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>

      <p className="text-sand text-sm mt-6">
        Already have an account? <Link href="/login" className="underline">Sign in</Link>
      </p>
    </div>
  );
}
