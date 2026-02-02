import React, { useMemo, useState } from "react";
import { FiSearch, FiTrash2, FiXCircle, FiCalendar, FiShield, FiMail } from "react-icons/fi";

const FAQS = [
  {
    id: "cancel-booking",
    category: "Bookings",
    q: "How do I cancel a booking?",
    a: [
      "Go to: Profile → Bookings.",
      "Open the booking you want to cancel.",
      "Tap “Cancel booking” and confirm.",
      "If your booking is already in progress, cancellation may be disabled (depending on provider policy).",
    ],
  },
  {
    id: "reschedule",
    category: "Bookings",
    q: "Can I reschedule a booking?",
    a: [
      "Open the booking from Profile → Bookings.",
      "If rescheduling is enabled, you’ll see “Reschedule”.",
      "Pick a new date/time and confirm. The provider will get notified.",
    ],
  },
  {
    id: "refund",
    category: "Payments",
    q: "Do I get a refund after cancellation?",
    a: [
      "Refund depends on the provider’s cancellation policy and your cancellation timing.",
      "If eligible, refunds are processed back to your original payment method.",
      "You can see the policy inside the booking details before confirming.",
    ],
  },
  {
    id: "delete-account",
    category: "Account",
    q: "How do I delete my Finderr account?",
    a: [
      "Go to: Settings → Account.",
      "Select “Delete account”.",
      "Confirm deletion (you may be asked to re-enter your password).",
      "Important: this action is permanent and removes your profile and history (subject to legal requirements).",
    ],
  },
  {
    id: "password",
    category: "Account",
    q: "I forgot my password. What should I do?",
    a: [
      "Go to the Login screen.",
      "Tap “Forgot password?”.",
      "Enter your email to receive a reset link.",
    ],
  },
  {
    id: "scam",
    category: "Safety",
    q: "How do I report a provider or a user?",
    a: [
      "Open the profile you want to report.",
      "Tap “Report” and choose a reason.",
      "Add details (optional) and submit.",
      "Our team reviews reports to keep Finderr safe for everyone.",
    ],
  },
];

const CATEGORIES = ["All", "Bookings", "Payments", "Account", "Safety"];

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function FAQItem({ item, open, onToggle }) {
  return (
    <div className="border border-gray-200 bg-white">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition"
        aria-expanded={open}
      >
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500">{item.category}</div>
          <div className="text-[15px] font-semibold text-gray-900 mt-1">{item.q}</div>
        </div>
        <div className="ml-4 text-gray-400 text-xl">{open ? "–" : "+"}</div>
      </button>

      <div
        className={classNames(
          "px-5 overflow-hidden transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <ul className="mt-2 space-y-2 text-sm text-gray-700 leading-relaxed">
          {item.a.map((line, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 bg-gray-900 flex-shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Help() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState("cancel-booking");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchesCategory = category === "All" || f.category === category;
      const matchesQuery =
        !q ||
        f.q.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.a.join(" ").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600 max-w-2xl">
              Quick answers, fast actions, and support if you need it.
            </p>

            {/* Search */}
            <div className="mt-4 flex items-center gap-3 border border-gray-200 bg-white px-4 py-3">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: delete account, cancel booking, refund..."
                className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs font-semibold text-gray-700 hover:text-gray-900"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={classNames(
                    "px-4 py-2 text-sm border transition",
                    category === c
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-800 border-gray-200 hover:border-gray-400"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: quick actions */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="border border-gray-200 bg-white p-5">
            <div className="text-sm font-semibold text-gray-900">Quick actions</div>
            <div className="mt-4 space-y-3">
              <button
                onClick={() => setOpenId("cancel-booking")}
                className="w-full flex items-center justify-between border border-gray-200 px-4 py-3 hover:border-gray-400 transition"
              >
                <div className="flex items-center gap-3">
                  <FiXCircle className="text-gray-700" />
                  <span className="text-sm font-medium">Cancel a booking</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => setOpenId("reschedule")}
                className="w-full flex items-center justify-between border border-gray-200 px-4 py-3 hover:border-gray-400 transition"
              >
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-gray-700" />
                  <span className="text-sm font-medium">Reschedule</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => setOpenId("delete-account")}
                className="w-full flex items-center justify-between border border-gray-200 px-4 py-3 hover:border-gray-400 transition"
              >
                <div className="flex items-center gap-3">
                  <FiTrash2 className="text-gray-700" />
                  <span className="text-sm font-medium">Delete account</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => setOpenId("scam")}
                className="w-full flex items-center justify-between border border-gray-200 px-4 py-3 hover:border-gray-400 transition"
              >
                <div className="flex items-center gap-3">
                  <FiShield className="text-gray-700" />
                  <span className="text-sm font-medium">Report / safety</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FiMail /> Contact support
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Still stuck? Send us a message and we’ll get back to you.
            </p>

            <button
              className="mt-4 w-full bg-gray-900 text-white px-4 py-3 text-sm font-semibold hover:opacity-95 transition"
              onClick={() => alert("Hook this to your support form / email flow")}
            >
              Message support
            </button>

            <p className="mt-3 text-xs text-gray-500">
              Tip: You can also add “Live chat” later if you want.
            </p>
          </div>
        </aside>

        {/* Right: FAQ list */}
        <section className="lg:col-span-2">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Frequently asked questions</h2>
              <p className="text-sm text-gray-600">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}{" "}
                {category !== "All" ? `in ${category}` : ""}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                open={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}

            {filtered.length === 0 && (
              <div className="border border-gray-200 bg-white p-8 text-center">
                <div className="text-sm font-semibold text-gray-900">No results found</div>
                <p className="text-sm text-gray-600 mt-2">
                  Try searching “cancel”, “delete”, “refund”, or switch category.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
