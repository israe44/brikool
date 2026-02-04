import React, { useState } from "react";
import "./ApartmentCleaning.css";

export default function ApartmentCleaning({ navigate }) {
  const [formData, setFormData] = useState({
    zipCode: "",
    beds: "1",
    baths: "1",
    date: "",
    time: "10:00",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We'll contact you shortly with a price estimate.");
  };

  return (
    <div className="apartment-cleaning">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-image">
          <img src="/cleaning/cleaning-1.png" alt="Clean apartment" />
        </div>
        <div className="hero-overlay">
          <div className="booking-box">
            <h1>Apartment Cleaning</h1>
            <div className="rating">
              <span className="stars">★★★★★</span>
              <span className="review-count">(12,847 reviews)</span>
            </div>
            
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
                
                <select name="beds" value={formData.beds} onChange={handleChange} required>
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value="3">3 Beds</option>
                  <option value="4">4 Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
                
                <select name="baths" value={formData.baths} onChange={handleChange} required>
                  <option value="1">1 Bath</option>
                  <option value="1.5">1.5 Baths</option>
                  <option value="2">2 Baths</option>
                  <option value="2.5">2.5 Baths</option>
                  <option value="3">3+ Baths</option>
                </select>
                
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                
                <select name="time" value={formData.time} onChange={handleChange} required>
                  <option value="08:00">8:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              
              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                
                <button type="submit" className="submit-btn">Get a Price</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED SECTION */}
      <section className="whats-included">
        <h2>What's Included in a House Cleaning?</h2>
        
        {/* Bedroom */}
        <div className="included-item">
          <div className="item-image">
            <img src="/cleaning/cleaning-1.png" alt="Bedroom cleaning" />
          </div>
          <div className="item-content item-content-right">
            <h3>Bedroom</h3>
            <ul>
              <li>Make beds and change linens</li>
              <li>Dust all surfaces and furniture</li>
              <li>Vacuum and mop floors</li>
              <li>Empty trash bins</li>
              <li>Wipe down mirrors and glass</li>
            </ul>
          </div>
        </div>

        {/* Bathroom */}
        <div className="included-item reverse">
          <div className="item-image">
            <img src="/cleaning/cleaning-2.png" alt="Bathroom cleaning" />
          </div>
          <div className="item-content item-content-left">
            <h3>Bathroom</h3>
            <ul>
              <li>Scrub and disinfect toilet</li>
              <li>Clean shower, tub, and tile</li>
              <li>Wipe down sinks and counters</li>
              <li>Clean mirrors and fixtures</li>
              <li>Mop floors and empty trash</li>
            </ul>
          </div>
        </div>

        {/* Kitchen */}
        <div className="included-item">
          <div className="item-image">
            <img src="/cleaning/cleaning-3.png" alt="Kitchen cleaning" />
          </div>
          <div className="item-content item-content-right">
            <h3>Kitchen</h3>
            <ul>
              <li>Wipe down countertops and backsplash</li>
              <li>Clean exterior of appliances</li>
              <li>Clean and shine sink</li>
              <li>Sweep and mop floors</li>
              <li>Take out trash and recycling</li>
            </ul>
          </div>
        </div>

        {/* Living Areas */}
        <div className="included-item reverse">
          <div className="item-image">
            <img src="/cleaning/cleaning-1.png" alt="Living room cleaning" />
          </div>
          <div className="item-content item-content-left">
            <h3>Living Areas</h3>
            <ul>
              <li>Dust all surfaces and shelves</li>
              <li>Vacuum carpets and rugs</li>
              <li>Clean hardwood and tile floors</li>
              <li>Wipe down light switches and doorknobs</li>
              <li>Straighten pillows and cushions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* EXTRAS SECTION */}
      <section className="extras">
        <div className="extras-content">
          <h2>Extras</h2>
          <p>
            Need a deeper clean? Our pros can tackle additional tasks for an extra fee.
            Just let us know what you need when booking.
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

      {/* CLEANING PROS SECTION */}
      <section className="cleaning-pros">
        <h2>Meet Some of the Top Cleaning Pros</h2>
        <div className="pros-grid">
          <div className="pro-card">
            <div className="pro-photo">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Maria S." />
            </div>
            <h4>Maria S.</h4>
            <div className="pro-rating">★★★★★</div>
            <p className="pro-jobs">847 jobs completed</p>
            <p className="pro-testimonial">
              "Maria is amazing! Always on time and my apartment looks spotless. Highly recommend!"
            </p>
          </div>

          <div className="pro-card">
            <div className="pro-photo">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" alt="Linda K." />
            </div>
            <h4>Linda K.</h4>
            <div className="pro-rating">★★★★★</div>
            <p className="pro-jobs">1,203 jobs completed</p>
            <p className="pro-testimonial">
              "Very professional and thorough. Linda pays attention to every detail. Will book again!"
            </p>
          </div>

          <div className="pro-card">
            <div className="pro-photo">
              <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" alt="Jennifer R." />
            </div>
            <h4>Jennifer R.</h4>
            <div className="pro-rating">★★★★★</div>
            <p className="pro-jobs">692 jobs completed</p>
            <p className="pro-testimonial">
              "Jennifer is fantastic! She's reliable, friendly, and does an excellent job every time."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
