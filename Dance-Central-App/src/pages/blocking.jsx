import React, { useState, useRef, useEffect } from "react";
import MediaUploader from "../components/MediaUploader";
import MenuNavbar from "../components/MenuNavbar";
import Dropdown from "../components/Dropdown";
import Button from "../components/button";
import Audio from "../components/Audio";
import "../pages/blocking.css";
import Bookmark from "../components/Bookmark";

export default function Blocking() {
  const [timestamp, setTimestamp] = useState(0);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");
  const carouselRef = useRef(null);

  const handleMatch = (time) => {
    setTimestamp(time);
    //confirm(timestamp);
  }

  const addImages = (items) => {
    setImages((prev) => {
      const newItems = [...prev, ...items];
      if (!selected && newItems.length) {
        setSelected(newItems[0]);
      }
      return newItems;
    });
  };

  useEffect(() => {
    if (!carouselRef.current || !selected) return;
    const selectedIndex = images.findIndex((img) => img.src === selected.src);
    if (selectedIndex === -1) return;

    const selectedThumb = carouselRef.current.children[selectedIndex];
    if (selectedThumb) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollPosition =
        selectedThumb.offsetLeft -
        containerWidth / 2 +
        selectedThumb.offsetWidth / 2;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [selected, images]);

  return (
    <div className="blocking">
      <MenuNavbar /> 
      <div className="page-heading">
               <h1>Blocking</h1>
               <div className = "page-heading-right">
                   <Button className = "help-button" icon="?"/>
                   <Dropdown className = "dropdown" text="TeamName" />
               </div>
           </div>
      <section className="left">

        <div className="image-panel panel">
          {selected ? (
            <img
              src={selected.src}
              alt={selected.alt}
              className="image-el"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div className="empty-image">
              <p>No images yet.</p>
              <MediaUploader
                uploadType="image"
                buttonClassName="pink-upload-btn"
                onAdd={addImages}
              />
            </div>
          )}
        </div>

        <div className="carousel-panel panel">
          {images.length ? (
            <div className="carousel-nav-wrapper">
              <button
                className="carousel-arrow"
                aria-label="Previous"
                onClick={() => {
                  const idx = selected
                    ? images.findIndex((img) => img.src === selected.src)
                    : 0;
                  setSelected(images[(idx - 1 + images.length) % images.length]);
                }}
                disabled={!images.length}
              >
                {"<"}
              </button>
              <ul className="carousel" ref={carouselRef}>
                {images.map((img, i) => (
                  <li
                    key={i}
                    className={`thumb ${
                      selected?.src === img.src ? "active" : ""
                    }`}
                    onClick={() => setSelected(img)}
                  >
                    <img src={img.src} alt={img.alt} />
                  </li>
                ))}
              </ul>
              <button
                className="carousel-arrow"
                aria-label="Next"
                onClick={() => {
                  const idx = selected
                    ? images.findIndex((img) => img.src === selected.src)
                    : 0;
                  setSelected(images[(idx + 1) % images.length]);
                }}
                disabled={!images.length}
              >
                {">"}
              </button>
            </div>
          ) : (
            <ul className="carousel">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="thumb placeholder-thumb" />
              ))}
            </ul>
          )}
        </div>
      </section>

      <aside className="right">
        <div className="blocking-notes panel">
          <textarea
            className="blocking-notes-input"
            placeholder="Add notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </aside>
      <Audio sendTimeStamp={handleMatch} />
      <Bookmark time={timestamp} />
    </div>
  );
}
