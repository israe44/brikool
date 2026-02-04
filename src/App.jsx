import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import { supabase } from "./lib/supabase";

import Auth from "./pages/Auth";
import BecomeProvider from "./pages/BecomeProvider";
import Services from "./pages/Services";
import Blog from "./components/blog/Blog";
import Landing from "./components/home/LandingPage";
import Help from "./pages/Help";
import ApartmentCleaning from "./pages/ServicesPages/ApartmentCleaning";

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
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener("popstate", onPop);
      listener.subscription.unsubscribe();
    };
  }, []);

  const navigate = useCallback((to, state) => {
    const samePath = window.location.pathname === to;
    // Push state even if path is same (useful for passing card data)
    if (!samePath || state) {
      window.history.pushState(state || {}, "", to);
      setPath(to);
    }
  }, []);

  // ✅ Full-page routes (no container, no standard layout)
  const fullPageRoutes = (p) =>
    p === "/" || p === "/services" || p === "/blog" || p === "/help" || p === "/apartment-cleaning";

  return (
    <>
      <Navbar navigate={navigate} path={path} session={session} />

      {fullPageRoutes(path) ? (
        <>
          {/* LANDING */}
          {path === "/" && <Landing navigate={navigate} session={session} />}

          {/* SERVICES */}
          {path === "/services" && <Services navigate={navigate} session={session} />}

          {/* BLOG */}
          {path === "/blog" && <Blog navigate={navigate} session={session} />}

          {/* HELP */}
          {path === "/help" && <Help navigate={navigate} path={path} session={session} />}

          {/* APARTMENT CLEANING */}
          {path === "/apartment-cleaning" && <ApartmentCleaning navigate={navigate} session={session} />}
        </>
      ) : (
        <main className="mx-auto max-w-7xl px-6 py-10">
          {/* AUTH */}
          {path === "/auth" && <Auth navigate={navigate} />}

          {/* BECOME PROVIDER */}
          {path === "/become-provider" && <BecomeProvider />}

          {/* 404 */}
          {!["/auth", "/become-provider"].includes(path) && (
            <div className="py-10 text-center">
              <h1 className="text-3xl font-extrabold text-gray-900">Page Not Found</h1>
              <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
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
