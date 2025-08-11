import React, { useState, useEffect } from "react";

export default function Carousel({ media = [], onSelect }) {
  const [current, setCurrent] = useState(0);
  const total = media.length;
  if (!total) return null;

  const wrap = (i) => (i + total) % total;
  const prev = () => setCurrent((c) => wrap(c - 1));
  const next = () => setCurrent((c) => wrap(c + 1));

  useEffect(() => { onSelect?.(media[current]); }, [current, media, onSelect]);

  const isVideo = (item) =>
    item?.type === "video" || (typeof item?.src === "string" && /\.(mp4|webm|ogg)$/i.test(item.src));

  const renderMedia = (item, isActive = false) =>
    isVideo(item) ? (
      <video src={item.src} poster={item.poster} controls={isActive} muted={!isActive} playsInline loop />
    ) : (
      <img src={item?.thumb || item?.src} alt={item?.alt || ""} />
    );

  const prevIdx = wrap(current - 1);
  const nextIdx = wrap(current + 1);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        <button className="carousel-item" onClick={prev} aria-label="Previous">
          {renderMedia(media[prevIdx])}
        </button>

        <div className="carousel-item current">
          {renderMedia(media[current], true)}
        </div>

        <button className="carousel-item" onClick={next} aria-label="Next">
          {renderMedia(media[nextIdx])}
        </button>
      </div>

      <div className="carousel-counter">{current + 1}/{total}</div>

      <input
        className="carousel-range"
        type="range"
        min="0"
        max={total - 1}
        value={current}
        onChange={(e) => setCurrent(Number(e.target.value))}
      />
    </div>
  );
}
