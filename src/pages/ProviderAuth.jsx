import { useEffect, useState } from "react";

function Input(props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none",
        "focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500",
        props.className || "",
      ].join(" ")}
    />
  );
}

export default function ProviderAuthModal({ open, onClose }) {
  const [tab, setTab] = useState("signup"); // "signup" | "login"

  // signup fields
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [agree, setAgree] = useState(false);

  // login fields
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!avatarFile) return;
    const url = URL.createObjectURL(avatarFile);
    setAvatarUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  if (!open) return null;

  const submitSignup = (e) => {
    e.preventDefault();
    if (!agree) return;
    alert("Provider signup (UI only for now)");
  };

  const submitLogin = (e) => {
    e.preventDefault();
    alert("Provider login (UI only for now)");
  };

  return (
    <div className="fixed inset-0 z-[80]">
      {/* backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal"
      />

      {/* modal */}
      <div className="relative mx-auto mt-8 sm:mt-10 w-[92%] max-w-lg">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
          {/* top */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Provider account
              </p>
              <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                {tab === "signup" ? "Create your account" : "Welcome back"}
              </h3>
              <p className="mt-1 text-slate-600">
                {tab === "signup"
                  ? "Start receiving requests in your area."
                  : "Log in to continue as a provider."}
              </p>
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-slate-100 grid place-items-center text-slate-600"
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>

          {/* tabs */}
          <div className="px-6 pt-5">
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={[
                  "py-2.5 rounded-xl text-sm font-bold transition",
                  tab === "signup"
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setTab("login")}
                className={[
                  "py-2.5 rounded-xl text-sm font-bold transition",
                  tab === "login"
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                Log in
              </button>
            </div>
          </div>

          {/* body */}
          <div className="px-6 py-5">
            {tab === "signup" ? (
              <form onSubmit={submitSignup} className="space-y-4">
                {/* avatar */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden grid place-items-center">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-slate-400 font-bold text-xl">+</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Profile photo
                    </p>
                    <p className="text-xs text-slate-500">
                      Clear face or logo works best.
                    </p>

                    <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          setAvatarFile(e.target.files?.[0] || null)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                  />
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>

                <Input
                  value={emailSignup}
                  onChange={(e) => setEmailSignup(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                />

                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Mobile phone (ex: +212 6xx...)"
                  required
                />

                <Input
                  value={passwordSignup}
                  onChange={(e) => setPasswordSignup(e.target.value)}
                  type="password"
                  placeholder="Create a password"
                  required
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
                      Terms
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-emerald-700 hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </span>
                </label>

                <button
                  disabled={!agree}
                  className={[
                    "w-full rounded-full py-3.5 text-lg font-semibold transition",
                    agree
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed",
                  ].join(" ")}
                >
                  Create account
                </button>

                <p className="text-center text-sm text-slate-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("login")}
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={submitLogin} className="space-y-4">
                <Input
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                />
                <Input
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-emerald-700 hover:underline"
                    onClick={() => alert("Forgot password (later)")}
                  >
                    Forgot password?
                  </button>
                </div>

                <button className="w-full rounded-full bg-emerald-600 py-3.5 text-lg font-semibold text-white hover:bg-emerald-700 transition">
                  Log in
                </button>

                <p className="text-center text-sm text-slate-600">
                  No account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("signup")}
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
