// src/components/layout/Navbar.jsx
import { supabase } from "../lib/supabase";

const links = [
  { label: "Services", href: "/services" },
  { label: "Who we serve", href: "/who-we-serve" },
  { label: "Sign up / Log in", href: "/auth" },
];

export default function Navbar({ navigate, path, session }) {
  const isActive = (href) => path === href;

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <a
            href="/"
            className="flex items-center gap-3"
            onClick={(e) => {
              if (navigate) {
                e.preventDefault();
                navigate("/services"); // better UX: logo takes them to services
              }
            }}
          >
            <img
              src="/logo-finder.png"
              alt="logo-finder"
              className="h-28 max-w-[2000px] w-auto object-contain"
              width={2000}
              height={112}
              loading="eager"
              decoding="async"
              style={{ imageRendering: "auto" }}
            />
            <span className="sr-only">finderr</span>
          </a>

          {/* Right: Links + CTA */}
          <nav className="flex items-center gap-10">
            {links
              .filter((l) => {
                // Hide auth link if user is logged in
                if (session && l.href === "/auth") return false;
                return true;
              })
              .map((l) => (
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
                    "text-[20px] font-semibold transition",
                    isActive(l.href)
                      ? "text-emerald-700"
                      : "text-gray-900 hover:text-gray-700",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              ))}

            {/* If logged in, show logout */}
            {session ? (
              <button
                onClick={() => supabase.auth.signOut()}
                className="rounded-full border border-gray-900 px-6 py-2.5 text-[20px] font-semibold text-gray-900 hover:bg-gray-50 transition"
              >
                Log out
              </button>
            ) : (
              <a
                href="/become-provider"
                onClick={(e) => {
                  if (navigate) {
                    e.preventDefault();
                    navigate("/become-provider");
                  }
                }}
                className="rounded-full border border-emerald-700 px-6 py-2.5 text-[20px] font-semibold text-emerald-700 hover:bg-emerald-50 transition"
              >
                Become a Provider
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
