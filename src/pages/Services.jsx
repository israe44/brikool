// src/pages/Services.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./Services.css";
import { CATEGORIES } from "../data/categories";
import ServiceCategory from "../components/ServiceCategory";

// helper: create URL-safe id for detail pages
function slugify(s = "") {
  return s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const CATEGORY_CONTENT = {
  cleaning: {
    title: "Cleaning",
    cards: [
      {
        title: "Home Cleaning",
        image: "/cleaning/cleaning-1.png",
        priceFrom: 199,
        duration: "2–3h",
        rating: 4.8,
        badge: "Popular",
        pageId: "home-cleaning",
      },
      {
        title: "Salon cleaning",
        image: "/cleaning/cleaning-2.png",
        priceFrom: 299,
        duration: "2–4h",
        rating: 4.7,
        badge: "Trusted",
        pageId: "salon-cleaning",
      },
      {
        title: "Deep Cleaning",
        image: "/cleaning/cleaning-3.png",
        priceFrom: 399,
        duration: "4–6h",
        rating: 4.9,
        badge: "Best value",
        pageId: "deep-cleaning",
      },
    ],
    lists: [
      ["Apartment cleaning", "Move-in cleaning", "Move-out cleaning", "Kitchen cleaning", "Bathroom cleaning"],
      ["Windows cleaning", "Carpet cleaning", "Sofa cleaning", "Fridge cleaning", "Oven cleaning"],
      ["Weekly cleaning", "Post-renovation cleaning", "Sanitization", "Local cleaners", "Same-day cleaning"],
    ],
  },

  handyman: {
    title: "Handyman services",
    cards: [
      {
        title: "Furniture Assembly",
        image: "/furniture-2.png",
        priceFrom: 149,
        duration: "1–2h",
        rating: 4.8,
        badge: "Fast",
        pageId: "furniture-assembly",
      },
      {
        title: "Hanging Shelves & Frames",
        image: "/furniture-1.png",
        priceFrom: 129,
        duration: "1h",
        rating: 4.7,
        badge: "Popular",
        pageId: "hanging-shelves-and-frames",
      },
      {
        title: "General Repairs",
        image: "/furniture-3.png",
        priceFrom: 179,
        duration: "1–3h",
        rating: 4.6,
        badge: "Pro",
        pageId: "general-repairs",
      },
    ],
    lists: [
      ["Door handle fix", "Curtains installation", "TV wall bracket", "Minor repairs", "Wall drilling"],
      ["Furniture repair", "Cabinet alignment", "Silicone sealing", "Mount mirrors", "Fix squeaky door"],
      ["Small installations", "Home maintenance", "Fix cracks", "Replace lock", "Replace hinges"],
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
        pageId: "urgent-assistance",
      },
      {
        title: "Home Safety Check",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 149,
        duration: "1–2h",
        rating: 4.8,
        badge: "Recommended",
        pageId: "home-safety-check",
      },
      {
        title: "Care Support (Non-medical)",
        image:
          "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 129,
        duration: "1–3h",
        rating: 4.7,
        badge: "Trusted",
        pageId: "care-support-non-medical",
      },
    ],
    lists: [
      ["Urgent home visit", "Escort & help at home", "Pick up groceries", "Pharmacy pickup", "Check-in visit"],
      ["Install grab bars", "Anti-slip solutions", "Lighting check", "Fall-risk review", "Door & lock check"],
      ["Companionship visit", "Basic meal prep", "Help with tech", "Organize medicines (no medical)", "Call family update"],
    ],
  },

  plumbing: {
    title: "Plumbing",
    cards: [
      {
        title: "Fix a Leak",
        image: "/plumbing-1.png",
        priceFrom: 159,
        duration: "1–2h",
        rating: 4.7,
        badge: "Popular",
        pageId: "fix-a-leak",
      },
      {
        title: "Unclog Drain",
        image: "/plumbing-2.png",
        priceFrom: 189,
        duration: "1–2h",
        rating: 4.6,
        badge: "Same-day",
        pageId: "unclog-drain",
      },
      {
        title: "Install Faucet",
        image: "/plumbing-3.png",
        priceFrom: 199,
        duration: "1–2h",
        rating: 4.8,
        badge: "Pro",
        pageId: "install-faucet",
      },
    ],
    lists: [
      ["Leak repair", "Faucet replace", "Toilet fix", "Shower repair", "Water pressure issue"],
      ["Drain unclog", "Pipe replacement", "Seal & silicone", "Sink installation", "Water heater check"],
      ["Bathroom plumbing", "Kitchen plumbing", "Emergency plumbing", "Bidet installation", "Outdoor tap fix"],
    ],
  },

  electrical: {
    title: "Electrical",
    cards: [
      {
        title: "Install Light Fixture",
        image: "/light-1.png",
        priceFrom: 179,
        duration: "1–2h",
        rating: 4.8,
        badge: "Top rated",
        pageId: "install-light-fixture",
      },
      {
        title: "Fix Outlet / Switch",
        image:
          "https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=1400&q=80",
        priceFrom: 149,
        duration: "1h",
        rating: 4.7,
        badge: "Popular",
        pageId: "fix-outlet-switch",
      },
      {
        title: "Electrical Diagnostics",
        image: "/light-2.png",
        priceFrom: 199,
        duration: "1–2h",
        rating: 4.6,
        badge: "Pro",
        pageId: "electrical-diagnostics",
      },
    ],
    lists: [
      ["Outlet repair", "Switch replacement", "Circuit check", "Lights installation", "Fan installation"],
      ["Breaker issues", "Short circuit check", "Doorbell install", "LED setup", "Basic rewiring"],
      ["Emergency electrician", "Appliance wiring", "Electrical safety check", "Grounding check", "Smart switch install"],
    ],
  },

  painting: {
    title: "Painting",
    cards: [
      {
        title: "Interior Painting",
        image: "/painting-1.png",
        priceFrom: 499,
        duration: "1–2 days",
        rating: 4.8,
        badge: "Popular",
        pageId: "interior-painting",
      },
      {
        title: "Touch-ups",
        image: "/painting-2.png",
        priceFrom: 149,
        duration: "1–2h",
        rating: 4.7,
        badge: "Fast",
        pageId: "touch-ups",
      },
      {
        title: "Door & Trim",
        image: "/painting-3.png",
        priceFrom: 199,
        duration: "2–4h",
        rating: 4.6,
        badge: "Pro",
        pageId: "door-and-trim",
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
        pageId: "smart-lights-setup",
      },
      {
        title: "Wi-Fi & Router Setup",
        image: "/wifi.png",
        priceFrom: 129,
        duration: "1h",
        rating: 4.7,
        badge: "Popular",
        pageId: "wifi-router-setup",
      },
      {
        title: "Smart Camera Setup",
        image: "/cam.png",
        priceFrom: 199,
        duration: "1–2h",
        rating: 4.6,
        badge: "Pro",
        pageId: "smart-camera-setup",
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
        pageId: "at-home-party-setup",
      },
      {
        title: "Decoration & Theme",
        image: "/bday.png",
        priceFrom: 199,
        duration: "2–3h",
        rating: 4.6,
        badge: "Creative",
        pageId: "decoration-and-theme",
      },
      {
        title: "Abidat Rma",
        image: "/abidatema.png",
        priceFrom: 249,
        duration: "2–3h",
        rating: 4.5,
        badge: "Premium",
        pageId: "abidat-rma",
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
        image: "/sport-1.png",
        backgroundPosition: "center 60%",
        priceFrom: 0,
        duration: "Weekend",
        rating: 4.9,
        badge: "Community",
        pageId: "find-a-running-partner",
      },
      {
        title: "Football / Basketball Group",
        image: "/sport-2.png",
        priceFrom: 0,
        duration: "Weekend",
        rating: 4.8,
        badge: "Popular",
        pageId: "football-basketball-group",
      },
      {
        title: "Bicycle Bodies",
        image: "/sport-3.png",
        priceFrom: 0,
        duration: "Weekend",
        rating: 4.7,
        badge: "Outdoor",
        pageId: "bicycle-bodies",
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

export default function Services({ navigate }) {

  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState(null);

  const q = norm(query);

  const scrollToId = (id) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
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

  // support scrolling to a category via hash (#cat-<id>) or ?cat=<id>
  useEffect(() => {
    const tryScroll = () => {
      const hash = window.location.hash || "";
      if (hash.startsWith("#cat-")) {
        const id = hash.replace("#cat-", "");
        scrollToId(id);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const cat = params.get("cat");
      if (cat) scrollToId(cat);
    };

    const t = setTimeout(tryScroll, 50);
    return () => clearTimeout(t);
  }, []);

  // click handlers
  const openServicePage = (card) => {
    const id = card.pageId || slugify(card.title);
    navigate(`/service/${id}`, { card });
  };

  const openListItemPage = (catId, itemText) => {
    // Special handling for Apartment cleaning
    if (itemText === "Apartment cleaning") {
      navigate("/apartment-cleaning");
      return;
    }
    
    // optional: list items get their own pages too
    // example: "Cleaning • Move-in cleaning" => move-in-cleaning
    const id = slugify(itemText);
    navigate(`/service/${id}`, { fromCategory: catId, label: itemText });
  };

  return (
    <div className="finderr-services">
      {/* HERO */}
      <section className="services-hero">
        <div
          className="services-hero__video"
          aria-hidden="true"
          style={{ backgroundImage: `url(servicesbg.png)` }}
        />
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
                onClick={() => scrollToId("popular")}
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
              <button
                className="services-leftItem is-active"
                type="button"
                onClick={() => scrollToId("popular")}
              >
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
              return (
                <ServiceCategory
                  key={cat.id}
                  category={cat}
                  content={content}
                  openServicePage={openServicePage}
                  openListItemPage={openListItemPage}
                />
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

      {lightbox && (
        <div className="image-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <div className="image-lightboxContent" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.image}
              alt={lightbox.title || "image"}
              className="image-lightboxImg"
              style={{ objectPosition: lightbox.backgroundPosition || "center" }}
            />
          </div>
          <button type="button" className="image-lightboxClose" onClick={() => setLightbox(null)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
