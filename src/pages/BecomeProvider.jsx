import { useMemo, useState, useEffect, useRef } from "react";
import ProviderAuth from "../pages/ProviderAuth";

const AREAS = [
  { name: "Casablanca", price: 400 },
  { name: "Rabat", price: 380 },
  { name: "Marrakech", price: 350 },
  { name: "Tangier", price: 330 },
  { name: "Agadir", price: 320 },
  { name: "Fes", price: 300 },
  { name: "Meknes", price: 305 },
  { name: "Oujda", price: 310 },
];

const CATEGORIES = ["Plumber", "Electrician", "Cleaner", "Handyman", "Painter", "Carpenter"];

const BENEFITS = [
  { title: "Flexible earnings", description: "Set your own rates and choose your schedule." },
  { title: "Local clients", description: "Get discovered by people near you in your city." },
  { title: "Build your profile", description: "Reviews help you get more requests over time." },
  { title: "Clear payments", description: "Simple process, no confusion—just work and earn." },
];

const STEPS = [
  { number: "1", title: "Create your profile", desc: "Pick your category, area, and a short bio." },
  { number: "2", title: "Get your first request", desc: "Clients reach out based on your city + service." },
  { number: "3", title: "Grow with reviews", desc: "Do good work → get reviews → get more requests." },
];

// ✅ NEW: photo + multilingual quotes (AR/EN/FR)
const TESTIMONIALS = [
  {
    name: "Khadija",
    role: "House Cleaning • Casablanca",
    lang: "AR",
    text: "تسجيل بسيط وخدمة واضحة. جاني أول طلب بسرعة وبديت كنزيد فالزبائن مع التقييمات.",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
  },
  {
    name: "Youssef",
    role: "Handyman • Rabat",
    lang: "EN",
    text: "I like how clean the requests are. I set my schedule and accept only what fits me.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
  },
  {
    name: "Sara",
    role: "Electrician • Marrakech",
    lang: "FR",
    text: "C’est simple et pro. Les avis m’ont vraiment aidée à gagner la confiance des clients.",
    photo:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=240&q=80",
  },
];

function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

function Section({ children, className = "" }) {
  return <section className={`w-full px-6 sm:px-10 lg:px-16 ${className}`}>{children}</section>;
}

