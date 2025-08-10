import React from "react";
import { Link } from 'react-router-dom';
import "./menu.css";
import Button from './button';
import MenuOpenButton from "./MenuOpenButton";
import threeLines from "../assets/threeLineBar.png"


const isMenuOpen = false;


const MenuNavbar = () => {
    const handleMenuClick = () => {
        if (isMenuOpen) {
            document.getElementById("menu-bg").classList.remove("hidden");
        } else if (isMenuOpen == false) {
            document.getElementById("menu-bg").classList.add("hidden");
        }
    }


    return (
        <div id="menu-bg">
            <div id="menuCloseContainer">
                <Button icon="≡" onClick ={handleMenuClick} id="menuCloseButton" />
            </div>
            <div id="app-name">
                <h1>Dance <br /> Central</h1> 
            </div>
            <Link to="/"><Button text="Home" className="menu-btn">Home</Button></Link>
            <Link to="/calendar"><Button text="Calendar" className="menu-btn"></Button></Link>
            <Link to="/blocking"><Button text="Blocking" className="menu-btn"></Button></Link>
            <Link to="/casting"><Button text="Casting" className="menu-btn"></Button></Link>
            <Link to="/cleaning"><Button text="Cleaning" className="menu-btn"></Button></Link>
            <Link to="/outfits"><Button text="Outfits" className="menu-btn"></Button></Link>
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