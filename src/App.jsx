import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import { supabase } from "./lib/supabase";
import Auth from "./pages/Auth";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);

    
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));

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

  return (
    <>
      <Navbar navigate={navigate} path={path} />
      <main className="mx-auto max-w-7xl px-6 py-10">
        {path === "/auth" ? (
          <Auth
            navigate={navigate}
            onGoogle={() =>
              supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } })
            }
            onGithub={() =>
              supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: window.location.origin } })
            }
          />
        ) : session ? (
          <div style={{ padding: 40 }}>
            <h2>Logged in </h2>
            <p>{session.user.email}</p>
            <button onClick={() => supabase.auth.signOut()}>Sign out</button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold">Home</h1>
          </div>
        )}
      </main>
    </>
  );
}
