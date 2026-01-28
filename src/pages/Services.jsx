import React, { useMemo, useState } from "react";
import "./Services.css";

const CATEGORIES = [
  { id: "cleaning", label: "Cleaning" },
  { id: "handyman", label: "Handyman services" },
  { id: "elder", label: "Elder emergencies" },
  { id: "plumbing", label: "Plumbing" },
  { id: "electrical", label: "Electrical" },
  { id: "painting", label: "Painting" },
  { id: "jardinier", label: "Jardinier" },
  { id: "smarthome", label: "Smart home" },
  { id: "birthdays", label: "Birthday organization" },
  { id: "sports", label: "Weekend sports buddy" },
  { id: "moving", label: "Moving" },
];

const CATEGORY_CONTENT = {
  cleaning: {
    title: "Cleaning",
    cards: [
      {
        title: "Home Cleaning",
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Office Cleaning",
        image:
          "https://images.unsplash.com/photo-1527515637462-daf3f22d63a9?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Deep Cleaning",
        image:
          "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1400&q=80",
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
      ["Windows cleaning", "Carpet cleaning", "Sofa cleaning", "Fridge cleaning", "Oven cleaning"],
      ["Weekly cleaning", "Post-renovation cleaning", "Sanitization", "Local cleaners", "Same-day cleaning"],
    ],
  },

  handyman: {
    title: "Handyman services",
    cards: [
      {
        title: "Furniture Assembly",
        image:
          "https://images.unsplash.com/photo-1582582429416-8b8b1a6b00e5?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Hanging Shelves & Frames",
        image:
          "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "General Repairs",
        image:
          "https://images.unsplash.com/photo-1581091215367-59ab6f0b7b6c?auto=format&fit=crop&w=1400&q=80",
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
      },
      {
        title: "Home Safety Check",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Care Support (Non-medical)",
        image:
          "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?auto=format&fit=crop&w=1400&q=80",
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
        image:
          "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Unclog Drain",
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Install Faucet",
        image:
          "https://images.unsplash.com/photo-1600566753151-384129cf4e3a?auto=format&fit=crop&w=1400&q=80",
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
        image:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Fix Outlet / Switch",
        image:
          "https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Electrical Diagnostics",
        image:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80",
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
        image:
          "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Touch-ups",
        image:
          "https://images.unsplash.com/photo-1593697820676-6eace8e37b10?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Door & Trim",
        image:
          "https://images.unsplash.com/photo-1582582429416-8b8b1a6b00e5?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    lists: [
      ["1 room paint", "2 rooms paint", "Full apartment", "Ceiling paint", "Wall prep"],
      ["Cracks filling", "Sanding", "Primer coat", "Color consultation", "Spot painting"],
      ["Door painting", "Trim painting", "Stairs paint", "Exterior small job", "Protect & cover furniture"],
    ],
  },

  jardinier: {
    title: "Jardinier",
    cards: [
      {
        title: "Garden Maintenance",
        image:
          "https://images.unsplash.com/photo-1598908314732-07113901949e?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Trimming & Cleanup",
        image:
          "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Planting",
        image:
          "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    lists: [
      ["Grass cutting", "Weeding", "Hedge trimming", "Leaf cleanup", "Garden cleanup"],
      ["Basic landscaping", "Planting flowers", "Soil refresh", "Irrigation check", "Tree pruning (small)"],
      ["Outdoor cleaning", "Terrace cleanup", "Garden design help", "Fertilizing", "Weekend maintenance"],
    ],
  },

  smarthome: {
    title: "Smart home",
    cards: [
      {
        title: "Smart Lights Setup",
        image:
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Wi-Fi & Router Setup",
        image:
          "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Smart Camera Setup",
        image:
          "https://images.unsplash.com/photo-1558002038-1c9f9ed1f4b2?auto=format&fit=crop&w=1400&q=80",
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
      },
      {
        title: "Decoration & Theme",
        image:
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Catering & Snacks",
        image:
          "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1400&q=80",
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
      },
      {
        title: "Football / Basketball Group",
        image:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Hiking Buddy",
        image:
          "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    lists: [
      ["Running partner", "Gym buddy", "Hiking group", "Cycling buddy", "Tennis partner"],
      ["Football group", "Basketball group", "Padel partner", "Swimming buddy", "Yoga buddy"],
      ["Weekend plans", "Beginner friendly", "Women-only group (optional)", "Nearby locations", "Group chat setup"],
    ],
  },

  moving: {
    title: "Moving",
    cards: [
      {
        title: "Move Help",
        image:
          "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Packing Assistance",
        image:
          "https://images.unsplash.com/photo-1600518464441-9154a4dea21a?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Delivery / Pickup",
        image:
          "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    lists: [
      ["Loading & unloading", "Packing & unpacking", "Furniture disassembly", "Carry heavy items", "Move within city"],
      ["Small delivery", "Pickup & dropoff", "Truck + helpers", "Office moving", "Storage move"],
      ["Same-day moving", "Weekend moving", "Fragile items handling", "Boxes & materials", "Move planning"],
    ],
  },
};

export default function Services({ navigate }) {
  const [activeCategory, setActiveCategory] = useState("cleaning");
  const [query, setQuery] = useState("");

  const content = CATEGORY_CONTENT[activeCategory];

  const filteredContent = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return content;

    // Filter cards & list items by query
    const cards = content.cards.filter((c) => c.title.toLowerCase().includes(q));
    const lists = content.lists
      .map((col) => col.filter((item) => item.toLowerCase().includes(q)))
      .filter((col) => col.length > 0);

    return { ...content, cards, lists };
  }, [content, query]);

  return (
    <div className="finderr-services">
      {/* HERO VIDEO */}
      <section className="services-hero">
        <video
          className="services-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/services-hero-poster.jpg"
        >
          <source src="/videos/services-hero.mp4" type="video/mp4" />
        </video>

        <div className="services-hero__overlay" />

        <div className="services-hero__inner">
          <div className="services-searchCard">
            <h1>Choose a service to get started.</h1>

            <div className="services-searchRow">
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
                  const el = document.getElementById("services-body");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Search
              </button>
            </div>

            <div className="services-searchHint">
              Try: “cleaning”, “moving”, “smart home”…
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="services-body" id="services-body">
        <div className="services-container">
          {/* LEFT LIST */}
          <aside className="services-left">
            <div className="services-leftTitle">All Categories</div>

            <div className="services-leftList">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={[
                    "services-leftItem",
                    cat.id === activeCategory ? "is-active" : "",
                  ].join(" ")}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT */}
          <section className="services-right">
            <div className="services-rightHeader">
              <h2>{content.title}</h2>
            </div>

            {/* TOP CARDS (3 columns like Handy) */}
            <div className="services-cards">
              {(filteredContent.cards.length ? filteredContent.cards : content.cards).slice(0, 3).map((card) => (
                <button
                  key={card.title}
                  className="services-card"
                  type="button"
                  onClick={() => {
                    // later: navigate to service details
                    // navigate?.(`/services/${activeCategory}/${slug}`)
                  }}
                >
                  <div
                    className="services-cardImg"
                    style={{ backgroundImage: `url(${card.image})` }}
                    aria-hidden="true"
                  />
                  <div className="services-cardLabel">{card.title}</div>
                </button>
              ))}
            </div>

            {/* LISTS (3 columns text like Handy) */}
            <div className="services-lists">
              {(filteredContent.lists.length ? filteredContent.lists : content.lists).map((col, idx) => (
                <div key={idx} className="services-listCol">
                  {col.map((item) => (
                    <button
                      key={item}
                      className="services-listItem"
                      type="button"
                      onClick={() => {
                        // later: open results filtered by this sub-service
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* simple footer */}
      <footer className="services-footer">
        <div className="services-container services-footerInner">
          <span>© {new Date().getFullYear()} Finderr</span>
          <div className="services-footerLinks">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
