// src/components/layout/Navbar.jsx
import React from "react";
import { supabase } from "../lib/supabase";

const leftLinks = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
];

const rightLinks = [
  { label: "Become a Provider", href: "/become-provider" },
  { label: "Help", href: "/help" },
  { label: "Log In", href: "/auth" },
];

export default function Navbar({ navigate, path, session }) {
  const isActive = (href) => path === href;

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto max-w-[1500px] px-12">
        <div className="flex h-[72px] items-center justify-between">

          {/* LEFT: Logo + Features */}
          <div className="flex items-center gap-8">
            <a
              href="/"
              onClick={(e) => {
                if (navigate) {
                  e.preventDefault();
                  navigate("/");
                }
              }}
              className="flex items-center"
            >
              <img
                src="/logo-finder.png"
                alt="logo-finder"
                className="h-24 w-auto object-contain"
                loading="eager"
              />
            </a>

            <nav className="flex items-center gap-12">
              {leftLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    if (navigate) {
                      e.preventDefault();
                      navigate(l.href);
                    }
                  }}
                  className={[
                    "text-[20px] font-semibold transition-colors",
                    isActive(l.href)
                      ? "text-sky-600"
                      : "text-gray-800 hover:text-gray-900",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT: Utility links */}
          <nav className="flex items-center gap-10">
            {!session &&
              rightLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    if (navigate) {
                      e.preventDefault();
                      navigate(l.href);
                    }
                  }}
                  className="text-[17px] font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {l.label}
                </a>
              ))}

            {session && (
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-[17px] font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log out
              </button>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
}
