import React from "react";
import { Link } from 'react-router-dom';
import "./menu.css";
import Button from './button';
import MenuOpenButton from "./MenuOpenButton";
import threeLines from "../assets/threeLineBar.png"


const MenuNavbar = (open) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(open);


    return (
        <div id="menu-bg">
            <MenuOpenButton open={open} />
            <div id="app-name">
                <h1>Dance <br /> Central</h1> 
            </div>
            <div className="button-container">
                <Link to="/" className="menu-btn"><Button text="Home">Home</Button></Link>
                <Link to="/calendar" className="menu-btn"><Button text="Calendar" ></Button></Link>
                <Link to="/blocking" className="menu-btn"><Button text="Blocking" ></Button></Link>
                <Link to="/casting" className="menu-btn"><Button text="Casting" ></Button></Link>
                <Link to="/cleaning" className="menu-btn"><Button text="Cleaning" ></Button></Link>
                <Link to="/outfits" className="menu-btn"><Button text="Outfits" ></Button></Link>
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