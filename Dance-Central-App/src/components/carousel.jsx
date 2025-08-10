import React, { useState } from "react"; 

const Carousel = ({media = [] }) => {
    const [current, setCurrent] = useState(0); 
    const total = media.length; 

    if (!total) return null; 

    const getIndex = (offset) => (current + offset + total) % total; 
    const prev = () => setCurrent((c) => (c - 1 + total) % total); 
    const next = () => setCurrent((c) => (c + 1) % total); 

    const renderMedia = (item, isActive = false) => {
        if (!item) return null; 
        const isVideo = 
            item.type === "video" ||
            (typeof item.src === "string" && item.src.match(/\. (mp4|webm|ogg)$/i)); 
    return isVideo ? (
        <video src = {item.src}
        poster = {item.poster}
        muted = {!isActive}
        controls = {isActive}
        playInline 
        loop
        />
    ) : (
        <img src = {item.src} alt = {item.alt || ""} />
    );
    }; 

    const prevIdx = getIndex(-1); 
    const currIdx = current; 
    const nextIdx = getIndex(1); 

    return (
        <div className = "carousel-container">
            <div class = "carousel-track">
                <div class = "carousel-item" onClick = {prev}>
                    <img src={media[getIndex[-1]]} alt="Previous" />
                </div>
            </div>
        </div>
    ); 
}; 