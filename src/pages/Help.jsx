// src/pages/Help.jsx
import React, { useMemo, useState } from "react";

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "account", label: "Account" },
  { id: "bookings", label: "Bookings" },
  { id: "payments", label: "Payments" },
  { id: "providers", label: "Providers" },
  { id: "general", label: "General" },
];

const HELP_ITEMS = [
  { id: "delete-account", category: "account", question: "How do I delete my Finderr account?", answer: `To permanently delete your account, go to Settings → Account → Delete Account. Before deletion, make sure all active bookings are completed or cancelled and any pending payments are settled.\n\nOnce deleted, this action cannot be undone. All your booking history, profile data, and saved payment methods will be permanently removed.` },
  { id: "reset-password", category: "account", question: "How do I reset my password?", answer: `On the login screen, tap "Forgot password?" and enter the email address linked to your account. You'll receive a password-reset link within a few minutes.` },
  { id: "cancel-booking", category: "bookings", question: "How do I cancel a booking?", answer: `Open the booking you want to cancel from My Bookings, then tap "Cancel Booking." Cancellations made more than 24 hours before the scheduled time are free of charge.` },
  { id: "reschedule-booking", category: "bookings", question: "How do I reschedule a booking?", answer: `Open the booking and tap "Edit Booking" to change date/time, subject to provider availability.` },
  { id: "refund", category: "payments", question: "How do I request a refund?", answer: `Open the booking, tap "Request Refund" and describe the issue. Our team reviews requests within 48 hours.` },
  { id: "become-provider", category: "providers", question: "How do I become a provider?", answer: `Click Become a Provider or go to /become-provider and complete the provider profile and verification steps.` },
  { id: "how-it-works", category: "general", question: "How does Finderr work?", answer: `Pick a service, share details, we match a local provider, confirm booking and pay through the app.` },
];

function norm(s = "") { return s.toLowerCase().trim(); }

export default function Help({ navigate }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const items = useMemo(() => {
    const q = norm(query);
    return HELP_ITEMS.filter((it) => {
      const catMatch = activeCategory === "all" || it.category === activeCategory;
      const textMatch = !q || norm(it.question).includes(q) || norm(it.answer).includes(q);
      return catMatch && textMatch;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
          <p className="mt-2 text-gray-600">Search answers or browse topics below.</p>
        </header>

        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
            <input aria-label="Search help" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search (e.g. cancel booking, refund)" className="w-full bg-transparent outline-none text-gray-800 text-lg" />
            {query && (<button onClick={() => setQuery("")} className="text-sm text-gray-500 hover:text-gray-700 ml-3">Clear</button>)}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)} className={["px-4 py-1 rounded-full text-sm font-medium border", activeCategory === c.id ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"].join(" ")}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => { setQuery(""); setActiveCategory("all"); }} className="text-sm text-gray-500">Reset</button>
          </div>
        </div>

        <HelpList items={items} navigate={navigate} />

        <div className="mt-12 text-center text-sm text-gray-500">Still need help? <button onClick={() => navigate && navigate("/contact")} className="underline text-gray-700">Contact support</button>.</div>
      </div>
    </div>
  );
}

function HelpList({ items = [], navigate }) {
  const [openIds, setOpenIds] = useState([]);

  const allOpen = items.length > 0 && items.every((it) => openIds.includes(it.id));

  const toggleOne = (id) => setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleAll = () => setOpenIds(allOpen ? [] : items.map((i) => i.id));

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="text-5xl mb-6">🔍</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">No results found</h3>
        <p className="text-gray-500">Try different keywords or browse categories above.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={toggleAll} className="text-sm text-gray-700 underline mr-4">{allOpen ? "Collapse All" : "Expand All"}</button>
      </div>

      <div className="space-y-4">
        {items.map((it) => {
          const open = openIds.includes(it.id);
          return (
            <article key={it.id} className="border rounded-lg bg-white">
              <header className="px-4 py-3">
                <button onClick={() => toggleOne(it.id)} aria-expanded={open} className="w-full text-left text-lg font-semibold text-gray-900">{it.question}</button>
              </header>
              <div className={`px-4 pb-4 transition-all ${open ? "block" : "hidden"}`}>
                <div className="text-gray-700 whitespace-pre-line">{it.answer}</div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
