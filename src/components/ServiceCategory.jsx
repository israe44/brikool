// src/components/ServiceCategory.jsx
import React from "react";

export default function ServiceCategory({ category, content, openServicePage, openListItemPage }) {
  if (!content) return null;

  return (
    <div id={`cat-${category.id}`} className="services-section">
      <div className="services-rightHeader">
        <h2>{content.title}</h2>
      </div>

      <div className="services-cards">
        {content.cards.slice(0, 3).map((card) => (
          <button
            key={card.title}
            className="services-card services-card--details"
            type="button"
            onClick={() => openServicePage(card)}
          >
            <div
              className="services-cardImg"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundPosition: card.backgroundPosition || "center",
                backgroundSize: card.backgroundSize || "cover",
              }}
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
              <button
                key={item}
                className="services-listItem"
                type="button"
                onClick={() => openListItemPage(category.id, item)}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
