// src/components/blog/Blog.jsx
import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  { title: "Home Cleaning", img: "/cleaning/cleaning-1.png", href: "/services?cat=cleaning" },
  { title: "Handyman", img: "/furniture-2.png", href: "/services?cat=handyman" },
  { title: "Elder Emergencies", img: "/abidatema.png", href: "/services?cat=elder" },
  { title: "Plumbing", img: "/plumbing-1.png", href: "/services?cat=plumbing" },
  { title: "Electrical", img: "/light-1.png", href: "/services?cat=electrical" },
  { title: "Painting", img: "/painting-1.png", href: "/services?cat=painting" },
  { title: "Jardinier", img: "/cleaning/cleaning-2.png", href: "/services?cat=jardinier" },
  { title: "Smart Home", img: "/wifi.png", href: "/services?cat=smarthome" },
  { title: "Birthday Organization", img: "/bday.png", href: "/services?cat=birthdays" },
  { title: "Weekend Sports Buddy", img: "/sport-1.png", href: "/services?cat=sports" },
  { title: "Moving", img: "/Provider.png", href: "/services?cat=moving" },
];

const POSTS = {
  tips: {
    title: "Tips, How-to's, and DIY",
    cta: "More Tips, How-to's, and DIY Articles",
    items: [
      {
        tag: "Tips",
        title: "How To Clean Ovens (No Stress)",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1581578731548-39d54fbbfc91?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/how-to-clean-ovens",
      },
      {
        tag: "Tips",
        title: "Roach Prevention 101 (Simple Habits)",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/roach-prevention-101",
      },
      {
        tag: "DIY",
        title: "The Shelving Solution: Clean Storage Setup",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/the-shelving-solution",
      },
      {
        tag: "Tips",
        title: "Streamline Your Bathroom Storage",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/bathroom-storage",
      },
    ],
  },
  cleaning: {
    title: "Cleaning Tips, How-to's, and DIY",
    cta: "More Cleaning Tips, How-to's, and DIY Articles",
    items: [
      {
        tag: "Cleaning",
        title: "How To Clean Your Grill",
        date: "August 16, 2023",
        img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/how-to-clean-your-grill",
      },
      {
        tag: "Cleaning",
        title: "Finding House Cleaning Services",
        date: "November 17, 2022",
        img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/finding-house-cleaning-services",
      },
      {
        tag: "Cleaning",
        title: "How To Clean Appliances",
        date: "December 31, 2020",
        img: "https://images.unsplash.com/photo-1581579185169-5b84d36b0e9a?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/how-to-clean-appliances",
      },
      {
        tag: "Cleaning",
        title: "How To Clean a Smelly Dishwasher",
        date: "December 31, 2020",
        img: "https://images.unsplash.com/photo-1581578731548-39d54fbbfc91?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/clean-smelly-dishwasher",
      },
    ],
  },
  home: {
    title: "Home Project Tips, How-to's, and DIY",
    cta: "More Home Project Tips, How-to's, and DIY Articles",
    items: [
      {
        tag: "Home",
        title: "Paint Like a Pro (Even if You’re New)",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/paint-like-a-pro",
      },
      {
        tag: "Home",
        title: "Fix Loose Door Handles in 10 Minutes",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/fix-door-handle",
      },
      {
        tag: "DIY",
        title: "Hang Shelves Without Regret",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/hang-shelves",
      },
      {
        tag: "DIY",
        title: "Basic Tool Kit: What You Actually Need",
        date: "Updated recently",
        img: "https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/basic-tool-kit",
      },
    ],
  },
  community: {
    title: "Community",
    cta: "More Community Articles",
    items: [
      {
        tag: "Community",
        title: "Stuff To Clean More Often (Quick Wins)",
        date: "August 21, 2019",
        img: "https://images.unsplash.com/photo-1583947582886-f4a1e8aabf67?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/stuff-to-clean-more-often",
      },
      {
        tag: "Community",
        title: "Hire a Cleaner: What To Expect",
        date: "August 21, 2019",
        img: "https://images.unsplash.com/photo-1581578731548-39d54fbbfc91?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/hire-a-cleaner",
      },
      {
        tag: "Community",
        title: "Cleaning Service With Roommates",
        date: "August 16, 2019",
        img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/cleaning-with-roommates",
      },
      {
        tag: "Community",
        title: "How To Clean a Humidifier",
        date: "March 13, 2019",
        img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=70",
        href: "/blog/clean-a-humidifier",
      },
    ],
  },
};

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ title, cta }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <h2 className="text-[34px] font-semibold tracking-tight text-gray-900">{title}</h2>
      <a
        href="#"
        className="text-[16px] font-medium text-sky-600 hover:text-sky-700 transition-colors whitespace-nowrap"
      >
        {cta} <span aria-hidden="true">›</span>
      </a>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <a
      href={post.href}
      className="group block border border-gray-200 bg-white overflow-hidden"
      style={{ borderRadius: 0 }}
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <img
          src={post.img}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="text-[13px] font-medium text-gray-500">{post.tag}</div>
        <div className="mt-1 text-[18px] font-semibold text-gray-900 leading-snug">
          {post.title}
        </div>
        <div className="mt-6 text-[13px] text-gray-400">{post.date}</div>
      </div>
    </a>
  );
}

