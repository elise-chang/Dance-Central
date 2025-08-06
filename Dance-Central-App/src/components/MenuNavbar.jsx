import React from "react";
import { Link } from 'react-router-dom';
import "./menu.css";
//import Button from './button';



const MenuNavbar = () => {

    return (
        <div id="menu-bg">
            <div id="app-name">
            <p>// three line bar</p>
            <h1>APP NAME</h1> 
            </div>
            <div className="btn-container">
                <button><Link to="/">Home</Link></button>
                <button><Link to="/calendar">Calendar</Link></button>
                <button><Link to="/blocking">Blocking</Link></button>
                <button><Link to="/casting">Casting</Link></button>
                <button><Link to="/cleaning">Cleaning</Link></button>
                <button><Link to="/outfits">Outfits</Link></button>
            </div>
            <div id="menu-spacer"></div>
            <a>YourName sign out</a>
        </div>
    );
}

/* 
<Link to="/"><Button id="home-btn">Home</Button></Link>
            <Link to="/calendar"><Button id="calendar-btn">Calandar</Button></Link>
            <Link to="/blocking"><Button id="blocking-btn">Blocking</Button></Link>
            <Link to="/casting"><Button id="casting-btn">Casting</Button></Link>
            <Link to="/cleaning"><Button id="cleaning-btn">Cleaning</Button></Link>
            <Link to="/outfits"><Button id="outfits-btn">Outfits</Button></Link>

            <button><Link to="/"><Button id="home-btn">Home</Button></Link></button>
            <button><Link to="/calendar"><Button id="calendar-btn">Calendar</Button></Link></button>
            <button><Link to="/blocking"><Button id="blocking-btn">Blocking</Button></Link></button>
            <button><Link to="/casting"><Button id="casting-btn">Casting</Button></Link></button>
            <button><Link to="/cleaning"><Button id="cleaning-btn">Cleaning</Button></Link></button>
            <button><Link to="/outfits"><Button id="outfits-btn">Outfits</Button></Link></button>
            */

export default MenuNavbar;