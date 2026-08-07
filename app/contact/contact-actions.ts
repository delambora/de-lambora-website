"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(formData: FormData) {
  const supabase = createClient();

  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const message = String(formData.get("message") || "");

  if (!name || !email || !message) {
    redirect("/contact?error=1");
  }

  const { error } = await supabase.from("contact_messages").insert({ name, email, message });

  if (error) {
    redirect("/contact?error=1");
  }

  redirect("/contact?sent=1");
}