function StoryBlock({ title, heading, p1, p2, image, reverse }) {
  const [ref, visible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={[
        "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
        reverse ? "lg:[&>*:first-child]:order-2" : "",
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <img src={image} alt={title} className="w-full h-[360px] object-cover" />
      </div>

      <div className="max-w-xl">
        <p className="text-sm font-semibold text-emerald-700">{title}</p>
        <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{heading}</h3>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">{p1}</p>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">{p2}</p>
      </div>
    </div>
  );
}

export default function BecomeProvider() {
  const [area, setArea] = useState(AREAS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const price = useMemo(() => area.price, [area]);

  const [openAuth, setOpenAuth] = useState(false);

  const [heroRef, heroVisible] = useScrollAnimation(0.15);
  const [benefitsRef, benefitsVisible] = useScrollAnimation(0.15);
  const [stepsRef, stepsVisible] = useScrollAnimation(0.15);
  const [testRef, testVisible] = useScrollAnimation(0.15);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div
        ref={heroRef}
        className={["transition-all duration-700", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(
          " "
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[92vh] w-full">
          {/* LEFT IMAGE */}
          <div className="relative overflow-hidden bg-slate-100">
            <img src="/Provider.png" alt="Service Provider" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex items-center w-full">
            <Section className="py-10 lg:py-0">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Become a Provider <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Morocco
                </p>

                <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">Earn money your way.</h1>

                <p className="mt-4 text-lg text-slate-600">See how much you can make on Finderr.</p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                  {/* Area */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800">Select your area</label>
                    <select
                      value={area.name}
                      onChange={(e) => setArea(AREAS.find((a) => a.name === e.target.value))}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
                    >
                      {AREAS.map((a) => (
                        <option key={a.name} value={a.name}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div className="mt-5">
                    <label className="block text-sm font-semibold text-slate-800">Choose a category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div className="mt-8 flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-slate-900">{price}</span>
                    <span className="text-lg font-semibold text-slate-600 mb-1">MAD / day</span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Typical daily earnings for {category}s in {area.name}.
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => setOpenAuth(true)}
                    className="mt-6 w-full rounded-full bg-emerald-600 py-3.5 text-lg font-semibold text-white hover:bg-emerald-700 transition"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <div
        ref={benefitsRef}
        className={["transition-all duration-700", benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(
          " "
        )}
      >
        <Section className="py-16">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Why choose Finderr</h2>
              <p className="mt-3 text-slate-600 text-lg max-w-2xl">Simple setup, local visibility, and a profile that helps you get booked.</p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-600" /> Built for local services
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className={[
                  "rounded-2xl border border-slate-200 bg-white p-6",
                  "transition-all duration-700",
                  benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <h3 className="text-lg font-extrabold text-slate-900">{b.title}</h3>
                <p className="mt-2 text-slate-600">{b.description}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* STORY */}
      <div className="bg-slate-50">
        <Section className="py-20">
          <StoryBlock
            title="What is Finderr?"
            heading="Real work, real people — right near you."
            p1="Finderr connects people who need help with skilled local providers."
            p2="As a provider, you control your time, your services, and your rates. Keep it simple and grow with reviews."
            image="/auth2.png"
            reverse={false}
          />

          <div className="h-16" />

          <StoryBlock
            title="Built for providers"
            heading="A clean profile that helps you get booked."
            p1="Clients look for clarity: city, category, price, and reputation."
            p2="The more complete your profile is, the more trust you build and the easier it becomes to get repeat clients."
            image="/auth1.png"
            reverse={true}
          />
        </Section>
      </div>

      {/* HOW IT WORKS */}
      <div
        ref={stepsRef}
        className={["transition-all duration-700", stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(
          " "
        )}
      >
        <Section className="py-18 lg:py-20">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Getting started is easy</h2>
              <p className="mt-3 text-slate-600 text-lg max-w-2xl">A quick setup, then you’re visible in your area.</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={[
                  "rounded-2xl border border-slate-200 bg-white p-7",
                  "transition-all duration-700",
                  stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                ].join(" ")}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 grid place-items-center text-emerald-700 font-extrabold">
                    {s.number}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">{s.title}</h3>
                </div>
                <p className="mt-3 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={() => setOpenAuth(true)}
              className="rounded-full bg-emerald-600 px-10 py-3.5 text-lg font-semibold text-white hover:bg-emerald-700 transition"
            >
              Start now
            </button>
          </div>
        </Section>
      </div>

      {/* ✅ TESTIMONIALS (photo + quote style like screenshot) */}
      <div
        ref={testRef}
        className={["transition-all duration-700", testVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"].join(" ")}
      >
        <Section className="py-20">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              
              <p className="mt-3 text-slate-600 text-lg max-w-2xl">Real words from people working with Finderr.</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={[
                  "rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm",
                  "transition-all duration-700",
                  testVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                ].join(" ")}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Photo */}
                <div className="relative h-48 bg-slate-100">
                  <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />

                  {/* small badge */}
                  <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    {t.lang}
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-emerald-700 text-4xl leading-none font-black">“</div>
                    <p className={["text-slate-800 text-base leading-relaxed", t.lang === "AR" ? "text-right w-full" : ""].join(" ")}>
                      {t.text}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={t.photo}
                      alt={`${t.name} avatar`}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* FINAL CTA */}
      <Section className="py-16">
        <div className="rounded-3xl bg-slate-900 px-8 py-10 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to join?</h3>
            <p className="mt-2 text-white/80 text-lg max-w-xl">Create your provider profile and start receiving requests in your city.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setOpenAuth(true)}
              className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-white/90 transition"
            >
              Create account
            </button>
            <a href="/services" className="rounded-full border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10 transition">
              View services
            </a>
          </div>
        </div>
      </Section>

      {/* Provider Auth Modal/Page */}
      <ProviderAuth open={openAuth} onClose={() => setOpenAuth(false)} />
    </div>
  );
}
