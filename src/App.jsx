import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import { supabase } from "./lib/supabase";

import Auth from "./pages/Auth";
import BecomeProvider from "./pages/BecomeProvider";
import Services from "./pages/Services";
import Blog from "./components/blog/Blog"; 

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);

    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      window.removeEventListener("popstate", onPop);
      listener.subscription.unsubscribe();
    };
  }, []);

  const navigate = useCallback((to) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, "", to);
      setPath(to);
    }
  }, []);

  // OPTIONAL: if user is logged in and stays on "/", send them to services
  useEffect(() => {
    if (session && path === "/") {
      navigate("/services");
    }
  }, [session, path, navigate]);

  // Full-page routes (no container)
  const fullPageRoutes = new Set(["/services", "/blog"]); // ✅ blog is full page too

  return (
    <>
      {/* ✅ pass session because Navbar expects it */}
      <Navbar navigate={navigate} path={path} session={session} />

      {fullPageRoutes.has(path) ? (
        <>
          {/* FULL PAGE */}
          {path === "/services" && (
            <Services navigate={navigate} session={session} />
          )}

          {path === "/blog" && <Blog navigate={navigate} session={session} />}
        </>
      ) : (
        <main className="mx-auto max-w-7xl px-6 py-10">
          {/* AUTH */}
          {path === "/auth" && <Auth navigate={navigate} />}

          {/* BECOME PROVIDER */}
          {path === "/become-provider" && <BecomeProvider />}

          {/* LOGGED IN USER (fallback if they land on / and redirect is removed) */}
          {path === "/" && session && (
            <div className="py-10">
              <h2 className="text-2xl font-bold text-gray-900">Logged in</h2>
              <p className="mt-2 text-gray-600">{session.user.email}</p>

              <button
                onClick={() => supabase.auth.signOut()}
                className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-white font-semibold hover:bg-gray-800 transition"
              >
                Sign out
              </button>
            </div>
          )}

          {/* HOME (DEFAULT) */}
          {path === "/" && !session && (
            <div className="py-10">
              <h1 className="text-3xl font-extrabold text-gray-900">Home</h1>
              <p className="mt-2 text-gray-600">
                Find trusted local services near you.
              </p>

              <button
                onClick={() => navigate("/services")}
                className="mt-6 rounded-full bg-sky-600 px-6 py-3 text-white font-semibold hover:bg-sky-500 transition"
              >
                Browse services
              </button>
            </div>
          )}
        </main>
      )}
    </>
  );
}
