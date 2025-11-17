import React from "react";
import Carousel from "../Components/Carousel";
import Products from "../pages/Products";
import "../pages/Home.css";
import { ArrowRight, Instagram, Facebook, Twitter, Mail } from "lucide-react";

// Brand logos
import tecnoLogo from "../assets/tecno-logo-hd.png";
import infinixLogo from "../assets/infinix_logo.png";
import itelLogo from "../assets/itel_logo.png";
import samsungLogo from "../assets/samsung_logo.png";

// NIN service images
import ninRegister from "../assets/nin_service.png";
import ninReprint from "../assets/nin_reprint.png";
import ninPlastic from "../assets/nin_plastic.png";

// Category images
import phonesCat from "../assets/phones_cat.png";
import accessoriesCat from "../assets/accessories_cat.png";


// Updated NIN services
const services = [
  { id: 1, title: "NIN Registration", description: "Register your National Identification Number easily.", image: ninRegister, link: "/nin" },
  { id: 2, title: "NIN Reprint", description: "Get your NIN reprinted quickly and conveniently.", image: ninReprint, link: "/nin-reprint" },
  { id: 3, title: "Plastic NIN Card", description: "Upgrade to a durable plastic NIN card in minutes.", image: ninPlastic, link: "/nin-plastic" },
];

// Shop categories
const categories = [
  { id: 1, title: "Phones", image: phonesCat, link: "/products" },
  { id: 2, title: "Accessories", image: accessoriesCat, link: "/products" },

];

// Featured brands
const brands = [
  { id: 1, name: "Tecno", logo: tecnoLogo },
  { id: 2, name: "Infinix", logo: infinixLogo },
  { id: 3, name: "Itel", logo: itelLogo },
  { id: 4, name: "Samsung", logo: samsungLogo, small: true },
];

// Customer testimonials
const testimonials = [
  { id: 1, name: "Chinedu", review: "Fast delivery and excellent customer service!" },
  { id: 2, name: "Aisha", review: "I got my NIN registration done seamlessly." },
];

export default function Home() {
  return (
    <main className="home-container">
      {/* Hero Carousel */}
      <Carousel />

      {/* Latest Products */}
      <section className="latest-wrapper">
        <Products compact limit={4} />
        <div className="view-more">
          <a href="/products">
            View More <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* NIN Services */}
      <section className="services-section">
        <h2>Our NIN Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <a key={service.id} href={service.link} className="service-card">
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <a key={cat.id} href={cat.link} className="category-card">
              <img src={cat.image} alt={cat.title} />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
                <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Highlight Section */}
      <section className="highlight-section">
        <div className="highlight-card">
          <h3>Why Choose TelecomStore?</h3>
          <p>Premium phones, genuine accessories, and fast NIN services. Enjoy seamless shopping and delivery.</p>
        </div>
        <div className="highlight-card">
          <h3>Fast & Reliable Delivery</h3>
          <p>Get your orders delivered to your doorstep in record time with secure handling.</p>
        </div>
        <div className="highlight-card">
          <h3>Customer Satisfaction</h3>
          <p>We prioritize your experience. Your feedback shapes our service quality.</p>
        </div>
      </section>

      {/* Brands */}
      <section className="brands-section">
        <h2>Featured Brands</h2>
        <div className="brands-grid">
          {brands.map((brand) => (
            <img
              key={brand.id}
              src={brand.logo}
              alt={brand.name}
              className={brand.small ? "brand-small" : ""}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>Customer Reviews</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <p>"{t.review}"</p>
              <h4>- {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Shop or Register NIN?</h2>
        <div className="cta-buttons">
          <a href="/products" className="cta-btn">Shop Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-about">
            <h3>TelecomStore</h3>
            <p>Your trusted store for phones, accessories, and NIN services. Premium quality and fast delivery.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="/products">Products</a>
            <a href="/nin">NIN Registration</a>
            <a href="/contact">Contact Us</a>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p><Mail size={16} /> support@telecomstore.com</p>
            <p><Instagram size={16} /> @telecomstore</p>
            <p><Facebook size={16} /> /telecomstore</p>
            <p><Twitter size={16} /> @telecomstore</p>
          </div>
        </div>
        <p className="footer-bottom">© 2025 TelecomStore. All rights reserved.</p>
      </footer>
    </main>
  );
}