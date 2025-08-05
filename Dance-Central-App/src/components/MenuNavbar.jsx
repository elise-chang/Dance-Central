import React from "react";
import { Link } from 'react-router-dom';
//import Button from './button';



const MenuNavbar = () => {

    return (
        <div id="menu-bg">
            <p>// three line bar</p>
            <h1>APP NAME</h1> 
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/calendar">Calendar</Link></li>
                <li><Link to="/blocking">Blocking</Link></li>
                <li><Link to="/casting">Casting</Link></li>
                <li><Link to="/cleaning">Cleaning</Link></li>
                <li><Link to="/outfits">Outfits</Link></li>
            </ul>
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

            <li><Link to="/"><Button id="home-btn">Home</Button></Link></li>
            <li><Link to="/calendar"><Button id="calendar-btn">Calendar</Button></Link></li>
            <li><Link to="/blocking"><Button id="blocking-btn">Blocking</Button></Link></li>
            <li><Link to="/casting"><Button id="casting-btn">Casting</Button></Link></li>
            <li><Link to="/cleaning"><Button id="cleaning-btn">Cleaning</Button></Link></li>
            <li><Link to="/outfits"><Button id="outfits-btn">Outfits</Button></Link></li>
            */

export default MenuNavbar;