function ServiceCarousel({ navigate }) {
  const scrollerRef = useRef(null);
  const runningRef = useRef(true);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  // pixels per second
  const SPEED = 60;

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const step = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const delta = (ts - lastRef.current) / 1000;
      lastRef.current = ts;

      if (runningRef.current) {
        el.scrollLeft += SPEED * delta;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, []);

  const pause = () => (runningRef.current = false);
  const resume = () => (runningRef.current = true);

  const duplicated = [...SERVICES, ...SERVICES];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[34px] font-semibold tracking-tight text-gray-900">
          Book Services Through Finderr
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              el.scrollLeft = Math.max(0, el.scrollLeft - 520);
            }}
            className="border border-gray-300 px-3 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50"
            style={{ borderRadius: 0 }}
          >
            ←
          </button>
          <button
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              el.scrollLeft = Math.min(el.scrollWidth, el.scrollLeft + 520);
            }}
            className="border border-gray-300 px-3 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50"
            style={{ borderRadius: 0 }}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-6 relative">
        <div
          ref={scrollerRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          className="flex gap-5 overflow-x-hidden whitespace-nowrap"
          style={{ scrollbarWidth: "none" }}
        >
          {duplicated.map((s, idx) => (
            <a
              key={`${s.title}-${idx}`}
              href={s.href}
              onClick={(e) => {
                if (navigate) {
                  e.preventDefault();
                  navigate(s.href);
                }
              }}
              className="inline-block min-w-[320px] bg-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
              style={{ borderRadius: 12 }}
            >
              <div className="flex items-stretch">
                <div className="flex-shrink-0 h-24 w-28 overflow-hidden rounded-l-md">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                </div>

                <div className="flex-1 px-6 py-4 flex items-center">
                  <div className="text-[18px] font-semibold text-gray-900">{s.title}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-2 text-[13px] text-gray-500">Auto-scrolling — hover to pause.</div>
      </div>
    </div>
  );
}

export default function Blog({ navigate }) {
  const sections = useMemo(() => Object.values(POSTS), []);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[1500px] px-12 py-10">
        {/* Top: Services booking (carousel) */}
        <Reveal>
          <ServiceCarousel navigate={navigate} />
        </Reveal>

        {/* Blog Sections */}
        <div className="mt-14 space-y-16">
          {sections.map((sec, idx) => (
            <Reveal key={sec.title} delay={idx * 0.05}>
              <div>
                <SectionHeader title={sec.title} cta={sec.cta} />

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {sec.items.map((p) => (
                    <Reveal key={p.title} delay={0.06}>
                      <PostCard post={p} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
