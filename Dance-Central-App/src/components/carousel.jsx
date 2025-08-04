import React, { useState } from "react"; 
import './index.css';

const Carousel = ({media}) => {
    const [current, setCurrent] = useState(0); 
    const total = media.length; 

    const prev = () => setCurrent((current - 1 + total) % total); 
    const next = () => setCurrent((current + 1) % total); 
    const getIndex = (offset) => (current + offset + total) % total;

    return (
        <div class = "carousel-container">
            <div class = "carousel-track">
                <div class = "carousel-item" onClick = {prev}>
                    <img src={media[getIndex[-1]]} alt="Previous " />
                </div>
            </div>
        </div>
    ); 
}; 