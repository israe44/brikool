import React, { useMemo, useState } from "react";
import "./Services.css";

const CATEGORIES = [
  { id: "cleaning", label: "Cleaning" },
  { id: "handyman", label: "Handyman services" },
  { id: "elder", label: "Elder emergencies" },
  { id: "plumbing", label: "Plumbing" },
  { id: "electrical", label: "Electrical" },
  { id: "painting", label: "Painting" },
  { id: "smarthome", label: "Smart home" },
  { id: "birthdays", label: "Birthday organization" },
  { id: "sports", label: "Weekend sports buddy" },
];

const CATEGORY_CONTENT = {
  cleaning: {
    title: "Cleaning",
    cards: [
      {
        title: "Home Cleaning",
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 199,
        duration: "2–3h",
        rating: 4.8,
        badge: "Popular",
      },
      {
        title: "Office Cleaning",
        image:
          "https://images.unsplash.com/photo-1527515637462-daf3f22d63a9?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 299,
        duration: "2–4h",
        rating: 4.7,
        badge: "Trusted",
      },
      {
        title: "Deep Cleaning",
        image:
          "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 399,
        duration: "4–6h",
        rating: 4.9,
        badge: "Best value",
      },
    ],
    lists: [
      [
        "Apartment cleaning",
        "Move-in cleaning",
        "Move-out cleaning",
        "Kitchen cleaning",
        "Bathroom cleaning",
      ],
      [
        "Windows cleaning",
        "Carpet cleaning",
        "Sofa cleaning",
        "Fridge cleaning",
        "Oven cleaning",
      ],
      [
        "Weekly cleaning",
        "Post-renovation cleaning",
        "Sanitization",
        "Local cleaners",
        "Same-day cleaning",
      ],
    ],
  },

  handyman: {
    title: "Handyman services",
    cards: [
      {
        title: "Furniture Assembly",
        image:
          "https://images.unsplash.com/photo-1582582429416-8b8b1a6b00e5?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 149,
        duration: "1–2h",
        rating: 4.8,
        badge: "Fast",
      },
      {
        title: "Hanging Shelves & Frames",
        image:
          "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 129,
        duration: "1h",
        rating: 4.7,
        badge: "Popular",
      },
      {
        title: "General Repairs",
        image:
          "https://images.unsplash.com/photo-1581091215367-59ab6f0b7b6c?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 179,
        duration: "1–3h",
        rating: 4.6,
        badge: "Pro",
      },
    ],
    lists: [
      [
        "Door handle fix",
        "Curtains installation",
        "TV wall bracket",
        "Minor repairs",
        "Wall drilling",
      ],
      [
        "Furniture repair",
        "Cabinet alignment",
        "Silicone sealing",
        "Mount mirrors",
        "Fix squeaky door",
      ],
      [
        "Small installations",
        "Home maintenance",
        "Fix cracks",
        "Replace lock",
        "Replace hinges",
      ],
    ],
  },

  elder: {
    title: "Elder emergencies",
    cards: [
      {
        title: "Urgent Assistance",
        image:
          "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 99,
        duration: "ASAP",
        rating: 4.9,
        badge: "Urgent",
      },
      {
        title: "Home Safety Check",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 149,
        duration: "1–2h",
        rating: 4.8,
        badge: "Recommended",
      },
      {
        title: "Care Support (Non-medical)",
        image:
          "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 129,
        duration: "1–3h",
        rating: 4.7,
        badge: "Trusted",
      },
    ],
    lists: [
      [
        "Urgent home visit",
        "Escort & help at home",
        "Pick up groceries",
        "Pharmacy pickup",
        "Check-in visit",
      ],
      [
        "Install grab bars",
        "Anti-slip solutions",
        "Lighting check",
        "Fall-risk review",
        "Door & lock check",
      ],
      [
        "Companionship visit",
        "Basic meal prep",
        "Help with tech",
        "Organize medicines (no medical)",
        "Call family update",
      ],
    ],
  },

  plumbing: {
    title: "Plumbing",
    cards: [
      {
        title: "Fix a Leak",
        image:
          "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 159,
        duration: "1–2h",
        rating: 4.7,
        badge: "Popular",
      },
      {
        title: "Unclog Drain",
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 189,
        duration: "1–2h",
        rating: 4.6,
        badge: "Same-day",
      },
      {
        title: "Install Faucet",
        image:
          "https://images.unsplash.com/photo-1600566753151-384129cf4e3a?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 199,
        duration: "1–2h",
        rating: 4.8,
        badge: "Pro",
      },
    ],
    lists: [
      [
        "Leak repair",
        "Faucet replace",
        "Toilet fix",
        "Shower repair",
        "Water pressure issue",
      ],
      [
        "Drain unclog",
        "Pipe replacement",
        "Seal & silicone",
        "Sink installation",
        "Water heater check",
      ],
      [
        "Bathroom plumbing",
        "Kitchen plumbing",
        "Emergency plumbing",
        "Bidet installation",
        "Outdoor tap fix",
      ],
    ],
  },

  electrical: {
    title: "Electrical",
    cards: [
      {
        title: "Install Light Fixture",
        image:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 179,
        duration: "1–2h",
        rating: 4.8,
        badge: "Top rated",
      },
      {
        title: "Fix Outlet / Switch",
        image:
          "https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 149,
        duration: "1h",
        rating: 4.7,
        badge: "Popular",
      },
      {
        title: "Electrical Diagnostics",
        image:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 199,
        duration: "1–2h",
        rating: 4.6,
        badge: "Pro",
      },
    ],
    lists: [
      [
        "Outlet repair",
        "Switch replacement",
        "Circuit check",
        "Lights installation",
        "Fan installation",
      ],
      [
        "Breaker issues",
        "Short circuit check",
        "Doorbell install",
        "LED setup",
        "Basic rewiring",
      ],
      [
        "Emergency electrician",
        "Appliance wiring",
        "Electrical safety check",
        "Grounding check",
        "Smart switch install",
      ],
    ],
  },

  painting: {
    title: "Painting",
    cards: [
      {
        title: "Interior Painting",
        image:
          "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 499,
        duration: "1–2 days",
        rating: 4.8,
        badge: "Popular",
      },
      {
        title: "Touch-ups",
        image:
          "https://images.unsplash.com/photo-1593697820676-6eace8e37b10?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 149,
        duration: "1–2h",
        rating: 4.7,
        badge: "Fast",
      },
      {
        title: "Door & Trim",
        image:
          "https://images.unsplash.com/photo-1582582429416-8b8b1a6b00e5?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 199,
        duration: "2–4h",
        rating: 4.6,
        badge: "Pro",
      },
    ],
    lists: [
      ["1 room paint", "2 rooms paint", "Full apartment", "Ceiling paint", "Wall prep"],
      ["Cracks filling", "Sanding", "Primer coat", "Color consultation", "Spot painting"],
      ["Door painting", "Trim painting", "Stairs paint", "Exterior small job", "Protect & cover furniture"],
    ],
  },

  smarthome: {
    title: "Smart home",
    cards: [
      {
        title: "Smart Lights Setup",
        image:
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 149,
        duration: "1–2h",
        rating: 4.8,
        badge: "Top rated",
      },
      {
        title: "Wi-Fi & Router Setup",
        image:
          "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 129,
        duration: "1h",
        rating: 4.7,
        badge: "Popular",
      },
      {
        title: "Smart Camera Setup",
        image:
          "https://images.unsplash.com/photo-1558002038-1c9f9ed1f4b2?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 199,
        duration: "1–2h",
        rating: 4.6,
        badge: "Pro",
      },
    ],
    lists: [
      ["Router install", "Wi-Fi optimization", "Mesh setup", "Smart bulbs", "Smart switches"],
      ["Smart camera install", "Doorbell camera", "Smart lock install", "Voice assistant setup", "Home automation basics"],
      ["Device pairing", "App configuration", "Fix smart devices", "Network troubleshooting", "Security tips"],
    ],
  },

  birthdays: {
    title: "Birthday organization",
    cards: [
      {
        title: "At-home Party Setup",
        image:
          "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 299,
        duration: "2–4h",
        rating: 4.7,
        badge: "Popular",
      },
      {
        title: "Decoration & Theme",
        image:
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 199,
        duration: "2–3h",
        rating: 4.6,
        badge: "Creative",
      },
      {
        title: "Catering & Snacks",
        image:
          "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 249,
        duration: "2–3h",
        rating: 4.5,
        badge: "Premium",
      },
    ],
    lists: [
      ["Theme planning", "Decoration setup", "Balloon arch", "Table setup", "Photo corner"],
      ["DJ / music setup", "Cake pickup", "Snacks & drinks", "Kids animation", "Cleanup after party"],
      ["Invite planning", "Budget planning", "Vendor coordination", "Surprise planning", "Home event organization"],
    ],
  },

  sports: {
    title: "Weekend sports buddy",
    cards: [
      {
        title: "Find a Running Partner",
        image:
          "https://images.unsplash.com/photo-1546484959-f9a81f6b296d?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 0,
        duration: "Weekend",
        rating: 4.9,
        badge: "Community",
      },
      {
        title: "Football / Basketball Group",
        image:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 0,
        duration: "Weekend",
        rating: 4.8,
        badge: "Popular",
      },
      {
        title: "Hiking Buddy",
        image:
          "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 0,
        duration: "Weekend",
        rating: 4.7,
        badge: "Outdoor",
      },
    ],
    lists: [
      ["Running partner", "Gym buddy", "Hiking group", "Cycling buddy", "Tennis partner"],
      ["Football group", "Basketball group", "Padel partner", "Swimming buddy", "Yoga buddy"],
      ["Weekend plans", "Beginner friendly", "Nearby locations", "Group chat setup", "Meetup coordination"],
    ],
  },
};

