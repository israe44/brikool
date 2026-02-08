import React, { useState } from 'react';
import './ApartmentCleaning.css';

const PRICING_PLANS = [
  {
    name: 'Basic Clean',
    price: 89,
    period: 'Starting from',
    features: [
      'Dusting all surfaces',
      'Vacuum & mop floors',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Trash removal',
    ],
    popular: false,
  },
  {
    name: 'Deep Clean',
    price: 149,
    period: 'Starting from',
    features: [
      'Everything in Basic Clean',
      'Inside oven & fridge',
      'Baseboards & windowsills',
      'Cabinet exteriors',
      'Light fixtures',
      'Behind appliances',
    ],
    popular: true,
  },
  {
    name: 'Move In/Out',
    price: 199,
    period: 'Starting from',
    features: [
      'Everything in Deep Clean',
      'Inside cabinets & drawers',
      'Closet cleaning',
      'Wall spot cleaning',
      'Detailed grout cleaning',
      'Ceiling fans & vents',
    ],
    popular: false,
  },
];

const ROOM_SECTIONS = [
  {
    title: 'Kitchen Deep Cleaning',
    description: 'Transform your kitchen into a spotless cooking space. Our professionals tackle grease, grime, and buildup from every surface.',
    bullets: [
      'Appliance cleaning inside & out (microwave, oven, refrigerator)',
      'Cabinet exteriors wiped and polished',
      'Countertops sanitized and disinfected',
      'Sink scrubbed and faucet polished',
      'Floor mopped with professional-grade cleaners',
    ],
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
  },
  {
    title: 'Bathroom Sanitization',
    description: 'Experience hospital-grade cleanliness in your bathrooms. We eliminate bacteria, mold, and soap scum completely.',
    bullets: [
      'Toilet deep cleaned and disinfected',
      'Shower, tub, and tile thoroughly scrubbed',
      'Mirrors polished to crystal clarity',
      'Sink and fixtures sanitized',
      'Floor mopped and disinfected',
    ],
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
  },
  {
    title: 'Living Areas & Bedrooms',
    description: 'Create a relaxing environment with our comprehensive room cleaning. Every corner gets attention to detail.',
    bullets: [
      'Dusting all furniture, shelves, and decorations',
      'Vacuum carpets and rugs thoroughly',
      'Hardwood and tile floors mopped',
      'Baseboards and windowsills wiped',
      'Trash emptied and fresh liners',
    ],
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop',
  },
];

const FAQS = [
  {
    question: 'What if I\'m not satisfied with the cleaning?',
    answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with any aspect of the cleaning, contact us within 24 hours and we\'ll send a cleaner back to make it right at no additional cost.',
  },
  {
    question: 'Do I need to provide cleaning supplies?',
    answer: 'No! Our professionals bring all necessary cleaning supplies and equipment. We use eco-friendly, professional-grade products. If you have specific products you\'d like us to use, just let us know.',
  },
  {
    question: 'How long does a cleaning take?',
    answer: 'A standard apartment clean typically takes 2-4 hours depending on size and condition. Deep cleans may take 4-6 hours. We\'ll give you an accurate time estimate when you book.',
  },
  {
    question: 'Are your cleaners background checked?',
    answer: 'Absolutely. All cleaners undergo thorough background checks, reference verification, and skill assessments. They\'re also fully insured and bonded for your peace of mind.',
  },
];

export default function ApartmentCleaning({ navigate }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="ac-page">
      {/* HERO SECTION */}
      <section className="ac-hero">
        <div className="ac-container">
          <h1 className="ac-title">Professional Apartment Cleaning</h1>
          <p className="ac-subtitle">
            Top-rated cleaners. Flexible scheduling. Satisfaction guaranteed. 
            Book online in 60 seconds and enjoy a spotless home.
          </p>
          <div className="ac-heroActions">
            <button className="ac-primaryBtn">Book Now</button>
            <button className="ac-secondaryBtn">View Pricing</button>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="ac-badges">
        <div className="ac-container">
          <div className="ac-badgeGrid">
            <div className="ac-badgeItem">
              <div className="ac-badgeIcon">✓</div>
              <div>
                <h4>Background Checked</h4>
                <p>All cleaners fully vetted</p>
              </div>
            </div>
            <div className="ac-badgeItem">
              <div className="ac-badgeIcon">🛡️</div>
              <div>
                <h4>Fully Insured</h4>
                <p>Protected & bonded service</p>
              </div>
            </div>
            <div className="ac-badgeItem">
              <div className="ac-badgeIcon">⭐</div>
              <div>
                <h4>Top Rated</h4>
                <p>4.9/5 average rating</p>
              </div>
            </div>
            <div className="ac-badgeItem">
              <div className="ac-badgeIcon">💯</div>
              <div>
                <h4>Satisfaction Guaranteed</h4>
                <p>We'll make it right</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="ac-pricing">
        <div className="ac-container">
          <h2 className="ac-sectionTitle">Transparent Pricing</h2>
          <p className="ac-sectionSubtitle">
            Choose the cleaning package that fits your needs. All prices include supplies.
          </p>
          <div className="ac-pricingGrid">
            {PRICING_PLANS.map((plan, index) => (
              <div
                key={index}
                className={`ac-priceCard ${plan.popular ? 'ac-popular' : ''}`}
              >
                {plan.popular && <div className="ac-popularBadge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="ac-priceAmount">
                  <span className="ac-price">${plan.price}</span>
                  <span className="ac-period">{plan.period}</span>
                </div>
                <ul className="ac-featureList">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="ac-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="ac-selectBtn">Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOM SECTIONS - Side by Side */}
      {ROOM_SECTIONS.map((room, index) => (
        <section key={index} className="ac-roomSection">
          <div className={`ac-roomLayout ${index % 2 === 1 ? 'ac-reversed' : ''}`}>
            <div className="ac-roomImage">
              <img src={room.image} alt={room.title} />
            </div>
            <div className="ac-roomContent">
              <div className="ac-roomInner">
                <h3 className="ac-h3">{room.title}</h3>
                <p className="ac-text">{room.description}</p>
                <ul className="ac-checklist">
                  {room.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <span className="ac-check">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ SECTION */}
      <section className="ac-faq">
        <div className="ac-container">
          <h2 className="ac-sectionTitle">Frequently Asked Questions</h2>
          <p className="ac-sectionSubtitle">Everything you need to know about our service</p>
          <div className="ac-faqList">
            {FAQS.map((faq, index) => (
              <div key={index} className="ac-faqItem">
                <button
                  className="ac-faqQuestion"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className="ac-faqIcon">
                    {expandedFaq === index ? '−' : '+'}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="ac-faqAnswer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="ac-cta">
        <div className="ac-container">
          <div className="ac-ctaGrid">
            <div>
              <h2 className="ac-sectionTitle" style={{ textAlign: 'left' }}>
                Ready for a Spotless Home?
              </h2>
              <p className="ac-sectionSubtitle" style={{ textAlign: 'left' }}>
                Book your apartment cleaning in just 60 seconds. Same-day and next-day appointments available.
              </p>
            </div>
            <div className="ac-ctaActions">
              <button className="ac-primaryBtn">Book Your Cleaning</button>
              <button className="ac-secondaryBtn">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
