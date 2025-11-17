import React, { useRef, useState } from "react";
import "./Carousel.css";

import mob6s from "../assets/mob6s.mp4";
import mob6sPoster from "../assets/tecno-spark-30c-1.jpg";

import sparkPreview from "../assets/spark_preview_m.mp4";
import sparkPoster from "../assets/tecno-preview.jpg";

import spark40Pro from "../assets/spark_preview_m.mp4";
import spark40Poster from "../assets/infinix-hot-60-tundra-green-official-image.jpeg";

const slidesData = [
  { id: 1, title: "SPARK 40 PRO", subtitle: "With 10% Discount", buttonText: "Shop Now", videoSrc: mob6s, poster: mob6sPoster },
  { id: 2, title: "INFINIX HOT 60", subtitle: "Slim Ever, Strong Forever", buttonText: "Add to Cart", videoSrc: sparkPreview, poster: sparkPoster },
  { id: 3, title: "ITEL CITY 100", subtitle: "With IP65 Water Resistance", buttonText: "Buy Now 🛒", videoSrc: spark40Pro, poster: spark40Poster },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(null);
  const videoRefs = useRef([]);
  const segmentsRef = useRef([]);

  const goTo = (index) => {
    setCurrent(index);
    setHovering(null);
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.pause();
      v.currentTime = 0;
    });
    segmentsRef.current.forEach((seg) => {
      if (!seg) return;
      seg.style.transition = "none";
      seg.style.width = "0%";
    });
  };

  const handleHoverStart = (index) => {
    setHovering(index);
    const video = videoRefs.current[index];
    const seg = segmentsRef.current[index];
    if (!video || !seg) return;

    seg.style.transition = "none";
    seg.style.width = "0%";

    const duration = isFinite(video.duration) && video.duration > 0 ? video.duration : 5;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        seg.style.transition = `width ${duration}s linear`;
        seg.style.width = "100%";
      });
    });

    video.currentTime = 0;
    video.play().catch(() => {});
    video.onended = () => goTo((index + 1) % slidesData.length);
  };

  const handleHoverEnd = (index) => {
    setHovering(null);
    const video = videoRefs.current[index];
    const seg = segmentsRef.current[index];
    if (!video || !seg) return;

    video.pause();
    seg.style.transition = "none";
    seg.style.width = "0%";
  };

  const addToCart = (slide, e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("addToCartFromCarousel", { detail: slide }));
    console.log("Added to cart:", slide.title);
  };

  // Swipe logic only for slides container
  const swipeRefs = useRef({ startX: 0, isSwiping: false });

  const onTouchStart = (e) => {
    if (e.target.closest(".addcart")) return; // ignore buttons
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
            <button className="addcart" onClick={(e) => addToCart(slide, e)}>
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
            <div ref={(el) => (segmentsRef.current[idx] = el)} className="progress-fill" />
          </div>
        ))}
      </div>
    </div>
  );
}