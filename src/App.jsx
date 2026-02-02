import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import { supabase } from "./lib/supabase";

import Auth from "./pages/Auth";
import BecomeProvider from "./pages/BecomeProvider";
import Services from "./pages/Services";
import Blog from "./components/blog/Blog";
import Landing from "./components/home/LandingPage"; // use existing Home component as Landing
import Help from "./pages/Help";

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

  // Full-page routes (no container, no standard layout)
  const fullPageRoutes = new Set(["/", "/services", "/blog", "/help"]);

  return (
    <>
      {/* Show Navbar on all pages */}
      <Navbar navigate={navigate} path={path} session={session} />

      {fullPageRoutes.has(path) ? (
        <>
          {/* LANDING PAGE (Home) */}
          {path === "/" && <Landing navigate={navigate} session={session} />}

          {/* SERVICES PAGE */}
          {path === "/services" && (
            <Services navigate={navigate} session={session} />
          )}

          {/* BLOG PAGE */}
          {path === "/blog" && <Blog navigate={navigate} session={session} />}
          {/* HELP PAGE */}
          {path === "/help" && <Help navigate={navigate} path={path} session={session} />}
        </>
      ) : (
        <main className="mx-auto max-w-7xl px-6 py-10">
          {/* AUTH PAGE */}
          {path === "/auth" && <Auth navigate={navigate} />}

          {/* BECOME PROVIDER PAGE */}
          {path === "/become-provider" && <BecomeProvider />}

          {/* FALLBACK / 404 */}
          {!["/auth", "/become-provider"].includes(path) && (
            <div className="py-10 text-center">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Page Not Found
              </h1>
              <p className="mt-2 text-gray-600">
                The page you're looking for doesn't exist.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 rounded-full bg-sky-600 px-6 py-3 text-white font-semibold hover:bg-sky-500 transition"
              >
                Go Home
              </button>
            </div>
          )}
        </main>
      )}
    </>
  );
}