function norm(s = "") {
  return s.toLowerCase().trim();
}

export default function Services() {
  const [query, setQuery] = useState("");

  const q = norm(query);

  const scrollToId = (id) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;

    // offset for navbar height
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const visibleCategories = useMemo(() => {
    if (!q) return CATEGORIES;

    return CATEGORIES.filter((cat) => {
      const content = CATEGORY_CONTENT[cat.id];
      if (!content) return false;

      const hitLabel = norm(cat.label).includes(q);
      const hitTitle = norm(content.title).includes(q);

      const hitCards = (content.cards || []).some((c) => norm(c.title).includes(q));
      const hitLists = (content.lists || []).some((col) => col.some((item) => norm(item).includes(q)));

      return hitLabel || hitTitle || hitCards || hitLists;
    });
  }, [q]);

  const filteredCategoryContent = (catId) => {
    const content = CATEGORY_CONTENT[catId];
    if (!content) return null;
    if (!q) return content;

    const cards = content.cards.filter((c) => norm(c.title).includes(q));
    const lists = content.lists
      .map((col) => col.filter((item) => norm(item).includes(q)))
      .filter((col) => col.length > 0);

    const catLabel = CATEGORIES.find((c) => c.id === catId)?.label || "";
    const hitLabel = norm(catLabel).includes(q);
    const hitTitle = norm(content.title).includes(q);

    // If the query matches category name, show the whole section
    if ((hitLabel || hitTitle) && cards.length === 0 && lists.length === 0) {
      return content;
    }

    return { ...content, cards, lists };
  };

  const popularGrid = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const cover = CATEGORY_CONTENT[cat.id]?.cards?.[0]?.image;
      return { ...cat, cover };
    });
  }, []);

  return (
    <div className="finderr-services">
      {/* HERO VIDEO */}
      <section className="services-hero">
        <video className="services-hero__video" autoPlay muted loop playsInline>
          <source src="/videos/services-hero.mp4" type="video/mp4" />
        </video>

        <div className="services-hero__overlay" />

        <div className="services-hero__inner">
          <div className="services-searchCard">
            <h1>Choose a service to get started.</h1>

            <div className="services-searchRow services-searchRow--small">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search a service (e.g. "plumbing")'
                aria-label="Search services"
              />
              <button
                type="button"
                className="services-searchBtn"
                onClick={() => {
                  // scroll to Popular section (like Handy behavior)
                  scrollToId("popular");
                }}
              >
                Search
              </button>
            </div>

            <div className="services-searchHint">
              Search filters services across all categories.
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="services-body">
        <div className="services-container">
          {/* LEFT (sticky) */}
          <aside className="services-left">
            <div className="services-leftTitle">All Categories</div>

            <div className="services-leftList">
              <button className="services-leftItem is-active" type="button" onClick={() => scrollToId("popular")}>
                Popular
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className="services-leftItem"
                  onClick={() => scrollToId(cat.id)}
                  type="button"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="services-right">
            {/* POPULAR */}
            <div id="cat-popular" className="services-section">
              <div className="services-rightHeader">
                <h2>Popular</h2>
              </div>

              <div className="services-allGrid">
                {popularGrid.map((cat) => (
                  <button
                    key={cat.id}
                    className="services-card"
                    type="button"
                    onClick={() => scrollToId(cat.id)}
                    title={`Go to ${cat.label}`}
                  >
                    <div
                      className="services-cardImg"
                      style={{ backgroundImage: cat.cover ? `url(${cat.cover})` : "none" }}
                      aria-hidden="true"
                    />
                    <div className="services-cardLabel">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* SECTIONS */}
            {visibleCategories.map((cat) => {
              const content = filteredCategoryContent(cat.id);
              if (!content) return null;

              return (
                <div key={cat.id} id={`cat-${cat.id}`} className="services-section">
                  <div className="services-rightHeader">
                    <h2>{content.title}</h2>
                  </div>

                  <div className="services-cards">
                    {content.cards.slice(0, 3).map((card) => (
                      <button key={card.title} className="services-card services-card--details" type="button">
                        <div
                          className="services-cardImg"
                          style={{ backgroundImage: `url(${card.image})` }}
                          aria-hidden="true"
                        >
                          {card.badge ? <div className="services-badge">{card.badge}</div> : null}
                        </div>

                        <div className="services-cardBody">
                          <div className="services-cardTop">
                            <div className="services-cardTitle">{card.title}</div>
                            <div className="services-cardRating">★ {card.rating}</div>
                          </div>

                          <div className="services-cardMeta">
                            <span>From {card.priceFrom === 0 ? "Free" : `${card.priceFrom} MAD`}</span>
                            <span>•</span>
                            <span>{card.duration}</span>
                          </div>

                          <div className="services-cardActions">
                            <span className="services-ctaLink">See details</span>
                            <span className="services-ctaBtn">Book</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="services-lists">
                    {content.lists.map((col, idx) => (
                      <div key={idx} className="services-listCol">
                        {col.map((item) => (
                          <button key={item} className="services-listItem" type="button">
                            {item}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {q && visibleCategories.length === 0 && (
              <div className="services-empty">No results found. Try another keyword.</div>
            )}
          </section>
        </div>
      </main>

      <footer className="services-footer">
        <div className="services-container services-footerInner">
          <span>© {new Date().getFullYear()} Finderr</span>
          <div className="services-footerLinks">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Privacy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Terms
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
