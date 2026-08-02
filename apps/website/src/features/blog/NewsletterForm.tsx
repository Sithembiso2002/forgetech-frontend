"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to your newsletter API (e.g., Resend, Mailchimp)
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold"
        required
      />
      <Button type="submit" variant="gold">
        Subscribe
      </Button>
    </form>
  );
}