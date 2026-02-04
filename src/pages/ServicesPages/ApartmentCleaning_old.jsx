import React, { useState } from "react";
import "./ApartmentCleaning.css";

export default function ApartmentCleaning() {
  const [formData, setFormData] = useState({
    zipCode: "",
    rooms: "1",
    bathrooms: "1",
    preferredDate: "",
    preferredTime: "10:00",
    email: "",
    phone: "",
    extras: [],
  });

  const [submitted, setSubmitted] = useState(false);

  const EXTRA_OPTIONS = [
    { value: "inside-cabinets", label: "Inside cabinets (+$40)" },
    { value: "inside-fridge", label: "Inside fridge (+$25)" },
    { value: "inside-oven", label: "Inside oven (+$30)" },
    { value: "laundry", label: "Laundry wash & dry (+$35)" },
    { value: "interior-windows", label: "Interior windows (+$20)" },
  ];

  const TIMES = ["08:00", "10:00", "12:00", "14:00", "16:00"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        extras: checked
          ? [...prev.extras, value]
          : prev.extras.filter((x) => x !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking form:", formData);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="ac-page">
      {/* HERO */}
      <section className="ac-hero">
        <div className="ac-hero-overlay">
          <div className="ac-hero-inner">
            <div className="ac-hero-heading">
              <h1>Apartment Cleaning</h1>
              <p>Book a trusted cleaner in minutes — simple, fast, and professional.</p>
            </div>

            {/* BOOKING CARD */}
            <div className="ac-book-card">
              <div className="ac-book-title">
                <div className="ac-stars" aria-label="rating">
                  ★★★★☆
                </div>
                <span className="ac-reviews">4.8 • 12,340 reviews</span>
              </div>

              <form onSubmit={handleSubmit} className="ac-form">
                <div className="ac-row">
                  <div className="ac-field">
                    <label>Zip Code *</label>
                    <input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="e.g. 20000"
                      required
                    />
                  </div>

                  <div className="ac-field">
                    <label>Rooms *</label>
                    <select name="rooms" value={formData.rooms} onChange={handleChange}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} room{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ac-field">
                    <label>Baths *</label>
                    <select
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                    >
                      {["1", "1.5", "2", "2.5", "3", "3.5", "4"].map((b) => (
                        <option key={b} value={b}>
                          {b} bath{b !== "1" ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ac-row">
                  <div className="ac-field">
                    <label>Date *</label>
                    <input
                      type="date"
                      name="preferredDate"
                      min={today}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="ac-field">
                    <label>Time *</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                    >
                      {TIMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ac-field ac-cta-wrap">
                    <button className="ac-cta" type="submit">
                      Get a Price
                    </button>
                  </div>
                </div>

                <div className="ac-row">
                  <div className="ac-field">
                    <label>Phone (optional)</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+212 ..."
                    />
                  </div>

                  <div className="ac-field">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="ac-extras">
                  <p className="ac-extras-title">Extras</p>
                  <div className="ac-extras-grid">
                    {EXTRA_OPTIONS.map((x) => (
                      <label key={x.value} className="ac-check">
                        <input
                          type="checkbox"
                          value={x.value}
                          checked={formData.extras.includes(x.value)}
                          onChange={handleChange}
                        />
                        <span>{x.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {submitted && (
                  <div className="ac-success">
                    ✅ Request sent! We’ll contact you shortly.
                  </div>
                )}

                <p className="ac-mini-note">
                  Tip: For 1–2 rooms, we usually recommend around <b>2–3 hours</b>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="ac-section">
        <div className="ac-section-title">
          <h2>What’s included in apartment cleaning?</h2>
          <p>Here’s what you can generally expect from a standard service.</p>
        </div>

        <IncludedBlock
          image="/cleaning/cleaning-1.png"
          title="Bedroom, Living Room & Common Areas"
          items={[
            "Dust all accessible surfaces",
            "Wipe mirrors and glass fixtures",
            "Vacuum / mop floors",
            "Take out trash & recycling",
          ]}
          flip={false}
        />

        <IncludedBlock
          image="/cleaning/cleaning-3.png"
          title="Bathroom Cleaning"
          items={[
            "Wash & sanitize toilet, sink, shower/tub",
            "Wipe mirrors and glass fixtures",
            "Clean floor surfaces",
            "Take out trash & recycling",
          ]}
          flip={true}
        />

        <IncludedBlock
          image="/cleaning/cleaning-2.png"
          title="Kitchen Cleaning"
          items={[
            "Dust and wipe all accessible surfaces",
            "Wipe exterior of stove, oven, and fridge",
            "Clean sink area",
            "Vacuum / mop floors",
          ]}
          flip={false}
        />

        <div className="ac-extras-box">
          <h3>Extras</h3>
          <p>
            Want a deeper clean? Add extras to your booking. Most extras add a bit of time and
            cost — but they make a big difference.
          </p>
          <ul>
            <li>Inside cabinets</li>
            <li>Inside fridge</li>
            <li>Inside oven</li>
            <li>Laundry wash & dry</li>
            <li>Interior windows</li>
          </ul>
        </div>
      </section>

      {/* PROS */}
      <section className="ac-pros">
        <div className="ac-pros-title">
          <h2>Meet some of the top cleaning pros</h2>
          <p>Build your favorites list so you always have a great go-to team.</p>
        </div>

        <div className="ac-pro-grid">
          <ProCard
            name="Samira A."
            jobs="351 jobs"
            text="I’m detail-focused and I love leaving a place looking fresh, clean, and organized."
          />
          <ProCard
            name="Youssef R."
            jobs="1,711 jobs"
            text="Fast, careful, and consistent. I always follow instructions and respect your space."
          />
          <ProCard
            name="Nadia B."
            jobs="464 jobs"
            text="I bring the right tools and I care about the small details that make a big difference."
          />
        </div>
      </section>

      <footer className="ac-footer">
        <p>© {new Date().getFullYear()} Finderr — Apartment Cleaning</p>
      </footer>
    </div>
  );
}

/* Small Components (still simple) */
function IncludedBlock({ image, title, items, flip }) {
  return (
    <div className={`ac-include ${flip ? "flip" : ""}`}>
      <div className="ac-include-img">
        <img src={image} alt={title} />
      </div>

      <div className="ac-include-card">
        <h3>{title}</h3>
        <ul>
          {items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProCard({ name, jobs, text }) {
  return (
    <div className="ac-pro-card">
      <div className="ac-pro-top">
        <div className="ac-avatar">{name.charAt(0)}</div>
        <div>
          <h4>{name}</h4>
          <div className="ac-pro-meta">
            <span className="ac-stars small">★★★★★</span>
            <span className="ac-dot">•</span>
            <span>{jobs} completed</span>
          </div>
        </div>
      </div>
      <p className="ac-pro-text">“{text}”</p>
    </div>
  );
}
