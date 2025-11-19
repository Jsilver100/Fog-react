import React, { useRef, useState, useEffect, useContext } from "react";
import "./Carousel.css";
import { CartContext } from "../lib/cart";

import mob6s from "../assets/mob6s.mp4";
import mob6sPoster from "../assets/tecno-spark-30c-1.jpg";

import sparkPreview from "../assets/spark_preview_m.mp4";
import sparkPoster from "../assets/tecno-preview.jpg";

import spark40Pro from "../assets/spark_preview_m.mp4";
import spark40Poster from "../assets/infinix-hot-60-tundra-green-official-image.jpeg";

const slidesData = [
  { 
    id: 1, 
    productId: "1",
    title: "TECNO SPARK 30C", 
    subtitle: "With 10% Discount", 
    buttonText: "Add to Cart", 
    videoSrc: mob6s, 
    poster: mob6sPoster,
    price: 125000,
    name: "TECNO SPARK 30C",
    imgsrc: mob6sPoster
  },
  { 
    id: 2, 
    productId: "2",
    title: "INFINIX HOT 60", 
    subtitle: "Slim Ever, Strong Forever", 
    buttonText: "Add to Cart", 
    videoSrc: sparkPreview, 
    poster: sparkPoster,
    price: 135000,
    name: "INFINIX HOT 60",
    imgsrc: sparkPoster
  },
  { 
    id: 3, 
    productId: "3",
    title: "ITEL CITY 100", 
    subtitle: "With IP65 Water Resistance", 
    buttonText: "Add to Cart", 
    videoSrc: spark40Pro, 
    poster: spark40Poster,
    price: 95000,
    name: "ITEL CITY 100",
    imgsrc: spark40Poster
  },
];

export default function Carousel() {
  const { addToCart } = useContext(CartContext);
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(null);
  const [progress, setProgress] = useState({});
  const videoRefs = useRef([]);
  const autoPlayTimerRef = useRef(null);

  // Auto-play next slide after 5 seconds
  useEffect(() => {
    if (hovering === null) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNext();
      }, 5000);
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [current, hovering]);

  const goTo = (index) => {
    setCurrent(index);
    setHovering(null);
    setProgress({});
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.pause();
      v.currentTime = 0;
    });
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slidesData.length);
    setProgress({});
  };

  const handleHoverStart = (index) => {
    if (index !== current) return;
    
    setHovering(index);
    const video = videoRefs.current[index];
    if (!video) return;

    const duration = isFinite(video.duration) && video.duration > 0 ? video.duration : 5;

    video.currentTime = 0;
    video.play().catch(() => {});

    // Track video progress
    const updateProgress = () => {
      if (video && !video.paused) {
        const percent = (video.currentTime / duration) * 100;
        setProgress({ [index]: percent });
        if (video.currentTime < duration) {
          requestAnimationFrame(updateProgress);
        }
      }
    };
    updateProgress();

    video.onended = () => {
      goToNext();
      setHovering(null);
    };
  };

  const handleHoverEnd = (index) => {
    setHovering(null);
    const video = videoRefs.current[index];
    if (!video) return;

    video.pause();
    setProgress({});
  };

  const handleAddToCart = (slide, e) => {
    e.stopPropagation();
    
    // Add product to cart
    addToCart({
      id: slide.productId,
      title: slide.name,
      name: slide.name,
      price: slide.price,
      imgsrc: slide.poster,
      quantity: 1
    });
    
    console.log("✅ Added to cart:", slide.name);
  };

  // Swipe logic
  const swipeRefs = useRef({ startX: 0, isSwiping: false });

  const onTouchStart = (e) => {
    if (e.target.closest(".addcart")) return;
    swipeRefs.current.startX = e.changedTouches[0].clientX;
    swipeRefs.current.isSwiping = true;
  };

  const onTouchEnd = (e) => {
    if (!swipeRefs.current.isSwiping) return;
    const diff = e.changedTouches[0].clientX - swipeRefs.current.startX;
    if (diff > 50) goTo((current - 1 + slidesData.length) % slidesData.length);
    else if (diff < -50) goTo((current + 1) % slidesData.length);
    swipeRefs.current.isSwiping = false;
  };

  const onMouseDown = (e) => {
    if (e.target.closest(".addcart")) return;
    swipeRefs.current.startX = e.clientX;
    swipeRefs.current.isSwiping = true;
  };

  const onMouseUp = (e) => {
    if (!swipeRefs.current.isSwiping) return;
    const diff = e.clientX - swipeRefs.current.startX;
    if (diff > 50) goTo((current - 1 + slidesData.length) % slidesData.length);
    else if (diff < -50) goTo((current + 1) % slidesData.length);
    swipeRefs.current.isSwiping = false;
  };

  return (
    <div
      className="carousel-container"
      aria-roledescription="carousel"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`video-slide ${current === index ? "active" : ""}`}
          aria-hidden={current !== index}
          onMouseEnter={() => handleHoverStart(index)}
          onMouseLeave={() => handleHoverEnd(index)}
          onTouchStart={() => handleHoverStart(index)}
          onTouchEnd={() => handleHoverEnd(index)}
        >
          {hovering === index ? (
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="vid"
              src={slide.videoSrc}
              poster={slide.poster}
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img className="vid-poster" src={slide.poster} alt={slide.title} />
          )}

          <div className="content">
            <h1>{slide.title}</h1>
            <h2>{slide.subtitle}</h2>
            <p className="carousel-price">₦ {slide.price.toLocaleString()}</p>
            <button className="addcart" onClick={(e) => handleAddToCart(slide, e)}>
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}

      <div className="progress-wrapper" role="tablist" aria-label="Slide progress">
        {slidesData.map((_, idx) => (
          <div
            key={idx}
            className={`progress-segment ${current === idx ? "active-segment" : ""}`}
            role="presentation"
            onClick={() => goTo(idx)}
            style={{ cursor: "pointer" }}
          >
            <div 
              className="progress-fill"
              style={{
                width: hovering === idx && progress[idx] ? `${progress[idx]}%` : 
                       current === idx ? "100%" : "0%",
                transition: hovering === idx ? "none" : "width 0.3s ease"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}