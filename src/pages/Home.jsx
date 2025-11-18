import React from "react";
import { motion } from "framer-motion";
import { Fade, Zoom } from "react-awesome-reveal";
import { ArrowRight, Instagram, Facebook, Twitter, Mail, Zap, Truck, Shield } from "lucide-react";
import Carousel from "../Components/Carousel";
import Products from "../pages/Products";
import "../pages/Home.css";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Services data
const services = [
  { id: 1, title: "NIN Registration", description: "Register your National Identification Number easily.", image: ninRegister, link: "/nin" },
  { id: 2, title: "NIN Reprint", description: "Get your NIN reprinted quickly and conveniently.", image: ninReprint, link: "/nin-reprint" },
  { id: 3, title: "Plastic NIN Card", description: "Upgrade to a durable plastic NIN card in minutes.", image: ninPlastic, link: "/nin-plastic" },
];

const categories = [
  { id: 1, title: "Phones", image: phonesCat, link: "/products" },
  { id: 2, title: "Accessories", image: accessoriesCat, link: "/products" },
];

const brands = [
  { id: 1, name: "Tecno", logo: tecnoLogo },
  { id: 2, name: "Infinix", logo: infinixLogo },
  { id: 3, name: "Itel", logo: itelLogo },
  { id: 4, name: "Samsung", logo: samsungLogo, small: true },
];

const testimonials = [
  { id: 1, name: "Chinedu", review: "Fast delivery and excellent customer service! Highly recommended." },
  { id: 2, name: "Aisha", review: "I got my NIN registration done seamlessly. Best experience ever!" },
];

const highlights = [
  {
    title: "Why Choose Us?",
    description: "Premium phones, genuine accessories, and fast NIN services. Enjoy seamless shopping.",
    icon: Shield,
  },
  {
    title: "Fast & Reliable Delivery",
    description: "Get your orders delivered to your doorstep in record time with secure handling.",
    icon: Truck,
  },
  {
    title: "Customer Satisfaction",
    description: "We prioritize your experience. Your feedback shapes our service quality.",
    icon: Zap,
  },
];

// Service Card Component
const ServiceCard = ({ service, index }) => (
  <Fade delay={index * 100}>
    <motion.a
      href={service.link}
      className="service-card"
      whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(230,57,70,0.2)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.img
        src={service.image}
        alt={service.title}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </motion.a>
  </Fade>
);

// Category Card Component
const CategoryCard = ({ cat, index }) => (
  <Fade delay={index * 100}>
    <motion.a
      href={cat.link}
      className="category-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.img src={cat.image} alt={cat.title} />
      <div className="category-overlay">
        <h3>{cat.title}</h3>
        <motion.div whileHover={{ x: 5 }}>
          <ArrowRight size={16} />
        </motion.div>
      </div>
    </motion.a>
  </Fade>
);

// Brand Logo Component
const BrandLogo = ({ brand, index }) => (
  <Fade delay={index * 50}>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.15 }}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className={brand.small ? "brand-small" : ""}
      />
    </motion.div>
  </Fade>
);

// Testimonial Component
const TestimonialCard = ({ testimonial, index }) => (
  <Fade delay={index * 100}>
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -8 }}
    >
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
      <p>"{testimonial.review}"</p>
      <h4>- {testimonial.name}</h4>
    </motion.div>
  </Fade>
);

// Highlight Card Component
const HighlightCard = ({ title, description, icon: Icon, index }) => (
  <Fade delay={index * 100}>
    <motion.div
      className="highlight-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
    >
      <motion.div
        className="highlight-icon"
        whileHover={{ rotate: 10, scale: 1.1 }}
      >
        <Icon size={40} />
      </motion.div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  </Fade>
);

export default function Home() {
  return (
    <main className="home-container">
      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Carousel />
      </motion.div>

      {/* Latest Products Section */}
      <motion.section
        className="latest-wrapper"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Products compact limit={4} />
        <div className="view-more">
          <motion.a
            href="/products"
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            View More <ArrowRight size={16} />
          </motion.a>
        </div>
      </motion.section>

      {/* NIN Services Section */}
      <section className="services-section">
        <Fade>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our NIN Services
          </motion.h2>
        </Fade>
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </motion.div>
      </section>

      {/* Shop by Category Section */}
      <section className="categories-section">
        <Fade>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Shop by Category
          </motion.h2>
        </Fade>
        <motion.div
          className="categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} cat={cat} index={idx} />
          ))}
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <motion.div
          className="highlights-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {highlights.map((highlight, idx) => (
            <HighlightCard
              key={idx}
              {...highlight}
              index={idx}
            />
          ))}
        </motion.div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <Fade>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Brands
          </motion.h2>
        </Fade>
        <motion.div
          className="brands-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {brands.map((brand, idx) => (
            <BrandLogo key={brand.id} brand={brand} index={idx} />
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Fade>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Customer Reviews
          </motion.h2>
        </Fade>
        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((t, idx) => (
            <TestimonialCard key={t.id} testimonial={t} index={idx} />
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Fade>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Shop or Register NIN?</h2>
            <div className="cta-buttons">
              <motion.a
                href="/products"
                className="cta-btn"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(230,57,70,0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.a>
            </div>
          </motion.div>
        </Fade>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <motion.div
            className="footer-about"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Favour of God Telecommunications</h3>
            <p>Your trusted store for phones, accessories, and NIN services. Premium quality and fast delivery.</p>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <a href="/products">Products</a>
            <a href="/nin">NIN Registration</a>
            <a href="/contact">Contact Us</a>
          </motion.div>

          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4>Contact</h4>
            <p><Mail size={16} /> support@favouroftelecom.com</p>
            <p><Instagram size={16} /> @favouroftelecom</p>
            <p><Facebook size={16} /> /favouroftelecom</p>
            <p><Twitter size={16} /> @favouroftelecom</p>
          </motion.div>
        </div>
        <motion.p
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          © 2025 Favour of God Telecommunications. All rights reserved.
        </motion.p>
      </footer>
    </main>
  );
}