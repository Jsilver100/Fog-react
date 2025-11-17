import React from "react";
import Carousel from "../Components/Carousel";
import Products from "../pages/Products";
import "../pages/Home.css";
import { ArrowRight, Instagram, Facebook, Twitter, Mail } from "lucide-react";

// Dummy data for services, categories, brands, testimonials
const services = [
  {
    id: 1,
    title: "NIN Registration",
    description: "Register your National Identification Number easily.",
    image: "/assets/nin_service.png",
    link: "/nin",
  },
];

const categories = [
  { id: 1, title: "Phones", image: "/assets/phones_cat.jpg", link: "/products" },
  { id: 2, title: "Accessories", image: "/assets/accessories_cat.jpg", link: "/products" },
  { id: 3, title: "NIN Services", image: "/assets/nin_cat.jpg", link: "/nin" },
];

const brands = [
  { id: 1, name: "Tecno", logo: "/assets/tecno_logo.png" },
  { id: 2, name: "Infinix", logo: "/assets/infinix_logo.png" },
  { id: 3, name: "Itel", logo: "/assets/itel_logo.png" },
  { id: 4, name: "Samsung", logo: "/assets/samsung_logo.png" },
];

const testimonials = [
  {
    id: 1,
    name: "Chinedu",
    review: "Fast delivery and excellent customer service!",
  },
  {
    id: 2,
    name: "Aisha",
    review: "I got my NIN registration done seamlessly.",
  },
];

export default function Home() {
  return (
    <main className="home-container">
      {/* Hero Carousel */}
      <Carousel />

      {/* Latest Products */}
      <section className="latest-wrapper">
        <Products limit={4} compact />
        <div className="view-more">
          <a href="/products">
            View More <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <h2>Our Services</h2>
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

      {/* Categories */}
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

      {/* Brands */}
      <section className="brands-section">
        <h2>Featured Brands</h2>
        <div className="brands-grid">
          {brands.map((brand) => (
            <img key={brand.id} src={brand.logo} alt={brand.name} />
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

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Shop or Register NIN?</h2>
        <div className="cta-buttons">
          <a href="/products" className="cta-btn">
            Shop Now
          </a>
          <a href="/nin" className="cta-btn cta-red">
            Get Your NIN
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-about">
            <h3>TelecomStore</h3>
            <p>
              Your trusted store for phones, accessories, and NIN services. Premium quality and fast delivery.
            </p>
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