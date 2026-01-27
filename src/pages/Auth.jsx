import { useMemo, useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { supabase } from "../lib/supabase"; 

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" {...props}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.652 32.657 29.174 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.174 35.091 26.715 36 24 36c-5.152 0-9.618-3.317-11.273-7.946l-6.52 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a11.99 11.99 0 0 1-4.084 5.565l.003-.002 6.19 5.238C36.97 39.205 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"
      />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.484 2 12.016c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.465-1.11-1.465-.908-.621.069-.609.069-.609 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.027A9.564 9.564 0 0 1 12 6.844c.851.004 1.705.115 2.504.337 1.909-1.296 2.748-1.027 2.748-1.027.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.418-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.016C22 6.484 17.523 2 12 2z"
      />
    </svg>
  );
}

export default function Auth({ navigate }) {
  const [isSignup, setIsSignup] = useState(true);

  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const title = useMemo(
    () => (isSignup ? "Create your account" : "Welcome back"),
    [isSignup]
  );
  const subtitle = useMemo(
    () => (isSignup ? "Join Finderr in less than a minute." : "Log in to continue."),
    [isSignup]
  );

  //  REAL OAuth with Supabase 
  async function handleOAuth(provider) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider, // "google" | "github"
      options: { redirectTo: window.location.origin },
    });

    if (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignup && !agree) return;

   
    alert(isSignup ? "Signed up (demo form)" : "Logged in (demo form)");
  }

  function goHome() {
    if (typeof navigate === "function") {
      navigate("/");
      setTimeout(() => {
        if (window.location.pathname !== "/") window.location.href = "/";
      }, 200);
      return;
    }

    if (window.history && window.history.pushState) {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      setTimeout(() => {
        if (window.location.pathname !== "/") window.location.href = "/";
      }, 200);
      return;
    }

    window.location.href = "/";
  }

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      
      <div
        className="fixed inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('/background-auth.png')` }}
      />

      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

    
      <div className="relative min-h-screen flex items-start justify-center px-3 pt-4 pb-6">
          <div className="w-full max-w-lg">
            <div className="relative z-10 -translate-y-4 max-h-[88vh] overflow-auto bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-3 sm:p-4">
           
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src="/logo-finder.png" alt="Finderr" className="h-12 sm:h-14 w-auto object-contain" />
                </div>

                <button
                  type="button"
                  onClick={goHome}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
              </div>

              <h1 className="mt-1 text-lg font-bold text-slate-900">{title}</h1>
              <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            </div>

           
            <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-3">
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className={[
                  "py-2 rounded-xl text-sm font-semibold transition",
                  isSignup ? "bg-white shadow text-slate-900" : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className={[
                  "py-2 rounded-xl text-sm font-semibold transition",
                  !isSignup ? "bg-white shadow text-slate-900" : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                Log In
              </button>
            </div>

           
            {isSignup ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="First name"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Last name"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>

                <input
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                />

                <div className="rounded-2xl border border-slate-200 bg-white px-2 focus-within:ring-4 focus-within:ring-emerald-100 focus-within:border-emerald-400 transition">
                  <PhoneInput
                    defaultCountry="ma"
                    value={phone}
                    onChange={(p) => setPhone(p)}
                    inputClassName="w-full !border-0 !shadow-none !ring-0 !rounded-2xl !py-2 !text-sm"
                    countrySelectorStyleProps={{
                      buttonClassName:
                        "!h-[42px] !rounded-2xl !border-0 !bg-transparent hover:!bg-slate-50",
                      dropdownStyleProps: {
                        className: "!rounded-2xl !border !border-slate-200 !shadow-2xl",
                      },
                    }}
                  />
                </div>

                <input
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                />

                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                  />
                  <span>
                    I agree to the{" "}
                    <span className="font-semibold text-emerald-700 hover:underline cursor-pointer">
                      Terms and Conditions
                    </span>{" "}
                    and the{" "}
                    <span className="font-semibold text-emerald-700 hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </span>
                </label>

                <button
                  disabled={!agree}
                  className={[
                    "w-full rounded-2xl py-2 text-sm font-semibold transition",
                    agree
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed",
                  ].join(" ")}
                >
                  Create account
                </button>

                {/* OAuth below the form */}
                <div className="pt-1">
                  <div className="my-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs text-slate-500">or continue with</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOAuth("google")}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 py-2 text-sm font-semibold text-slate-800 transition"
                    >
                      <GoogleIcon />
                      Google
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOAuth("github")}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 py-2 text-sm font-semibold text-slate-800 transition"
                    >
                      <GithubIcon className="text-slate-900" />
                      GitHub
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                />

                <input
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                    Remember me
                  </label>

                  <button type="button" className="text-sm font-semibold text-emerald-700 hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button className="w-full rounded-2xl bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-700 transition">
                  Log in
                </button>

               
                <div className="pt-1">
                  <div className="my-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs text-slate-500">or continue with</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOAuth("google")}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 py-2 text-sm font-semibold text-slate-800 transition"
                    >
                      <GoogleIcon />
                      Google
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOAuth("github")}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 py-2 text-sm font-semibold text-slate-800 transition"
                    >
                      <GithubIcon className="text-slate-900" />
                      GitHub
                    </button>
                  </div>
                </div>
              </form>
            )}

            <p className="mt-5 text-xs text-slate-600 text-center">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
